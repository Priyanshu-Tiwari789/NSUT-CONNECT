/**
 * AuthContext.jsx
 * 
 * Manages user session, role authorization, student academic credentials
 * (roll number, branch, semester, section), custom names, and profile photos.
 * Strictly verifies the @nsut.ac.in domain requirement.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

// 100% offline fallback avatar generator
export const getOfflineAvatar = (name = 'NS') => {
  const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NS';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%239b2c2c"/><text x="50" y="58" font-family="sans-serif" font-size="38" font-weight="bold" fill="%23ffffff" text-anchor="middle">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user from cached profile
  useEffect(() => {
    const initAuth = async () => {
      try {
        const profile = await api.getUserProfile();
        if (profile) {
          if (!profile.avatar) {
            profile.avatar = getOfflineAvatar(profile.name);
          }
          if (!profile.branch) profile.branch = 'COE';
          if (!profile.semester) profile.semester = 5;
          if (!profile.section) profile.section = 'COE-2';
          if (!profile.rollNo) profile.rollNo = '2023UCO1542';
          setUser(profile);
        }
      } catch (err) {
        console.error('Failed to load user profile:', err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // Login handler supporting custom Name, Photo, Roll No, Branch, Semester, Section
  const loginWithGoogle = async (email, role = 'student', customName = '', customPhoto = '', studentDetails = {}) => {
    setError(null);
    if (!email || !email.trim().toLowerCase().endsWith('@nsut.ac.in')) {
      const msg = 'Access Denied: Only official university accounts ending in @nsut.ac.in are allowed.';
      setError(msg);
      return { success: false, error: msg };
    }

    const fallbackName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const finalName = customName && customName.trim() ? customName.trim() : (fallbackName || 'NSUT Student');
    const finalAvatar = customPhoto || getOfflineAvatar(finalName);

    const newUser = {
      ...(user || {}),
      id: user?.id || `usr_${Date.now()}`,
      email,
      name: finalName,
      role: role,
      avatar: finalAvatar,
      rollNo: studentDetails.rollNo || user?.rollNo || '2023UCO1542',
      branch: studentDetails.branch || user?.branch || 'COE',
      semester: Number(studentDetails.semester) || user?.semester || 5,
      section: studentDetails.section || user?.section || 'COE-2'
    };

    setUser(newUser);
    await api.updateUserProfile(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = async () => {
    if (!user) return;
    const newRole = user.role === 'admin' ? 'student' : 'admin';
    const updated = { ...user, role: newRole };
    setUser(updated);
    await api.updateUserProfile(updated);
  };

  const updateProfile = async (updates) => {
    const updated = { ...user, ...updates };
    if (!updated.avatar) {
      updated.avatar = getOfflineAvatar(updated.name);
    }
    setUser(updated);
    await api.updateUserProfile(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginWithGoogle,
        logout,
        toggleRole,
        updateProfile,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

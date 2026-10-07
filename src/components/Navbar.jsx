import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Shield, 
  User, 
  GraduationCap, 
  ToggleLeft, 
  ToggleRight,
  Sun,
  Moon
} from 'lucide-react';
import { useOffline } from '../context/OfflineContext';
import { useAuth, getOfflineAvatar } from '../context/AuthContext';

export const Navbar = ({ onOpenAuthModal }) => {
  const { isOnline, simulateOffline, toggleSimulation } = useOffline();
  const { user, isAdmin, toggleRole } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="navbar">
      {/* Brand Identity with Space Grotesk typography & high contrast pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <img 
          src="/logo.jpg" 
          alt="NSUT Connect Logo" 
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--border)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="brand-title" style={{ 
              fontSize: '1.35rem', 
              color: 'var(--foreground)'
            }}>
              NSUT CONNECT
            </span>
            <span className="campus-pill">
              Main Campus
            </span>
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--muted-foreground)', marginTop: '0.15rem' }}>
            Netaji Subhas University of Technology
          </p>
        </div>
      </div>

      {/* Connectivity, Theme & User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        
        {/* Dark / Light Mode Switch */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem', borderRadius: '50%', width: '34px', height: '34px' }}
          title={isDark ? "Switch to Light Parchment Theme" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} color="#9b2c2c" />}
        </button>

        {/* Offline Simulation Control */}
        <button
          onClick={toggleSimulation}
          className="btn btn-secondary btn-sm"
          style={{ 
            fontSize: '0.75rem',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            borderColor: simulateOffline ? 'var(--chart-4)' : 'var(--border)'
          }}
          title="Click to test offline caching without disconnecting internet"
        >
          {simulateOffline ? <ToggleRight size={16} color="#b45309" /> : <ToggleLeft size={16} />}
          <span>Simulate Offline</span>
        </button>

        {/* Network Status Pill */}
        <div 
          style={{ 
            padding: '0.35rem 0.75rem', 
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--card)',
            border: `1.5px solid ${isOnline ? '#bbf7d0' : 'var(--border)'}`
          }}
        >
          <div 
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%',
              backgroundColor: isOnline ? '#16a34a' : 'var(--chart-4)',
              boxShadow: isOnline ? '0 0 8px #16a34a' : '0 0 8px #b45309'
            }}
            className="pulse"
          />
          <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: '600', color: isOnline ? '#15803d' : 'var(--chart-5)' }}>
            {isOnline ? 'Online Sync' : 'Offline Storage'}
          </span>
        </div>

        {/* Role Toggle (Student vs Admin) */}
        {user && (
          <button
            onClick={toggleRole}
            className="btn btn-secondary btn-sm"
            style={{
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              borderColor: isAdmin ? 'var(--primary)' : 'var(--border)',
              color: isAdmin ? 'var(--primary)' : 'var(--foreground)'
            }}
            title="Switch between Student and Admin privileges"
          >
            {isAdmin ? <Shield size={14} /> : <GraduationCap size={14} />}
            <span>Role: {isAdmin ? 'Admin' : 'Student'}</span>
          </button>
        )}

        {/* User Pill / Login Trigger */}
        {user ? (
          <div 
            onClick={onOpenAuthModal}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.65rem',
              cursor: 'pointer',
              padding: '0.25rem 0.65rem 0.25rem 0.25rem',
              borderRadius: '9999px',
              background: 'var(--muted)',
              border: '1.5px solid var(--border)',
              transition: 'var(--transition)'
            }}
          >
            <img 
              src={user.avatar || getOfflineAvatar(user.name)} 
              alt={user.name} 
              style={{ 
                width: '34px', 
                height: '34px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '1.5px solid var(--primary)',
                background: 'var(--card)'
              }} 
            />
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--foreground)' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                {user.rollNo || user.branch}
              </div>
            </div>
          </div>
        ) : (
          <button onClick={onOpenAuthModal} className="btn btn-primary btn-sm">
            Sign In with @nsut.ac.in
          </button>
        )}

      </div>
    </header>
  );
};

import React, { useState, useRef } from 'react';
import { 
  User, 
  GraduationCap, 
  Shield, 
  Database, 
  RefreshCw, 
  Trash2, 
  CheckCircle, 
  AlertTriangle,
  Camera,
  Edit2,
  Check
} from 'lucide-react';
import { useAuth, getOfflineAvatar } from '../context/AuthContext';
import { storage } from '../services/storage';

export const Profile = () => {
  const { user, isAdmin, toggleRole, updateProfile } = useAuth();
  const [cacheClearedMsg, setCacheClearedMsg] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const fileInputRef = useRef(null);

  if (!user) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Please Sign In</h2>
        <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
          Use your official @nsut.ac.in account to view your academic dashboard.
        </p>
      </div>
    );
  }

  const handleClearCache = () => {
    storage.clearAll();
    setCacheClearedMsg(true);
    setTimeout(() => setCacheClearedMsg(false), 3000);
  };

  const handleSaveName = async () => {
    if (!editedName.trim()) return;
    await updateProfile({ name: editedName.trim() });
    setIsEditingName(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const attendance = user.attendance || { overall: 84, subjects: [] };

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--foreground)' }}>
          Student Academic Dashboard
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>
          Official student profile, attendance compliance, and local storage diagnostics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Digital Student ID Card */}
        <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--chart-4) 100%)'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
            {/* Avatar with Camera Overlay */}
            <div style={{ position: 'relative' }}>
              <img 
                src={user.avatar || getOfflineAvatar(user.name)} 
                alt={user.name} 
                style={{ 
                  width: '68px', 
                  height: '68px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '2px solid var(--primary)',
                  background: 'var(--card)'
                }} 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  background: 'var(--primary)',
                  color: 'white',
                  border: '2px solid var(--card)',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Upload Profile Photo"
              >
                <Camera size={13} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>

            <div style={{ flex: 1 }}>
              {isEditingName ? (
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <input 
                    type="text" 
                    value={editedName} 
                    onChange={e => setEditedName(e.target.value)} 
                    className="input-field"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.9rem' }}
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="btn btn-primary btn-sm" style={{ padding: '0.35rem 0.6rem' }}>
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--foreground)' }}>{user.name}</h2>
                  <button 
                    onClick={() => { setEditedName(user.name); setIsEditingName(true); }}
                    style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', padding: '2px' }}
                    title="Edit Name"
                  >
                    <Edit2 size={13} />
                  </button>
                  <span className={`badge ${isAdmin ? 'badge-primary' : 'badge-info'}`}>
                    {user.role.toUpperCase()}
                  </span>
                </div>
              )}
              <div style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)' }}>{user.email}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: '600' }}>{user.rollNo}</div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '0.75rem',
            background: 'var(--muted)',
            padding: '1rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            marginBottom: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Branch</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--foreground)' }}>{user.branch}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Semester / Section</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--foreground)' }}>Sem {user.semester} • {user.section}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={toggleRole} className="btn btn-secondary btn-sm" style={{ flex: 1, gap: '0.4rem' }}>
              {isAdmin ? <GraduationCap size={15} /> : <Shield size={15} />}
              <span>Switch to {isAdmin ? 'Student' : 'Admin'}</span>
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem' }}
            >
              <Camera size={14} />
              <span>Change Photo</span>
            </button>
          </div>
        </div>

        {/* 75% Attendance Compliance Meter */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--foreground)' }}>Mandatory Attendance</h2>
            <span className={`badge ${attendance.overall >= 75 ? 'badge-success' : 'badge-primary'}`}>
              {attendance.overall >= 75 ? '75% Criteria Met' : 'Shortage Alert'}
            </span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: attendance.overall >= 75 ? '#15803d' : 'var(--destructive)' }}>
              {attendance.overall}%
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>
              Overall Cumulative Attendance across registered courses
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {attendance.subjects.map(subj => {
              const isEligible = subj.percentage >= 75;
              return (
                <div key={subj.code} style={{ fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ color: 'var(--foreground)' }}>{subj.name}</span>
                    <strong style={{ color: isEligible ? '#15803d' : 'var(--destructive)' }}>
                      {subj.attended}/{subj.total} ({subj.percentage}%)
                    </strong>
                  </div>
                  <div style={{ height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${subj.percentage}%`, 
                      background: isEligible ? '#16a34a' : 'var(--destructive)' 
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Offline Storage Diagnostics */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Database size={18} color="var(--primary)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--foreground)' }}>On-Device Offline Storage Manager</h2>
          </div>

          <button 
            onClick={handleClearCache} 
            className="btn btn-secondary btn-sm"
            style={{ gap: '0.4rem', borderColor: 'var(--destructive)', color: 'var(--destructive)' }}
          >
            <Trash2 size={14} />
            <span>Clear Local Storage Cache</span>
          </button>
        </div>

        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          This app automatically caches timetable schedules, announcements, and your profile in <code>localStorage</code>.
          When NSUT Wi-Fi is unreachable, the application falls back immediately to this cached store.
        </p>

        {cacheClearedMsg && (
          <div style={{
            background: '#dcfce7',
            border: '1px solid #bbf7d0',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius)',
            color: '#15803d',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle size={15} />
            <span>Local cache purged successfully. Fresh data will download on next network sync.</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: 'var(--muted)', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Cached Timetable</div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#15803d' }}>Active (COE-2)</div>
          </div>
          <div style={{ background: 'var(--muted)', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Cached Circulars</div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#15803d' }}>Available Offline</div>
          </div>
          <div style={{ background: 'var(--muted)', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>SSO Auth Domain</div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>@nsut.ac.in Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

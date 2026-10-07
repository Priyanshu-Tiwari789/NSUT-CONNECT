import React, { useState, useRef } from 'react';
import { X, ShieldCheck, AlertCircle, LogIn, Mail, User, Camera, Upload, Hash, BookOpen, Layers } from 'lucide-react';
import { useAuth, getOfflineAvatar } from '../context/AuthContext';

export const LoginModal = ({ isOpen, onClose }) => {
  const { loginWithGoogle, error: authError, user, logout, updateProfile } = useAuth();
  
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [rollNoInput, setRollNoInput] = useState('2023UCO1542');
  const [branchInput, setBranchInput] = useState('COE');
  const [semesterInput, setSemesterInput] = useState(5);
  const [sectionInput, setSectionInput] = useState('COE-2');
  const [photoPreview, setPhotoPreview] = useState('');
  const [roleInput, setRoleInput] = useState('student');
  const [localError, setLocalError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const branches = [
    { code: 'COE', name: 'Computer Engineering (COE)' },
    { code: 'IT', name: 'Information Technology (IT)' },
    { code: 'MAC', name: 'Mathematics & Computing (MAC)' },
    { code: 'ECE', name: 'Electronics & Communication (ECE)' },
    { code: 'EE', name: 'Electrical Engineering (EE)' },
    { code: 'ME', name: 'Mechanical Engineering (ME)' },
    { code: 'ICE', name: 'Instrumentation & Control (ICE)' },
    { code: 'BT', name: 'Biotechnology (BT)' }
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setLocalError('Photo size must be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailChange = (val) => {
    setEmailInput(val);
    if (!nameInput && val.includes('@')) {
      const derived = val.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      setNameInput(derived);
    }
  };

  const handleLogin = async (presetEmail, presetRole, presetName, presetBranch = 'COE', presetSem = 5) => {
    setLocalError('');
    const emailToUse = presetEmail || emailInput;
    const roleToUse = presetRole || roleInput;
    const nameToUse = presetName || nameInput;
    const photoToUse = photoPreview || getOfflineAvatar(nameToUse || 'NS');

    const studentDetails = {
      rollNo: rollNoInput.trim(),
      branch: presetBranch || branchInput,
      semester: Number(presetSem || semesterInput),
      section: sectionInput.trim()
    };

    const res = await loginWithGoogle(emailToUse, roleToUse, nameToUse, photoToUse, studentDetails);
    if (res.success) {
      onClose();
    } else {
      setLocalError(res.error);
    }
  };

  const handleUpdateExisting = async () => {
    await updateProfile({
      name: nameInput.trim() || user?.name,
      rollNo: rollNoInput.trim() || user?.rollNo,
      branch: branchInput || user?.branch,
      semester: Number(semesterInput) || user?.semester,
      section: sectionInput.trim() || user?.section,
      avatar: photoPreview || user?.avatar || getOfflineAvatar(user?.name)
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.72)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '520px', 
          width: '100%', 
          position: 'relative',
          padding: '2.25rem',
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            top: '1.25rem', 
            right: '1.25rem', 
            background: 'none', 
            border: 'none', 
            color: 'var(--muted-foreground)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <img 
            src="/logo.jpg" 
            alt="NSUT Connect Logo" 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--border)',
              margin: '0 auto 0.65rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)'
            }}
          />
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--foreground)' }}>
            {user ? 'Update Student Profile' : 'Student Enrollment & SSO'}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>
            Restricted to verified <strong>@nsut.ac.in</strong> email domains.
          </p>
        </div>

        {user ? (
          <div>
            {/* Current Details */}
            <div style={{
              background: 'var(--muted)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius)',
              border: '1.5px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={photoPreview || user.avatar || getOfflineAvatar(user.name)} 
                  alt={user.name} 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '2px solid var(--primary)'
                  }} 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Upload photo"
                >
                  <Camera size={12} />
                </button>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--foreground)' }}>{user.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{user.email}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '600' }}>
                  {user.rollNo} • {user.branch} • Sem {user.semester} ({user.section})
                </div>
              </div>
            </div>

            {/* Editable Academic Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Branch
                </label>
                <select 
                  defaultValue={user.branch}
                  onChange={e => setBranchInput(e.target.value)}
                  className="input-field"
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                >
                  {branches.map(b => <option key={b.code} value={b.code}>{b.code} - {b.name}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Semester
                </label>
                <select 
                  defaultValue={user.semester}
                  onChange={e => setSemesterInput(Number(e.target.value))}
                  className="input-field"
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Roll Number
                </label>
                <input 
                  type="text" 
                  defaultValue={user.rollNo}
                  onChange={e => setRollNoInput(e.target.value)}
                  className="input-field"
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Section
                </label>
                <input 
                  type="text" 
                  defaultValue={user.section}
                  onChange={e => setSectionInput(e.target.value)}
                  className="input-field"
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoUpload} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={handleUpdateExisting} className="btn btn-primary" style={{ flex: 1 }}>
                Save Academic Profile
              </button>
              <button onClick={() => { logout(); onClose(); }} className="btn btn-secondary">
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            {(localError || authError) && (
              <div style={{
                background: 'rgba(153, 27, 27, 0.1)',
                border: '1.5px solid var(--destructive)',
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                color: 'var(--destructive)',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <AlertCircle size={16} />
                <span>{localError || authError}</span>
              </div>
            )}

            {/* Photo Upload Area */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              background: 'var(--muted)',
              borderRadius: 'var(--radius)',
              border: '1.5px dashed var(--border)'
            }}>
              <img 
                src={photoPreview || getOfflineAvatar(nameInput || 'NS')} 
                alt="Avatar Preview" 
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '2px solid var(--primary)',
                  background: 'var(--card)'
                }} 
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--foreground)' }}>
                  Profile Photo
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.4rem', fontSize: '0.74rem', marginTop: '0.2rem' }}
                >
                  <Upload size={12} />
                  <span>{photoPreview ? 'Change Photo' : 'Upload Photo'}</span>
                </button>
                <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" style={{ display: 'none' }} />
              </div>
            </div>

            {/* Name & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Aarav Sharma"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="input-field"
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Roll Number
                </label>
                <input 
                  type="text" 
                  placeholder="2023UCO1542"
                  value={rollNoInput}
                  onChange={(e) => setRollNoInput(e.target.value)}
                  className="input-field"
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                University Email Address (@nsut.ac.in)
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  placeholder="student.name.ug23@nsut.ac.in"
                  value={emailInput}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.5rem', padding: '0.5rem 0.75rem 0.5rem 2.5rem', fontSize: '0.85rem' }}
                  required
                />
                <Mail size={15} style={{ position: 'absolute', left: '0.85rem', top: '0.7rem', color: 'var(--muted-foreground)' }} />
              </div>
            </div>

            {/* Branch, Semester, Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Branch
                </label>
                <select 
                  value={branchInput}
                  onChange={e => setBranchInput(e.target.value)}
                  className="input-field"
                  style={{ padding: '0.5rem 0.65rem', fontSize: '0.8rem' }}
                >
                  {branches.map(b => <option key={b.code} value={b.code}>{b.code}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Semester
                </label>
                <select 
                  value={semesterInput}
                  onChange={e => setSemesterInput(Number(e.target.value))}
                  className="input-field"
                  style={{ padding: '0.5rem 0.65rem', fontSize: '0.8rem' }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Sem {s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem' }}>
                  Section
                </label>
                <input 
                  type="text" 
                  placeholder="COE-2"
                  value={sectionInput}
                  onChange={e => setSectionInput(e.target.value)}
                  className="input-field"
                  style={{ padding: '0.5rem 0.65rem', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            {/* Role Privileges */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--foreground)', display: 'block', marginBottom: '0.35rem' }}>
                Account Privileges
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setRoleInput('student')}
                  className={`btn ${roleInput === 'student' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.8rem' }}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRoleInput('admin')}
                  className={`btn ${roleInput === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.8rem' }}
                >
                  Admin / Faculty
                </button>
              </div>
            </div>

            <button 
              onClick={() => handleLogin()} 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              Sign In with Google SSO
            </button>

            {/* Quick Demo Credentials */}
            <div style={{ borderTop: '1.5px solid var(--border)', paddingTop: '0.75rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginBottom: '0.4rem' }}>
                Or test with one-click campus presets:
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => handleLogin('priya.bansal.ug24@nsut.ac.in', 'student', 'Priya Bansal', 'IT', 5)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem' }}
                >
                  IT Student Preset
                </button>
                <button 
                  onClick={() => handleLogin('controller.exams@nsut.ac.in', 'admin', 'Dr. S. K. Saxena', 'COE', 5)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', borderColor: 'var(--ring)' }}
                >
                  Faculty Preset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

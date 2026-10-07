import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  Database, 
  BookOpen, 
  Coffee, 
  Laptop,
  Layers,
  UploadCloud,
  FileCode,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import { storage } from '../services/storage';

export const Timetable = () => {
  const { user } = useAuth();
  const { isOnline } = useOffline();

  // Branch & Semester Selection
  const [selectedBranch, setSelectedBranch] = useState(user?.branch || 'COE');
  const [selectedSemester, setSelectedSemester] = useState(user?.semester || 5);
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFromCache, setIsFromCache] = useState(false);

  // IMS Raw Importer Modal
  const [showImporter, setShowImporter] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importSuccessMsg, setImportSuccessMsg] = useState('');

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

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  // Weekdays navigation
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [activeDay, setActiveDay] = useState(days.includes(todayName) ? todayName : 'Monday');

  const fetchSchedule = async (branchToFetch = selectedBranch, semToFetch = selectedSemester) => {
    setLoading(true);
    try {
      const res = await api.getTimetable(branchToFetch, semToFetch);
      setTimetableData(res.data);
      setIsFromCache(res.fromCache);
    } catch (err) {
      console.error('Failed to load timetable:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-align timetable to student's enrolled branch & semester
  useEffect(() => {
    if (user?.branch) {
      setSelectedBranch(user.branch);
    }
    if (user?.semester) {
      setSelectedSemester(Number(user.semester));
    }
  }, [user?.branch, user?.semester]);

  useEffect(() => {
    fetchSchedule(selectedBranch, selectedSemester);
  }, [selectedBranch, selectedSemester, isOnline]);

  const handleBranchChange = (e) => {
    const val = e.target.value;
    setSelectedBranch(val);
  };

  const handleSemesterChange = (e) => {
    const val = Number(e.target.value);
    setSelectedSemester(val);
  };

  // Custom IMS Timetable Importer
  const handleImportIMS = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.schedule) {
        alert('JSON must contain a "schedule" object with days (Monday, Tuesday, etc.)');
        return;
      }
      const key = `${selectedBranch}_${selectedSemester}`;
      const storageKey = `nsut_connect_timetable_${key}`;
      storage.set(storageKey, parsed);
      setTimetableData(parsed);
      setImportSuccessMsg(`Imported timetable for ${selectedBranch} Sem ${selectedSemester} successfully!`);
      setTimeout(() => {
        setImportSuccessMsg('');
        setShowImporter(false);
      }, 2000);
    } catch (err) {
      alert('Invalid JSON format. Please paste valid JSON matching the timetable schema.');
    }
  };

  const scheduleForDay = timetableData?.schedule?.[activeDay] || [];

  return (
    <div>
      {/* Header & Offline Sync Status */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--foreground)' }}>
              Campus Timetable
            </h1>
            <span className="badge badge-success" style={{ gap: '0.35rem' }}>
              <CheckCircle2 size={13} /> Offline Stored
            </span>
          </div>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Powered by NSUT IMS • Synchronized locally for instant access across campus.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={() => setShowImporter(!showImporter)}
            className="btn btn-secondary btn-sm"
            style={{ gap: '0.4rem', fontFamily: 'var(--font-mono)' }}
          >
            <UploadCloud size={14} />
            <span>Import from IMS</span>
          </button>

          <div className="glass-card" style={{ padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
            <Database size={14} color={isFromCache ? 'var(--chart-4)' : '#15803d'} />
            <span style={{ fontFamily: 'var(--font-mono)', color: isFromCache ? 'var(--chart-5)' : '#15803d' }}>
              {isFromCache ? 'Local Device Cache' : 'Live IMS Sync'}
            </span>
          </div>
        </div>
      </div>

      {/* IMS Raw Importer Modal / Card */}
      {showImporter && (
        <div className="glass-card" style={{ marginBottom: '1.5rem', borderColor: 'var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <FileCode size={18} color="var(--primary)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
              Import Routine from NSUT IMS (JSON / CSV Format)
            </h2>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', marginBottom: '0.75rem' }}>
            Paste the timetable routine extracted from <strong>ims.nsut.ac.in</strong> for <strong>{selectedBranch} - Semester {selectedSemester}</strong>:
          </p>

          <textarea 
            rows="6"
            className="input-field mono"
            placeholder={`{\n  "branch": "${selectedBranch}",\n  "semester": ${selectedSemester},\n  "schedule": {\n    "Monday": [\n      { "time": "09:00 - 10:00", "subject": "Operating Systems", "faculty": "Prof. Saxena", "room": "SPS-02", "type": "Lecture" }\n    ]\n  }\n}`}
            value={importJsonText}
            onChange={e => setImportJsonText(e.target.value)}
            style={{ fontSize: '0.8rem', resize: 'vertical', marginBottom: '0.75rem' }}
          />

          {importSuccessMsg && (
            <div style={{ color: '#15803d', fontSize: '0.85rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={16} /> <span>{importSuccessMsg}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowImporter(false)} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button onClick={handleImportIMS} className="btn btn-primary btn-sm">
              Save to Device Cache
            </button>
          </div>
        </div>
      )}

      {/* Branch & Semester Selector Bar */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1rem 1.5rem', 
          marginBottom: '1.5rem',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Branch Picker */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.25rem' }}>
              Academic Branch
            </label>
            <select 
              value={selectedBranch} 
              onChange={handleBranchChange}
              className="input-field"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', width: 'auto', minWidth: '220px' }}
            >
              {branches.map(b => (
                <option key={b.code} value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Semester Picker */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.25rem' }}>
              Semester
            </label>
            <select 
              value={selectedSemester} 
              onChange={handleSemesterChange}
              className="input-field"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', width: 'auto', minWidth: '130px' }}
            >
              {semesters.map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--foreground)' }}>
            {selectedBranch} • Sem {selectedSemester}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
            Automatic Offline Cache Ready
          </div>
        </div>
      </div>

      {/* Day Selector Navigation */}
      <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {days.map(day => {
          const isSelected = activeDay === day;
          const isCurrentDay = todayName === day;

          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: 'var(--radius)',
                padding: '0.55rem 1.35rem',
                fontSize: '0.85rem',
                position: 'relative'
              }}
            >
              {day}
              {isCurrentDay && (
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '-3px', 
                    right: '-3px', 
                    width: '9px', 
                    height: '9px', 
                    borderRadius: '50%', 
                    background: '#15803d',
                    border: '2px solid var(--background)'
                  }} 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Period Schedule Cards with Asymmetric Borders */}
      {loading ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
          Retrieving {selectedBranch} Semester {selectedSemester} routine from device database...
        </div>
      ) : scheduleForDay.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
          No lectures scheduled for {activeDay} ({selectedBranch} Sem {selectedSemester}). Enjoy your day!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {scheduleForDay.map((period, index) => {
            const isBreak = period.type === 'Break';
            const isLab = period.type === 'Lab';

            return (
              <div 
                key={index}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.75rem',
                  borderLeft: isBreak 
                    ? '5px solid var(--chart-4)' 
                    : isLab 
                      ? '5px solid var(--chart-3)' 
                      : '5px solid var(--primary)',
                  backgroundColor: isBreak ? 'var(--secondary)' : 'var(--card)'
                }}
              >
                {/* Time & Subject */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{
                    minWidth: '130px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--muted-foreground)',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <Clock size={16} color="var(--primary)" />
                    <span>{period.time}</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <h2 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--foreground)' }}>
                        {period.subject}
                      </h2>
                      <span className={`badge ${
                        isBreak ? 'badge-warning' : isLab ? 'badge-primary' : 'badge-info'
                      }`}>
                        {period.type}
                      </span>
                    </div>

                    {!isBreak && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.35rem', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <UserCheck size={14} /> {period.faculty}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <MapPin size={14} /> {period.room}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Badge Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isLab ? (
                    <span className="badge badge-primary" style={{ gap: '0.3rem' }}>
                      <Laptop size={12} /> Practical Lab
                    </span>
                  ) : isBreak ? (
                    <span className="badge badge-warning" style={{ gap: '0.3rem' }}>
                      <Coffee size={12} /> Recess
                    </span>
                  ) : (
                    <span className="badge badge-info" style={{ gap: '0.3rem' }}>
                      <BookOpen size={12} /> Lecture Hall
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { 
  MessageSquare, 
  Bell, 
  Calendar, 
  User, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Flame,
  Lock
} from 'lucide-react';
import { useOffline } from '../context/OfflineContext';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { isOnline } = useOffline();
  const { isAdmin } = useAuth();

  const navItems = [
    {
      id: 'feed',
      label: 'Campus Feed',
      icon: MessageSquare,
      badge: 'Active'
    },
    {
      id: 'lounge',
      label: 'Student Lounge',
      icon: Flame,
      badge: 'Private 🤫',
      badgeColor: 'badge-warning'
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: Bell,
      badge: 'Official'
    },
    {
      id: 'timetable',
      label: 'Timetable',
      icon: Calendar,
      badge: 'Offline ⚡',
      badgeColor: 'badge-success'
    },
    {
      id: 'profile',
      label: 'Student Profile',
      icon: User,
      badge: null
    }
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside className="sidebar-container desktop-only">
        {/* Brand Header */}
        <div style={{ 
          padding: '1.25rem 1.25rem 0.65rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          borderBottom: '1px solid var(--sidebar-border)',
          marginBottom: '0.75rem'
        }}>
          <img 
            src="/logo.jpg" 
            alt="NSUT Connect Logo" 
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '2px solid var(--sidebar-border)'
            }} 
          />
          <div>
            <div className="brand-title" style={{ fontSize: '1.2rem', color: 'var(--sidebar-foreground)' }}>
              NSUT CONNECT
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted-foreground)' }}>
              Student Community Portal
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          <div style={{ 
            fontSize: '0.7rem', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            color: 'var(--muted-foreground)',
            letterSpacing: '0.05em',
            paddingLeft: '0.75rem',
            marginBottom: '0.4rem',
            fontFamily: 'var(--font-mono)'
          }}>
            Navigation
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.95rem',
                  borderRadius: 'var(--radius)',
                  border: 'none',
                  background: isActive ? 'var(--sidebar-accent)' : 'transparent',
                  color: isActive ? 'var(--sidebar-accent-foreground)' : 'var(--sidebar-foreground)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  width: '100%',
                  fontWeight: isActive ? '700' : '500',
                  borderLeft: isActive ? '3.5px solid var(--sidebar-primary)' : '3.5px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? 'var(--sidebar-primary)' : 'var(--muted-foreground)'} />
                  <span style={{ fontSize: '0.88rem' }}>{item.label}</span>
                </div>

                {item.badge && (
                  <span 
                    className={`badge ${item.badgeColor || (isActive ? 'badge-primary' : 'badge-info')}`}
                    style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem' }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Offline Ready Banner in Sidebar */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--sidebar-border)' }}>
          <div 
            className="glass-card" 
            style={{ 
              padding: '1rem', 
              background: 'var(--card)',
              borderColor: 'var(--border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <CheckCircle2 size={16} color="#15803d" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#15803d' }}>
                Offline Shield Active
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', lineHeight: '1.4' }}>
              Your timetable and saved notices remain cached on-device for zero-latency campus access.
            </p>
          </div>

          {/* Campus Location Tag */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            marginTop: '0.85rem',
            fontSize: '0.7rem',
            color: 'var(--muted-foreground)',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)'
          }}>
            <MapPin size={12} />
            <span>Dwarka Sector-3, New Delhi</span>
          </div>
        </div>
      </aside>

      {/* Mobile Sticky Bottom Navigation Dock */}
      <nav className="mobile-bottom-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <div style={{ position: 'relative' }}>
                <Icon size={20} color={isActive ? 'var(--primary)' : 'var(--muted-foreground)'} />
                {item.id === 'lounge' && (
                  <span style={{ 
                    position: 'absolute', 
                    top: -2, 
                    right: -4, 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    background: '#f59e0b' 
                  }} />
                )}
                {item.id === 'timetable' && (
                  <span style={{ 
                    position: 'absolute', 
                    top: -2, 
                    right: -4, 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    background: '#10b981' 
                  }} />
                )}
              </div>
              <span style={{ fontSize: '0.66rem', marginTop: '2px' }}>
                {item.id === 'announcements' ? 'Notices' : item.id === 'lounge' ? 'Lounge' : item.id === 'timetable' ? 'Routine' : item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

import React from 'react';
import { WifiOff, Database } from 'lucide-react';
import { useOffline } from '../context/OfflineContext';

export const OfflineBanner = () => {
  const { isOnline, simulateOffline, toggleSimulation } = useOffline();

  if (isOnline) return null;

  return (
    <div style={{
      background: 'var(--accent)',
      borderBottom: '2px solid var(--border)',
      padding: '0.65rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      fontSize: '0.85rem',
      color: 'var(--chart-5)',
      position: 'sticky',
      top: '72px',
      zIndex: 25
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <WifiOff size={16} />
        <span>
          <strong>Offline Mode Active:</strong> Browsing local on-device cache. Timetables & announcements remain fully accessible!
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span className="badge badge-warning" style={{ gap: '0.3rem' }}>
          <Database size={12} /> LocalStorage Sync
        </span>
        {simulateOffline && (
          <button 
            onClick={toggleSimulation}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--border)' }}
          >
            Disable Simulation
          </button>
        )}
      </div>
    </div>
  );
};

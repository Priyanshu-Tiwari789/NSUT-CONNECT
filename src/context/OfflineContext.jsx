/**
 * OfflineContext.jsx
 * 
 * Manages real-time network connectivity status.
 * Listens to native browser events 'online' and 'offline',
 * and provides a manual simulation switch so you can test offline mode instantly.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const OfflineContext = createContext();

export const OfflineProvider = ({ children }) => {
  const [isBrowserOnline, setIsBrowserOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [simulateOffline, setSimulateOffline] = useState(false);
  const [lastOnlineTime, setLastOnlineTime] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => {
      setIsBrowserOnline(true);
      setLastOnlineTime(new Date());
    };

    const handleOffline = () => {
      setIsBrowserOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Effective status considers both real network and user simulation
  const effectiveIsOnline = isBrowserOnline && !simulateOffline;

  const toggleSimulation = () => {
    setSimulateOffline(prev => !prev);
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline: effectiveIsOnline,
        isBrowserOnline,
        simulateOffline,
        toggleSimulation,
        lastOnlineTime
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

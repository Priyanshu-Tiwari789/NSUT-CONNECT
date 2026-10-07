/**
 * storage.js - Local Storage Abstraction Layer
 * 
 * Provides fail-safe persistence for offline capabilities.
 * Any data retrieved from our API is saved here. If the user disconnects,
 * the app reads from this cache seamlessly.
 */

const STORAGE_KEYS = {
  USER: 'nsut_connect_user',
  FEED: 'nsut_connect_feed',
  ANNOUNCEMENTS: 'nsut_connect_announcements',
  TIMETABLE: 'nsut_connect_timetable',
  OFFLINE_QUEUE: 'nsut_connect_offline_mutation_queue'
};

export const storage = {
  // Save data with timestamp metadata
  set: (key, data) => {
    try {
      const payload = {
        data,
        cachedAt: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (err) {
      console.warn(`[Storage Error] Could not write ${key}:`, err);
    }
  },

  // Retrieve cached data
  get: (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`[Storage Error] Could not read ${key}:`, err);
      return null;
    }
  },

  // Remove specific key
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`[Storage Error] Could not remove ${key}:`, err);
    }
  },

  // Clear all NSUT Connect keys
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  },

  KEYS: STORAGE_KEYS
};

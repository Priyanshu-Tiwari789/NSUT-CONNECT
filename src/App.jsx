import React, { useState } from 'react';
import { OfflineProvider } from './context/OfflineContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OfflineBanner } from './components/OfflineBanner';
import { LoginModal } from './components/LoginModal';

import { Feed } from './pages/Feed';
import { StudentLounge } from './pages/StudentLounge';
import { Announcements } from './pages/Announcements';
import { Timetable } from './pages/Timetable';
import { Profile } from './pages/Profile';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('feed');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main App Content Area */}
      <div className="main-content">
        <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
        <OfflineBanner />

        <main className="page-wrapper">
          {activeTab === 'feed' && <Feed />}
          {activeTab === 'lounge' && <StudentLounge />}
          {activeTab === 'announcements' && <Announcements />}
          {activeTab === 'timetable' && <Timetable />}
          {activeTab === 'profile' && <Profile />}
        </main>
      </div>

      {/* Google SSO Login Modal */}
      <LoginModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <OfflineProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </OfflineProvider>
  );
}

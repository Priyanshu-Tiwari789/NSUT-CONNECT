import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  Pin, 
  Calendar, 
  FileText, 
  Plus, 
  Search, 
  CheckCircle,
  Database
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';

export const Announcements = () => {
  const { isAdmin } = useAuth();
  const { isOnline } = useOffline();
  
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFromCache, setIsFromCache] = useState(false);

  // New Notice Composer State (Admin only)
  const [showCompose, setShowCompose] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Exams');
  const [newContent, setNewContent] = useState('');
  const [newPriority, setNewPriority] = useState('high');

  const categories = ['All', 'Exams', 'Placements', 'Events', 'Administration'];

  const loadNotices = async () => {
    setLoading(true);
    try {
      const res = await api.getAnnouncements();
      setAnnouncements(res.data);
      setIsFromCache(res.fromCache);
    } catch (err) {
      console.error('Failed to load notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, [isOnline]);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const payload = {
      title: newTitle,
      category: newCategory,
      issuedBy: 'Office of Dean Academics (Admin)',
      isAdmin: true,
      priority: newPriority,
      content: newContent,
      pinned: true
    };

    const res = await api.createAnnouncement(payload);
    if (res.success) {
      setNewTitle('');
      setNewContent('');
      setShowCompose(false);
      loadNotices();
    }
  };

  const filtered = announcements.filter(item => {
    const matchesCat = filterCategory === 'All' || item.category === filterCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--foreground)' }}>
              Official Campus Notices
            </h1>
            <span className="badge badge-primary">Verified NSUT</span>
          </div>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Authoritative notifications from Dean Academics, T&P, and University Administration.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAdmin && (
            <button 
              onClick={() => setShowCompose(!showCompose)} 
              className="btn btn-primary"
              style={{ gap: '0.4rem' }}
            >
              <Plus size={16} />
              <span>{showCompose ? 'Cancel Post' : 'Issue Official Notice'}</span>
            </button>
          )}

          <div className="glass-card" style={{ padding: '0.5rem 0.9rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={14} color={isFromCache ? 'var(--chart-4)' : '#15803d'} />
            <span style={{ color: isFromCache ? 'var(--chart-5)' : '#15803d' }}>
              {isFromCache ? 'Cached Local Storage' : 'Live Sync'}
            </span>
          </div>
        </div>
      </div>

      {/* Admin Composer Panel */}
      {isAdmin && showCompose && (
        <form onSubmit={handleCreateNotice} className="glass-card" style={{ marginBottom: '1.75rem', borderColor: 'var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
            <ShieldAlert size={18} />
            <h2 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Publish Official University Notice</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>Notice Title</label>
              <input 
                type="text" 
                placeholder="e.g., End-Term Exam Registration Deadline"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>Category</label>
              <select 
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value)}
                className="input-field"
              >
                <option value="Exams">Exams</option>
                <option value="Placements">Placements</option>
                <option value="Events">Events</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>Priority Level</label>
              <select 
                value={newPriority} 
                onChange={e => setNewPriority(e.target.value)}
                className="input-field"
              >
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
                <option value="medium">Medium</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>Official Circular Body</label>
            <textarea 
              rows="3" 
              placeholder="Detail the circular contents and requirements..."
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setShowCompose(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Publish Notice to Campus
            </button>
          </div>
        </form>
      )}

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: 'var(--muted-foreground)' }} />
          <input 
            type="text"
            placeholder="Search circulars, exam notices, placements..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List with Asymmetric Borders */}
      {loading ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
          Retrieving notices from campus servers...
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
          No announcements match your search criteria.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filtered.map(notice => {
            const isUrgent = notice.priority === 'urgent';
            const isHigh = notice.priority === 'high';

            return (
              <article 
                key={notice.id}
                className="glass-card"
                style={{
                  borderLeft: isUrgent 
                    ? '5px solid var(--destructive)' 
                    : isHigh 
                      ? '5px solid var(--chart-4)' 
                      : '5px solid var(--primary)',
                  position: 'relative'
                }}
              >
                {/* Meta details header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span className={`badge ${
                      notice.category === 'Exams' ? 'badge-primary' : 
                      notice.category === 'Placements' ? 'badge-success' : 'badge-info'
                    }`}>
                      {notice.category}
                    </span>

                    {notice.pinned && (
                      <span className="badge badge-warning" style={{ gap: '0.25rem' }}>
                        <Pin size={11} /> Pinned
                      </span>
                    )}

                    {isUrgent && (
                      <span className="badge" style={{ backgroundColor: 'rgba(153, 27, 27, 0.15)', color: 'var(--destructive)', border: '1px solid var(--destructive)' }}>
                        URGENT
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
                    <Calendar size={13} />
                    <span>{notice.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--foreground)' }}>
                  {notice.title}
                </h2>

                {/* Body Content */}
                <p style={{ color: 'var(--foreground)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem', opacity: 0.9 }}>
                  {notice.content}
                </p>

                {/* Footer Authority & Attachments */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  borderTop: '1.5px solid var(--border)', 
                  paddingTop: '0.75rem', 
                  fontSize: '0.8rem',
                  color: 'var(--muted-foreground)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="#15803d" />
                    <span>Issued by: <strong>{notice.issuedBy}</strong></span>
                  </div>

                  {notice.attachments && notice.attachments.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)' }}>
                      <FileText size={14} />
                      <span>{notice.attachments[0]}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

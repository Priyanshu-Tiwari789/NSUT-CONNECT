import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldAlert, 
  Flame, 
  Heart, 
  MessageCircle, 
  Send, 
  Sparkles, 
  EyeOff, 
  ShieldCheck, 
  Frown, 
  Coffee, 
  Zap, 
  HelpCircle,
  AlertOctagon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';

const INITIAL_RANTS = [
  {
    id: 'rant_1',
    alias: 'Burned-Out 3rd Year',
    isAnonymous: true,
    timestamp: '25 mins ago',
    mood: '😫 Stressed',
    tag: 'Academic Pressure & SGPA',
    content: "Why do professors announce 2 surprise quizzes on the same day we have 6 hours of lab files due? I haven't slept more than 4 hours all week. Just needed to let this out because if I don't vent, I'll explode.",
    reactions: { hug: 34, feltThis: 28, real: 41 },
    userReacted: null,
    comments: [
      { id: 'rc_1', author: 'ECE Hostelite', text: 'You are not alone bro. Block 6 lab faculty is doing the exact same thing to us.', time: '18 mins ago' },
      { id: 'rc_2', author: 'Anonymous Junior', text: 'Hang in there! Mid sems will be over before you know it 🫂', time: '10 mins ago' }
    ]
  },
  {
    id: 'rant_2',
    alias: 'Anonymous 2024 Batch',
    isAnonymous: true,
    timestamp: '2 hours ago',
    mood: '😤 Frustrated',
    tag: 'Placement & Intern Vents',
    content: "Cleared 3 rounds of OA, solved both LC Hard questions in 25 mins, and got rejected without any technical interview round. The job market this season is mentally draining. To anyone feeling like an imposter today: your worth is not defined by an automated screening email.",
    reactions: { hug: 62, feltThis: 55, real: 89 },
    userReacted: null,
    comments: [
      { id: 'rc_3', author: 'Fellow Placed Senior', text: 'Keep your chin up. I had 11 rejections before landing my dream offer. Your turn will come!', time: '1 hour ago' }
    ]
  },
  {
    id: 'rant_3',
    alias: 'Day Scholar Struggler',
    isAnonymous: true,
    timestamp: '5 hours ago',
    mood: '☕ Surviving',
    tag: 'Hostel & Mess Confessions',
    content: "Can we talk about the Blue Line metro commute at 8 AM in summer/monsoon just to attend a 75% attendance mandatory lecture where the slides are read verbatim? Nescafe maggi is the only thing keeping my sanity alive right now.",
    reactions: { hug: 19, feltThis: 43, real: 37 },
    userReacted: null,
    comments: []
  }
];

export const StudentLounge = () => {
  const { user, isAdmin } = useAuth();
  const [rants, setRants] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('Academic Pressure & SGPA');
  const [selectedMood, setSelectedMood] = useState('😫 Stressed');
  const [postAnonymously, setPostAnonymously] = useState(true);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  const STORAGE_KEY = 'nsut_connect_student_rants';

  useEffect(() => {
    const cached = storage.get(STORAGE_KEY);
    if (cached?.data) {
      setRants(cached.data);
    } else {
      setRants(INITIAL_RANTS);
      storage.set(STORAGE_KEY, INITIAL_RANTS);
    }
  }, []);

  // Strict Security Barrier: Admins & Faculty CANNOT view this room
  if (isAdmin) {
    return (
      <div 
        className="glass-card" 
        style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          borderColor: 'var(--destructive)',
          background: 'linear-gradient(180deg, rgba(153, 27, 27, 0.08) 0%, var(--card) 100%)',
          maxWidth: '700px',
          margin: '2rem auto'
        }}
      >
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(153, 27, 27, 0.15)',
          color: 'var(--destructive)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid var(--destructive)'
        }}>
          <Lock size={36} />
        </div>

        <h1 style={{ fontSize: '1.65rem', fontWeight: '700', color: 'var(--destructive)', marginBottom: '0.75rem' }}>
          Confidential Student Sanctuary
        </h1>

        <p style={{ fontSize: '1rem', color: 'var(--foreground)', fontWeight: '600', marginBottom: '0.5rem' }}>
          Faculty & Administration Access Strictly Prohibited
        </p>

        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 2rem' }}>
          This section is a private, zero-surveillance peer-to-peer safe space created solely for verified students to express genuine thoughts, rants, and emotional struggles without fear of academic penalty or administrative observation.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius)',
          background: 'var(--muted)',
          fontSize: '0.78rem',
          color: 'var(--muted-foreground)',
          fontFamily: 'var(--font-mono)'
        }}>
          <ShieldAlert size={14} color="var(--destructive)" />
          <span>Role Restricted: ADMIN_LEVEL_RESTRICTED (Code 403-STUDENT_ONLY)</span>
        </div>
      </div>
    );
  }

  // Student post submission
  const handleCreateRant = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const aliases = ['Night Owl Hostelite', 'Anonymous Coder', 'Surviving 3rd Year', 'Quiet Thinker', 'Campus Wanderer', 'Day Scholar 2025'];
    const randomAlias = aliases[Math.floor(Math.random() * aliases.length)];

    const newRant = {
      id: `rant_${Date.now()}`,
      alias: postAnonymously ? randomAlias : (user?.name || 'Fellow Student'),
      isAnonymous: postAnonymously,
      timestamp: 'Just now',
      mood: selectedMood,
      tag: selectedTag,
      content: newContent,
      reactions: { hug: 0, feltThis: 0, real: 0 },
      userReacted: null,
      comments: []
    };

    const updated = [newRant, ...rants];
    setRants(updated);
    storage.set(STORAGE_KEY, updated);
    setNewContent('');
  };

  const handleReact = (rantId, type) => {
    const updated = rants.map(r => {
      if (r.id === rantId) {
        const reactions = { ...r.reactions };
        if (r.userReacted === type) {
          reactions[type] = Math.max(0, reactions[type] - 1);
          return { ...r, reactions, userReacted: null };
        } else {
          if (r.userReacted) {
            reactions[r.userReacted] = Math.max(0, reactions[r.userReacted] - 1);
          }
          reactions[type] = (reactions[type] || 0) + 1;
          return { ...r, reactions, userReacted: type };
        }
      }
      return r;
    });
    setRants(updated);
    storage.set(STORAGE_KEY, updated);
  };

  const handleAddComment = (rantId) => {
    if (!commentInput.trim()) return;
    const updated = rants.map(r => {
      if (r.id === rantId) {
        const comments = r.comments || [];
        comments.push({
          id: `rc_${Date.now()}`,
          author: 'Anonymous Student',
          text: commentInput.trim(),
          time: 'Just now'
        });
        return { ...r, comments };
      }
      return r;
    });
    setRants(updated);
    storage.set(STORAGE_KEY, updated);
    setCommentInput('');
    setActiveCommentId(null);
  };

  const tags = [
    'Academic Pressure & SGPA',
    'Placement & Intern Vents',
    'Hostel & Mess Confessions',
    'Sleep Deprivation / 8 AM Labs',
    'Campus Social & Relationships',
    'Wholesome Support'
  ];

  const moods = [
    '😫 Stressed',
    '😤 Frustrated',
    '🥺 Vulnerable',
    '☕ Surviving',
    '🥳 Small Win'
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: '700', color: 'var(--foreground)' }}>
            Student Lounge & Unfiltered Rants
          </h1>
          <span className="badge badge-warning" style={{ gap: '0.35rem' }}>
            <EyeOff size={12} /> Confidential • Students Only
          </span>
        </div>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
          A private sanctuary where students can speak candidly, share raw emotions, and support each other. Zero faculty or admin access.
        </p>
      </div>

      {/* Rant Composer */}
      <form onSubmit={handleCreateRant} className="glass-card" style={{ marginBottom: '2rem', borderColor: 'var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--foreground)' }}>How are you feeling?</span>
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
              {moods.map(m => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className={`btn btn-sm ${selectedMood === m ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Anonymous Toggle */}
          <button
            type="button"
            onClick={() => setPostAnonymously(!postAnonymously)}
            className="btn btn-secondary btn-sm"
            style={{ 
              gap: '0.4rem', 
              fontSize: '0.75rem',
              borderColor: postAnonymously ? 'var(--primary)' : 'var(--border)',
              color: postAnonymously ? 'var(--primary)' : 'var(--foreground)'
            }}
          >
            <EyeOff size={13} />
            <span>{postAnonymously ? 'Posting Anonymously 🎭' : 'Public Handle'}</span>
          </button>
        </div>

        <textarea 
          rows="3"
          placeholder="Vent, speak your mind, or share what's weighing on you right now. No filters, no judgment..."
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          className="input-field"
          style={{ resize: 'vertical', marginBottom: '0.85rem' }}
          required
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Topic:</span>
            <select 
              value={selectedTag} 
              onChange={e => setSelectedTag(e.target.value)}
              className="input-field"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}
            >
              {tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-sm" style={{ gap: '0.4rem' }}>
            <Send size={14} />
            <span>Drop In Lounge</span>
          </button>
        </div>
      </form>

      {/* Rants Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {rants.map(rant => {
          const isCommentsOpen = activeCommentId === rant.id;

          return (
            <article key={rant.id} className="glass-card">
              {/* Top metadata */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'var(--muted)',
                    border: '1.5px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>
                    🎭
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--foreground)' }}>
                        {rant.alias}
                      </span>
                      <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>
                        {rant.mood}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                      {rant.timestamp} • {rant.tag}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rant Content */}
              <p style={{ color: 'var(--foreground)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                {rant.content}
              </p>

              {/* Empathy Reactions */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                borderTop: '1.5px solid var(--border)', 
                paddingTop: '0.85rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleReact(rant.id, 'hug')}
                    className="btn btn-secondary btn-sm"
                    style={{ 
                      fontSize: '0.75rem', 
                      gap: '0.35rem',
                      borderColor: rant.userReacted === 'hug' ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    <span>🫂 Hug</span>
                    <strong>{rant.reactions.hug}</strong>
                  </button>

                  <button 
                    onClick={() => handleReact(rant.id, 'feltThis')}
                    className="btn btn-secondary btn-sm"
                    style={{ 
                      fontSize: '0.75rem', 
                      gap: '0.35rem',
                      borderColor: rant.userReacted === 'feltThis' ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    <span>💔 Felt This</span>
                    <strong>{rant.reactions.feltThis}</strong>
                  </button>

                  <button 
                    onClick={() => handleReact(rant.id, 'real')}
                    className="btn btn-secondary btn-sm"
                    style={{ 
                      fontSize: '0.75rem', 
                      gap: '0.35rem',
                      borderColor: rant.userReacted === 'real' ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    <span>🔥 Real</span>
                    <strong>{rant.reactions.real}</strong>
                  </button>
                </div>

                <button 
                  onClick={() => setActiveCommentId(isCommentsOpen ? null : rant.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ gap: '0.4rem', fontSize: '0.78rem' }}
                >
                  <MessageCircle size={15} />
                  <span>{rant.comments?.length || 0} Peer Replies</span>
                </button>
              </div>

              {/* Peer Comments Section */}
              {isCommentsOpen && (
                <div style={{ marginTop: '1rem', borderTop: '1.5px solid var(--border)', paddingTop: '1rem' }}>
                  {rant.comments && rant.comments.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '0.85rem' }}>
                      {rant.comments.map(c => (
                        <div 
                          key={c.id} 
                          style={{ 
                            background: 'var(--muted)', 
                            padding: '0.75rem 1rem', 
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            fontSize: '0.85rem'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                            <strong style={{ fontSize: '0.8rem', color: 'var(--foreground)' }}>{c.author}</strong>
                            <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>{c.time}</span>
                          </div>
                          <p style={{ color: 'var(--foreground)' }}>{c.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text"
                      placeholder="Offer comfort or reply anonymously..."
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                      className="input-field"
                      style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
                      onKeyDown={e => { if (e.key === 'Enter') handleAddComment(rant.id); }}
                    />
                    <button onClick={() => handleAddComment(rant.id)} className="btn btn-primary btn-sm">
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

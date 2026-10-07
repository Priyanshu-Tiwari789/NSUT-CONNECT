import React, { useState, useEffect } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  User, 
  Tag,
  CornerDownRight
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth, getOfflineAvatar } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';

export const Feed = () => {
  const { user } = useAuth();
  const { isOnline } = useOffline();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostText, setNewPostText] = useState('');
  const [postCategory, setPostCategory] = useState('Campus Life');
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  const loadFeed = async () => {
    setLoading(true);
    try {
      const res = await api.getFeedPosts();
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [isOnline]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostText.trim() || !user) return;

    await api.createPost({
      content: newPostText,
      category: postCategory
    }, user);

    setNewPostText('');
    loadFeed();
  };

  const handleUpvote = async (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const hasUpvoted = !p.hasUpvoted;
        return {
          ...p,
          hasUpvoted,
          upvotes: hasUpvoted ? p.upvotes + 1 : p.upvotes - 1
        };
      }
      return p;
    }));

    await api.upvotePost(postId);
  };

  const handleAddComment = async (postId) => {
    if (!commentInput.trim() || !user) return;
    const res = await api.addComment(postId, commentInput, user);
    if (res.success) {
      setPosts(res.posts);
      setCommentInput('');
      setActiveCommentBox(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--foreground)' }}>
          Campus Community Feed
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>
          Connect with peers across branches, discover tech clubs, and exchange project ideas.
        </p>
      </div>

      {/* Create Post Card with Asymmetric Border */}
      {user && (
        <form onSubmit={handleCreatePost} className="glass-card" style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
            <img 
              src={user.avatar || getOfflineAvatar(user.name)} 
              alt={user.name} 
              style={{ 
                width: '44px', 
                height: '44px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '1.5px solid var(--primary)',
                background: 'var(--card)'
              }} 
            />
            <div style={{ flex: 1 }}>
              <textarea 
                rows="3"
                placeholder={`What's on your mind at NSUT, ${user.name.split(' ')[0]}?`}
                value={newPostText}
                onChange={e => setNewPostText(e.target.value)}
                className="input-field"
                style={{ resize: 'none' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={15} color="var(--muted-foreground)" />
              <select 
                value={postCategory}
                onChange={e => setPostCategory(e.target.value)}
                className="input-field"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'auto' }}
              >
                <option value="Campus Life">Campus Life</option>
                <option value="Coding Club">Coding Club</option>
                <option value="Workshop">Workshop</option>
                <option value="Placements">Placements Q&A</option>
                <option value="Academics">Academics</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-sm" style={{ gap: '0.4rem' }}>
              <Send size={14} />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      )}

      {/* Feed Stream */}
      {loading ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
          Loading community threads...
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
          No posts in the feed yet. Be the first to start a conversation!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {posts.map(post => {
            const isCommentsOpen = activeCommentBox === post.id;

            return (
              <article key={post.id} className="glass-card">
                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img 
                      src={post.author.avatar || getOfflineAvatar(post.author.name)} 
                      alt={post.author.name} 
                      style={{ 
                        width: '42px', 
                        height: '42px', 
                        borderRadius: '50%', 
                        objectFit: 'cover',
                        border: '1.5px solid var(--border)',
                        background: 'var(--card)'
                      }} 
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <h2 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--foreground)' }}>
                          {post.author.name}
                        </h2>
                        {post.author.isAdmin && (
                          <span className="badge badge-primary" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>
                            <ShieldCheck size={11} /> Verified
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                        {post.author.rollNo} • {post.author.branch} • {post.timestamp}
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-info">{post.category}</span>
                </div>

                {/* Content */}
                <p style={{ color: 'var(--foreground)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {post.content}
                </p>

                {/* Action Bar */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  borderTop: '1.5px solid var(--border)', 
                  paddingTop: '0.85rem' 
                }}>
                  <button 
                    onClick={() => handleUpvote(post.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ 
                      color: post.hasUpvoted ? 'var(--primary)' : 'var(--muted-foreground)',
                      gap: '0.4rem',
                      background: post.hasUpvoted ? 'var(--accent)' : 'transparent'
                    }}
                  >
                    <ThumbsUp size={16} />
                    <span>{post.upvotes} Upvotes</span>
                  </button>

                  <button 
                    onClick={() => setActiveCommentBox(isCommentsOpen ? null : post.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ gap: '0.4rem' }}
                  >
                    <MessageSquare size={16} />
                    <span>{post.commentsCount || (post.comments ? post.comments.length : 0)} Comments</span>
                  </button>
                </div>

                {/* Comment Section Expansion */}
                {isCommentsOpen && (
                  <div style={{ marginTop: '1rem', borderTop: '1.5px solid var(--border)', paddingTop: '1rem' }}>
                    {/* Existing Comments */}
                    {post.comments && post.comments.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                        {post.comments.map(c => (
                          <div 
                            key={c.id} 
                            style={{ 
                              background: 'var(--muted)', 
                              padding: '0.75rem', 
                              borderRadius: 'var(--radius)',
                              fontSize: '0.85rem',
                              border: '1px solid var(--border)'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                              <strong style={{ color: 'var(--foreground)' }}>{c.author}</strong>
                              <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>{c.time}</span>
                            </div>
                            <p style={{ color: 'var(--foreground)' }}>{c.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '0.75rem' }}>
                        No comments yet. Start the discussion!
                      </p>
                    )}

                    {/* New Comment Input */}
                    {user && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text"
                          placeholder="Write a reply..."
                          value={commentInput}
                          onChange={e => setCommentInput(e.target.value)}
                          className="input-field"
                          style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
                          onKeyDown={e => { if (e.key === 'Enter') handleAddComment(post.id); }}
                        />
                        <button 
                          onClick={() => handleAddComment(post.id)}
                          className="btn btn-primary btn-sm"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

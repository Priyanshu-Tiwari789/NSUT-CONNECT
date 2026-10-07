/**
 * api.js - Centralized API Service Layer with Multi-Branch Support & Offline-First Fallback
 */

import { storage } from './storage';
import { 
  INITIAL_USER, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_FEED_POSTS, 
  TIMETABLE_DATA,
  ALL_BRANCH_TIMETABLES
} from '../data/mockData';

const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

const isOnline = () => {
  if (typeof window !== 'undefined' && 'onLine' in navigator) {
    return navigator.onLine;
  }
  return true;
};

export const api = {
  // 1. Fetch Official Announcements
  getAnnouncements: async () => {
    if (!isOnline()) {
      const cached = storage.get(storage.KEYS.ANNOUNCEMENTS);
      if (cached) {
        return { data: cached.data, fromCache: true, cachedAt: cached.cachedAt };
      }
      return { data: INITIAL_ANNOUNCEMENTS, fromCache: true, cachedAt: new Date().toISOString() };
    }

    await delay(250);
    const cached = storage.get(storage.KEYS.ANNOUNCEMENTS);
    const announcements = cached ? cached.data : INITIAL_ANNOUNCEMENTS;
    storage.set(storage.KEYS.ANNOUNCEMENTS, announcements);
    return { data: announcements, fromCache: false };
  },

  // 2. Publish New Announcement (Admin only)
  createAnnouncement: async (announcement) => {
    const cached = storage.get(storage.KEYS.ANNOUNCEMENTS);
    const list = cached ? cached.data : [...INITIAL_ANNOUNCEMENTS];
    
    const newRecord = {
      id: `ann_${Date.now()}`,
      ...announcement,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updated = [newRecord, ...list];
    storage.set(storage.KEYS.ANNOUNCEMENTS, updated);
    
    if (isOnline()) {
      await delay(250);
      return { success: true, data: newRecord, fromCache: false };
    } else {
      return { success: true, data: newRecord, fromCache: true, offlineQueued: true };
    }
  },

  // 3. Fetch Campus Feed
  getFeedPosts: async () => {
    if (!isOnline()) {
      const cached = storage.get(storage.KEYS.FEED);
      if (cached) {
        return { data: cached.data, fromCache: true, cachedAt: cached.cachedAt };
      }
      return { data: INITIAL_FEED_POSTS, fromCache: true, cachedAt: new Date().toISOString() };
    }

    await delay(250);
    const cached = storage.get(storage.KEYS.FEED);
    const posts = cached ? cached.data : INITIAL_FEED_POSTS;
    storage.set(storage.KEYS.FEED, posts);
    return { data: posts, fromCache: false };
  },

  // 4. Create Post in Community Feed
  createPost: async (postData, currentUser) => {
    const cached = storage.get(storage.KEYS.FEED);
    const posts = cached ? cached.data : [...INITIAL_FEED_POSTS];

    const newPost = {
      id: `post_${Date.now()}`,
      author: {
        name: currentUser.name,
        rollNo: currentUser.rollNo,
        branch: currentUser.branch,
        avatar: currentUser.avatar,
        isAdmin: currentUser.role === 'admin'
      },
      category: postData.category || 'General',
      content: postData.content,
      upvotes: 0,
      hasUpvoted: false,
      timestamp: 'Just now',
      commentsCount: 0,
      comments: []
    };

    const updated = [newPost, ...posts];
    storage.set(storage.KEYS.FEED, updated);

    if (isOnline()) {
      await delay(250);
      return { success: true, data: newPost, fromCache: false };
    } else {
      return { success: true, data: newPost, fromCache: true, offlineQueued: true };
    }
  },

  // 5. Upvote a Post
  upvotePost: async (postId) => {
    const cached = storage.get(storage.KEYS.FEED);
    const posts = cached ? [...cached.data] : [...INITIAL_FEED_POSTS];
    
    const target = posts.find(p => p.id === postId);
    if (target) {
      if (target.hasUpvoted) {
        target.upvotes -= 1;
        target.hasUpvoted = false;
      } else {
        target.upvotes += 1;
        target.hasUpvoted = true;
      }
      storage.set(storage.KEYS.FEED, posts);
    }
    
    return { success: true, posts };
  },

  // 6. Add Comment
  addComment: async (postId, text, currentUser) => {
    const cached = storage.get(storage.KEYS.FEED);
    const posts = cached ? [...cached.data] : [...INITIAL_FEED_POSTS];
    
    const target = posts.find(p => p.id === postId);
    if (target) {
      target.comments = target.comments || [];
      target.comments.push({
        id: `c_${Date.now()}`,
        author: currentUser.name,
        text,
        time: 'Just now'
      });
      target.commentsCount = target.comments.length;
      storage.set(storage.KEYS.FEED, posts);
    }

    return { success: true, posts };
  },

  // 7. Get Timetable for specific Branch and Semester
  getTimetable: async (branch = 'COE', semester = 5) => {
    const key = `${branch}_${semester}`;
    const storageKey = `nsut_connect_timetable_${key}`;

    if (!isOnline()) {
      const cached = storage.get(storageKey) || storage.get(storage.KEYS.TIMETABLE);
      if (cached) {
        return { data: cached.data, fromCache: true, cachedAt: cached.cachedAt };
      }
      const fallback = ALL_BRANCH_TIMETABLES[key] || ALL_BRANCH_TIMETABLES["COE_5"];
      return { data: fallback, fromCache: true, cachedAt: new Date().toISOString() };
    }

    await delay(200);
    const cached = storage.get(storageKey);
    let data = cached ? cached.data : null;

    if (!data) {
      if (ALL_BRANCH_TIMETABLES[key]) {
        data = ALL_BRANCH_TIMETABLES[key];
      } else {
        // Dynamic fallback generation for untested branches/semesters
        data = {
          branch: `${branch} Engineering`,
          semester: Number(semester),
          schedule: {
            Monday: [
              { time: "09:00 - 10:00", subject: `${branch} Core Lecture 1`, faculty: "Faculty Dept", room: "SPS-01", type: "Lecture" },
              { time: "10:00 - 11:00", subject: `${branch} Core Lecture 2`, faculty: "Faculty Dept", room: "SPS-01", type: "Lecture" },
              { time: "11:00 - 12:00", subject: "Engineering Elective", faculty: "Dept Lead", room: "SPS-01", type: "Lecture" },
              { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "Nescafe Grounds", type: "Break" },
              { time: "01:00 - 03:00", subject: `${branch} Practical Lab Session`, faculty: "Lab Staff", room: "Block 4", type: "Lab" }
            ],
            Tuesday: [
              { time: "09:00 - 10:00", subject: "Applied Mathematics / Science", faculty: "Prof. Dept", room: "SPS-02", type: "Lecture" },
              { time: "10:00 - 11:00", subject: `${branch} Core Systems`, faculty: "Faculty Dept", room: "SPS-02", type: "Lecture" },
              { time: "11:00 - 01:00", subject: `${branch} Hands-on Workshop`, faculty: "Lab Instructors", room: "Dept Lab", type: "Lab" },
              { time: "01:00 - 02:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
              { time: "02:00 - 03:00", subject: "Technical Communications", faculty: "Faculty", room: "SPS-04", type: "Lecture" }
            ],
            Wednesday: [
              { time: "09:00 - 10:00", subject: `${branch} Core Theory`, faculty: "Faculty", room: "SPS-03", type: "Lecture" },
              { time: "10:00 - 11:00", subject: "Design & Analysis", faculty: "Prof. Lead", room: "SPS-03", type: "Lecture" },
              { time: "11:00 - 12:00", subject: "Industrial Management", faculty: "Faculty", room: "SPS-03", type: "Lecture" },
              { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
              { time: "01:00 - 03:00", subject: "Department Project Guidance", faculty: "Mentors", room: "Project Lab", type: "Activity" }
            ],
            Thursday: [
              { time: "09:00 - 10:00", subject: `${branch} Core Lecture 3`, faculty: "Faculty Dept", room: "SPS-01", type: "Lecture" },
              { time: "10:00 - 11:00", subject: "Advanced Systems", faculty: "Faculty Dept", room: "SPS-01", type: "Lecture" },
              { time: "11:00 - 12:00", subject: "Elective Session", faculty: "Faculty", room: "SPS-04", type: "Lecture" },
              { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
              { time: "02:00 - 04:00", subject: "Seminar & Phase Assessment", faculty: "Panel", room: "Dept Library", type: "Seminar" }
            ],
            Friday: [
              { time: "09:00 - 10:00", subject: `${branch} Core Review`, faculty: "Faculty Dept", room: "SPS-02", type: "Lecture" },
              { time: "10:00 - 11:00", subject: "Engineering Economics", faculty: "Faculty", room: "SPS-02", type: "Lecture" },
              { time: "11:00 - 12:00", subject: "Tutorial & Problem Solving", faculty: "TAs", room: "SPS-02", type: "Lecture" },
              { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
              { time: "01:00 - 03:00", subject: "Society Events & Sports", faculty: "SAC", room: "Main Ground", type: "Activity" }
            ]
          }
        };
      }
    }

    storage.set(storageKey, data);
    storage.set(storage.KEYS.TIMETABLE, data);
    return { data, fromCache: false };
  },

  // 8. User Profile & Authentication
  getUserProfile: async () => {
    const cached = storage.get(storage.KEYS.USER);
    if (cached) {
      return cached.data;
    }
    storage.set(storage.KEYS.USER, INITIAL_USER);
    return INITIAL_USER;
  },

  updateUserProfile: async (updatedUser) => {
    storage.set(storage.KEYS.USER, updatedUser);
    return { success: true, data: updatedUser };
  }
};

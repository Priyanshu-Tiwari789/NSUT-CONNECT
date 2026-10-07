# 🎓 NSUT Connect — Official Campus Community & Offline Timetable Portal

![NSUT Connect Banner](/public/logo.jpg)

**NSUT Connect** is an all-in-one community and academic productivity platform designed specifically for students and faculty of **Netaji Subhas University of Technology (NSUT), Delhi**.

---

## ✨ Key Features

### 📅 1. Offline Campus Timetable (Zero-Data Mode)
* **Automatic Branch & Semester Alignment**: Timetable automatically aligns with the student's enrolled branch (COE, IT, MAC, ECE, EE, ME, ICE, BT) and semester.
* **100% Offline Persistence**: Powered by browser `localStorage` caching. When university Wi-Fi drops on campus, students can still access their daily routine, faculty names, and lecture halls.
* **IMS Timetable Importer**: Built-in importer allowing students and CRs to import fresh schedules directly from `ims.nsut.ac.in`.

### 🔒 2. Confidential "Student Lounge" (Private Safe Space)
* **Role-Based Access Control**: Faculty and Administration accounts are **strictly locked out** with a security barrier.
* **Anonymous Peer Venting (🎭)**: Students can post anonymously with randomly generated aliases (*"Burned-Out 3rd Year"*, *"Night Owl Hostelite"*).
* **Empathy Reactions**: Peer support reactions (`🫂 Hug`, `💔 Felt This`, `🔥 Real`) and anonymous comments.
* **Mood Tags**: Stressed, Frustrated, Vulnerable, Surviving, Small Win.

### 📢 3. Verified Official Announcements Hub
* Direct notices issued by Dean Academics, Training & Placement (T&P) Cell, Exam Cell, and Student Affairs Council (SAC).
* Category filtering (`Exams`, `Placements`, `Events`, `Administration`) and priority badges (`URGENT`, `HIGH`).
* Dedicated Administrative Composer for faculty/admin accounts.

### 💬 4. Campus Community Feed
* Discussion threads tagged by clubs, hackathons, societies (DevComm, IEEE, CSI, Moksha), and campus life.
* Real-time optimistic upvoting and nested peer replies.

### 🆔 5. Student Profile & Attendance Tracker
* Digital Campus ID card featuring photo upload, branch, semester, section, and roll number.
* **75% Mandatory Attendance Compliance Gauge** with course-by-course breakdown and shortage warning alerts.
* Device Cache diagnostics manager with cache clearing & re-sync tools.

### 🔐 6. Google SSO Domain Enforcement
* Access restricted strictly to verified `@nsut.ac.in` university email addresses.
* Role separation: `student` vs `admin` permissions.

---

## 📱 How It Works on Mobile (Responsive & PWA)

1. **Fluid Responsive Grid**: 
   * On mobile screens (< 820px), the sidebar transitions into a clean navigation layout and compact cards tailored for single-handed smartphone use.
2. **Installable as a Mobile App (PWA)**:
   * Open the live site in mobile Chrome or Safari.
   * Tap **Share** (iOS Safari) or the **⋮** menu (Android Chrome) and tap **"Add to Home Screen"**.
   * It installs as an app on your phone with the official NSUT Connect logo icon and runs full-screen without browser address bars!
3. **Campus Offline Resilience**:
   * Saves schedules and notices in device memory so students in underground labs (APJ Block or Block 6) with no signal can still check their lecture rooms immediately.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, JavaScript (ES Modules)
* **Build Tool**: Vite 8
* **Styling**: Vanilla CSS Design Tokens, 8-point asymmetric multiple border-radius geometry, Dark/Parchment dual themes
* **Typography**: Isometra (Brand wordmark), Plus Jakarta Sans (Headings & Body), JetBrains Mono (Metadata/Badges)
* **Icons**: Lucide React
* **Offline Engine**: Browser Storage API & Cache Fallback

---

## 🚀 Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/nsut-connect.git
cd nsut-connect
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to Vercel in 2 Minutes

Vercel provides native, automatic zero-config deployments for Vite + React:

### Method 1: Deploy via GitHub (Recommended)
1. Initialize git and push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete NSUT Connect platform with offline timetable and student lounge"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nsut-connect.git
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **"Add New Project"** and select your GitHub `nsut-connect` repository.
4. Vercel automatically detects Vite:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Click **"Deploy"**! Your app will be live globally at `https://nsut-connect.vercel.app` in under 30 seconds!

### Method 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 📜 License
Developed for the NSUT student community. Built with ❤️ for Netaji Subhas University of Technology.

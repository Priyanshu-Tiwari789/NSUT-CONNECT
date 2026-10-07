// Realistic sample campus data for NSUT Connect

export const INITIAL_USER = {
  id: "usr_101",
  name: "Aarav Sharma",
  email: "aarav.sharma.ug23@nsut.ac.in",
  rollNo: "2023UCO1542",
  branch: "COE",
  branchFullName: "Computer Engineering (COE)",
  semester: 5,
  section: "COE-2",
  role: "student", // "student" | "admin"
  avatar: "",
  bio: "CSE '27 | Full-Stack Explorer | Member at DevComm NSUT",
  attendance: {
    overall: 84,
    subjects: [
      { code: "CS301", name: "Operating Systems", attended: 28, total: 32, percentage: 87.5 },
      { code: "CS303", name: "Database Management Systems", attended: 26, total: 30, percentage: 86.6 },
      { code: "CS305", name: "Design & Analysis of Algorithms", attended: 25, total: 32, percentage: 78.1 },
      { code: "CS307", name: "Computer Networks", attended: 24, total: 28, percentage: 85.7 }
    ]
  }
};

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann_1",
    title: "Mid-Term Examination Schedule - Autumn Semester 2026",
    category: "Exams",
    issuedBy: "Dean Academics & Controller of Examinations",
    isAdmin: true,
    date: "2026-10-06",
    priority: "high",
    content: "The Mid-Term theory examinations for 3rd and 5th semester students commence from October 20, 2026. Hall tickets will be issued via the IMS portal by Friday. No entry will be permitted without verified college ID cards.",
    attachments: ["Exam_DateSheet_Autumn26.pdf"],
    pinned: true
  },
  {
    id: "ann_2",
    title: "Google & Atlassian Placement Shortlist: Pre-Placement Talks",
    category: "Placements",
    issuedBy: "Training & Placement Cell (T&P)",
    isAdmin: true,
    date: "2026-10-05",
    priority: "high",
    content: "Pre-placement talks for final and pre-final year shortlisted students are scheduled in the Main Auditorium on Thursday at 3:00 PM. Formal attire is mandatory.",
    attachments: ["Shortlist_Drive_Oct.xlsx"],
    pinned: true
  },
  {
    id: "ann_3",
    title: "Moksha-Innovision '27: Core Organizing Committee Applications Open",
    category: "Events",
    issuedBy: "Student Affairs Council (SAC)",
    isAdmin: true,
    date: "2026-10-03",
    priority: "medium",
    content: "Applications are now open for Lead Coordinators and Sub-Heads across PR, Sponsorship, Logistics, and Tech for NSUT's flagship annual cultural and tech fest.",
    attachments: [],
    pinned: false
  },
  {
    id: "ann_4",
    title: "75% Mandatory Attendance Rule Enforcement Notice",
    category: "Administration",
    issuedBy: "Office of Registrar",
    isAdmin: true,
    date: "2026-09-28",
    priority: "urgent",
    content: "Students having attendance lower than 75% prior to exam commencement will not be issued admit cards. Medical certificates must be submitted to respective HODs by October 12.",
    attachments: ["Attendance_Ordinance_Rule.pdf"],
    pinned: false
  }
];

export const INITIAL_FEED_POSTS = [
  {
    id: "post_1",
    author: {
      name: "Rhea Sen",
      rollNo: "2023UIT1102",
      branch: "IT",
      avatar: ""
    },
    category: "Coding Club",
    content: "HackNSUT 2026 registrations just went live! 36-hour offline hackathon at the APJ Abdul Kalam Block with prizes worth ₹2,50,000. Looking for 1 backend developer proficient in FastAPI or Node.js. Drop a comment if interested!",
    upvotes: 42,
    hasUpvoted: false,
    timestamp: "2 hours ago",
    commentsCount: 9,
    comments: [
      { id: "c1", author: "Kabir Verma", text: "Hey! I have experience with Go & Postgres, sent you a DM.", time: "1 hour ago" },
      { id: "c2", author: "Tanya Gupta", text: "Is it open for 1st years as well?", time: "45 mins ago" }
    ]
  },
  {
    id: "post_2",
    author: {
      name: "DevComm NSUT",
      rollNo: "Official Society",
      branch: "Tech Society",
      isAdmin: true,
      avatar: ""
    },
    category: "Workshop",
    content: "Join us this Friday at 4 PM for our hands-on workshop on 'Building Offline-First Web Applications with React & Service Workers' at Computer Lab 4. RSVP link in announcements!",
    upvotes: 68,
    hasUpvoted: true,
    timestamp: "5 hours ago",
    commentsCount: 4,
    comments: []
  },
  {
    id: "post_3",
    author: {
      name: "Siddharth Jain",
      rollNo: "2022UEC2031",
      branch: "ECE",
      avatar: ""
    },
    category: "Campus Life",
    content: "Does anyone know if the Central Library reading room is open 24x7 during the mid-term week? Also, is the Wi-Fi in Block 6 working properly today?",
    upvotes: 19,
    hasUpvoted: false,
    timestamp: "Yesterday",
    commentsCount: 6,
    comments: [
      { id: "c3", author: "Ananya Roy", text: "Yes, reading room remains open till 2 AM starting next Monday.", time: "Yesterday" }
    ]
  }
];

// NSUT IMS Master Timetables structured by [Branch_Semester]
export const ALL_BRANCH_TIMETABLES = {
  // Computer Engineering (COE) - Sem 5
  "COE_5": {
    branch: "Computer Engineering (COE)",
    semester: 5,
    schedule: {
      Monday: [
        { time: "09:00 - 10:00", subject: "Operating Systems (CS301)", faculty: "Prof. S. K. Saxena", room: "SPS-02", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Database Systems (CS303)", faculty: "Dr. Ruchika Malhotra", room: "SPS-02", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Computer Networks (CS307)", faculty: "Prof. Bijendra Kumar", room: "SPS-02", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "Student Center / Canteen", type: "Break" },
        { time: "01:00 - 03:00", subject: "OS Lab (Batch A) / DAA Lab (Batch B)", faculty: "Lab Instructors", room: "Block 4 - Lab 3", type: "Lab" }
      ],
      Tuesday: [
        { time: "09:00 - 10:00", subject: "Design & Analysis of Algorithms", faculty: "Dr. MPS Bhatia", room: "SPS-01", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Theory of Computation", faculty: "Prof. Pinaki Chakraborty", room: "SPS-01", type: "Lecture" },
        { time: "11:00 - 01:00", subject: "DBMS Lab (Batch A)", faculty: "Lab Instructors", room: "Block 4 - Lab 1", type: "Lab" },
        { time: "01:00 - 02:00", subject: "Lunch Break", faculty: "-", room: "Nescafe Grounds", type: "Break" },
        { time: "02:00 - 03:00", subject: "Economics for Engineers", faculty: "Dr. Geeta Sachdeva", room: "SPS-04", type: "Lecture" }
      ],
      Wednesday: [
        { time: "09:00 - 10:00", subject: "Computer Networks (CS307)", faculty: "Prof. Bijendra Kumar", room: "SPS-02", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Operating Systems (CS301)", faculty: "Prof. S. K. Saxena", room: "SPS-02", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Design & Analysis of Algorithms", faculty: "Dr. MPS Bhatia", room: "SPS-01", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "CN Lab (Batch A) / OS Lab (Batch B)", faculty: "Lab Instructors", room: "Block 6 - NetLab", type: "Lab" }
      ],
      Thursday: [
        { time: "09:00 - 10:00", subject: "Database Systems (CS303)", faculty: "Dr. Ruchika Malhotra", room: "SPS-02", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Theory of Computation", faculty: "Prof. Pinaki Chakraborty", room: "SPS-01", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Economics for Engineers", faculty: "Dr. Geeta Sachdeva", room: "SPS-04", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "02:00 - 04:00", subject: "Technical Seminar & Mini Project", faculty: "Mentor Panel", room: "Dept Library", type: "Seminar" }
      ],
      Friday: [
        { time: "09:00 - 10:00", subject: "Operating Systems (CS301)", faculty: "Prof. S. K. Saxena", room: "SPS-02", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Design & Analysis of Algorithms", faculty: "Dr. MPS Bhatia", room: "SPS-01", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Database Systems (CS303)", faculty: "Dr. Ruchika Malhotra", room: "SPS-02", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "Open Elective / Society Activities", faculty: "SAC Faculty", room: "Auditorium Complex", type: "Activity" }
      ]
    }
  },

  // Information Technology (IT) - Sem 5
  "IT_5": {
    branch: "Information Technology (IT)",
    semester: 5,
    schedule: {
      Monday: [
        { time: "09:00 - 10:00", subject: "Software Engineering (IT301)", faculty: "Dr. Ananya Roy", room: "SPS-03", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Web Technologies & Cloud", faculty: "Prof. Vivek Kumar", room: "SPS-03", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Operating Systems", faculty: "Dr. Ritu Sharma", room: "SPS-03", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "Student Center", type: "Break" },
        { time: "01:00 - 03:00", subject: "Web Tech Lab (Batch 1)", faculty: "Lab Instructors", room: "Block 4 - Lab 2", type: "Lab" }
      ],
      Tuesday: [
        { time: "09:00 - 10:00", subject: "Computer Networks", faculty: "Prof. B. Kumar", room: "SPS-03", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Database Management Systems", faculty: "Dr. Ruchika Malhotra", room: "SPS-03", type: "Lecture" },
        { time: "11:00 - 01:00", subject: "Networks Lab (Batch 1)", faculty: "Lab Faculty", room: "NetLab", type: "Lab" },
        { time: "01:00 - 02:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "02:00 - 03:00", subject: "Information Security", faculty: "Dr. Sanjay Gupta", room: "SPS-03", type: "Lecture" }
      ],
      Wednesday: [
        { time: "09:00 - 10:00", subject: "Software Engineering", faculty: "Dr. Ananya Roy", room: "SPS-03", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Web Technologies & Cloud", faculty: "Prof. Vivek Kumar", room: "SPS-03", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Information Security", faculty: "Dr. Sanjay Gupta", room: "SPS-03", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "DBMS Lab (Batch 2)", faculty: "Lab Instructors", room: "Block 4 - Lab 1", type: "Lab" }
      ],
      Thursday: [
        { time: "09:00 - 10:00", subject: "Operating Systems", faculty: "Dr. Ritu Sharma", room: "SPS-03", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Computer Networks", faculty: "Prof. B. Kumar", room: "SPS-03", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Database Systems", faculty: "Dr. Ruchika Malhotra", room: "SPS-03", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "02:00 - 04:00", subject: "Mini Project / Seminar", faculty: "Faculty Panel", room: "IT Dept", type: "Seminar" }
      ],
      Friday: [
        { time: "09:00 - 10:00", subject: "Software Engineering", faculty: "Dr. Ananya Roy", room: "SPS-03", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Information Security", faculty: "Dr. Sanjay Gupta", room: "SPS-03", type: "Lecture" },
        { time: "11:00 - 01:00", subject: "Elective Lecture & Mentoring", faculty: "Professors", room: "SPS-03", type: "Lecture" },
        { time: "01:00 - 02:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "02:00 - 04:00", subject: "Club & Hackathon Prep", faculty: "SAC", room: "Campus Grounds", type: "Activity" }
      ]
    }
  },

  // Mathematics & Computing (MAC) - Sem 5
  "MAC_5": {
    branch: "Mathematics & Computing (MAC)",
    semester: 5,
    schedule: {
      Monday: [
        { time: "09:00 - 10:00", subject: "Linear Algebra & Applications", faculty: "Dr. P. K. Srivastava", room: "SPS-05", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Numerical Analysis (MA303)", faculty: "Prof. Seema Sharma", room: "SPS-05", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Financial Mathematics", faculty: "Dr. Neha Agrawal", room: "SPS-05", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "Computing Lab (Python/MATLAB)", faculty: "Lab Instructors", room: "Math Lab 1", type: "Lab" }
      ],
      Tuesday: [
        { time: "09:00 - 10:00", subject: "Probability & Stochastic Processes", faculty: "Dr. K. N. Rajesh", room: "SPS-05", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Operating Systems", faculty: "Prof. S. K. Saxena", room: "SPS-02", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Design & Analysis of Algorithms", faculty: "Dr. MPS Bhatia", room: "SPS-01", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "02:00 - 04:00", subject: "Statistical Modeling Lab", faculty: "Lab Instructors", room: "Math Lab 2", type: "Lab" }
      ],
      Wednesday: [
        { time: "09:00 - 10:00", subject: "Numerical Analysis", faculty: "Prof. Seema Sharma", room: "SPS-05", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Linear Algebra", faculty: "Dr. P. K. Srivastava", room: "SPS-05", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "DAA Lecture", faculty: "Dr. MPS Bhatia", room: "SPS-01", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "Data Science Seminar", faculty: "Dept Faculty", room: "SPS-05", type: "Seminar" }
      ],
      Thursday: [
        { time: "09:00 - 10:00", subject: "Financial Mathematics", faculty: "Dr. Neha Agrawal", room: "SPS-05", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Probability & Stochastics", faculty: "Dr. K. N. Rajesh", room: "SPS-05", type: "Lecture" },
        { time: "11:00 - 01:00", subject: "Algorithms Lab", faculty: "Lab Instructors", room: "Block 4 - Lab 3", type: "Lab" },
        { time: "01:00 - 02:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "02:00 - 03:00", subject: "Discrete Mathematics Tutorial", faculty: "TAs", room: "SPS-05", type: "Lecture" }
      ],
      Friday: [
        { time: "09:00 - 10:00", subject: "Numerical Analysis", faculty: "Prof. Seema Sharma", room: "SPS-05", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Financial Mathematics", faculty: "Dr. Neha Agrawal", room: "SPS-05", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Open Elective", faculty: "University Faculty", room: "Auditorium", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "Department Projects & Guidance", faculty: "Mentors", room: "SPS-05", type: "Activity" }
      ]
    }
  },

  // Electronics & Communication (ECE) - Sem 5
  "ECE_5": {
    branch: "Electronics & Communication (ECE)",
    semester: 5,
    schedule: {
      Monday: [
        { time: "09:00 - 10:00", subject: "Digital Signal Processing (EC301)", faculty: "Prof. Tarun Rawat", room: "SPS-06", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Electromagnetic Fields & Waves", faculty: "Dr. Pragati Kumar", room: "SPS-06", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Microprocessors & Interfacing", faculty: "Dr. Maneesha Gupta", room: "SPS-06", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "DSP Lab (Batch 1)", faculty: "Lab Instructors", room: "Block 2 - DSP Lab", type: "Lab" }
      ],
      Tuesday: [
        { time: "09:00 - 10:00", subject: "Analog Integrated Circuits", faculty: "Prof. Sujay Deb", room: "SPS-06", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Digital Signal Processing", faculty: "Prof. Tarun Rawat", room: "SPS-06", type: "Lecture" },
        { time: "11:00 - 01:00", subject: "Microprocessor Lab (Batch 1)", faculty: "Lab Faculty", room: "Block 2 - MicroLab", type: "Lab" },
        { time: "01:00 - 02:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "02:00 - 03:00", subject: "Control Systems", faculty: "Dr. Jyoti Yadav", room: "SPS-06", type: "Lecture" }
      ],
      Wednesday: [
        { time: "09:00 - 10:00", subject: "Microprocessors & Interfacing", faculty: "Dr. Maneesha Gupta", room: "SPS-06", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Electromagnetic Waves", faculty: "Dr. Pragati Kumar", room: "SPS-06", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Analog Integrated Circuits", faculty: "Prof. Sujay Deb", room: "SPS-06", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "Analog Circuits Lab", faculty: "Lab Instructors", room: "Block 2 - VLSI Lab", type: "Lab" }
      ],
      Thursday: [
        { time: "09:00 - 10:00", subject: "Digital Signal Processing", faculty: "Prof. Tarun Rawat", room: "SPS-06", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Control Systems", faculty: "Dr. Jyoti Yadav", room: "SPS-06", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Microprocessors", faculty: "Dr. Maneesha Gupta", room: "SPS-06", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "02:00 - 04:00", subject: "Mini Project & Circuit Prototyping", faculty: "Panel", room: "Hardware Lab", type: "Seminar" }
      ],
      Friday: [
        { time: "09:00 - 10:00", subject: "Analog Integrated Circuits", faculty: "Prof. Sujay Deb", room: "SPS-06", type: "Lecture" },
        { time: "10:00 - 11:00", subject: "Electromagnetic Fields", faculty: "Dr. Pragati Kumar", room: "SPS-06", type: "Lecture" },
        { time: "11:00 - 12:00", subject: "Control Systems", faculty: "Dr. Jyoti Yadav", room: "SPS-06", type: "Lecture" },
        { time: "12:00 - 01:00", subject: "Lunch Break", faculty: "-", room: "-", type: "Break" },
        { time: "01:00 - 03:00", subject: "Robotics & Hardware Society Work", faculty: "SAC", room: "Robotics Lab", type: "Activity" }
      ]
    }
  }
};

export const TIMETABLE_DATA = ALL_BRANCH_TIMETABLES["COE_5"];

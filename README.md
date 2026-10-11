# ParentTeacher Connect — School Collaboration & Communication Platform

[![Task ID](https://img.shields.io/badge/Task%20ID-WD--SCH--002-pink.svg)](#)
[![Student Code](https://img.shields.io/badge/Student%20Code-DAS--SCH--002-purple.svg)](#)
[![Domain](https://img.shields.io/badge/Domain-Parent--Teacher%20Portal-blue.svg)](#)
[![Internship](https://img.shields.io/badge/Internship-Data%20Alcott%20Systems-darkpink.svg)](#)

---

## 📌 Project Overview
**ParentTeacher Connect** is a responsive web application designed to bridge communication and transparency between parents and teachers. Built as part of the **Data Alcott Systems Free Web Development Internship Online Task (Task ID: WD-SCH-002)**, this portal provides real-time messaging, academic progress tracking, attendance logs, digital fee records, event notices, and meeting scheduling.

> **Task & Blog Reference Link:**  
> [Data Alcott Task Submission Blog](https://www.freeinternships.in/blog/)

---

## 🚀 Live Demo & Links
- **Live Hosted Application:** 'https://parent-teacher.netlify.app'
- **GitHub Repository:** `https://github.com/omchoudharydev/parent-teacher.git`

---

## ✨ Features Implemented

### Core Features
- **Role-Based Access Control:** Switch between **Parent**, **Teacher**, and **Admin** personas with dedicated access privileges.
- **Parent & Faculty Registration (CRUD):** Add, search, inspect, and manage parent profiles (with linked children) and teacher directories (with subject and availability).
- **Student Profile 360° & Academic Progress:** View individual student profiles, GPA averages, subject scores, and behavioral commendations.
- **Direct Messaging Portal:** Functional **Inbox** and **Sent** folders with thread view, reply functionality, and live notifications.
- **Attendance Ledger:** Daily roll call register with one-click status marking (`Present`, `Late`, `Absent`).
- **Tuition & Fee Management:** Detailed fee records, overdue warnings, and simulated instant digital payment checkout.
- **PTM Consultation Scheduler:** Book 1-on-1 parent-teacher meetings with conference agenda tracking.
- **Campus Bulletins & Notices:** Published announcements with category tags.

### Bonus Features
- **Glassmorphism Dark Theme:** Custom glassmorphic cards, backdrop blur filters, and neon-pink glow accents (`#EC4899`).
- **Data Export Engine:** One-click CSV downloads for **Academic Grade Books** and **Attendance Master Registers**.
- **Printable Student Dossier:** Browser-printable report card format.
- **Real-time Toast Notifications:** Non-blocking feedback toasts for actions like messaging, payments, and roll calls.
- **Zero Database Overhead:** Pure JavaScript in-memory state engine using client-side arrays and objects.

---

## 🛠️ Tech Stack
- **HTML5:** Semantic elements, modular section routing, accessible forms.
- **CSS3:** Modern Glassmorphism, CSS Grid, Flexbox, backdrop-filter, smooth keyframe animations, mobile responsiveness.
- **JavaScript (ES6+):** In-memory state store, dynamic DOM rendering, CSV blob file generators, search and filter mechanics.
- **Iconography & Fonts:** Font Awesome 6.5.1, Google Font *Plus Jakarta Sans*.

---

## 📂 Project Structure
```text
parent-teacher-portal/
├── index.html        # Main single-page web shell & modal templates
├── style.css         # Modern dark glassmorphism design system
├── script.js         # Reactive JavaScript application state & handlers
├── README.md         # Project documentation & submission details
└── report.doc        # Formatted 2-page project internship report

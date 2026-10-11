/**
 * PARENT-TEACHER CONNECT - FULLY FUNCTIONAL JAVASCRIPT CORE
 * Fixed and verified: Tab switching, Modals, CRUD operations,
 * Live Messaging, Roll-call Attendance, Fee simulation, Role switching, and CSV Exports.
 */

// ======================== GLOBAL APPLICATION STATE ======================== //
const appState = {
  activeRole: 'parent',
  currentUser: { name: 'Mrs. Priya Sharma', initials: 'PS', role: 'parent' },

  parents: [
    { id: 1, name: "Mrs. Priya Sharma", email: "priya@email.com", phone: "+91 9876543210", children: ["Rahul Sharma", "Riya Sharma"], address: "123, Mumbai" },
    { id: 2, name: "Mr. Raj Patel", email: "raj@email.com", phone: "+91 9876543211", children: ["Amit Patel"], address: "456, Delhi" },
    { id: 3, name: "Mrs. Anita Desai", email: "anita.desai@email.com", phone: "+91 9876543299", children: ["Ananya Desai"], address: "789, Bengaluru" }
  ],

  teachers: [
    { id: 1, name: "Mr. Suresh Kumar", subject: "Mathematics", class_assigned: "Grade 5-A", email: "suresh@school.edu", availability: "Mon-Fri 9AM-3PM" },
    { id: 2, name: "Ms. Shalini Iyer", subject: "English Literature", class_assigned: "Grade 6-B", email: "shalini@school.edu", availability: "Mon-Thu 10AM-2PM" },
    { id: 3, name: "Dr. Vikram Bose", subject: "Physics", class_assigned: "Grade 8-A", email: "vikram.bose@school.edu", availability: "Tue-Sat 8AM-1PM" }
  ],

  students: [
    {
      id: 101,
      name: "Rahul Sharma",
      grade: "Grade 5-A",
      parentId: 1,
      attendance: 96,
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=240&auto=format&fit=crop&q=80",
      behavior: ["Analytical", "Punctual", "Curious"],
      grades: [
        { subject: "Mathematics", marks: 95, grade: "A+", feedback: "Top in algebra problem set" },
        { subject: "English Literature", marks: 88, grade: "A", feedback: "Expressive essay composition" },
        { subject: "Physics", marks: 92, grade: "A+", feedback: "Active science lab contributor" }
      ]
    },
    {
      id: 102,
      name: "Riya Sharma",
      grade: "Grade 3-C",
      parentId: 1,
      attendance: 98,
      avatar: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=240&auto=format&fit=crop&q=80",
      behavior: ["Cooperative", "Avid Reader"],
      grades: [
        { subject: "Mathematics", marks: 91, grade: "A+", feedback: "Outstanding arithmetic pace" },
        { subject: "English Literature", marks: 94, grade: "A+", feedback: "Superb spelling & phonics" }
      ]
    },
    {
      id: 103,
      name: "Amit Patel",
      grade: "Grade 5-A",
      parentId: 2,
      attendance: 92,
      avatar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=240&auto=format&fit=crop&q=80",
      behavior: ["Natural Leader", "Athletic"],
      grades: [
        { subject: "Mathematics", marks: 82, grade: "B+", feedback: "Solid work; continue geometry drill" },
        { subject: "Social Sciences", marks: 89, grade: "A", feedback: "Strong historical synthesis" }
      ]
    }
  ],

  messages: [
    { id: 1, sender: "Mr. Suresh Kumar (Faculty)", folder: "inbox", subject: "Math Olympiad Supplementary Session", body: "Mrs. Priya, Rahul performed exceptionally in the qualifying stage. We are offering prep hours on Tuesdays.", time: "Today 10:15 AM", unread: true },
    { id: 2, sender: "Ms. Shalini Iyer (Faculty)", folder: "inbox", subject: "Reading Circle Project", body: "Riya has taken the lead for our group story theatre next Monday.", time: "Yesterday", unread: false },
    { id: 3, sender: "Administration Office", folder: "inbox", subject: "Annual Sports Day Notice", body: "Please confirm emergency contact information before next Friday.", time: "Oct 08", unread: false }
  ],

  attendance: [
    { studentId: 101, date: "2026-10-11", status: "Present" },
    { studentId: 102, date: "2026-10-11", status: "Present" },
    { studentId: 103, date: "2026-10-11", status: "Late" }
  ],

  fees: [
    { id: "INV-9021", studentId: 101, desc: "Quarter 2 Tuition Fee", amount: 650, due: "2026-10-25", status: "Paid" },
    { id: "INV-9022", studentId: 102, desc: "Art & Lab Materials", amount: 150, due: "2026-10-25", status: "Paid" },
    { id: "INV-9023", studentId: 103, desc: "Quarter 2 Tuition & Bus", amount: 780, due: "2026-10-15", status: "Pending" }
  ],

  ptmSlots: [
    { id: 1, teacher: "Mr. Suresh Kumar", date: "2026-10-14", time: "11:30 AM", agenda: "Review Math mid-term test curve & advanced modules", status: "Confirmed" },
    { id: 2, teacher: "Ms. Shalini Iyer", date: "2026-10-16", time: "02:00 PM", agenda: "Discuss library progress and spoken English projects", status: "Pending" }
  ],

  notices: [
    { id: 1, date: "Oct 12, 2026", title: "Annual Science & Model Fair 2026", desc: "Parents are warmly welcome to visit student presentation pavilions starting 10:00 AM." },
    { id: 2, date: "Oct 18, 2026", title: "Mid-Term Examination Hall Tickets", desc: "Digital hall passes are now downloadable via student profile dashboards." }
  ]
};

// ======================== APP INITIALIZATION ======================== //
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  populateDropdowns();
  renderDashboard();
  renderParents();
  renderTeachers();
  
  if (appState.students.length > 0) {
    renderStudentProfile(appState.students[0].id);
  }
  
  renderMessages('inbox');
  renderAcademic();
  renderAttendance();
  renderFees();
  renderPTM();

  const filterDateInput = document.getElementById('attendanceFilterDate');
  if (filterDateInput) {
    filterDateInput.value = new Date().toISOString().split('T')[0];
  }

  // Close modals on clicking outside the modal box
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('open');
    }
  });
});

// ======================== NAVIGATION HANDLERS ======================== //
function setupNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const pillNav = document.getElementById('pillNav');

  if (mobileBtn && pillNav) {
    mobileBtn.addEventListener('click', () => {
      pillNav.classList.toggle('mobile-open');
    });
  }

  // Fallback direct hash listener
  window.addEventListener('hashchange', () => {
    const sectionId = window.location.hash.replace('#', '');
    if (sectionId) navigateTab(null, sectionId);
  });
}

function navigateTab(e, sectionId) {
  if (e && e.preventDefault) e.preventDefault();

  document.querySelectorAll('.pill-nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.view-panel').forEach(sec => sec.classList.remove('active'));

  const activeLink = document.querySelector(`.pill-nav-item[href="#${sectionId}"]`);
  if (activeLink) activeLink.classList.add('active');

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  const pillNav = document.getElementById('pillNav');
  if (pillNav && pillNav.classList.contains('mobile-open')) {
    pillNav.classList.remove('mobile-open');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchSection(sectionId) {
  navigateTab(null, sectionId);
}

// ======================== ROLE SWITCHER ======================== //
function changeActiveRole(role) {
  appState.activeRole = role;
  const nameEl = document.getElementById('welcomeUserName');
  const chipEl = document.getElementById('userAvatarChip');

  if (role === 'parent') {
    appState.currentUser = { name: "Mrs. Priya Sharma", initials: "PS", role: "parent" };
    if (nameEl) nameEl.innerText = "Mrs. Priya Sharma";
    if (chipEl) chipEl.innerText = "PS";
    showNotification("Switched view to Parent: Mrs. Priya Sharma");
  } else if (role === 'teacher') {
    appState.currentUser = { name: "Mr. Suresh Kumar", initials: "SK", role: "teacher" };
    if (nameEl) nameEl.innerText = "Mr. Suresh Kumar";
    if (chipEl) chipEl.innerText = "SK";
    showNotification("Switched view to Faculty: Mr. Suresh Kumar");
  } else {
    appState.currentUser = { name: "Administrator", initials: "AD", role: "admin" };
    if (nameEl) nameEl.innerText = "Administrator";
    if (chipEl) chipEl.innerText = "AD";
    showNotification("Switched view to School Administrator");
  }

  renderDashboard();
}

// ======================== DASHBOARD MODULE ======================== //
function renderDashboard() {
  const childCountEl = document.getElementById('statChildCount');
  if (childCountEl) {
    childCountEl.innerText = appState.activeRole === 'parent' ? '2' : appState.students.length;
  }

  const meetingCountEl = document.getElementById('statMeetingCount');
  if (meetingCountEl) {
    meetingCountEl.innerText = appState.ptmSlots.length;
  }

  const pendingFeesEl = document.getElementById('statPendingFees');
  if (pendingFeesEl) {
    const pendingSum = appState.fees
      .filter(f => f.status !== 'Paid')
      .reduce((sum, f) => sum + f.amount, 0);
    pendingFeesEl.innerText = `$${pendingSum.toFixed(2)}`;
  }

  // Bulletins
  const noticesBox = document.getElementById('dashboardNoticesList');
  if (noticesBox) {
    noticesBox.innerHTML = appState.notices.map(n => `
      <div class="notice-item">
        <div class="notice-meta">${n.date} • BULLETIN</div>
        <h4>${n.title}</h4>
        <p>${n.desc}</p>
      </div>
    `).join('');
  }

  // Scheduled Conferences
  const scheduleBox = document.getElementById('dashboardScheduleList');
  if (scheduleBox) {
    scheduleBox.innerHTML = appState.ptmSlots.map(s => `
      <div class="schedule-item">
        <div class="notice-meta text-pink">${s.date} • ${s.time}</div>
        <h4>${s.agenda}</h4>
        <p>Consultation with <strong>${s.teacher}</strong> • <span class="badge-pill badge-pink">${s.status}</span></p>
      </div>
    `).join('');
  }
}

// ======================== PARENTS DIRECTORY ======================== //
function renderParents() {
  const tbody = document.getElementById('parentsTbody');
  if (!tbody) return;

  tbody.innerHTML = appState.parents.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td><span class="text-pink">${p.email}</span></td>
      <td>${p.phone}</td>
      <td>${p.children.map(c => `<span class="badge-pill badge-pink" style="margin-right:4px;">${c}</span>`).join('')}</td>
      <td>${p.address}</td>
      <td>
        <button class="btn btn-tiny btn-pill-outline" onclick="openMessageWithRecipient('${p.name}')">
          <i class="fa-regular fa-paper-plane"></i> Message
        </button>
      </td>
    </tr>
  `).join('');
}

function handleAddParent(e) {
  e.preventDefault();
  const name = document.getElementById('newParentName').value.trim();
  const email = document.getElementById('newParentEmail').value.trim();
  const phone = document.getElementById('newParentPhone').value.trim();
  const childrenInput = document.getElementById('newParentChildren').value;
  const children = childrenInput.split(',').map(s => s.trim()).filter(Boolean);
  const address = document.getElementById('newParentAddress').value.trim();

  appState.parents.push({ id: Date.now(), name, email, phone, children, address });
  renderParents();
  populateDropdowns();
  closeModal('addParentModal');
  e.target.reset();
  showNotification(`Registered parent: ${name}`);
}

function filterParents() {
  const input = document.getElementById('parentSearchInput');
  if (!input) return;
  const query = input.value.toLowerCase();
  const rows = document.querySelectorAll('#parentsTbody tr');
  rows.forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(query) ? '' : 'none';
  });
}

// ======================== TEACHERS DIRECTORY ======================== //
function renderTeachers() {
  const tbody = document.getElementById('teachersTbody');
  if (!tbody) return;

  tbody.innerHTML = appState.teachers.map(t => `
    <tr>
      <td><strong>${t.name}</strong></td>
      <td><span class="badge-pill badge-pink">${t.subject}</span></td>
      <td><strong>${t.class_assigned}</strong></td>
      <td>${t.email}</td>
      <td>${t.availability}</td>
      <td>
        <button class="btn btn-tiny btn-pill-primary" onclick="openMessageWithRecipient('${t.name}')">
          Message
        </button>
      </td>
    </tr>
  `).join('');
}

function handleAddTeacher(e) {
  e.preventDefault();
  const name = document.getElementById('newTeacherName').value.trim();
  const subject = document.getElementById('newTeacherSubject').value.trim();
  const class_assigned = document.getElementById('newTeacherClass').value.trim();
  const email = document.getElementById('newTeacherEmail').value.trim();
  const availability = document.getElementById('newTeacherAvail').value.trim();

  appState.teachers.push({ id: Date.now(), name, subject, class_assigned, email, availability });
  renderTeachers();
  populateDropdowns();
  closeModal('addTeacherModal');
  e.target.reset();
  showNotification(`Added faculty: ${name}`);
}

// ======================== STUDENT PROFILE 360 ======================== //
function renderStudentProfile(studentId) {
  studentId = parseInt(studentId, 10);
  const student = appState.students.find(s => s.id === studentId) || appState.students[0];
  const container = document.getElementById('profileContentArea');
  if (!container || !student) return;

  const totalScore = student.grades.reduce((a, b) => a + b.marks, 0);
  const avg = Math.round(totalScore / (student.grades.length || 1));

  container.innerHTML = `
    <div class="content-box" style="text-align: center;">
      <div class="profile-avatar-box">
        <img src="${student.avatar}" alt="${student.name}" />
      </div>
      <h3>${student.name}</h3>
      <div class="badge-pill badge-pink mt-2">${student.grade}</div>

      <div style="text-align: left; margin-top: 24px; font-size: 0.86rem; display: flex; flex-direction: column; gap: 10px;">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:6px;">
          <span class="text-muted">Student Code</span>
          <strong>#DAS-${student.id}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:6px;">
          <span class="text-muted">Attendance Rate</span>
          <span class="text-emerald font-bold">${student.attendance}%</span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:6px;">
          <span class="text-muted">Academic Rating</span>
          <span class="text-pink font-bold">${avg >= 90 ? 'Honors Roll' : 'Distinction'}</span>
        </div>
      </div>

      <div style="margin-top: 20px; text-align: left;">
        <label>Commendations</label>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
          ${student.behavior.map(b => `<span class="badge-pill badge-pink">${b}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="box-head">
        <h3><i class="fa-solid fa-chart-line text-pink"></i> Course Progress Breakdown</h3>
        <span class="badge-pill badge-pink">GPA: ${(avg / 25).toFixed(2)} / 4.0</span>
      </div>

      <div>
        ${student.grades.map(g => `
          <div class="stat-bar">
            <div class="stat-bar-labels">
              <span><strong>${g.subject}</strong> <small class="text-muted">(${g.feedback})</small></span>
              <span class="text-pink">${g.marks}\% •${g.grade}</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${g.marks}%"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:24px;">
        <button class="btn btn-pill-outline" onclick="openModal('addScoreModal')">Record Grade</button>
        <button class="btn btn-pill-primary" onclick="window.print()">Print Dossier</button>
      </div>
    </div>
  `;
}

// ======================== MESSAGING MODULE ======================== //
function renderMessages(folder = 'inbox') {
  const threadBox = document.getElementById('threadList');
  if (!threadBox) return;

  const filtered = appState.messages.filter(m => m.folder === folder);

  if (filtered.length === 0) {
    threadBox.innerHTML = `<div style="padding: 20px; color: var(--text-muted); text-align: center;">No messages in this folder.</div>`;
    const pane = document.getElementById('activeChatPane');
    if (pane) {
      pane.innerHTML = `<div class="no-selection-msg"><i class="fa-regular fa-comment-dots"></i><p>Folder empty.</p></div>`;
    }
    return;
  }

  threadBox.innerHTML = filtered.map((m, idx) => `
    <div class="thread-item ${idx === 0 ? 'active' : ''}" onclick="selectThread(${m.id}, this)">
      <div class="thread-head">
        <span>${m.sender}</span>
        <small class="text-muted">${m.time}</small>
      </div>
      <div style="font-size:0.84rem; font-weight:700; color:#fff;">${m.subject}</div>
      <div class="thread-snippet">${m.body}</div>
    </div>
  `).join('');

  if (filtered[0]) {
    viewThreadBody(filtered[0]);
  }
}

function selectThread(msgId, el) {
  document.querySelectorAll('.thread-item').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  const msg = appState.messages.find(m => m.id === msgId);
  if (msg) viewThreadBody(msg);
}

function viewThreadBody(msg) {
  const pane = document.getElementById('activeChatPane');
  if (!pane) return;

  pane.innerHTML = `
    <div style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 16px; margin-bottom: 20px;">
      <h3 style="font-size: 1.2rem; margin-bottom: 4px;">${msg.subject}</h3>
      <div style="font-size: 0.8rem; color: var(--text-muted);">From: <strong>${msg.sender}</strong> • ${msg.time}</div>
    </div>
    <div style="font-size: 0.94rem; line-height: 1.7; color: var(--text-secondary);">${msg.body}</div>
    <div style="margin-top: auto; padding-top: 24px;">
      <button class="btn btn-pill-primary" onclick="openMessageWithRecipient('${msg.sender}')">
        <i class="fa-solid fa-reply"></i> Reply
      </button>
    </div>
  `;
}

function switchFolder(folder, btn) {
  document.querySelectorAll('.thread-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderMessages(folder);
}

function handleSendMessage(e) {
  e.preventDefault();
  const recipient = document.getElementById('msgRecipientSelect').value;
  const subject = document.getElementById('msgSubjectInput').value.trim();
  const body = document.getElementById('msgBodyInput').value.trim();

  appState.messages.unshift({
    id: Date.now(),
    sender: `${appState.currentUser.name} (You)`,
    folder: 'sent',
    subject,
    body,
    time: 'Just now',
    unread: false
  });

  closeModal('quickMsgModal');
  e.target.reset();
  showNotification(`Message dispatched to ${recipient}`);

  // Switch to Sent folder view if currently on messaging tab
  const sentTabBtn = document.querySelectorAll('.thread-tab-btn')[1];
  if (sentTabBtn) {
    switchFolder('sent', sentTabBtn);
  }
}

function openMessageWithRecipient(name) {
  openModal('quickMsgModal');
  const select = document.getElementById('msgRecipientSelect');
  if (select) {
    let matched = false;
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.includes(name)) {
        select.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched && select.options.length > 0) {
      select.options[0].text = name;
      select.options[0].value = name;
    }
  }
}

// ======================== ACADEMIC MARKS ======================== //
function renderAcademic() {
  const tbody = document.getElementById('academicTbody');
  if (!tbody) return;

  const rows = [];
  appState.students.forEach(s => {
    s.grades.forEach(g => {
      rows.push(`
        <tr>
          <td><strong>${s.name}</strong></td>
          <td>${g.subject}</td>
          <td><strong>${g.marks}</strong>/100</td>
          <td><span class="badge-pill badge-pink">${g.grade}</span></td>
          <td>${g.feedback}</td>
        </tr>
      `);
    });
  });

  tbody.innerHTML = rows.join('');
}

function handleAddGrade(e) {
  e.preventDefault();
  const studentId = parseInt(document.getElementById('scoreStudentSelect').value, 10);
  const subject = document.getElementById('scoreSubjectSelect').value;
  const marks = parseInt(document.getElementById('scoreMarksInput').value, 10);
  const feedback = document.getElementById('scoreCommentsInput').value.trim();

  let gradeLetter = 'C';
  if (marks >= 90) gradeLetter = 'A+';
  else if (marks >= 80) gradeLetter = 'A';
  else if (marks >= 70) gradeLetter = 'B+';
  else if (marks >= 60) gradeLetter = 'B';

  const student = appState.students.find(s => s.id === studentId);
  if (student) {
    const existing = student.grades.find(g => g.subject === subject);
    if (existing) {
      existing.marks = marks;
      existing.grade = gradeLetter;
      existing.feedback = feedback;
    } else {
      student.grades.push({ subject, marks, grade: gradeLetter, feedback });
    }

    renderAcademic();
    renderStudentProfile(studentId);
    closeModal('addScoreModal');
    e.target.reset();
    showNotification(`Recorded grade for ${student.name}`);
  }
}

// ======================== ATTENDANCE REGISTER ======================== //
function renderAttendance() {
  const tbody = document.getElementById('attendanceTbody');
  if (!tbody) return;

  tbody.innerHTML = appState.students.map(s => {
    const record = appState.attendance.find(a => a.studentId === s.id);
    const status = record ? record.status : 'Present';

    return `
      <tr>
        <td><strong>#DAS-${s.id}</strong></td>
        <td><strong>${s.name}</strong></td>
        <td>${s.grade}</td>
        <td>Oct 11, 2026</td>
        <td>
          <span class="badge-pill ${status === 'Present' ? 'badge-paid' : 'badge-pending'}">
            ${status}
          </span>
        </td>
        <td>
          <button class="btn btn-tiny btn-pill-outline" onclick="markAttendance(${s.id}, 'Present')">Present</button>
          <button class="btn btn-tiny btn-pill-outline" onclick="markAttendance(${s.id}, 'Late')">Late</button>
          <button class="btn btn-tiny btn-pill-outline" onclick="markAttendance(${s.id}, 'Absent')">Absent</button>
        </td>
      </tr>
    `;
  }).join('');
}

function markAttendance(studentId, newStatus) {
  const rec = appState.attendance.find(a => a.studentId === studentId);
  if (rec) {
    rec.status = newStatus;
  } else {
    appState.attendance.push({ studentId, date: '2026-10-11', status: newStatus });
  }
  renderAttendance();
  showNotification(`Roll call updated: ${newStatus}`);
}

// ======================== FEES MANAGEMENT ======================== //
function renderFees() {
  const tbody = document.getElementById('feesTbody');
  if (!tbody) return;

  tbody.innerHTML = appState.fees.map(f => {
    const student = appState.students.find(s => s.id === f.studentId);
    return `
      <tr>
        <td><strong>${f.id}</strong></td>
        <td>${student ? student.name : 'Enrolled Student'}</td>
        <td>${f.desc}</td>
        <td><strong>$${f.amount}</strong></td>
        <td>${f.due}</td>
        <td><span class="badge-pill ${f.status === 'Paid' ? 'badge-paid' : 'badge-pending'}">${f.status}</span></td>
        <td>
          ${f.status !== 'Paid' ? `
            <button class="btn btn-tiny btn-pill-primary" onclick="payFee('${f.id}')">Pay Now</button>
          ` : `
            <button class="btn btn-tiny btn-pill-outline" onclick="printReceipt('${f.id}')">Receipt</button>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function payFee(feeId) {
  const fee = appState.fees.find(f => f.id === feeId);
  if (fee) {
    fee.status = 'Paid';
    renderFees();
    renderDashboard();
    showNotification(`Payment processed for ${fee.id}!`);
  }
}

function printReceipt(feeId) {
  const fee = appState.fees.find(f => f.id === feeId);
  if (!fee) return;
  alert(`=== OFFICIAL FEE RECEIPT ===\nInvoice: ${fee.id}\nStatus: Cleared\nAmount: $${fee.amount}\nDue Date: ${fee.due}\nThank you for prompt settlement.`);
}

function handleAddFee(e) {
  e.preventDefault();
  const studentId = parseInt(document.getElementById('feeStudentSelect').value, 10);
  const desc = document.getElementById('feeDescInput').value.trim();
  const amount = parseFloat(document.getElementById('feeAmountInput').value);
  const due = document.getElementById('feeDueInput').value;

  appState.fees.push({
    id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    studentId,
    desc,
    amount,
    due,
    status: 'Pending'
  });

  renderFees();
  renderDashboard();
  closeModal('addFeeModal');
  e.target.reset();
  showNotification('Invoice issued successfully.');
}

// ======================== PTM SCHEDULER ======================== //
function renderPTM() {
  const grid = document.getElementById('ptmSlotsGrid');
  if (!grid) return;

  grid.innerHTML = appState.ptmSlots.map(s => `
    <div class="ptm-card">
      <div class="ptm-time-pill"><i class="fa-regular fa-clock"></i> ${s.date} • ${s.time}</div>
      <h4 style="font-size:1.05rem; margin-bottom:8px;">${s.agenda}</h4>
      <div style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:16px;">
        Mentor: <strong>${s.teacher}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="badge-pill badge-pink">${s.status}</span>
        <button class="btn btn-tiny btn-pill-primary" onclick="showNotification('Connecting to virtual conference room...')">
          <i class="fa-solid fa-video"></i> Join Link
        </button>
      </div>
    </div>
  `).join('');
}

function handleBookPTM(e) {
  e.preventDefault();
  const teacher = document.getElementById('ptmTeacherSelect').value;
  const date = document.getElementById('ptmDateInput').value;
  const time = document.getElementById('ptmTimeInput').value;
  const agenda = document.getElementById('ptmAgendaInput').value.trim();

  appState.ptmSlots.unshift({ id: Date.now(), teacher, date, time, agenda, status: 'Confirmed' });
  renderPTM();
  renderDashboard();
  closeModal('ptmSlotModal');
  e.target.reset();
  showNotification(`PTM slot reserved with ${teacher}`);
}

function handlePostNotice(e) {
  e.preventDefault();
  const title = document.getElementById('noticeTitleInput').value.trim();
  const desc = document.getElementById('noticeDescInput').value.trim();

  appState.notices.unshift({ id: Date.now(), date: 'Oct 11, 2026', title, desc });
  renderDashboard();
  closeModal('postNoticeModal');
  e.target.reset();
  showNotification('Notice posted to school bulletin.');
}

// ======================== CSV DATA EXPORTS ======================== //
function exportAcademicCSV() {
  let csv = 'Student,Subject,Marks,Grade,Feedback\n';
  appState.students.forEach(s => {
    s.grades.forEach(g => {
      csv += `"${s.name}","${g.subject}","${g.marks}","${g.grade}","${g.feedback}"\n`;
    });
  });
  triggerDownload(csv, 'Academic_Progress.csv');
  showNotification('Academic CSV generated!');
}

function exportAttendanceCSV() {
  let csv = 'StudentID,Student,Status,Date\n';
  appState.students.forEach(s => {
    const a = appState.attendance.find(x => x.studentId === s.id);
    csv += `"${s.id}","${s.name}","${a ? a.status : 'Present'}","2026-10-11"\n`;
  });
  triggerDownload(csv, 'Attendance_Registry.csv');
  showNotification('Attendance CSV generated!');
}

function triggerDownload(content, filename) {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ======================== DROPDOWNS & MODALS ======================== //
function populateDropdowns() {
  const ptmTeacher = document.getElementById('ptmTeacherSelect');
  const msgRecip = document.getElementById('msgRecipientSelect');
  const studentPicker = document.getElementById('studentPicker');
  const scoreStudent = document.getElementById('scoreStudentSelect');
  const feeStudent = document.getElementById('feeStudentSelect');

  if (ptmTeacher) {
    ptmTeacher.innerHTML = appState.teachers.map(t => `<option value="${t.name}">${t.name} (${t.subject})</option>`).join('');
  }
  if (msgRecip) {
    const teacherOpts = appState.teachers.map(t => `<option value="${t.name} (Faculty)">${t.name} (Faculty)</option>`);
    const parentOpts = appState.parents.map(p => `<option value="${p.name} (Parent)">${p.name} (Parent)</option>`);
    msgRecip.innerHTML = `<optgroup label="Faculty">${teacherOpts.join('')}</optgroup><optgroup label="Parents">${parentOpts.join('')}</optgroup>`;
  }
  if (studentPicker) {
    studentPicker.innerHTML = appState.students.map(s => `<option value="${s.id}">${s.name} (${s.grade})</option>`).join('');
  }
  if (scoreStudent) {
    scoreStudent.innerHTML = appState.students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  }
  if (feeStudent) {
    feeStudent.innerHTML = appState.students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  }
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

function showNotification(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-pill';
  toast.innerText = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
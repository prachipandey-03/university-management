const fs = require('fs');
const path = require('path');

const pages = [
  {
    file: 'admission.html',
    title: 'New Student Admission',
    breadcrumb: 'Master → New Admission',
    formHtml: `
      <div class="table-card" style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom:20px; font-size:1.2rem; color:var(--text-main);">Student Enrollment Form</h2>
        <form id="pageForm" onsubmit="submitForm(event, '/api/students')">
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Student ID</label>
            <input type="text" id="studentId" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Full Name</label>
            <input type="text" id="fullName" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Department</label>
            <select id="department" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:#1a1d36;color:var(--text-main);">
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics & Communications">Electronics & Comm</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Date of Enrollment</label>
            <input type="date" id="enrolledDate" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main); color-scheme: dark;">
          </div>
          <button type="submit" class="btn-sm primary" id="submitBtn" style="width:100%;padding:12px;font-size:1rem;">Submit Admission</button>
        </form>
      </div>
    `
  },
  {
    file: 'faculty.html',
    title: 'Add Faculty',
    breadcrumb: 'Master → New Faculty',
    formHtml: `
      <div class="table-card" style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom:20px; font-size:1.2rem; color:var(--text-main);">Faculty Registration Form</h2>
        <form id="pageForm" onsubmit="submitForm(event, '/api/faculty')">
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Faculty ID</label>
            <input type="text" id="facultyId" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Full Name</label>
            <input type="text" id="fullName" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Title</label>
            <input type="text" id="title" placeholder="e.g. Professor, Assistant Professor" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Department</label>
            <select id="department" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:#1a1d36;color:var(--text-main);">
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics & Communications">Electronics & Comm</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
          </div>
          <button type="submit" class="btn-sm primary" id="submitBtn" style="width:100%;padding:12px;font-size:1rem;">Register Faculty</button>
        </form>
      </div>
    `
  },
  {
    file: 'attendance.html',
    title: 'Mark Attendance',
    breadcrumb: 'Attendance → Record',
    formHtml: `
      <div class="table-card" style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom:20px; font-size:1.2rem; color:var(--text-main);">Daily Attendance Entry</h2>
        <form id="pageForm" onsubmit="submitForm(event, '/api/attendance')">
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Date</label>
            <input type="date" id="date" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main); color-scheme: dark;">
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Total Students</label>
            <input type="number" id="totalCount" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Present Count</label>
            <input type="number" id="presentCount" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <button type="submit" class="btn-sm primary" id="submitBtn" style="width:100%;padding:12px;font-size:1rem;">Submit Record</button>
        </form>
      </div>
    `
  },
  {
    file: 'fee.html',
    title: 'Collect Fee',
    breadcrumb: 'Finance → Fee Collection',
    formHtml: `
      <div class="table-card" style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom:20px; font-size:1.2rem; color:var(--text-main);">Process Fee Payment</h2>
        <form id="pageForm" onsubmit="submitForm(event, '/api/fees')">
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Student ID</label>
            <input type="text" id="studentId" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Amount (₹)</label>
            <input type="number" id="amount" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Payment Date</label>
            <input type="date" id="paymentDate" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main); color-scheme: dark;">
          </div>
          <button type="submit" class="btn-sm primary" id="submitBtn" style="width:100%;padding:12px;font-size:1rem;">Record Payment</button>
        </form>
      </div>
    `
  },
  {
    file: 'exam.html',
    title: 'Exam Schedule',
    breadcrumb: 'Examination → Schedule',
    formHtml: `
      <div class="table-card" style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom:20px; font-size:1.2rem; color:var(--text-main);">Add Exam Schedule</h2>
        <form id="pageForm" onsubmit="submitForm(event, '/api/exams')">
          <div style="margin-bottom:15px; display:flex; gap:15px;">
            <div style="flex:1;">
              <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Course Code</label>
              <input type="text" id="courseCode" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
            </div>
            <div style="flex:2;">
              <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Course Name</label>
              <input type="text" id="courseName" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
            </div>
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Department</label>
            <input type="text" id="department" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <div style="margin-bottom:15px; display:flex; gap:15px;">
            <div style="flex:1;">
              <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Date</label>
              <input type="date" id="examDate" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main); color-scheme: dark;">
            </div>
            <div style="flex:1;">
              <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Slot/Time</label>
              <input type="text" id="slot" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
            </div>
            <div style="flex:1;">
              <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Room</label>
              <input type="text" id="room" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
            </div>
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted);">Status</label>
            <input type="text" id="status" value="Scheduled" required style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-main);">
          </div>
          <button type="submit" class="btn-sm primary" id="submitBtn" style="width:100%;padding:12px;font-size:1rem;">Add Schedule</button>
        </form>
      </div>
    `
  }
];

const basePath = 'C:\\Users\\Prachi Pandey\\Documents\\Projects JAVA\\universityyyyyyy-management02\\university-management02';

pages.forEach(p => {
  const filePath = path.join(basePath, p.file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace mainContent interior
  const replacement = `
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title" id="pageTitle">${p.title}</h1>
          <p class="page-breadcrumb" id="pageBreadcrumb">${p.breadcrumb}</p>
        </div>
        <div class="page-header-actions">
          <button class="btn-sm" onclick="window.location.href='dashboard.html'">← Back to Dashboard</button>
        </div>
      </div>
      
      <div class="content-grid" style="display:block;">
        ${p.formHtml}
      </div>
  `;
  
  content = content.replace(/<main class="main-content" id="mainContent">[\s\S]*?<\/main>/, `<main class="main-content" id="mainContent">\n${replacement}\n</main>`);
  
  // Swap dashboard.js loading with pages.js
  content = content.replace('<script src="js/dashboard.js"></script>', '<script src="js/pages.js"></script>');

  fs.writeFileSync(filePath, content);
  console.log('Modified', filePath);
});

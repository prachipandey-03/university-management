/* =============================================
   DASHBOARD PAGE LOGIC
   ============================================= */

window.addEventListener('DOMContentLoaded', async () => {
  if (typeof ParticleSystem !== 'undefined' && document.getElementById('particleCanvas')) {
    window._ps = new ParticleSystem('particleCanvas', 'calm');
  }

  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);

  animateCounters();
  buildCalendar();
  await loadDashboardData();
});

function statusBadgeClass(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('active')) return 'active';
  if (s.includes('leave')) return 'leave';
  return 'pending';
}

async function loadDashboardData() {
  try {
    const base = typeof getApiBase === 'function' ? getApiBase() : '';
    const response = await fetch(`${base}/api/dashboard/data`);
    if (!response.ok) throw new Error('Unable to load dashboard data');
    const data = await response.json();
    const overview = data.overview;
    const recentAdmissions = data.recentAdmissions || [];

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set('statStudents', overview.studentCount);
    set('statFaculty', overview.facultyCount);
    set('statAttendance', overview.attendanceRate.toFixed(1) + '%');
    set('statCourses', overview.courseCount);
    set('statFees', '₹' + (overview.feesCollected / 100000).toFixed(1) + 'M');
    set('statDepts', overview.departmentCount);

    populateAdmissionsTable(recentAdmissions);
  } catch (error) {
    if (typeof showToast === 'function') showToast(error.message, '⚠');
  }
}

function populateAdmissionsTable(students) {
  const body = document.getElementById('tableBody');
  if (!body) return;
  body.innerHTML = '';

  students.forEach((student) => {
    const row = document.createElement('tr');
    const en = student.enrolled != null ? student.enrolled : (student.enrolledDate || '');
    row.innerHTML = `
      <td>${student.studentId}</td>
      <td>${student.fullName}</td>
      <td>${student.department}</td>
      <td>${en}</td>
      <td><span class="status-badge ${statusBadgeClass(student.status)}">${student.status}</span></td>
    `;
    body.appendChild(row);
  });
}

function animateCounters() {
  const counters = [
    { id: 'statStudents', target: 3847, prefix: '', suffix: '', decimals: 0 },
    { id: 'statFaculty', target: 218, prefix: '', suffix: '', decimals: 0 },
    { id: 'statAttendance', target: 91.4, prefix: '', suffix: '%', decimals: 1 },
    { id: 'statCourses', target: 142, prefix: '', suffix: '', decimals: 0 },
    { id: 'statFees', target: 2.4, prefix: '₹', suffix: 'M', decimals: 1 },
    { id: 'statDepts', target: 24, prefix: '', suffix: '', decimals: 0 }
  ];

  counters.forEach((c) => {
    const el = document.getElementById(c.id);
    if (!el) return;
    const startTime = performance.now();
    const duration = 1600;
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = c.target * eased;
      el.textContent = c.prefix + val.toFixed(c.decimals) + c.suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function filterTable(query) {
  const q = query.toLowerCase().trim();
  const rows = document.querySelectorAll('#tableBody tr');
  rows.forEach((row) => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

function buildCalendar() {
  const container = document.getElementById('calendarMini');
  if (!container) return;

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const today = now.getDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const eventDays = [5, 12, 15, 20, 22, 28];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  let html = `
    <div class="cal-header">
      <button type="button" class="cal-nav" id="calPrev" onclick="shiftMonth(-1)">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <span class="cal-month">${monthNames[month]} ${year}</span>
      <button type="button" class="cal-nav" id="calNext" onclick="shiftMonth(1)">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="cal-grid">`;

  dayNames.forEach((d) => {
    html += `<div class="cal-day-name">${d}</div>`;
  });
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month">${daysInPrev - i}</div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    let cls = 'cal-day';
    if (d === today) cls += ' today';
    if (eventDays.includes(d) && d !== today) cls += ' has-event';
    html += `<div class="${cls}">${d}</div>`;
  }
  const totalShown = firstDay + daysInMonth;
  const nextCount = totalShown % 7 === 0 ? 0 : 7 - (totalShown % 7);
  for (let d = 1; d <= nextCount; d++) {
    html += `<div class="cal-day other-month">${d}</div>`;
  }
  html += '</div>';

  const titleEl = document.createElement('div');
  titleEl.className = 'panel-title';
  titleEl.textContent = 'Academic Calendar';
  container.innerHTML = '';
  container.appendChild(titleEl);
  const calDiv = document.createElement('div');
  calDiv.innerHTML = html;
  container.appendChild(calDiv);
}

function shiftMonth(dir) {
  if (typeof showToast === 'function') showToast(dir > 0 ? 'Next month →' : '← Previous month', '📅');
}

function handleQuickAdd() {
  if (typeof showToast === 'function') showToast('Opening New Admission…', '➕');
  setTimeout(() => {
    window.location.href = 'admission.html';
  }, 500);
}

async function refreshDashboard() {
  const btn = document.getElementById('refreshBtn');
  if (btn) {
    btn.textContent = '↻ Refreshing…';
    btn.disabled = true;
  }
  await loadDashboardData();
  if (btn) {
    btn.textContent = '↻ Refresh';
    btn.disabled = false;
  }
  if (typeof showToast === 'function') showToast('Dashboard refreshed!', '✓');
}

function showToast(msg, icon) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = document.getElementById('toastIcon');
  if (!toast || !msgEl) return;
  if (iconEl) iconEl.textContent = icon || '✓';
  msgEl.textContent = msg;
  toast.style.display = 'flex';
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      toast.style.display = 'none';
      toast.style.transform = '';
    }, 300);
  }, 2800);
}

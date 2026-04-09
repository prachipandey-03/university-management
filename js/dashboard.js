/* =============================================
   DASHBOARD PAGE LOGIC
   ============================================= */

window.addEventListener('DOMContentLoaded', () => {
  // Calm particles for dashboard
  window._ps = new ParticleSystem('particleCanvas', 'calm');

  // Fade in from auth
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);

  // Animate stat counters
  animateCounters();

  // Build mini calendar
  buildCalendar();

  // Set first sidebar item active
  const firstItem = document.querySelector('.sidebar-sub-item');
  if (firstItem) firstItem.classList.add('active-item');
});

/* ---- Sidebar Toggle ---- */
function toggleSection(id) {
  const subItems = document.getElementById('si-' + id);
  const header   = document.getElementById('sh-' + id);
  if (!subItems || !header) return;

  const isOpen = subItems.classList.contains('open');

  // Close all
  document.querySelectorAll('.sidebar-sub-items').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.sidebar-section-header').forEach(el => el.classList.remove('active'));

  // Open clicked if it was closed
  if (!isOpen) {
    subItems.classList.add('open');
    header.classList.add('active');
  }
}

/* ---- Set Active Page ---- */
function setActivePage(name, section) {
  // Update header
  document.getElementById('pageTitle').textContent = name;
  document.getElementById('pageBreadcrumb').textContent = `Dashboard → ${section} → ${name}`;

  // Remove all active items
  document.querySelectorAll('.sidebar-sub-item').forEach(el => el.classList.remove('active-item'));

  // Find and activate clicked item
  document.querySelectorAll('.sidebar-sub-item').forEach(el => {
    if (el.textContent.trim() === name) el.classList.add('active-item');
  });

  // Show toast
  showToast(`📂 Navigated to ${name}`, '✦');
}

/* ---- Counter Animation ---- */
function animateCounters() {
  const counters = [
    { id: 'statStudents', target: 3847, prefix: '', suffix: '',    decimals: 0 },
    { id: 'statFaculty',  target: 218,  prefix: '', suffix: '',    decimals: 0 },
    { id: 'statAttendance', target: 91.4, prefix: '', suffix: '%', decimals: 1 },
    { id: 'statCourses',  target: 142,  prefix: '', suffix: '',    decimals: 0 },
    { id: 'statFees',     target: 2.4,  prefix: '₹', suffix: 'M', decimals: 1 },
    { id: 'statDepts',    target: 24,   prefix: '', suffix: '',    decimals: 0 },
  ];

  counters.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const val = c.target * eased;
      el.textContent = c.prefix + val.toFixed(c.decimals) + c.suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ---- Table Search Filter ---- */
function filterTable(query) {
  const q = query.toLowerCase().trim();
  const rows = document.querySelectorAll('#tableBody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

/* ---- Mini Calendar ---- */
function buildCalendar() {
  const container = document.getElementById('calendarMini');
  if (!container) return;

  const now = new Date();
  const month = now.getMonth();
  const year  = now.getFullYear();
  const today = now.getDate();

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  // Days with events (mock)
  const eventDays = [5, 12, 15, 20, 22, 28];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  let html = `
    <div class="cal-header">
      <button class="cal-nav" id="calPrev" onclick="shiftMonth(-1)">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <span class="cal-month">${monthNames[month]} ${year}</span>
      <button class="cal-nav" id="calNext" onclick="shiftMonth(1)">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="cal-grid">
  `;

  dayNames.forEach(d => { html += `<div class="cal-day-name">${d}</div>`; });

  // Previous month overflow
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month">${daysInPrev - i}</div>`;
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    let cls = 'cal-day';
    if (d === today) cls += ' today';
    if (eventDays.includes(d) && d !== today) cls += ' has-event';
    html += `<div class="${cls}">${d}</div>`;
  }

  // Next month overflow
  const totalShown = firstDay + daysInMonth;
  const nextCount = totalShown % 7 === 0 ? 0 : 7 - (totalShown % 7);
  for (let d = 1; d <= nextCount; d++) {
    html += `<div class="cal-day other-month">${d}</div>`;
  }

  html += '</div>';

  // Panel title
  const titleEl = document.createElement('div');
  titleEl.className = 'panel-title';
  titleEl.textContent = 'Academic Calendar';
  container.innerHTML = '';
  container.appendChild(titleEl);

  const calDiv = document.createElement('div');
  calDiv.innerHTML = html;
  container.appendChild(calDiv);
}

// Placeholder for prev/next month (can be expanded)
function shiftMonth(dir) {
  showToast(dir > 0 ? 'Next month →' : '← Previous month', '📅');
}

/* ---- Quick Add ---- */
function handleQuickAdd() {
  showToast('Opening New Admission form…', '➕');
  setTimeout(() => setActivePage('New Student Admission', 'Master'), 700);
}

/* ---- Refresh ---- */
function refreshDashboard() {
  const btn = document.getElementById('refreshBtn');
  btn.textContent = '↻ Refreshing…';
  btn.disabled = true;
  animateCounters();
  setTimeout(() => {
    btn.textContent = '↻ Refresh';
    btn.disabled = false;
    showToast('Dashboard refreshed!', '✓');
  }, 1200);
}

/* ---- Logout ---- */
function handleLogout() {
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = 'index.html'; }, 500);
}

/* ---- Toast ---- */
function showToast(msg, icon = '✓') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = document.getElementById('toastIcon');
  if (!toast) return;

  msgEl.textContent = msg;
  iconEl.textContent = icon;
  toast.style.display = 'flex';
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => { toast.style.display = 'none'; toast.style.transform = ''; }, 300);
  }, 2800);
}

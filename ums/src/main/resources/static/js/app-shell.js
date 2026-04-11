/**
 * Renders shared sidebar from UMS_NAV_SECTIONS; opens section containing active page.
 */
const UMS_TOPBAR_INNER = `
      <div class="topbar-left">
        <a href="dashboard.html" class="topbar-logo" id="topbarLogo" style="text-decoration:none;color:inherit;display:flex;align-items:center;">
          <img src="assets/ums-logo-new.png" alt="UniVerse UMS" style="width:30px;height:30px;object-fit:contain;border-radius:50%;" />
        </a>
        <div class="topbar-brand">
          <span class="topbar-brand-name">UniVerse</span>
          <span class="topbar-brand-sub">Management System</span>
        </div>
      </div>
      <div class="topbar-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" id="globalSearch" placeholder="Search students, records, courses…" />
      </div>
      <div class="topbar-right">
        <button type="button" class="topbar-icon-btn" id="notifBtn" title="Notifications">
          <div class="notif-badge"></div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <button type="button" class="topbar-icon-btn" id="settingsBtn" title="Settings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
        <div class="topbar-avatar" id="topbarAvatar" title="Profile">AD</div>
      </div>`;

function umsToggleSection(sectionId) {
  const subItems = document.getElementById('si-' + sectionId);
  const header = document.getElementById('sh-' + sectionId);
  if (!subItems || !header) return;

  const isOpen = subItems.classList.contains('open');
  document.querySelectorAll('.sidebar-sub-items').forEach((el) => el.classList.remove('open'));
  document.querySelectorAll('.sidebar-section-header').forEach((el) => el.classList.remove('active'));

  if (!isOpen) {
    subItems.classList.add('open');
    header.classList.add('active');
  }
}

function umsHandleLogout() {
  try {
    sessionStorage.removeItem('ums_authenticated');
    sessionStorage.removeItem('ums_user');
  } catch (e) { /* ignore */ }
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

function umsRenderSidebar(activePage) {
  const nav = document.getElementById('umsSidebar');
  if (!nav || !window.UMS_NAV_SECTIONS) return;

  let activeSectionId = null;
  if (activePage && activePage !== 'dashboard') {
    for (const sec of UMS_NAV_SECTIONS) {
      if (sec.items.some((i) => i.page === activePage)) {
        activeSectionId = sec.id;
        break;
      }
    }
  }

  const parts = [];
  for (const sec of UMS_NAV_SECTIONS) {
    const isOpen = sec.id === activeSectionId ? ' open' : '';
    const headerActive = sec.id === activeSectionId ? ' active' : '';
    parts.push(`<div class="sidebar-section">
      <div class="sidebar-section-header${headerActive}" id="sh-${sec.id}" data-section="${sec.id}">
        <div class="sidebar-section-left">
          <div class="sidebar-section-icon" style="background: ${sec.iconGradient};">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${sec.stroke}" stroke-width="2">${sec.iconSvg}</svg>
          </div>
          <span class="sidebar-section-name">${sec.title}</span>
        </div>
        <svg class="sidebar-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
      <div class="sidebar-sub-items${isOpen}" id="si-${sec.id}">`);

    for (const item of sec.items) {
      const activeClass = item.page === activePage ? ' active-item' : '';
      parts.push(
        `<a class="sidebar-sub-item${activeClass}" href="${item.href}">${item.label}</a>`
      );
    }
    parts.push('</div></div><div class="sidebar-divider"></div>');
  }

  parts.push(`<div class="sidebar-logout" id="umsLogoutBtn">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    Logout
  </div>`);

  nav.innerHTML = parts.join('');

  nav.querySelectorAll('.sidebar-section-header').forEach((h) => {
    h.addEventListener('click', () => umsToggleSection(h.getAttribute('data-section')));
  });
  const lo = document.getElementById('umsLogoutBtn');
  if (lo) lo.addEventListener('click', umsHandleLogout);
}

function umsInitShell() {
  const tb = document.getElementById('umsTopbar');
  if (tb) tb.innerHTML = UMS_TOPBAR_INNER;

  const body = document.body;
  const activePage = body.getAttribute('data-ums-page') || 'dashboard';
  umsRenderSidebar(activePage);

  try {
    const raw = sessionStorage.getItem('ums_user');
    if (raw) {
      const u = JSON.parse(raw);
      const av = document.getElementById('topbarAvatar');
      if (av && u.fullName) {
        const initials = u.fullName.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
        av.textContent = initials || 'U';
        av.title = u.fullName;
      }
    }
  } catch (e) { /* ignore */ }
}

document.addEventListener('DOMContentLoaded', umsInitShell);

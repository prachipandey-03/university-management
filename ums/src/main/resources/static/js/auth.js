window.addEventListener('DOMContentLoaded', () => {
  window._ps = new ParticleSystem('particleCanvas', 'unstable');

  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);

  setTimeout(() => {
    const uid = document.getElementById('userId');
    if (uid) uid.focus();
  }, 600);
});

async function handleAuth(e) {
  e.preventDefault();

  const userId = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value.trim();
  const btn = document.getElementById('authBtn');
  const errorEl = document.getElementById('authError');

  errorEl.classList.remove('show');
  btn.textContent = 'Authenticating...';
  btn.classList.add('loading');

  try {
    const base = typeof getApiBase === 'function' ? getApiBase() : '';
    const response = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userId, password })
    });

    let result = {};
    try {
      result = await response.json();
    } catch (parseErr) {
      throw new Error('Invalid server response');
    }

    if (!response.ok) {
      throw new Error(result.error || 'Authentication failed');
    }

    try {
      sessionStorage.setItem('ums_authenticated', '1');
      sessionStorage.setItem('ums_user', JSON.stringify(result));
    } catch (ignore) {
      // Storage can be unavailable in restricted browsing contexts.
    }

    authSuccess(result);
  } catch (error) {
    authFail(error.message);
  }
}

function authSuccess(user) {
  const overlay = document.getElementById('authSuccessOverlay');
  const btn = document.getElementById('authBtn');
  const card = document.querySelector('.auth-card');
  const successMessage = document.getElementById('authSuccessMessage');

  if (successMessage) {
    const displayName = user && (user.fullName || user.username) ? (user.fullName || user.username) : 'User';
    successMessage.textContent = `Welcome, ${displayName}. Loading your dashboard...`;
  }

  btn.innerHTML = `
    <span style="display:inline-flex;align-items:center;gap:8px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Access Granted
    </span>
  `;
  btn.style.background = 'linear-gradient(135deg, #1a8f2e, #43a047, #00e676)';
  btn.style.backgroundSize = '200% 200%';
  btn.style.boxShadow = '0 0 0 0 rgba(67,160,71,0.6)';
  btn.style.animation = 'successPulse 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards';

  setTimeout(() => {
    card.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
    card.style.boxShadow = '0 0 80px rgba(67,160,71,0.4), 0 20px 60px rgba(124,110,247,0.3)';
    card.style.transform = 'scale(1.02)';
  }, 300);

  setTimeout(() => {
    overlay.classList.add('show');
  }, 500);

  setTimeout(() => {
    const wipe = document.createElement('div');
    wipe.id = 'pageWipe';
    wipe.style.cssText = `
      position:fixed; inset:0; z-index:9999;
      background: linear-gradient(135deg, #060b1e 0%, #0d1032 50%, #060b1e 100%);
      transform: translateY(-100%);
      transition: transform 0.6s cubic-bezier(0.76,0,0.24,1);
      display:flex; align-items:center; justify-content:center;
    `;
    const logoWipe = document.createElement('div');
    logoWipe.style.cssText = 'opacity:0; transition: opacity 0.3s ease 0.3s; text-align:center;';
    logoWipe.innerHTML = `
      <img src="assets/ums-logo-new.png" style="width:72px;height:72px;object-fit:contain;border-radius:50%;filter:drop-shadow(0 0 20px rgba(124,110,247,0.9));" />
      <div style="color:#7c6ef7;font-family:Outfit,sans-serif;font-size:0.75rem;letter-spacing:4px;text-transform:uppercase;margin-top:16px;">Loading Dashboard...</div>
    `;
    wipe.appendChild(logoWipe);
    document.body.appendChild(wipe);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wipe.style.transform = 'translateY(0)';
        setTimeout(() => {
          logoWipe.style.opacity = '1';
        }, 300);
      });
    });
  }, 1000);

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 2000);

  if (!document.getElementById('successStyle')) {
    const s = document.createElement('style');
    s.id = 'successStyle';
    s.textContent = `
      @keyframes successPulse {
        0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(67,160,71,0.6); }
        50%  { transform: scale(1.04); box-shadow: 0 0 0 14px rgba(67,160,71,0); }
        100% { transform: scale(1); box-shadow: 0 6px 25px rgba(67,160,71,0.4); }
      }
    `;
    document.head.appendChild(s);
  }
}

function authFail(message) {
  const btn = document.getElementById('authBtn');
  const errorEl = document.getElementById('authError');
  const card = document.querySelector('.auth-card');

  btn.textContent = 'Authenticate';
  btn.classList.remove('loading');

  errorEl.textContent = `Warning: ${message}`;
  errorEl.classList.add('show');

  card.style.animation = 'none';
  setTimeout(() => {
    card.style.animation = 'shakeCard 0.5s ease';
  }, 10);

  if (!document.getElementById('shakeStyle')) {
    const style = document.createElement('style');
    style.id = 'shakeStyle';
    style.textContent = `
      @keyframes shakeCard {
        0%,100% { transform: translateX(0); }
        20%,60%  { transform: translateX(-10px); }
        40%,80%  { transform: translateX(10px); }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    errorEl.classList.remove('show');
    errorEl.textContent = 'Invalid username or password.';
  }, 4000);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const form = document.getElementById('authForm');
    if (form && document.activeElement && form.contains(document.activeElement)) {
      const ev = new Event('submit', { cancelable: true });
      form.dispatchEvent(ev);
    }
  }
});

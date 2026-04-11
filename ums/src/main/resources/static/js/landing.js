/* =============================================
   LANDING PAGE LOGIC
   ============================================= */

// Boot particle system in CALM mode
window.addEventListener('DOMContentLoaded', () => {
  window._ps = new ParticleSystem('particleCanvas', 'calm');
  revealPage();
});

function revealPage() {
  const wrapper = document.getElementById('landingContainer');
  if (wrapper) {
    wrapper.style.opacity = '0';
    wrapper.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { wrapper.style.opacity = '1'; }, 100);
  }
}

/* ---- Enter Button Trigger ---- */
function triggerEnterAnimation() {
  const btn = document.getElementById('enterBtn');
  const overlay = document.getElementById('logoExplodeOverlay');
  const logoRing = document.getElementById('logoRing');

  if (!overlay) return;

  // Disable button
  btn.disabled = true;
  btn.style.transform = 'scale(0.95)';

  // Step 1: Logo glows intensely and ascends
  if (logoRing) {
    logoRing.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), filter 0.5s ease';
    logoRing.style.transform = 'scale(1.2) translateY(-10px)';
    logoRing.style.filter = 'drop-shadow(0 0 80px rgba(124,110,247,1)) drop-shadow(0 0 160px rgba(91,156,246,0.8))';
  }

  // Step 2: After 0.4s — explode rings + distortion
  setTimeout(() => {
    overlay.style.opacity = '1';
    overlay.classList.add('active');

    const rings = overlay.querySelectorAll('.explode-ring');
    rings.forEach(r => r.classList.add('go'));

    spawnExplodeParticles(overlay);

    // Shrink landing content inward (sucked into the portal)
    const container = document.getElementById('landingContainer');
    if (container) {
      container.style.transition = 'transform 0.7s cubic-bezier(0.4,0,1,1), opacity 0.6s ease';
      container.style.transform = 'scale(0.85)';
      container.style.opacity = '0';
    }
  }, 400);

  // Step 3: Dark cinematic wipe (instead of white flash)
  setTimeout(() => {
    const fill = document.createElement('div');
    fill.className = 'explode-overlay-fill dark-wipe';
    fill.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 200;
      background: radial-gradient(ellipse 0% 0% at 50% 50%, rgba(124,110,247,0.9) 0%, #050a18 60%);
      animation: darkWipeIn 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
    `;
    // Inject keyframes if not present
    if (!document.getElementById('darkWipeStyle')) {
      const style = document.createElement('style');
      style.id = 'darkWipeStyle';
      style.textContent = `
        @keyframes darkWipeIn {
          0%  { background: radial-gradient(ellipse 0% 0% at 50% 50%, rgba(124,110,247,0.9) 0%, #050a18 60%); opacity:0; }
          30% { background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,110,247,0.7) 0%, #050a18 70%); opacity:1; }
          100%{ background: radial-gradient(ellipse 200% 200% at 50% 50%, rgba(124,110,247,0.1) 0%, #050a18 60%); opacity:1; }
        }
      `;
      document.head.appendChild(style);
    }
    document.body.appendChild(fill);
  }, 750);

  // Step 4: Navigate to auth page
  setTimeout(() => {
    window.location.href = 'auth.html';
  }, 1350);
}

function spawnExplodeParticles(overlay) {
  const container = document.getElementById('explodeParticles');
  if (!container) return;

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  const colors = [
    'rgba(124,110,247,0.9)',
    'rgba(91,156,246,0.8)',
    'rgba(77,208,225,0.9)',
    'rgba(179,157,219,0.8)',
    'rgba(255,255,255,0.9)',
  ];

  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.className = 'explode-p';

    const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.3;
    const dist = 100 + Math.random() * 250;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const size = Math.random() * 8 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dur = 0.6 + Math.random() * 0.5;

    el.style.cssText = `
      left: ${cx}px;
      top: ${cy}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      --tx: ${tx}px;
      --ty: ${ty}px;
      animation-duration: ${dur}s;
      border-radius: ${Math.random() > 0.4 ? '50%' : '3px'};
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    container.appendChild(el);

    // Remove after animation
    setTimeout(() => el.remove(), dur * 1000 + 200);
  }
}

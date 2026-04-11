/* =============================================
   PARTICLE SYSTEM — UniVerse UMS  v2.0
   High-density, cursor-reactive particles
   ============================================= */

class ParticleSystem {
  constructor(canvasId, mode = 'calm') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mode = mode; // 'calm' | 'unstable'
    this.particles = [];
    this.animId = null;

    // Mouse tracked on window so it works through any overlay
    this.mouse = { x: -9999, y: -9999 };
    this.mouseVel = { x: 0, y: 0 };
    this._prevMouse = { x: -9999, y: -9999 };

    // Click ripple waves
    this.waves = [];

    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  /* ─── Canvas sizing ─── */
  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.W = this.canvas.width;
    this.H = this.canvas.height;
  }

  /* ─── Spawn all particles ─── */
  init() {
    this.particles = [];
    // AGENT 3: Doubled particle count — 480 calm / 640 unstable
    const count = this.mode === 'calm' ? 480 : 640;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  /* ─── Particle factory ─── */
  createParticle(randomPos = false) {
    const calm = this.mode === 'calm';

    // Brighter, more visible palettes
    const calmColors = [
      'rgba(124,110,247,',   // violet
      'rgba(91,156,246,',    // blue
      'rgba(77,208,225,',    // cyan
      'rgba(179,157,219,',   // lavender
      'rgba(160,190,240,',   // sky
      'rgba(200,215,245,',   // ice
      'rgba(110,200,230,',   // teal-blue
      'rgba(140,120,255,',   // bright violet
    ];
    const unstableColors = [
      'rgba(124,110,247,',
      'rgba(91,156,246,',
      'rgba(77,208,225,',
      'rgba(240,100,140,',
      'rgba(255,180,50,',
      'rgba(100,220,200,',
      'rgba(255,120,80,',
      'rgba(200,80,240,',
    ];

    const colors = calm ? calmColors : unstableColors;
    const color  = colors[Math.floor(Math.random() * colors.length)];

    // Larger, more visible sizes
    const size = calm
      ? Math.random() * 4.5 + 1.2
      : Math.random() * 5.5 + 1.5;

    const baseSpeed = calm
      ? Math.random() * 0.45 + 0.08
      : Math.random() * 2.2 + 0.7;

    const angle = Math.random() * Math.PI * 2;

    // Higher base opacity — much more visible now
    const baseOpacity = calm
      ? Math.random() * 0.45 + 0.25   // 0.25–0.70
      : Math.random() * 0.55 + 0.30;  // 0.30–0.85

    return {
      x: randomPos ? Math.random() * this.W : -size,
      y: randomPos ? Math.random() * this.H : Math.random() * this.H,
      size,
      baseSize: size,
      color,
      opacity: baseOpacity,
      targetOpacity: baseOpacity,
      vx: Math.cos(angle) * baseSpeed,
      vy: Math.sin(angle) * baseSpeed,
      baseSpeed,
      angle,
      // Oscillation
      oscillateX: Math.random() * 0.7,
      oscillateY: Math.random() * 0.7,
      oscillatePhase: Math.random() * Math.PI * 2,
      oscillateSpeed: Math.random() * 0.018 + 0.004,
      // Unstable jolts
      joltTimer: Math.random() * 120,
      joltInterval: calm ? 99999 : Math.random() * 80 + 40,
      joltVx: 0,
      joltVy: 0,
      joltDecay: 0.82,
      // Pulse
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.008,
      // Shape & rotation
      type: Math.random() < 0.25 ? 'square' : 'circle',
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      // Trail (unstable only)
      trail: [],
      trailMax: calm ? 0 : (Math.random() < 0.25 ? 6 : 0),
      // Cursor velocity influence (smooth drag)
      cvx: 0,
      cvy: 0,
    };
  }

  /* ─── Event bindings ─── */
  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.init();
    });

    // Track mouse on WINDOW (not canvas) — works through overlays
    window.addEventListener('mousemove', (e) => {
      this._prevMouse.x = this.mouse.x;
      this._prevMouse.y = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Cursor velocity (how fast mouse is moving)
      this.mouseVel.x = this.mouse.x - this._prevMouse.x;
      this.mouseVel.y = this.mouse.y - this._prevMouse.y;
    });

    // Hide mouse position when it leaves the page
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
      this.mouseVel.x = 0;
      this.mouseVel.y = 0;
    });

    // Click → spawn a ripple wave
    window.addEventListener('click', (e) => {
      this.waves.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        maxR: 280,
        alpha: 0.6,
        speed: 8,
      });
    });
  }

  /* ─── Update single particle ─── */
  update(p, t) {
    const calm = this.mode === 'calm';

    // Trail
    if (p.trailMax > 0) {
      p.trail.unshift({ x: p.x, y: p.y });
      if (p.trail.length > p.trailMax) p.trail.pop();
    }

    // Jolts (unstable mode)
    if (!calm) {
      p.joltTimer--;
      if (p.joltTimer <= 0) {
        p.joltTimer = p.joltInterval + Math.random() * 60;
        const joltAngle = Math.random() * Math.PI * 2;
        const joltPower = Math.random() * 5 + 2;
        p.joltVx = Math.cos(joltAngle) * joltPower;
        p.joltVy = Math.sin(joltAngle) * joltPower;
      }
      p.joltVx *= p.joltDecay;
      p.joltVy *= p.joltDecay;
    }

    // Oscillation
    const ox = Math.sin(t * p.oscillateSpeed + p.oscillatePhase) * p.oscillateX;
    const oy = Math.cos(t * p.oscillateSpeed + p.oscillatePhase + 1.5) * p.oscillateY;

    // ── CURSOR INTERACTION ──
    let mx = 0, my = 0;
    const dx = p.x - this.mouse.x;
    const dy = p.y - this.mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Zone 1: Close repulsion — strong push-away
    const repelRadius = calm ? 160 : 200;
    if (dist < repelRadius && dist > 0) {
      const force = Math.pow((repelRadius - dist) / repelRadius, 1.5);
      const repelPower = calm ? 3.5 : 5.5;
      mx = (dx / dist) * force * repelPower;
      my = (dy / dist) * force * repelPower;
    }

    // Zone 2: Outer attraction ring — pull toward cursor trail
    const attractRadius = calm ? 300 : 380;
    if (dist > repelRadius && dist < attractRadius) {
      const force = ((attractRadius - dist) / (attractRadius - repelRadius)) * 0.4;
      mx -= (dx / dist) * force * 0.8;
      my -= (dy / dist) * force * 0.8;
    }

    // Zone 3: Cursor velocity drag — nearby particles trail the cursor movement
    const velRadius = calm ? 200 : 260;
    if (dist < velRadius && dist > 0) {
      const velInfluence = (1 - dist / velRadius) * (calm ? 0.08 : 0.14);
      p.cvx += this.mouseVel.x * velInfluence;
      p.cvy += this.mouseVel.y * velInfluence;
    }

    // Dampen cursor velocity influence
    p.cvx *= 0.85;
    p.cvy *= 0.85;

    // Wave ripple push
    let wx = 0, wy = 0;
    for (const wave of this.waves) {
      const wdx = p.x - wave.x;
      const wdy = p.y - wave.y;
      const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
      const waveFront = 18; // thickness of wave ring effect
      if (Math.abs(wdist - wave.r) < waveFront && wdist > 0) {
        const wForce = (1 - Math.abs(wdist - wave.r) / waveFront) * wave.alpha * 3;
        wx = (wdx / wdist) * wForce;
        wy = (wdy / wdist) * wForce;
      }
    }

    // Move
    p.x += p.vx + ox + p.joltVx + mx + p.cvx + wx;
    p.y += p.vy + oy + p.joltVy + my + p.cvy + wy;
    p.rotation += p.rotSpeed;

    // Pulse opacity & size
    const pulse = 0.65 + 0.35 * Math.sin(t * p.pulseSpeed + p.pulsePhase);
    p.opacity = p.targetOpacity * pulse;
    p.size    = p.baseSize * (0.88 + 0.12 * Math.sin(t * p.pulseSpeed * 1.3 + p.pulsePhase));

    // Boost opacity/size when near cursor
    if (dist < repelRadius) {
      const boost = 1 - dist / repelRadius;
      p.opacity = Math.min(p.opacity + boost * 0.35, 0.95);
      p.size    = p.size * (1 + boost * 0.5);
    }

    // Wrap edges
    const margin = p.size + 12;
    if (p.x < -margin)      p.x = this.W + margin;
    if (p.x > this.W + margin) p.x = -margin;
    if (p.y < -margin)      p.y = this.H + margin;
    if (p.y > this.H + margin) p.y = -margin;
  }

  /* ─── Draw single particle ─── */
  draw(p) {
    const ctx = this.ctx;

    // Draw trail
    if (p.trail.length > 0) {
      for (let i = 0; i < p.trail.length; i++) {
        const ratio = 1 - i / p.trail.length;
        ctx.beginPath();
        ctx.arc(p.trail[i].x, p.trail[i].y, p.size * ratio * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.opacity * ratio * 0.35) + ')';
        ctx.fill();
      }
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;

    if (p.type === 'square') {
      const s = p.size * 1.3;
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.beginPath();
      ctx.roundRect(-s / 2, -s / 2, s, s, s * 0.28);
      ctx.fill();

      // Square glow halo
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.8);
      grd.addColorStop(0, p.color + (p.opacity * 0.4) + ')');
      grd.addColorStop(1, p.color + '0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, s * 1.8, 0, Math.PI * 2);
      ctx.fill();

    } else {
      // Outer glow
      const glowR = p.size * 2.8;
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
      grd.addColorStop(0,   p.color + (p.opacity * 0.9) + ')');
      grd.addColorStop(0.3, p.color + (p.opacity * 0.55) + ')');
      grd.addColorStop(0.7, p.color + (p.opacity * 0.18) + ')');
      grd.addColorStop(1,   p.color + '0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Solid bright core
      ctx.fillStyle = p.color + Math.min(p.opacity * 1.8, 1.0) + ')';
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // Tiny white spark at center
      ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.7})`;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /* ─── Draw connection lines ─── */
  drawConnections() {
    const ctx = this.ctx;
    // Slightly reduced connection distance to keep lines manageable with 2x particles
    const maxDist  = this.mode === 'calm' ? 90 : 75;
    const maxConn  = this.mode === 'calm' ? 3 : 4;

    for (let i = 0; i < this.particles.length; i++) {
      let connCount = 0;
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        if (connCount >= maxConn) break;
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          // Boost line alpha near cursor
          const cd1 = Math.sqrt((p1.x - this.mouse.x) ** 2 + (p1.y - this.mouse.y) ** 2);
          const cd2 = Math.sqrt((p2.x - this.mouse.x) ** 2 + (p2.y - this.mouse.y) ** 2);
          const nearCursor = Math.min(cd1, cd2) < 200 ? 2.5 : 1;
          const alpha = (1 - dist / maxDist) * 0.18 * nearCursor;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(124,110,247,${Math.min(alpha, 0.55)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
          connCount++;
        }
      }
    }
  }

  /* ─── Draw cursor ripple waves ─── */
  drawWaves() {
    const ctx = this.ctx;
    for (let i = this.waves.length - 1; i >= 0; i--) {
      const w = this.waves[i];
      ctx.beginPath();
      ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(124,110,247,${w.alpha * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner pulse ring
      if (w.r > 40) {
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(77,208,225,${w.alpha * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      w.r += w.speed;
      w.alpha *= 0.92;
      w.speed *= 0.97;
      if (w.r > w.maxR || w.alpha < 0.01) this.waves.splice(i, 1);
    }
  }

  /* ─── Draw cursor glow halo ─── */
  drawCursorHalo() {
    if (this.mouse.x < 0) return;
    const ctx = this.ctx;
    const r = 180;
    const grd = ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 0,
      this.mouse.x, this.mouse.y, r
    );
    grd.addColorStop(0,   'rgba(124,110,247,0.10)');
    grd.addColorStop(0.4, 'rgba(91,156,246,0.05)');
    grd.addColorStop(1,   'rgba(77,208,225,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(this.mouse.x, this.mouse.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ─── Main animation loop ─── */
  animate() {
    let t = 0;
    const loop = () => {
      this.ctx.clearRect(0, 0, this.W, this.H);
      t++;

      this.drawCursorHalo();
      this.drawWaves();
      this.drawConnections();

      for (const p of this.particles) {
        this.update(p, t);
        this.draw(p);
      }

      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

// Expose globally
window.ParticleSystem = ParticleSystem;

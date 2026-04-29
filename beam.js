/**
 * ============================================
 * SPECIMEN: LEAK-WORM-TEMPLATE
 * ORGAN: ELECTRON SENSORY SYSTEM
 * ============================================
 *
 * STATUS: TUNED
 * FUNCTION: The specimen's eye. Vertical electron beam, scanning the
 *           viewport top to bottom. When the beam intersects text,
 *           phosphor excitation surfaces — brief luminous contact
 *           that reveals hidden layers of meaning.
 * DEPENDENCIES: decay-core.js (lifecycle sync), config.js (visual parameters)
 *
 * SURGICAL NOTES:
 * The beam responds to metabolic state. Rapid scanning during panic
 * (searching for escape), slow drift during decay (failing vision),
 * cessation at death. Pirate mode restores ocean-rhythm scanning at
 * 8 seconds per cycle.
 *
 * Pattern recognition handles 20+ distinct text element types,
 * suggesting evolved discrimination. Collision detection is viewport-
 * culled — only checking visible elements per cycle.
 *
 * FREQUENCY: the gaze that finds words and lights them.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */

class BeamModule {
  constructor() {
    // Optical components
    this.system = null;      // Container
    this.body = null;        // Primary beam
    this.glow = null;        // Phosphor aura
    this.hotspot = null;     // Contact point
    this.root = document.documentElement;

    // Vision processing state
    this.isPaused = false;
    this.collisionCheckInterval = null;
    this.currentSpeed = 8;
  }

  // ==========================================
  // ACTIVATION — Iris opening
  // ==========================================

  init() {
    this.createBeamElements();
    this.setRandomStart();
    this.startCollisionDetection();

    // Subscribe to organism lifecycle
    if (window.decay) {
      window.decay.subscribe((stage, progress) => {
        this.syncToDecay(stage, progress);
      });
    }
  }

  // ==========================================
  // RETINAL STRUCTURE — DOM assembly
  // ==========================================

  createBeamElements() {
    const container = document.createElement('div');
    container.className = 'beam-system';
    container.id = 'beamSystem';
    container.innerHTML = `
      <div class="beam-glow" id="beamGlow"></div>
      <div class="beam-body" id="beamBody"></div>
      <div class="beam-hotspot" id="beamHotspot"></div>
    `;

    document.body.appendChild(container);

    this.system = document.getElementById('beamSystem');
    this.body = document.getElementById('beamBody');
    this.glow = document.getElementById('beamGlow');
    this.hotspot = document.getElementById('beamHotspot');
  }

  // ==========================================
  // SACCADIC VARIATION — Random starting position prevents synchronized scanning
  // ==========================================

  setRandomStart() {
    const startPercent = Math.random() * 0.5;
    this.root.style.setProperty('--beam-start-position', `-${startPercent * 100}%`);

    const delay = Math.random() * -this.currentSpeed;
    [this.body, this.glow, this.hotspot].forEach(el => {
      el.style.animationDelay = `${delay}s`;
    });
  }

  // ==========================================
  // METABOLIC SYNC — Beam behavior follows organism health
  // ==========================================

  syncToDecay(stage, progress) {
    const speeds = {
      healthy: 8,    // Calm observation
      panic:   5,    // Frantic searching
      decay:   15,   // Sluggish drift
      death:   0,    // Vision cessation
      pirate:  8     // Ocean rhythm restored
    };

    const newSpeed = speeds[stage] || 8;

    if (newSpeed !== this.currentSpeed) {
      this.currentSpeed = newSpeed;
      this.root.style.setProperty('--beam-speed', newSpeed + 's');

      // Stop scanning at death
      if (stage === 'death') {
        this.pause();
      }
    }

    // Color mutations propagate via CSS variables from decay-core
  }

  // ==========================================
  // PATTERN RECOGNITION — Text contact detection
  // ==========================================

  startCollisionDetection() {
    // Refresh rate adapts to viewport — slower checks on narrow screens
    const isMobile = window.innerWidth < 768;
    const checkInterval = isMobile ? 50 : 25;

    this.collisionCheckInterval = setInterval(() => {
      if (this.isPaused || !this.body) return;

      // Beam center coordinate
      const beamRect = this.body.getBoundingClientRect();
      const beamY = beamRect.top + beamRect.height / 2;

      // Viewport culling — only check elements near visible area
      const buffer = isMobile ? 100 : 200;
      const viewportTop = window.scrollY - buffer;
      const viewportBottom = window.scrollY + window.innerHeight + buffer;

      // Pattern library — every detectable text element class
      const targets = document.querySelectorAll(
        '.gate-title, .membrane-input, ' +
        '.screen-title, .screen-subtitle, .sub-subtitle, ' +
        '.detail-text, .pirate-comment, .callout-text, ' +
        '.equation-label, .parenthetical, .redacted-text, ' +
        '.list-item, .quote, .membrane-button, ' +
        '.sentence, .blink-dot, ' +
        '.reward-header, .reward-title, .reward-subtitle, ' +
        '.footer-tag, .footer-credit, .reward-dot'
      );

      let hitSomething = false;

      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;

        // Skip off-screen elements
        if (elementTop < viewportTop || elementTop > viewportBottom) {
          return;
        }

        const targetY = rect.top + rect.height / 2;

        // Contact threshold — minimum element height for collision
        const minHeight = 20;
        const effectiveHeight = Math.max(rect.height, minHeight);
        const padding = (effectiveHeight - rect.height) / 2;

        const topBound = rect.top - padding;
        const bottomBound = rect.bottom + padding;
        const isInBounds = beamY >= topBound && beamY <= bottomBound;
        const distance = Math.abs(beamY - targetY);

        // Phosphor excitation — visual contact response
        if (isInBounds && distance < 40) {
          this.glow.classList.add('approaching');
          target.classList.add('beam-approaching');

          // Direct contact — maximum excitation
          if (distance < Math.max(10, rect.height / 2)) {
            target.classList.add('beam-contact');
            this.hotspot.classList.add('active');
            hitSomething = true;
          } else {
            target.classList.remove('beam-contact');
          }
        } else {
          target.classList.remove('beam-contact', 'beam-approaching');
        }
      });

      // No contact — relaxation state
      if (!hitSomething) {
        this.hotspot.classList.remove('active');
        this.glow.classList.remove('approaching');
      }
    }, checkInterval);
  }

  // ==========================================
  // VISION CONTROL — Pause and resume scanning
  // ==========================================

  pause() {
    this.isPaused = true;
    [this.body, this.glow, this.hotspot].forEach(el => {
      if (el) el.style.animationPlayState = 'paused';
    });
  }

  resume() {
    this.isPaused = false;
    [this.body, this.glow, this.hotspot].forEach(el => {
      if (el) el.style.animationPlayState = 'running';
    });
  }

  // ==========================================
  // DISPOSAL
  // ==========================================

  destroy() {
    if (this.collisionCheckInterval) {
      clearInterval(this.collisionCheckInterval);
    }
    if (this.system) {
      this.system.remove();
    }
  }
}

// ==========================================
// DEPENDENCY CHECK
// ==========================================

if (typeof CONFIG === 'undefined') {
  console.error('❌ beam.js requires config.js');
}
if (typeof decay === 'undefined') {
  console.error('❌ beam.js requires decay-core.js');
}

/**
 * ============================================
 * SPECIMEN: LEAK-WORM-TEMPLATE
 * ORGAN: ATMOSPHERIC DRIFT MECHANISM
 * ============================================
 *
 * STATUS: TUNED
 * FUNCTION: Environmental particle field — three-layer atmosphere that
 *           propagates depth perception through differential drift.
 *           Particles rise like phosphor dust from the organism's metabolism.
 * DEPENDENCIES: decay-core.js (lifecycle sync), beam.js (collision reveal)
 *
 * SURGICAL NOTES:
 * Three depth strata, each drifting at different speeds (parallax effect):
 *
 *   FAR  — 25 particles, smallest, heavily blurred (background)
 *   MID  — 18 particles, medium size, moderate blur (midground)
 *   NEAR — 7 particles, largest, sharpest (foreground)
 *
 * Particles illuminate when the electron beam passes — trace phosphor
 * compounds in their composition surfacing under contact. During decay
 * the atmosphere thins; during death it nearly vanishes. The breathable
 * envelope of the organism degrades with the organism.
 *
 * FREQUENCY: depth made visible through differential drift.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */

class ParticleDrift {
  constructor() {
    this.root = document.documentElement;

    // Mobile detection — reduce particle count on smaller devices
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const particleMultiplier = this.isMobile ? 0.6 : 1.0;

    // Three depth strata
    this.layers = {
      far: {
        count: Math.floor(25 * particleMultiplier),
        sizeRange: [1.5, 3],
        blurRange: [3, 5],      // Heavy atmospheric haze
        speed: 60,              // Slowest drift
        field: null
      },
      mid: {
        count: Math.floor(18 * particleMultiplier),
        sizeRange: [2, 4],
        blurRange: [1, 2],      // Moderate blur
        speed: 35,              // Medium drift
        field: null
      },
      near: {
        count: Math.floor(7 * particleMultiplier),
        sizeRange: [3, 5],
        blurRange: [0, 0.5],    // Sharpest focus
        speed: 15,              // Fastest drift
        field: null
      }
    };

    this.decayState = 'healthy';
  }

  // ==========================================
  // ACTIVATION — Atmosphere arrives
  // ==========================================

  init() {
    this.createParticleFields();
    this.populateAllLayers();

    // Subscribe to organism lifecycle
    if (window.decay) {
      window.decay.subscribe((stage, progress) => {
        this.syncToDecay(stage, progress);
      });
    }

    // Beam interaction — phosphor excitation on contact
    if (window.beam) {
      this.integrateWithBeam();
    }
  }

  // ==========================================
  // SPATIAL CHAMBERS — DOM containers for each stratum
  // ==========================================

  createParticleFields() {
    const container = document.createElement('div');
    container.className = 'particle-container';
    container.innerHTML = `
      <div class="particle-field" id="particles-far"></div>
      <div class="particle-field" id="particles-mid"></div>
      <div class="particle-field" id="particles-near"></div>
    `;
    document.body.appendChild(container);

    this.layers.far.field = document.getElementById('particles-far');
    this.layers.mid.field = document.getElementById('particles-mid');
    this.layers.near.field = document.getElementById('particles-near');
  }

  // ==========================================
  // ATMOSPHERIC POPULATION — Particles arrive into each stratum
  // ==========================================

  populateAllLayers() {
    Object.entries(this.layers).forEach(([name, layer]) => {
      this.populateLayer(name, layer);
    });
  }

  populateLayer(name, layer) {
    layer.field.innerHTML = '';

    for (let i = 0; i < layer.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.dataset.layer = name;

      // Horizontal distribution — bell curve clustering
      const x = this.gaussianRandom(50, 20);
      particle.style.left = Math.max(5, Math.min(95, x)) + '%';

      // Size variation within stratum range
      const size = layer.sizeRange[0] +
                   Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]);
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      // Atmospheric blur — depth simulation
      const blur = layer.blurRange[0] +
                  Math.random() * (layer.blurRange[1] - layer.blurRange[0]);
      particle.style.filter = `blur(${blur}px)`;
      particle.dataset.baseBlur = blur;

      // Drift phase — staggered start prevents synchronized rise
      const delay = -Math.random() * layer.speed;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${layer.speed}s`;

      layer.field.appendChild(particle);
    }
  }

  // ==========================================
  // STATISTICAL DISTRIBUTION — Natural clustering via Box-Muller
  // ==========================================

  gaussianRandom(mean, stdDev) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z0 * stdDev;
  }

  // ==========================================
  // ATMOSPHERIC DECAY — Visibility tracks organism health
  // ==========================================

  syncToDecay(stage, progress) {
    this.decayState = stage;

    const opacityMultipliers = {
      healthy: 1.0,    // Full atmosphere
      panic:   0.8,    // Slight thinning
      decay:   0.5,    // Heavy degradation
      death:   0.2     // Near vacuum
    };

    const multiplier = opacityMultipliers[stage] || 1.0;
    this.root.style.setProperty('--particle-decay-multiplier', multiplier);

    // Selective extinction during decay and death
    if (stage === 'decay') {
      this.fadeOutRandomParticles(0.4);
    } else if (stage === 'death') {
      this.fadeOutRandomParticles(0);
    }
  }

  fadeOutRandomParticles(targetRatio) {
    Object.values(this.layers).forEach(layer => {
      const particles = layer.field.querySelectorAll('.particle');
      const targetCount = Math.floor(particles.length * targetRatio);

      particles.forEach((p, i) => {
        if (i >= targetCount) {
          p.style.transition = 'opacity 2s ease-out';
          p.style.opacity = '0';
        }
      });
    });
  }

  // ==========================================
  // PHOSPHOR EXCITATION — Particles illuminate near beam contact
  // ==========================================

  integrateWithBeam() {
    if (!window.beam || !window.beam.body) return;

    setInterval(() => {
      const beamBody = window.beam.body;
      if (!beamBody) return;

      const beamRect = beamBody.getBoundingClientRect();
      const beamY = beamRect.top + beamRect.height / 2;

      document.querySelectorAll('.particle').forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleY = rect.top + rect.height / 2;
        const distance = Math.abs(beamY - particleY);

        const layer = particle.dataset.layer;

        // Excitation range varies by stratum sensitivity
        const range = layer === 'far' ? 120 :
                     layer === 'mid' ? 90  : 60;

        if (distance < range) {
          // Brightness boost based on proximity, base blur preserved
          const intensity = 1 - (distance / range);
          particle.classList.add('beam-revealed');

          const baseBlur = parseFloat(particle.dataset.baseBlur) || 0;
          const brightness = 1 + (intensity * 0.8);
          particle.style.filter = `blur(${baseBlur}px) brightness(${brightness})`;

        } else {
          // Beam passed — return to baseline
          particle.classList.remove('beam-revealed');
          const baseBlur = parseFloat(particle.dataset.baseBlur) || 0;
          particle.style.filter = `blur(${baseBlur}px)`;
        }
      });
    }, 40);
  }

  // ==========================================
  // DISPOSAL
  // ==========================================

  destroy() {
    const container = document.querySelector('.particle-container');
    if (container) container.remove();
  }
}

// ==========================================
// DEPENDENCY CHECK
// ==========================================

if (typeof CONFIG === 'undefined') {
  console.error('❌ particles.js requires config.js');
}
if (typeof decay === 'undefined') {
  console.error('❌ particles.js requires decay-core.js');
}

/**
 * ============================================
 * SPECIMEN: LEAK-WORM-TEMPLATE
 * ORGAN: LIFECYCLE CONTROLLER
 * ============================================
 *
 * STATUS: TUNED
 * FUNCTION: The organism's heartbeat. Regulates all metabolic phases.
 *           Beats once every 100ms, broadcasting state to every other organ.
 * DEPENDENCIES: config.js (vital signs). All other organs subscribe here.
 *
 * SURGICAL NOTES:
 * Primary pulse retriever. Checks elapsed time since last consciousness-
 * contact and propagates the organism through its natural decay arc.
 * Broadcasts metabolic state changes via neural pathways (pub-sub pattern).
 *
 * Death and metamorphosis protocols are hardcoded into this tissue.
 * Once triggered, they execute autonomously — cellular cascade is
 * irreversible after death sequence begins. The organism can be
 * sustained by user stimuli only until that threshold.
 *
 * Pirate transformation is alternate death — metamorphosis into ocean
 * consciousness rather than termination. Same finality, different shore.
 *
 * FREQUENCY: the pulse the rest of the organism reads time from.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */

const decay = {

  // ==========================================
  // VITAL SIGNS — Current organism state
  // ==========================================

  stage: 'healthy',        // Current metabolic phase
  progress: 0,             // Phase completion (0–1)
  lastInteraction: null,   // Last consciousness-contact timestamp
  timer: null,             // Heartbeat interval ID
  listeners: [],           // Subscribed organs
  isDead: false,           // Termination flag

  // METAMORPHOSIS STATE — Transformation tracking
  isTransitioning: false,
  transitionStartTime: null,
  transitionDuration: null,
  transitionCallback: null,
  transitionToStage: null,
  previousStage: null,

  // ==========================================
  // BIRTH SEQUENCE — First breath
  // ==========================================

  start() {
    this.isDead = false;
    this.isTransitioning = false;
    this.lastInteraction = Date.now();

    // Heartbeat at 100ms cadence
    this.timer = setInterval(() => this.update(), 100);

    // Alert all subscribed organs
    this.notify();
  },

  // ==========================================
  // REVIVAL RESPONSE — Consciousness contact resets the metabolism
  // ==========================================

  reset() {
    if (this.isDead || this.isTransitioning) return;
    this.lastInteraction = Date.now();
  },

  // ==========================================
  // METABOLIC PULSE — Core lifecycle loop, fires every 100ms
  // ==========================================

  update() {
    // Transformation takes its own update path
    if (this.isTransitioning) {
      this.updateTransition();
      return;
    }

    if (this.isDead) return;

    const elapsed = Date.now() - this.lastInteraction;
    const timing = CONFIG.timings.standard;
    const oldStage = this.stage;

    // Phase determination — which arc are we in
    if (elapsed < timing.healthy) {
      this.stage = 'healthy';
      this.progress = elapsed / timing.healthy;

    } else if (elapsed < timing.healthy + timing.panic) {
      this.stage = 'panic';
      const timeInPanic = elapsed - timing.healthy;
      this.progress = timeInPanic / timing.panic;

    } else if (elapsed < timing.healthy + timing.panic + timing.decay) {
      this.stage = 'decay';
      const timeInDecay = elapsed - timing.healthy - timing.panic;
      this.progress = timeInDecay / timing.decay;

    } else if (elapsed < timing.healthy + timing.panic + timing.decay + timing.death) {
      this.stage = 'death';
      const timeInDeath = elapsed - timing.healthy - timing.panic - timing.decay;
      this.progress = timeInDeath / timing.death;

      // Terminal threshold crossed
      if (this.progress >= 1.0) {
        this.beginDeath();
        return;
      }

    } else {
      // Failsafe termination if timing math overflows
      this.beginDeath();
      return;
    }

    this.notify();
  },

  // ==========================================
  // METAMORPHOSIS ENGINE — Smooth transitions for death and pirate descent
  // ==========================================

  startTransition(toStage, duration, onComplete) {
    // Preserve pre-transition state for color interpolation
    this.previousStage = this.stage;

    // Suspend normal metabolism during transformation
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    this.isTransitioning = true;
    this.transitionStartTime = Date.now();
    this.transitionDuration = duration;
    this.transitionToStage = toStage;
    this.transitionCallback = onComplete;

    // Special transition heartbeat
    this.timer = setInterval(() => this.updateTransition(), 100);
  },

  updateTransition() {
    const elapsed = Date.now() - this.transitionStartTime;
    this.progress = Math.min(elapsed / this.transitionDuration, 1.0);
    this.stage = this.transitionToStage;

    this.notify();

    if (this.progress >= 1.0) {
      clearInterval(this.timer);
      this.timer = null;
      this.isTransitioning = false;

      const callback = this.transitionCallback;
      this.transitionCallback = null;

      if (callback) callback();
    }
  },

  // ==========================================
  // DEATH PROTOCOL — Terminal sequence, irreversible
  // ==========================================

  beginDeath() {
    if (this.isDead) return;

    const timing = CONFIG.timings.standard;
    const deathDuration = timing.death || 2000;

    // Gasp reflex — content dissolves at 75% through death transition
    setTimeout(() => {
      const pageContainer = document.getElementById('pageContainer');
      if (pageContainer) {
        pageContainer.style.display = 'none';
      }

      // Trigger terminal display
      if (window.prepareDeathScreen) {
        window.prepareDeathScreen();
      }
    }, deathDuration * 0.75);

    // Smooth fade to termination
    this.startTransition('death', deathDuration, () => {
      this.isDead = true;
    });
  },

  // ==========================================
  // OCEAN METAMORPHOSIS — Pirate transformation, 7-second descent
  // ==========================================

  enterPirateMode(onFadeComplete) {
    const fadeOutDuration = CONFIG.timings.pirate.fadeOutDuration || 3000;
    const fullDuration = CONFIG.timings.pirate.colorShiftDuration || 7000;

    this.startTransition('pirate', fullDuration, () => {
      // Depth reached — content dissolves
      this.isDead = true;

      const pageContainer = document.getElementById('pageContainer');
      if (pageContainer) {
        pageContainer.style.display = 'none';
      }
    });

    // Mid-transition: pressure equalization, reward screen surfaces
    setTimeout(() => {
      if (onFadeComplete) onFadeComplete();
    }, fadeOutDuration);
  },

  // ==========================================
  // NEURAL NETWORK — Pub/sub for organ coordination
  // ==========================================

  subscribe(callback) {
    if (typeof callback !== 'function') return;
    this.listeners.push(callback);
  },

  notify() {
    this.listeners.forEach(callback => {
      try {
        callback(this.stage, this.progress);
      } catch (error) {
        // Silent failure — organism continues
      }
    });
  },

  // ==========================================
  // SURGICAL TOOLS — Manual intervention for testing
  // ==========================================

  setStage(stage, progress = 0) {
    this.stage = stage;
    this.progress = progress;
    this.notify();
  },

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  resume() {
    if (!this.timer && !this.isDead && !this.isTransitioning) {
      this.timer = setInterval(() => this.update(), 100);
    }
  },

  // ==========================================
  // DISPOSAL — Clean termination
  // ==========================================

  destroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.listeners = [];
    this.isDead = false;
    this.isTransitioning = false;
  }
};

// ==========================================
// DEPENDENCY CHECK
// ==========================================

if (typeof CONFIG === 'undefined') {
  console.error('❌ decay-core.js requires config.js to be loaded first');
}

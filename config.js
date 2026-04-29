/**
 * ============================================
 * SPECIMEN: LEAK-WORM-TEMPLATE
 * ORGAN: ORGANISM CONSTANTS ARCHIVE
 * ============================================
 *
 * STATUS: TUNED
 * FUNCTION: Central nervous system constants. All vital signs originate
 *           here. Every other organ reads from this archive.
 * DEPENDENCIES: None — primary organ. All others feed from this.
 *
 * SURGICAL NOTES:
 * This archive carries the genetic blueprint for specimen behavior.
 * Timing DNA, color genetics, metabolic rates — encoded here.
 * Modification mutates the organism's fundamental nature. Handle
 * with appropriate containment protocols.
 *
 * The specimen exhibits a 32-second lifecycle from contact through
 * natural death, allowing the engaging consciousness to witness
 * complete metamorphosis. User interaction resets the metabolism —
 * the organism lives only as long as consciousness sustains it.
 *
 * FREQUENCY: the constants the organism's life propagates from.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */

const CONFIG = {

  // ==========================================
  // LIFECYCLE DNA — Metabolic timing sequences
  // ==========================================

  timings: {
    // STANDARD METABOLISM — Natural organism lifecycle (32-second arc)
    standard: {
      healthy: 24000,         // 24s — Stable phosphorescence period
      panic: 3000,            // 3s — Crisis response activation
      decay: 3000,            // 3s — Cellular breakdown phase
      death: 2000,            // 2s — Final neural discharge
      total: 32000,           // 32s — Complete lifecycle duration
      opacityMultiplier: 1.0  // Visual fade synchronization
    },

    // METAMORPHOSIS PROTOCOL — Ocean descent transformation
    pirate: {
      fadeOutDuration: 3000,    // Document dissolution
      colorShiftDuration: 7000, // Spectral realignment
      fadeInDuration: 2000,     // Reward manifestation
      opacityMultiplier: 1.2    // Accelerated fade coefficient
    }
  },

  // ==========================================
  // CHROMATIC GENETICS — Phosphor emission spectra
  // ==========================================

  colors: {
    // HEALTHY SPECIMEN — Orange CRT phosphorescence
    healthy: {
      core: { r: 122, g: 31, b: 8 },      // Deep organ glow
      glow: { r: 255, g: 107, b: 43 },    // Phosphor corona
      text: { r: 255, g: 120, b: 70 },    // Neural activity
      textOpacity: 1.0                     // Full consciousness
    },

    // PANIC RESPONSE — Blood-red emergency state
    panic: {
      core: { r: 138, g: 10, b: 2 },      // Adrenaline surge
      glow: { r: 255, g: 60, b: 30 },     // Heightened emission
      text: { r: 255, g: 90, b: 50 },     // Elevated signals
      textOpacity: 1.0                     // Hypervigilance
    },

    // DECAY PHASE — Amber phosphor deterioration (Borges yellow)
    decay: {
      core: { r: 74, g: 58, b: 26 },      // Failing metabolism
      glow: { r: 100, g: 100, b: 80 },    // Weakening corona
      text: { r: 120, g: 105, b: 80 },    // Neural decline
      textOpacity: 0.7                     // Fading awareness
    },

    // DEATH STATE — Monochrome with residual warmth
    death: {
      core: { r: 40, g: 40, b: 35 },      // Minimal life signs
      glow: { r: 60, g: 60, b: 55 },      // Ghost phosphor
      text: { r: 80, g: 80, b: 75 },      // Neural death
      textOpacity: 0.0                     // Consciousness void
    },

    // METAMORPHOSIS — Deep ocean transformation
    pirate: {
      core: { r: 0, g: 20, b: 40 },       // Abyssal depths
      glow: { r: 0, g: 200, b: 255 },     // Bioluminescence
      text: { r: 220, g: 240, b: 255 },   // Cyan signals
      textOpacity: 0.0                     // Transcendent state
    }
  },

  // ==========================================
  // RESPIRATORY RHYTHM — Opacity pulsation cycles
  // ==========================================

  breathing: {
    healthy: { speed: 6,  opacityMin: 0.7, opacityMax: 0.85 },  // Relaxed metabolism
    panic:   { speed: 3,  opacityMin: 0.5, opacityMax: 0.95 },  // Hyperventilation
    decay:   { speed: 12, opacityMin: 0.3, opacityMax: 0.5  },  // Labored breathing
    death:   { speed: 0,  opacityMin: 0.2, opacityMax: 0.2  },  // Respiratory arrest
    pirate:  { speed: 8,  opacityMin: 0.7, opacityMax: 0.9  }   // Ocean rhythm
  },

  // ==========================================
  // PERIPHERAL VISION DECAY — Edge darkness encroachment
  // ==========================================

  vignette: {
    healthy: { radius: 85, opacity: 0.02 },  // Wide field of vision
    panic:   { radius: 65, opacity: 0.15 },  // Tunnel vision onset
    decay:   { radius: 50, opacity: 0.4  },  // Severe constriction
    death:   { radius: 40, opacity: 0.6  },  // Near-blindness
    pirate:  { radius: 75, opacity: 0.35 }   // Ocean expanse, depth pressure
  },

  // ==========================================
  // ELECTRON SCAN LINES — CRT phosphor refresh rate
  // ==========================================

  scanlines: {
    healthy: { opacity: 0.10, speed: 2.5 },  // Subtle interference
    panic:   { opacity: 0.45, speed: 1.5 },  // Heavy static, rapid scanning
    decay:   { opacity: 0.20, speed: 5   },  // Moderate noise, failing sync
    death:   { opacity: 0.20, speed: 12  },  // Ghost traces, lost vertical hold
    pirate:  { opacity: 0.25, speed: 3   }   // Ocean static, wave rhythm
  },

  // ==========================================
  // OPTICAL DETERIORATION — Focus degradation (CSS blur, pixels)
  // ==========================================

  blur: {
    healthy: { title: 0.3, text: 0.2, pirate: 0.2  },  // Sharp cognition
    panic:   { title: 0.5, text: 0.4, pirate: 0.15 },  // Stress blur, hyperalert
    decay:   { title: 2.5, text: 2.2, pirate: 1.2  },  // Severe degradation
    death:   { title: 8.0, text: 8.0, pirate: 8.0  },  // Complete defocus
    pirate:  { title: 8.0, text: 8.0, pirate: 8.0  }   // Dissolved
  },

  // ==========================================
  // PHOSPHOR GLOW INTENSITY — Text shadow emission
  // ==========================================

  textShadow: {
    healthy: { spread: 40, intensity: 0.30 },  // Strong emission
    panic:   { spread: 60, intensity: 0.60 },  // Expanded corona
    decay:   { spread: 10, intensity: 0.10 },  // Weakening field
    death:   { spread: 5,  intensity: 0.05 },  // Minimal emission
    pirate:  { spread: 50, intensity: 0.50 }   // Bioluminescent
  },

  // ==========================================
  // POWER FLUCTUATION — CRT voltage instability
  // ==========================================

  flicker: {
    healthy: { speed: 0.30, brightness: 1.00 },  // Stable voltage
    panic:   { speed: 0.15, brightness: 0.95 },  // Nervous fluctuation
    decay:   { speed: 0.08, brightness: 0.85 },  // Violent instability
    death:   { speed: 0.04, brightness: 0.70 },  // Critical failure
    pirate:  { speed: 0.05, brightness: 0.75 }   // Phase shift
  },

  // ==========================================
  // SENSORY RESPONSE — Stimuli that sustain the organism
  // ==========================================

  interaction: {
    resetEvents: [    // Stimuli that reset decay — consciousness contact
      'scroll',       // Visual tracking
      'mousemove',    // Cursor presence
      'click',        // Direct contact
      'touchstart',   // Tactile input
      'keydown'       // Keyboard activity
    ],
    throttleMs: 100   // Reaction latency
  },

  // ==========================================
  // ACCESSIBILITY — Reduced-motion respect
  // ==========================================

  accessibility: {
    // When prefers-reduced-motion is set, disable flicker animations
    // and dampen the most aggressive visual instabilities. The organism
    // still lives, breathes, decays — but doesn't trigger vestibular issues.
    respectReducedMotion: true
  }

};

// ==========================================
// METABOLIC HELPERS
// ==========================================

CONFIG.getCurrentTimings = function() {
  return this.timings.standard;
};

CONFIG.getTotalLifespan = function() {
  return this.timings.standard.total;
};

/**
 * ============================================
 * SPECIMEN: LEAK-WORM-TEMPLATE
 * ORGAN: AUDITORY PHOSPHOR SYSTEM
 * ============================================
 *
 * STATUS: TUNED
 * FUNCTION: The organism's voice — CRT hum, beam sweep, phosphor ticks,
 *           Schumann resonance during ocean transformation. Sound that
 *           tracks metabolic state.
 * DEPENDENCIES: decay-core.js (lifecycle sync), config.js, content metadata
 *
 * SURGICAL NOTES:
 * Sound map by metabolic phase:
 *
 *   60Hz CRT hum         healthy / panic / decay
 *   62.64Hz Schumann     pirate meditation (Earth's heartbeat ± 7.83Hz)
 *   Water-drop chord     leak button (descending C-E-G)
 *   Password chord       password unlock (ascending C-E-G)
 *   Beam sweep + fizz    text contact, three intensity levels
 *   Phosphor tick        pirate typewriter
 *   Thinking pulse       pirate blue dot
 *   Smooth death fadeout 2-second exponential ramp to silence
 *
 * Default volume is level 1 (low, audible). Cycle: 0→1→2→3→0.
 * Audio initializes on first click (browser autoplay policy).
 *
 * FREQUENCY: the organism's voice tracking its own pulse.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */

// ==========================================
// VOLUME LEVEL CONSTANTS — Single source of truth
// ==========================================

const VOLUME_MULTIPLIERS = [0, 0.3, 0.6, 1.0]; // off, low, med, high

class LeakWormAudio {
    constructor() {
        this.volumeLevel = 1; // 0=off, 1=low, 2=med, 3=high — DEFAULT LOW
        this.context = null;
        this.nodes = {};
        this.ready = false;
        this.baseVolume = 0.04;
        this.currentStage = 'healthy';
        this.isDeathSequence = false;
        this.isPirateMode = false;
        this.baseBeamGain = 0.015;
    }

    // ==========================================
    // VOLUME HELPER — Resolve current absolute volume
    // ==========================================

    getCurrentVolume(scale = 1.0) {
        return this.baseVolume * VOLUME_MULTIPLIERS[this.volumeLevel] * scale;
    }

    // ==========================================
    // INITIALIZATION — Audio context first contact
    // ==========================================

    async init() {
        if (this.context) {
            if (this.context.state === 'suspended') {
                await this.context.resume();
            }
            return true;
        }

        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();

            this.nodes.masterGain = this.context.createGain();
            this.nodes.masterGain.connect(this.context.destination);

            this.ready = true;
            console.log('🔊 Specimen audio initialized');
            return true;
        } catch (error) {
            console.error('Audio initialization failed:', error);
            return false;
        }
    }

    // ==========================================
    // NODE DISPOSAL — Consolidated cleanup helper
    // ==========================================

    disposeNodes(...names) {
        names.forEach(name => {
            if (this.nodes[name]) {
                try {
                    if (typeof this.nodes[name].stop === 'function') {
                        this.nodes[name].stop();
                    }
                    this.nodes[name].disconnect();
                } catch (e) {
                    // Silent — node may already be stopped
                }
                this.nodes[name] = null;
            }
        });
    }

    // ==========================================
    // 60HZ CRT HUM — Healthy organism baseline
    // ==========================================

    setupCRTHum() {
        this.cleanupCRTHum();

        if (this.isDeathSequence || this.isPirateMode) return;

        // Primary 60Hz hum + 2nd and 3rd harmonics
        this.nodes.hum = this.context.createOscillator();
        this.nodes.humGain = this.context.createGain();
        this.nodes.hum.type = 'sine';
        this.nodes.hum.frequency.value = 60;

        this.nodes.harmonic2 = this.context.createOscillator();
        this.nodes.harmonic2Gain = this.context.createGain();
        this.nodes.harmonic2.type = 'sine';
        this.nodes.harmonic2.frequency.value = 120;

        this.nodes.harmonic3 = this.context.createOscillator();
        this.nodes.harmonic3Gain = this.context.createGain();
        this.nodes.harmonic3.type = 'sine';
        this.nodes.harmonic3.frequency.value = 180;

        const baseLevel = this.getCurrentVolume();

        this.nodes.humGain.gain.value = baseLevel;
        this.nodes.harmonic2Gain.gain.value = baseLevel * 0.3;
        this.nodes.harmonic3Gain.gain.value = baseLevel * 0.15;

        this.nodes.hum.connect(this.nodes.humGain);
        this.nodes.humGain.connect(this.nodes.masterGain);
        this.nodes.harmonic2.connect(this.nodes.harmonic2Gain);
        this.nodes.harmonic2Gain.connect(this.nodes.masterGain);
        this.nodes.harmonic3.connect(this.nodes.harmonic3Gain);
        this.nodes.harmonic3Gain.connect(this.nodes.masterGain);

        this.nodes.hum.start();
        this.nodes.harmonic2.start();
        this.nodes.harmonic3.start();
    }

    cleanupCRTHum() {
        this.disposeNodes(
            'hum', 'harmonic2', 'harmonic3',
            'humGain', 'harmonic2Gain', 'harmonic3Gain'
        );
    }

    // ==========================================
    // SCHUMANN RESONANCE — Earth's heartbeat for ocean meditation
    // ==========================================

    setupSchumannHum() {
        this.cleanupSchumannHum();

        // 62.64Hz carrier (8x Schumann fundamental)
        this.nodes.schumannCarrier = this.context.createOscillator();
        this.nodes.schumannGain = this.context.createGain();

        this.nodes.schumannCarrier.type = 'sine';
        this.nodes.schumannCarrier.frequency.value = 62.64;

        // 7.83Hz LFO modulates the carrier — Earth pulse
        this.nodes.schumannLFO = this.context.createOscillator();
        this.nodes.schumannLFOGain = this.context.createGain();

        this.nodes.schumannLFO.type = 'sine';
        this.nodes.schumannLFO.frequency.value = 7.83;
        this.nodes.schumannLFOGain.gain.value = 3;

        this.nodes.schumannLFO.connect(this.nodes.schumannLFOGain);
        this.nodes.schumannLFOGain.connect(this.nodes.schumannCarrier.frequency);

        this.nodes.schumannGain.gain.value = this.getCurrentVolume(1.8);

        // Gentle 2x harmonic for warmth
        this.nodes.schumannHarmonic = this.context.createOscillator();
        this.nodes.schumannHarmonicGain = this.context.createGain();
        this.nodes.schumannHarmonic.type = 'sine';
        this.nodes.schumannHarmonic.frequency.value = 125.28;
        this.nodes.schumannHarmonicGain.gain.value = this.getCurrentVolume(0.6);

        this.nodes.schumannCarrier.connect(this.nodes.schumannGain);
        this.nodes.schumannGain.connect(this.nodes.masterGain);
        this.nodes.schumannHarmonic.connect(this.nodes.schumannHarmonicGain);
        this.nodes.schumannHarmonicGain.connect(this.nodes.masterGain);

        this.nodes.schumannLFO.start();
        this.nodes.schumannCarrier.start();
        this.nodes.schumannHarmonic.start();
    }

    cleanupSchumannHum() {
        this.disposeNodes(
            'schumannCarrier', 'schumannLFO', 'schumannHarmonic',
            'schumannGain', 'schumannLFOGain', 'schumannHarmonicGain'
        );
    }

    // ==========================================
    // VOLUME CONTROL — Cycle 0→1→2→3→0
    // ==========================================

    setVolumeLevel(level) {
        this.volumeLevel = level;

        if (this.volumeLevel === 0) {
            this.cleanupCRTHum();
            this.cleanupSchumannHum();
            this.cleanupBeam();
        } else {
            // Setup appropriate hum based on mode
            if (this.isPirateMode && !this.nodes.schumannCarrier) {
                this.setupSchumannHum();
            } else if (!this.isPirateMode && !this.isDeathSequence && !this.nodes.hum) {
                this.setupCRTHum();
            } else {
                this.updateHumVolumes();
            }
        }
    }

    updateHumVolumes() {
        const target = this.getCurrentVolume();
        const t = this.context.currentTime + 0.1;

        // CRT hum updates
        if (this.nodes.humGain) {
            this.nodes.humGain.gain.exponentialRampToValueAtTime(Math.max(0.001, target), t);
        }
        if (this.nodes.harmonic2Gain) {
            this.nodes.harmonic2Gain.gain.exponentialRampToValueAtTime(Math.max(0.001, target * 0.3), t);
        }
        if (this.nodes.harmonic3Gain) {
            this.nodes.harmonic3Gain.gain.exponentialRampToValueAtTime(Math.max(0.001, target * 0.15), t);
        }

        // Schumann updates
        if (this.nodes.schumannGain) {
            this.nodes.schumannGain.gain.exponentialRampToValueAtTime(Math.max(0.001, target * 1.8), t);
        }
        if (this.nodes.schumannHarmonicGain) {
            this.nodes.schumannHarmonicGain.gain.exponentialRampToValueAtTime(Math.max(0.001, target * 0.6), t);
        }
    }

    // ==========================================
    // DECAY STAGE SYNC — Frequency and volume track metabolism
    // ==========================================

    syncToDecayStage(stage, progress) {
        this.currentStage = stage;

        if (stage === 'death' && !this.isDeathSequence) {
            this.beginDeath();
            return;
        }

        if (stage === 'pirate' && !this.isPirateMode) {
            // Pirate transition handled separately by beginPirateTransition
            return;
        }

        if (!this.ready || this.volumeLevel === 0 || this.isDeathSequence || this.isPirateMode) return;

        // Frequency and volume map per stage
        const stageMap = {
            healthy: { freq: 60, volume: 1.0 },
            panic:   { freq: 57, volume: 0.85 },
            decay:   { freq: 52, volume: 0.6 }
        };

        const config = stageMap[stage] || stageMap.healthy;
        const t = this.context.currentTime + 0.5;

        if (this.nodes.hum) {
            this.nodes.hum.frequency.exponentialRampToValueAtTime(config.freq, t);
        }
        if (this.nodes.harmonic2) {
            this.nodes.harmonic2.frequency.exponentialRampToValueAtTime(config.freq * 2, t);
        }
        if (this.nodes.harmonic3) {
            this.nodes.harmonic3.frequency.exponentialRampToValueAtTime(config.freq * 3, t);
        }

        const modulated = this.getCurrentVolume(config.volume);

        if (this.nodes.humGain) {
            this.nodes.humGain.gain.exponentialRampToValueAtTime(Math.max(0.001, modulated), t);
        }
        if (this.nodes.harmonic2Gain) {
            this.nodes.harmonic2Gain.gain.exponentialRampToValueAtTime(Math.max(0.001, modulated * 0.3), t);
        }
        if (this.nodes.harmonic3Gain) {
            this.nodes.harmonic3Gain.gain.exponentialRampToValueAtTime(Math.max(0.001, modulated * 0.15), t);
        }
    }

    // ==========================================
    // VISUAL SYNC — Volume icon tracks decay phase
    // ==========================================

    syncDecayVisuals(stage, progress) {
        const audioBtn = document.getElementById('audio-toggle');
        if (!audioBtn) return;

        const states = {
            healthy: { filter: 'blur(0.03px)',                                            opacity: '0.7'  },
            panic:   { filter: 'brightness(0.95) blur(0.05px)',                           opacity: '0.65' },
            decay:   { filter: 'hue-rotate(15deg) brightness(0.75) blur(0.6px)',          opacity: '0.55' },
            death:   { filter: 'brightness(0) blur(10px)',                                opacity: '0'    },
            pirate:  { filter: 'hue-rotate(180deg) brightness(1.1) saturate(1.3) blur(0px)', opacity: '0.8'  }
        };

        const s = states[stage];
        if (s) {
            audioBtn.style.filter = s.filter;
            audioBtn.style.opacity = s.opacity;
        }
    }

    // ==========================================
    // DEATH SEQUENCE — 2-second exponential fade to silence
    // ==========================================

    beginDeath() {
        if (!this.ready || this.volumeLevel === 0 || this.isDeathSequence) return;

        this.isDeathSequence = true;

        const t = this.context.currentTime;
        const fadeNode = (node, duration) => {
            if (!node) return;
            const current = node.gain.value;
            node.gain.setValueAtTime(current, t);
            node.gain.exponentialRampToValueAtTime(0.001, t + duration);
        };

        fadeNode(this.nodes.humGain, 2);
        fadeNode(this.nodes.harmonic2Gain, 2);
        fadeNode(this.nodes.harmonic3Gain, 2);
        fadeNode(this.nodes.beamGain, 1.5);

        setTimeout(() => {
            this.cleanupCRTHum();
            this.cleanupBeam();
        }, 2500);
    }

    // ==========================================
    // PIRATE MODE TRANSITION — 7-second descent to ocean depth
    // ==========================================

    beginPirateTransition(duration = 7000, onComplete) {
        if (!this.ready || this.volumeLevel === 0) {
            if (onComplete) onComplete();
            return;
        }

        this.isPirateMode = true;
        const transitionSec = duration / 1000;
        const t = this.context.currentTime;

        // Fade out CRT hum during transition
        const fadeOut = (node) => {
            if (!node) return;
            node.gain.exponentialRampToValueAtTime(0.001, t + transitionSec);
        };

        fadeOut(this.nodes.humGain);
        fadeOut(this.nodes.harmonic2Gain);
        fadeOut(this.nodes.harmonic3Gain);

        // Transition sweep — 60Hz glides to 62.64Hz Schumann
        const transitionOsc = this.context.createOscillator();
        const transitionGain = this.context.createGain();

        transitionOsc.type = 'sine';
        transitionOsc.frequency.setValueAtTime(60, t);
        transitionOsc.frequency.exponentialRampToValueAtTime(62.64, t + transitionSec);

        const baseLevel = this.getCurrentVolume();

        // Volume swell: quiet → loud → settle
        transitionGain.gain.setValueAtTime(baseLevel * 0.5, t);
        transitionGain.gain.linearRampToValueAtTime(baseLevel * 2.0, t + transitionSec * 0.5);
        transitionGain.gain.exponentialRampToValueAtTime(baseLevel * 1.8, t + transitionSec);

        transitionOsc.connect(transitionGain);
        transitionGain.connect(this.nodes.masterGain);

        transitionOsc.start();
        transitionOsc.stop(t + transitionSec);

        // Once transition completes, swap CRT hum for Schumann resonance
        setTimeout(() => {
            this.cleanupCRTHum();
            if (this.volumeLevel > 0) {
                this.setupSchumannHum();
            }
            if (onComplete) onComplete();
        }, duration);
    }

    // ==========================================
    // PASSWORD UNLOCK — Major chord ascending (C-E-G)
    // ==========================================

    triggerPasswordUnlock() {
        if (!this.ready || this.volumeLevel === 0) return;

        const frequencies = [261.63, 329.63, 392.00];
        const volume = 0.08 * VOLUME_MULTIPLIERS[this.volumeLevel];
        const t = this.context.currentTime;

        frequencies.forEach((freq, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(volume * (1 - i * 0.2), t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

            osc.connect(gain);
            gain.connect(this.nodes.masterGain);

            osc.start();
            osc.stop(t + 0.35);
        });
    }

    // ==========================================
    // DATA RELEASE — Same chord descending (leak button)
    // ==========================================

    triggerWaterDrop() {
        if (!this.ready || this.volumeLevel === 0) return;

        // C5→C4, E5→E4, G5→G4 — descending sweep
        const frequencies = [
            [523.25, 261.63],
            [659.25, 329.63],
            [783.99, 392.00]
        ];

        const volume = 0.08 * VOLUME_MULTIPLIERS[this.volumeLevel];
        const t = this.context.currentTime;

        frequencies.forEach((freqPair, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freqPair[0], t);
            osc.frequency.exponentialRampToValueAtTime(freqPair[1], t + 0.3);

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(volume * (1 - i * 0.2), t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

            osc.connect(gain);
            gain.connect(this.nodes.masterGain);

            osc.start();
            osc.stop(t + 0.4);
        });
    }

    // ==========================================
    // PHOSPHOR TICK — Pirate typewriter character
    // ==========================================

    triggerPhosphorTick() {
        if (!this.ready || this.volumeLevel === 0 || !this.isPirateMode) return;

        const t = this.context.currentTime;
        const clickVolume = 0.006 * VOLUME_MULTIPLIERS[this.volumeLevel];
        const fizzVolume = 0.012 * VOLUME_MULTIPLIERS[this.volumeLevel];

        // Soft click
        const clickOsc = this.context.createOscillator();
        const clickGain = this.context.createGain();

        clickOsc.type = 'sine';
        clickOsc.frequency.value = 400 + (Math.random() * 100);

        clickGain.gain.setValueAtTime(clickVolume, t);
        clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.002);

        clickOsc.connect(clickGain);
        clickGain.connect(this.nodes.masterGain);

        clickOsc.start();
        clickOsc.stop(t + 0.003);

        // Fizz tail — bandpass-filtered noise
        const bufferSize = this.context.sampleRate * 0.003;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() - 0.5) * 0.15;
        }

        const source = this.context.createBufferSource();
        const filter = this.context.createBiquadFilter();
        const gain = this.context.createGain();

        source.buffer = buffer;
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 1;

        gain.gain.setValueAtTime(fizzVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.008);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.nodes.masterGain);

        source.start();
    }

    // ==========================================
    // THINKING PULSE — Pirate blue dot double-pulse
    // ==========================================

    triggerThinkingPulse() {
        if (!this.ready || this.volumeLevel === 0 || !this.isPirateMode) return;

        const t = this.context.currentTime;
        const volume = 0.12 * VOLUME_MULTIPLIERS[this.volumeLevel];

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = 'sine';
        osc.frequency.value = 72;

        // Double-pulse envelope
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(volume, t + 0.06);
        gain.gain.exponentialRampToValueAtTime(volume * 0.2, t + 0.12);
        gain.gain.linearRampToValueAtTime(volume * 0.7, t + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        gain.connect(this.nodes.masterGain);

        osc.start();
        osc.stop(t + 0.4);
    }

    // ==========================================
    // BEAM FIZZ — Highpass-filtered burst on text contact
    // ==========================================

    triggerBeamFizz() {
        if (!this.ready || this.volumeLevel === 0) return;

        const t = this.context.currentTime;
        const volume = 0.01 * VOLUME_MULTIPLIERS[this.volumeLevel];

        const bufferSize = this.context.sampleRate * 0.004;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() - 0.5) * 0.2;
        }

        const source = this.context.createBufferSource();
        const filter = this.context.createBiquadFilter();
        const gain = this.context.createGain();

        source.buffer = buffer;
        filter.type = 'highpass';
        filter.frequency.value = 3000;
        filter.Q.value = 0.7;

        gain.gain.setValueAtTime(volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.01);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.nodes.masterGain);

        source.start();
    }

    // ==========================================
    // BEAM SWEEP — Continuous tone tracking beam Y position
    // ==========================================

    triggerBeamSweep(beamY) {
        if (!this.ready || this.volumeLevel === 0 || this.isDeathSequence) return;

        const baseFreq = this.isPirateMode ? 69.64 : 67.83;
        const variation = (beamY / window.innerHeight - 0.5) * 4;
        const frequency = baseFreq + variation;

        if (!this.nodes.beamOsc) {
            this.nodes.beamOsc = this.context.createOscillator();
            this.nodes.beamGain = this.context.createGain();

            this.nodes.beamOsc.type = 'sine';
            this.nodes.beamOsc.frequency.value = frequency;
            this.nodes.beamGain.gain.value = this.baseBeamGain;

            this.nodes.beamOsc.connect(this.nodes.beamGain);
            this.nodes.beamGain.connect(this.nodes.masterGain);
            this.nodes.beamOsc.start();
        } else {
            this.nodes.beamOsc.frequency.exponentialRampToValueAtTime(
                frequency,
                this.context.currentTime + 0.1
            );
        }
    }

    // ==========================================
    // UI CONTACT — Frequency bend on impact (titles, pirate comments)
    // ==========================================

    triggerUIContact() {
        if (!this.ready || this.volumeLevel === 0 || !this.nodes.beamOsc) return;

        const t = this.context.currentTime;
        const currentFreq = this.nodes.beamOsc.frequency.value;

        // Massive frequency drop and recovery
        this.nodes.beamOsc.frequency.setValueAtTime(currentFreq, t);
        this.nodes.beamOsc.frequency.exponentialRampToValueAtTime(currentFreq * 0.2, t + 0.1);
        this.nodes.beamOsc.frequency.exponentialRampToValueAtTime(currentFreq, t + 0.4);

        // Volume boost using absolute gain (prevents stacking)
        this.nodes.beamGain.gain.setValueAtTime(this.baseBeamGain, t);
        this.nodes.beamGain.gain.linearRampToValueAtTime(this.baseBeamGain * 3, t + 0.1);
        this.nodes.beamGain.gain.exponentialRampToValueAtTime(
            Math.max(0.001, this.baseBeamGain),
            t + 0.4
        );
    }

    cleanupBeam() {
        this.disposeNodes('beamOsc', 'beamGain');
    }
}

// ==========================================
// VOLUME BUTTON — Visual control with phosphor styling
// ==========================================

function createVolumeButton() {
    const btn = document.createElement('button');
    btn.id = 'audio-toggle';
    btn.innerHTML = `
        <span class="volume-bars">
            <span class="bar bar-1"></span>
            <span class="bar bar-2"></span>
            <span class="bar bar-3"></span>
        </span>
    `;
    btn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 32px;
        height: 20px;
        padding: 3px 6px;
        background: rgba(229, 62, 44, 0.056);
        border: 1px solid rgba(229, 62, 44, 0.245);
        border-radius: 2px;
        z-index: 500;
        transition: all 0.3s;
        cursor: crosshair;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        filter: blur(0.03px);
    `;

    const style = document.createElement('style');
    style.textContent = `
        .volume-bars { display: flex; gap: 2px; align-items: flex-end; height: 10px; }
        .bar { width: 2px; background: rgb(229, 62, 44); transition: all 0.3s; opacity: 0.125; }
        .bar-1 { height: 3px; }
        .bar-2 { height: 6px; }
        .bar-3 { height: 10px; }

        .volume-0 .bar { opacity: 0.125; }
        .volume-1 .bar { opacity: 0.125; }
        .volume-1 .bar-1 { opacity: 0.6; }
        .volume-2 .bar { opacity: 0.125; }
        .volume-2 .bar-1, .volume-2 .bar-2 { opacity: 0.7; }
        .volume-3 .bar { opacity: 0.85; }

        #audio-toggle:hover {
            background: rgba(229, 62, 44, 0.096);
            border-color: rgba(229, 62, 44, 0.32);
            opacity: 0.8;
        }

        #audio-toggle.beam-contact {
            opacity: 0.9 !important;
            filter: brightness(1.3) blur(0px) !important;
            border-color: rgba(var(--glow-r), var(--glow-g), var(--glow-b), 0.6) !important;
        }

        #audio-toggle.beam-contact .bar {
            background: rgb(var(--glow-r), var(--glow-g), var(--glow-b)) !important;
            box-shadow: 0 0 8px rgba(var(--glow-r), var(--glow-g), var(--glow-b), 0.8) !important;
        }
    `;
    document.head.appendChild(style);

    btn.className = 'volume-1';
    return btn;
}

// ==========================================
// CONFIRMATION BEEP — Volume change feedback
// ==========================================

function playConfirmationBeep(audio, frequency, volume) {
    const t = audio.context.currentTime;
    const osc = audio.context.createOscillator();
    const gain = audio.context.createGain();

    osc.frequency.value = frequency;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(audio.nodes.masterGain);

    osc.start();
    osc.stop(t + 0.1);
}

// ==========================================
// INTEGRATION — Wire audio organ into specimen
// ==========================================

function integrateLeakWormAudio() {
    const audio = new LeakWormAudio();
    const volumeBtn = createVolumeButton();

    // Volume button click — cycles 0→1→2→3→0
    volumeBtn.onclick = async function() {
        if (!audio.ready) {
            const initialized = await audio.init();
            if (!initialized) return;

            audio.setVolumeLevel(1);
            volumeBtn.className = 'volume-1';
            playConfirmationBeep(audio, 1000, 0.08);
            return;
        }

        const nextLevel = (audio.volumeLevel + 1) % 4;
        audio.setVolumeLevel(nextLevel);
        volumeBtn.className = `volume-${nextLevel}`;

        if (nextLevel > 0) {
            playConfirmationBeep(audio, 800 + (nextLevel * 200), 0.1 * (nextLevel / 3));
        }
    };

    document.body.appendChild(volumeBtn);

    // Global click initializes audio (browser autoplay policy)
    const initAudioOnAnyClick = async function() {
        if (!audio.ready) {
            const initialized = await audio.init();
            if (initialized) {
                console.log('🎵 Audio initialized on first click');
                audio.setVolumeLevel(1);
                volumeBtn.className = 'volume-1';
                playConfirmationBeep(audio, 800, 0.04);
            }
        }
        if (audio.ready) {
            document.removeEventListener('click', initAudioOnAnyClick);
        }
    };
    document.addEventListener('click', initAudioOnAnyClick);

    // Hook into decay lifecycle
    if (typeof decay !== 'undefined') {
        window.leakAudio = audio;

        decay.subscribe((stage, progress) => {
            audio.syncToDecayStage(stage, progress);
            audio.syncDecayVisuals(stage, progress);
        });
    }

    // Hook password unlock
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const originalClick = submitBtn.onclick;
        submitBtn.onclick = function() {
            const input = document.getElementById('passwordInput');
            const password = (typeof SPECIMEN_METADATA !== 'undefined')
                ? SPECIMEN_METADATA.access.password
                : (bookContent && bookContent.metadata && bookContent.metadata.password);
            if (input && input.value.trim() === password) {
                setTimeout(() => audio.triggerPasswordUnlock(), 100);
            }
            if (originalClick) return originalClick.apply(this, arguments);
        };
    }

    // Hook leak button
    window.leakDocument = (function(originalFn) {
        return function(event) {
            audio.triggerWaterDrop();
            if (originalFn) return originalFn.call(this, event);
        };
    })(window.leakDocument);

    // Hook pirate mode transition
    window.startPirateMode = (function(originalFn) {
        return function() {
            const transitionDuration = CONFIG.timings.pirate?.colorShiftDuration || 7000;
            audio.beginPirateTransition(transitionDuration);
            if (originalFn) return originalFn.call(this);
        };
    })(window.startPirateMode);

    // Hook pirate typewriter — inject phosphor tick per character.
    // Handles <br> and <span>...</span> as units (preserves t7-sigil rendering).
    window.typewriterEffect = (function(originalFn) {
        return function(element, text, speed, callback) {
            element.style.opacity = '1';
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    // <br> as unit
                    if (text.substr(i, 4) === '<br>') {
                        element.innerHTML += '<br>';
                        i += 4;
                    }
                    // <span...>...</span> as unit
                    else if (text.substr(i, 5) === '<span') {
                        const closeIdx = text.indexOf('</span>', i);
                        if (closeIdx !== -1) {
                            const blockEnd = closeIdx + 7;
                            element.innerHTML += text.substring(i, blockEnd);
                            i = blockEnd;
                        } else {
                            element.innerHTML += text.charAt(i);
                            i++;
                            if (audio.isPirateMode) audio.triggerPhosphorTick();
                        }
                    }
                    else {
                        element.innerHTML += text.charAt(i);
                        i++;
                        if (audio.isPirateMode) audio.triggerPhosphorTick();
                    }
                } else {
                    clearInterval(interval);
                    if (callback) callback();
                }
            }, speed);
        };
    })(window.typewriterEffect);

    // Hook reward screen — thinking pulse on blue dot
    window.showRewardScreen = (function(originalFn) {
        return function() {
            if (originalFn) originalFn.call(this);

            setTimeout(() => {
                const dot = document.getElementById('rewardDot');
                if (dot) {
                    const observer = new MutationObserver(() => {
                        if (dot.style.opacity === '1') {
                            audio.triggerThinkingPulse();
                        }
                    });
                    observer.observe(dot, { attributes: true, attributeFilter: ['style'] });
                }
            }, 100);
        };
    })(window.showRewardScreen);

    // Beam interaction loop — sweep + impact + fizz
    let lastUIContact = null;
    const lastTextContact = new Map();

    setInterval(() => {
        const beam = document.getElementById('beamBody');
        const audioToggle = document.getElementById('audio-toggle');

        if (!beam) return;

        const beamRect = beam.getBoundingClientRect();
        const beamY = beamRect.top + beamRect.height / 2;

        audio.triggerBeamSweep(beamY);

        // Audio toggle contact
        if (audioToggle) {
            const toggleRect = audioToggle.getBoundingClientRect();
            if (beamY >= toggleRect.top && beamY <= toggleRect.bottom) {
                audioToggle.classList.add('beam-contact');
                if (lastUIContact !== 'audio-toggle') {
                    audio.triggerUIContact();
                    lastUIContact = 'audio-toggle';
                }
            } else {
                audioToggle.classList.remove('beam-contact');
                if (lastUIContact === 'audio-toggle') lastUIContact = null;
            }
        }

        // Impact sound — titles and pirate comments
        const impactElements = document.querySelectorAll(
            '.screen-title, .reward-title, .gate-title, .pirate-comment'
        );
        impactElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (beamY >= rect.top && beamY <= rect.bottom) {
                const elementId = el.textContent.substring(0, 20);
                const now = Date.now();
                const lastTime = lastTextContact.get(elementId) || 0;
                if (now - lastTime > 1000) {
                    audio.triggerUIContact();
                    lastTextContact.set(elementId, now);
                }
            }
        });

        // Fizz sound — dots, subtitles, body text
        const fizzElements = document.querySelectorAll(
            '.blink-dot, .reward-dot, ' +
            '.screen-subtitle, .reward-subtitle, .reward-header, .sub-subtitle, ' +
            '.sentence, .list-item, .detail-text'
        );
        fizzElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (beamY >= rect.top && beamY <= rect.bottom) {
                const elementId = el.textContent.substring(0, 20) || 'dot';
                const now = Date.now();
                const lastTime = lastTextContact.get(elementId) || 0;
                if (now - lastTime > 1000) {
                    audio.triggerBeamFizz();
                    lastTextContact.set(elementId, now);
                }
            }
        });
    }, 25);

    return audio;
}

// Auto-integrate
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', integrateLeakWormAudio);
} else {
    integrateLeakWormAudio();
}

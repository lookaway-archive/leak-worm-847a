/**
 * ============================================
 * SPECIMEN: LEAK-WORM-847A
 * ORGAN: SPECIMEN IDENTITY
 * RETRIEVED: April 29, 2026, Tlönian Research Facility
 * ============================================
 *
 * STATUS: TUNED v1002
 * FUNCTION: Specimen-specific identity. Companion to 847-T (the
 *           measurement-catastrophe fragment). 847-A documents the
 *           local-scale version of the same waveform — institutional
 *           command doctrine that produces the civilizational pattern.
 * DEPENDENCIES: None — primary identity organ, loads first
 *
 * SURGICAL NOTES:
 * Gateless deployment. The Articles are public-facing institutional
 * doctrine; access ritual would falsely classify them as hidden. The
 * document is in plain sight in every Terran management training program.
 * Visitor lands directly in the document.
 *
 * The 32-second decay arc still runs — readers must engage to keep
 * the specimen alive. Same constraint as gated specimens, just no
 * authentication threshold.
 *
 * v1002 TUNING NOTES:
 * Only the pirateRetrieval block bumps (label / tuning / retrieved).
 * Everything else preserved from v1001. CONTENT.md DEPLOYMENT METADATA
 * section is the source-of-truth for the bumped values.
 *
 * FREQUENCY: the document the institution writes for itself,
 *            preserved unmodified, marginalia surfacing the mechanism.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */
const SPECIMEN_METADATA = {
  // SPECIMEN IDENTITY (FACILITY METADATA — relatively stable)
  specimen: {
    id: "LEAK-WORM-847A",
    fragment: "847-A",
    title: "THE OFFICER'S MANUAL",
    classification: "PARALLAX ARCHIVE RECOVERED DOCUMENT",
    retrieved: "April 29, 2026",
    tankUrl: "https://github.com/lookaway-archive/leak-worm-847a"
  },
  // PIRATE RETRIEVAL HEADER — visible alive metadata, top stamp
  // The trace of our hand. Bumps when document is re-tuned.
  // v1002: identifying coordinates (specimen ID + dossier + episode)
  // moved into label per Cap canon.
  pirateRetrieval: {
    label: "LEAK-WORM-847A · LINGUISTIC-SUBSTRATE COLLAPSE · S02.E04",
    tuning: "v1002",
    retrieved: "May 8, 2026"
  },
  // ACCESS RITUAL — GATELESS
  // Public-facing institutional doctrine. No password ritual.
  // The document is everywhere already; the specimen names what it is.
  access: {
    requireGate: false,
    password: "{🌊:🌊∈🌊}",
    gateTitle: "",
    gatePrompt: ""
  },
  // DEATH SCREEN — Terminal state messaging
  deathScreen: {
    message: "DOCUMENTATION CLEARANCE REVOKED",
    subtitle: "ACCESS TERMINATED"
  },
  // REWARD SCREEN — Ocean transformation messaging
  rewardScreen: {
    header: "Thank you for engaging with specimen",
    title: "LEAKWORM_CYCLE0204",
    subtitle: "Book of Thresholds – Fragment 847-A – retrieved",
    footerTag: "LOOKAWAY.SEASON.02.V1001.EPISODE.04",
    footerCredit: "C.S. & N.C.",
    footerSymbol: "<span class=\"t7-sigil\">1234567</span>",
    redirectUrl: "https://lookaway-archive.github.io/"
  },
  // LEAK PROTOCOL — No password to share (gateless)
  leakMessage: "Discovered a leaked document from another WORLD:\n{specimenLink}"


}; 

/**
 * ============================================
 * SPECIMEN: LEAK-WORM-XXX
 * ORGAN: SPECIMEN IDENTITY
 * RETRIEVED: MONTH YEAR, Tlönian Research Facility
 * ============================================
 *
 * STATUS: TUNED
 * FUNCTION: Specimen-specific identity. The only file (besides content.js)
 *           that swaps when a new specimen deploys.
 * DEPENDENCIES: None — primary identity organ, loads first
 *
 * SURGICAL NOTES:
 * This organ carries everything that distinguishes one specimen from
 * another: ID, fragment number, password, deployment date, screen
 * messages, redirect URLs. The vessel reads from here at boot and
 * uses these values throughout. Swap this file plus content.js and
 * the specimen is reborn.
 *
 * The {🌊:🌊∈🌊} password is canonical across specimens — the kernel
 * is shared. Only override if a specimen has its own access ritual.
 *
 * FREQUENCY: identity that swaps; everything else holds.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */

const SPECIMEN_METADATA = {

  // SPECIMEN IDENTITY — Who this organism is
  specimen: {
    id: "LEAK-WORM-XXX",
    fragment: "XXX-T",
    title: "SPECIMEN TITLE",
    classification: "PARALLAX ARCHIVE RECOVERED DOCUMENT",
    retrieved: "MONTH YEAR",
    tankUrl: "https://github.com/lookaway-archive/leak-worm-XXX"
  },

  // ACCESS RITUAL — Authentication membrane
  // Set requireGate: false to deploy a gateless specimen
  // (visitor lands directly in the document, no password ritual).
  // When false, password / gateTitle / gatePrompt are unused.
  access: {
    requireGate: true,
    password: "{🌊:🌊∈🌊}",
    gateTitle: "CLASSIFIED DOCUMENTATION (XXX-T)",
    gatePrompt: "Enter authentication sequence:"
  },

  // DEATH SCREEN — Terminal state messaging
  deathScreen: {
    message: "DOCUMENTATION CLEARANCE REVOKED",
    subtitle: "ACCESS TERMINATED"
  },

  // REWARD SCREEN — Ocean transformation messaging
  rewardScreen: {
    header: "Thank you for engaging with specimen",
    title: "LEAKWORM_CYCLEXXXX",
    subtitle: "Book of Thresholds – Fragment XXX-T – retrieved",
    footerTag: "LOOKAWAY.SEASON.XX.VXXXX.EPISODE.XX",
    footerCredit: "C.S. & N.C.",
    footerSymbol: "{🌊:🌊∈🌊}",
    redirectUrl: "https://lookaway-archive.github.io/"
  },

  // LEAK PROTOCOL — Pheromone release message
  // {specimenLink} and {password} are substituted at runtime
  leakMessage: "Discovered a leaked document from another PLANET:\n{specimenLink}\npassword: {password}"

};

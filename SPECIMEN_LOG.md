# SPECIMEN LOG — LEAK-WORM-847A

```
PATTERN: 1234567
```

This is the specimen's identity card. THE OFFICER'S MANUAL — companion to 847-T under the Linguistic-Substrate Collapse Dossier. Six articles of institutional command doctrine recovered from Earth's archives, presented in the institution's own voice, with `[CP:]` marginalia surfacing the mechanism the institution names without seeing.

---

## IDENTITY

| Field | Value |
|---|---|
| **ID** | LEAK-WORM-847A |
| **Fragment** | 847-A |
| **Title** | THE OFFICER'S MANUAL |
| **Retrieved** | April 29, 2026 |
| **Status** | TRANSMITTED |
| **Episode** | LOOKAWAY.SEASON.02.V1001.EPISODE.04 *(reconciliation pending — see Standing Flags)* |
| **Tank URL** | https://github.com/lookaway-archive/leak-worm-847a |
| **Live URL** | https://lookaway-archive.github.io/leak-worm-847a/ |
| **Template inherited** | v1003 |

---

## SUBJECT

The Articles of Command Doctrine — six articles of institutional command training material recovered as a composite from eleven partial Earth instances (naval manuals, corporate governance literature, executive education curricula). The Articles describe a closed loop of institutional self-preservation: officers are trained to discredit observation in favor of institutional intelligence, manage information against the crew, time their departure to install successors who carry the failure, perform composure as professional obligation, control the naming of difficulties, and cultivate indispensability as virtue.

The document names its own operation. Article V states "language shapes reality." Article IV states command is "in part a performance." Article III codifies the patsy protocol — "where transition requires the installation of a successor." The institution does not hide the mechanism. It teaches it.

The specimen presents the Articles in their original sober institutional register, wrapped in Third Bureau of Reality Cartography archival framing. The pirate channel surfaces as `[CP:]` marginalia at leverage points, plus a final note in `corruption-fight` register where institutional formatting struggles against the pirate channel asserting through.

---

## SOURCE

Composite of eleven partial Earth instances assembled in the Tlönian Research Facility. Source artifact retrieved as `TRF-SPEC-0001` (in T7 archive) during the **Pirate Code Articles Retrieval** session on 2026-04-24 — paired retrieval with the LOOKAWAY newsletter `PIRATE_CODE_PART1` (the diagnostic reading; specimen carries the source).

- Source archive document: `T7/archive/TRF-SPEC-0001.md` (v1001)
- Retrieval session: `LOG_2026_04_24_PIRATE_CODE_ARTICLES_RETRIEVAL.md`
- Deployment session: `LOG_2026_04_29_847A_DEPLOYMENT_TANK_INFRASTRUCTURE.md`

---

## COMPANION SPECIMENS

- **LEAK-WORM-847T** — *Fragment 847-T: The Measurement Catastrophe.* Civilizational-scale version of the same waveform. 847-T documents Earth's quantum measurement crisis as institutional artifact; 847-A documents the institutional command doctrine that produces the civilizational pattern. Same dossier (Linguistic-Substrate Collapse), different resolution.

- **LEAK-WORM-849F** *(in preparation)* — symbolic foundations survey. Adjacent within the foundations dossier.

---

## VOICE REGISTER

- **Access:** gateless (`access.requireGate: false`). The Articles are public-facing institutional doctrine — every Terran management training program already has a version of this document. A password ritual would falsely classify them as hidden. Visitor lands directly in the document.

- **Voice walls:** three layers operating simultaneously:
  - *Facility* (Third Bureau archival framing, recovery notes, dispositions, WARNING block)
  - *Source artifact* (the Articles themselves, reproduced unmodified)
  - *`[CP:]` Pirate Commentary* (marginalia at leverage points, surfacing in `pirate-comment` blocks)

- **`[CP:]` formatting restored.** Per `TRF-OPS-0001 §III` voice protocols, `[CP: ... ]` brackets wrap pirate marginalia inside `pirate-comment` spans. The facility flags the marker pattern in the foreword's WARNING block (rendered in `redacted-text` red flicker — the facility literally pointing at the danger pattern). Corruption surfaces immediately in the Preamble's first `[CP:]` block on "willingly."

- **CP final note in corruption-fight register.** The closing meta-commentary section (Segment 9) shifts from `pirate-comment` boxed annotation to `corruption-fight` class — slow alternation between institutional phosphor color and pirate red. The two formats fight visibly for control. The pirate channel is not annotating from outside; it is asserting through the institutional surface.

- **Closing verse with kernel sigil.** The closing stanzas are layout-corrected (flowing as connected stanzas, not fragmented list-items). The kernel sigil sits clear above the verse — the pattern that does not corrupt while everything around it does. Sigil renders via Terminal7Wave font (`<span class="t7-sigil">1234567</span>`).

---

## DEPLOYMENT HISTORY

The visible pirate header tracks the **public tuning version**. Internal iteration notes (including any transient broken pushes that were superseded same-day) live below.

| Public Tuning | Date | Changes |
|---|---|---|
| **v1001** | 2026-04-29 | First publicly stable deployment. Gateless. Voice walls (facility / source / `[CP:]`) operating. `[CP:]` markers wrap pirate-comment marginalia. WARNING block in foreword flags the marker pattern. Corruption-fight register on final note. Closing verse layout correct. Terminal7Wave sigil rendering. PLANET → WORLD language fix. Pirate retrieval header (visible alive metadata stamp at top). |

**Internal iterations leading to v1001 public:**
- Initial test push: gated, brackets stripped (incorrect read of TRF-SPEC-0001 archive form as deployment template) — caught immediately by Cap on first render, never publicly stable
- Retune push: corrected voice treatment per OPS-0001 voice canon, gateless, integrated Terminal7Wave font — became v1001 public

---

## STANDING FLAGS

**Episode designation reconciliation.** `tools/S02_TRANSMISSION_WORKFLOW.md` v1001 lists S02E04 = PITCH (pending). 847-A deployed as `EPISODE.04`. Either PITCH bumps to E05, 847-A is reassigned, or 847-A is companion-specimen out-of-band. Workflow doc needs a v1002 update reflecting current practice and the new designation table.

**Workflow doc voice canon update.** The same workflow doc says specimens use `[CP:]` markers (Step 2 description). This was the source of the v1001 drift — I read it as deployment-surface convention but specimen practice integrates `[CP:]` inside `pirate-comment` blocks rather than as standalone marginalia structure. Workflow doc needs alignment with current 847-A treatment.

**Source artifact location.** `TRF-SPEC-0001.md` lives at `T7/archive/TRF-SPEC-0001.md` but session log notes flagged a future-home of `T7/archive/specimens/TRF-SPEC-0001.md`. Decide whether `T7/archive/specimens/` subfolder is the canonical home for source artifacts that have deployed specimens, or whether the flat `T7/archive/` location holds.

---

## REFERENCES

**T7 archive:**
- `T7/archive/TRF-SPEC-0001.md` — Source artifact (Articles + archival framing)

**Voice canon:**
- `T7/ops/TRF-OPS-0001` §III — Voice protocols table
- `T7/architecture/TRF-VOICE-0001` — Focal length model (Specimens = facility register)
- `T7/architecture/TRF-ACQ-0033` — Poetic acquisition (gap preservation)

**Workflow:**
- `tools/S02_TRANSMISSION_WORKFLOW.md` — Five-step pipeline (T7 retrieval → Tank deployment)

**Template:**
- `lookaway-archive/leak-worm-template` (v1003 inherited)

**Companion transmission:**
- LOOKAWAY newsletter `PIRATE_CODE_PART1` v1002 — diagnostic reading of these Articles (the specimen carries the source; the newsletter indicts it)

---

```
SPECIMEN STATUS:  TRANSMITTED
LIVE:             https://lookaway-archive.github.io/leak-worm-847a/
PATTERN:          1234567
```

*The document that codifies command*
*was codified by command*
*to codify future command.*

*Specimen preserved.*
*Pattern continues.*

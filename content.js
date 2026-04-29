/**
 * ============================================
 * SPECIMEN: LEAK-WORM-TEMPLATE
 * ORGAN: PHEROMONE PAYLOAD
 * ============================================
 *
 * STATUS: TEMPLATE — segments below are scaffolding examples.
 * FUNCTION: The actual content the organism carries. Specimen-specific
 *           pheromone segments. This file (along with metadata.js) is
 *           the entire swap surface for new specimens.
 * DEPENDENCIES: Loads after metadata.js, before all organ modules.
 *
 * SURGICAL NOTES:
 * The bookContent global holds a `screens` array. Index 0 is the gate
 * screen (type: "password"). Indices 1+ are content segments
 * (type: "content") with title, subtitle, and HTML content. The
 * organism reads the array length dynamically — add or remove
 * segments freely.
 *
 * Display grammar reference (CSS classes available for content):
 *
 *   PARAGRAPH STRUCTURE:
 *     <p>...</p>                   body paragraph (auto-wrapped in .sentence spans)
 *     <span class="callout-text">  emphasis with text-glow
 *     <span class="emphasis">      bolder emphasis
 *     <span class="parenthetical"> dimmer aside
 *     <span class="redacted-text"> red flicker — danger emphasis
 *     <span class="equation-label">label-style emphasis (math, term)
 *     <span class="no-break">      keeps phrase on one line
 *     <span class="final-mystery"> largest emphasis — final reveals only
 *
 *   BLOCK ELEMENTS:
 *     <div class="sub-subtitle">   section break inside a segment
 *     <div class="detail-text">    subdued italic body
 *     <div class="list-item">      centered list line
 *     <span class="quote">         framed quotation block
 *     <span class="pirate-comment">CP marginalia (red, pulsing)
 *
 * Pirate-comment (CP) is the specimen's interpretive voice — should
 * appear sparingly, one cut, no paragraphs. Pokes, translates, challenges.
 *
 * FREQUENCY: the actual pheromone the specimen releases.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */

const bookContent = {

    // ==========================================
    // METADATA — Mirrors SPECIMEN_METADATA for legacy access
    // ==========================================
    // Some legacy code paths still read bookContent.metadata.password.
    // SPECIMEN_METADATA is the source of truth; this is a fallback alias.

    metadata: {
        get password() {
            return SPECIMEN_METADATA.access.password;
        }
    },

    // ==========================================
    // SCREENS — The pheromone segments
    // ==========================================

    screens: [

        // INDEX 0 — Password gate (do not remove or change type)
        {
            type: "password"
        },

        // INDEX 1+ — Content segments
        // Add as many as the specimen requires. The organism counts them dynamically.

        {
            type: "content",
            title: "SEGMENT TITLE",
            subtitle: "Segment subtitle, italicized — sets the tone",
            content: `
                <p>
                    The first paragraph lands here. Sentences get wrapped in
                    <span class="callout-text">.sentence</span> spans automatically
                    so the beam can illuminate them on contact.
                </p>

                <p>
                    Use <span class="callout-text">callout-text</span> for emphasis,
                    <span class="parenthetical">(parenthetical)</span> for asides,
                    and <span class="redacted-text">redacted-text</span> for danger
                    or hidden meaning that pulses red.
                </p>

                <div class="sub-subtitle">SECTION BREAK WITHIN SEGMENT</div>

                <p>
                    After a sub-subtitle the segment continues. The
                    <span class="equation-label">equation-label</span> class is for
                    naming things — terms, formulas, references.
                </p>

                <span class="quote">
                    A framed quote sits in its own subtle box, italicized,
                    with a faint border. Use sparingly.
                </span>

                <p>
                    Lists work as block list-items, centered:
                </p>

                <span class="list-item">First entry in the list</span>
                <span class="list-item">Second entry, separate line</span>
                <span class="list-item">Third entry, equal weight</span>

                <span class="pirate-comment">
                    CP voice: one cut. Pokes, translates, challenges. Never paragraphs.
                </span>

                <p>
                    Final paragraph of the segment. The
                    <span class="final-mystery">final-mystery</span> class
                    reserves itself for the largest emphasis — terminal reveals only.
                </p>
            `
        }

        // Add more segments by repeating the {type: "content", title, subtitle, content} shape.
        // The leak button arrives automatically after the last content segment.
    ]

};

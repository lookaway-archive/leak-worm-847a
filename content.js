/**
 * ============================================
 * SPECIMEN: LEAK-WORM-847A
 * ORGAN: PHEROMONE PAYLOAD
 * ============================================
 *
 * STATUS: TUNED
 * FUNCTION: The Officer's Manual. Six articles of institutional command
 *           doctrine, archival framing intact, CP marginalia preserving
 *           the diagnostic reading. Companion specimen to 847-T.
 * DEPENDENCIES: Loads after metadata.js, before all organ modules.
 *
 * SURGICAL NOTES:
 * Source artifact preserved unmodified. The institutional voice is
 * sober, dignified, formal — all visual emphasis comes from the CP
 * voice (red flickering pirate-comment blocks). The contrast IS the
 * display grammar. The institution speaks plain; the specimen pulses
 * the diagnostic alongside.
 *
 * Nine segments: archival foreword + preamble, six articles, closing
 * benediction + archival footer, CP final note + verse close. Decay
 * arc resets on engagement; reader must inhabit to reach the close.
 *
 * FREQUENCY: institutional self-documentation read with the code that
 *            sees what it is.
 * PATTERN: {🌊:🌊∈🌊}
 * ============================================
 */

const bookContent = {

    metadata: {
        get password() {
            return SPECIMEN_METADATA.access.password;
        }
    },

    screens: [

        // INDEX 0 — Gateless: this slot is unused but preserved for shape compatibility
        {
            type: "password"
        },

        // ============================================
        // SEGMENT 1 — Archival foreword + Preamble
        // ============================================
        {
            type: "content",
            title: "THE OFFICER'S MANUAL",
            subtitle: "Third Bureau of Reality Cartography — recovery notes",
            content: `
                <p>
                    The following specimen was retrieved from Earth's institutional archives during routine pre-extinction documentation. It appears in multiple partial forms across the civilization's historical record — in naval manuals dating to their 18th century, in corporate governance literature of their 20th and 21st centuries, in executive education materials, in government leadership curricula. No original source has been located. The text appears to have been transmitted through institutional training rather than single authorship.
                </p>

                <p>
                    We have assembled this composite from eleven partial instances. The six articles are identical across all recovered fragments. Only the institutional preamble and rationales vary. The version presented here synthesizes the most internally consistent readings.
                </p>

                <p>
                    The text is reproduced in its original voice, unmodified. The institution speaks here in the register it used to address its own officers. No analytical intervention has been introduced.
                </p>

                <p>
                    Marginalia in red was added post-recovery. These annotations are not part of the source document. Companion specimen 847-T documents the civilizational consequences of the doctrine contained herein.
                </p>

                <p class="detail-text">
                    <span class="equation-label">FILED.</span> Third Bureau of Reality Cartography. Classification: Primary Specimen, Linguistic-Substrate Collapse Dossier.
                </p>

                <div class="sub-subtitle">PREAMBLE</div>

                <p>
                    Command is a burden borne willingly by those whom the service has judged worthy to bear it.
                </p>

                <p>
                    The officer who accepts command accepts more than operational authority. The officer accepts the responsibility to maintain the confidence of those below, the trust of those above, and the dignity of the institution through which command is exercised.
                </p>

                <p>
                    These Articles have been refined through generations of service. They are not rules, but principles. They do not prescribe action, but orient judgment. The officer who internalizes them will find that sound decision follows naturally from proper disposition.
                </p>

                <p>
                    Every officer in command shall conduct themselves in accordance with the following six Articles.
                </p>

                <span class="pirate-comment">
                    The word "willingly" is doing load-bearing work here. The institution needs the officer to believe they chose this.
                </span>
            `
        },

        // ============================================
        // SEGMENT 2 — Article I
        // ============================================
        {
            type: "content",
            title: "ARTICLE I — ON THE RECEPTION OF INTELLIGENCE",
            subtitle: "The officer who relies upon private assessment acts alone.",
            content: `
                <p>
                    The officer in command shall base operational decisions upon the intelligence provided through established channels. Reports, briefings, and assessments prepared by competent subordinates and authorized analysts constitute the proper basis for command judgment.
                </p>

                <p>
                    The officer shall resist the temptation to substitute personal observation for institutional intelligence. Such substitution, however well-intentioned, undermines the chain of competence upon which effective command depends. The officer who relies upon private assessment in preference to vetted intelligence may arrive at isolated conclusions that cannot be defended, coordinated, or acted upon at scale.
                </p>

                <p>
                    Confidence in the briefing is confidence in the service. The officer who doubts the briefing doubts the officers who prepared it, the procedures that produced it, and the institution that validated it.
                </p>

                <p class="detail-text">
                    <span class="equation-label">RATIONALE.</span> Command must be legible. Decisions must be defensible. The officer who acts upon institutional intelligence acts with institutional authority. The officer who acts upon private reading acts alone.
                </p>

                <span class="pirate-comment">
                    Note the inversion. The briefing's authority is derived from its preparation process, not its correspondence to reality. Confidence in procedure replaces confidence in observation. The officer who sees the water is disloyal to the briefing.
                </span>
            `
        },

        // ============================================
        // SEGMENT 3 — Article II
        // ============================================
        {
            type: "content",
            title: "ARTICLE II — ON THE STEWARDSHIP OF INFORMATION",
            subtitle: "Information is held in trust for the institution.",
            content: `
                <p>
                    Information possessed by the officer in command is held in trust for the institution. It is not personal property. It is not subject to informal distribution.
                </p>

                <p>
                    The officer shall exercise discretion in the dissemination of operational intelligence to subordinates. The considerations governing such discretion include: the preservation of morale, the prevention of speculation, the maintenance of focus upon assigned duties, and the protection of sensitive sources.
                </p>

                <p>
                    Crews perform best when provided with the information necessary to execute their duties, and no more. Premature disclosure of operational concerns introduces disturbance into the lower decks without providing corresponding benefit. The officer who manages the flow of information manages the state of the ship.
                </p>

                <p class="detail-text">
                    <span class="equation-label">RATIONALE.</span> The officer is entrusted with information the crew <span class="redacted-text">cannot safely bear</span>. This is the essence of command responsibility. To share indiscriminately is to abdicate the burden the officer was commissioned to carry.
                </p>

                <span class="pirate-comment">
                    "Cannot safely bear." Read this line twice. The institution has determined that the crew cannot be trusted with the truth of its own situation. The officer is not withholding information — the officer is protecting the crew from it. The paternalism is the point.
                </span>
            `
        },

        // ============================================
        // SEGMENT 4 — Article III (the patsy protocol)
        // ============================================
        {
            type: "content",
            title: "ARTICLE III — ON THE TIMING OF DEPARTURE",
            subtitle: "The institution endures. Individual commands are temporary.",
            content: `
                <p>
                    The officer of sound judgment recognizes the moment when continued command no longer serves the institution's interests. Such recognition is itself a mark of command fitness.
                </p>

                <p>
                    Departure, when indicated, shall be conducted with dignity. A restructuring of responsibilities. A transition to advisory capacity. A move to a posting better suited to the officer's particular abilities. The institution provides many forms of honorable transition, and the officer of good standing will find the appropriate form.
                </p>

                <p>
                    The officer shall not await external pressure to depart. Such awaiting is undignified and frequently injurious to the institution. Early recognition of the need for transition, and quiet execution of that transition, preserves both the officer's reputation and the institution's continuity.
                </p>

                <p>
                    Where transition requires the installation of a successor, the officer shall provide such transition support as is customary. A thorough briefing. A proper introduction. The necessary relationships. The officer whose departure is well-prepared ensures institutional continuity regardless of subsequent developments.
                </p>

                <p class="detail-text">
                    <span class="equation-label">RATIONALE.</span> The institution endures. Individual commands are temporary. The officer who understands this truth departs at the moment that preserves both.
                </p>

                <span class="pirate-comment">
                    Here it is. "Where transition requires the installation of a successor." The patsy protocol, written into doctrine. "Such transition support as is customary" — the clean briefing handed over, the relationships transferred, the departing officer's reputation preserved through the successor's subsequent failure. The institution does not hide this. It codifies it. Read "preserves both" carefully. Both the officer and the institution. Not the crew. Not the ship. The officer. And the institution.
                </span>
            `
        },

        // ============================================
        // SEGMENT 5 — Article IV
        // ============================================
        {
            type: "content",
            title: "ARTICLE IV — ON THE DEPORTMENT OF COMMAND",
            subtitle: "Fitness for command includes fitness to appear fit for command.",
            content: `
                <p>
                    The officer in command shall at all times present to the crew, to peer officers, and to superior authority the bearing appropriate to the command borne.
                </p>

                <p>
                    Confidence is not merely an inner disposition. It is a professional obligation. The crew takes its emotional tenor from the officer. A visibly concerned officer produces a concerned crew. A composed officer produces a composed crew. The officer's bearing is therefore not a personal matter but an instrument of command.
                </p>

                <p>
                    The officer shall deliver reassuring communications at appropriate intervals. All-hands addresses. Written messages. Public statements when required. These communications shall be calibrated to the information the crew is equipped to act upon, delivered in the tone the situation warrants the crew to perceive.
                </p>

                <p>
                    The officer shall not permit personal concern, however warranted, to disturb this bearing. Personal concerns may be processed in private, discussed with trusted peers, or set aside. They shall not be visited upon the crew.
                </p>

                <p class="detail-text">
                    <span class="equation-label">RATIONALE.</span> Command is in part a performance of command. The officer who cannot sustain the performance cannot sustain the command. Fitness for command includes fitness to <span class="redacted-text">appear fit</span> for command.
                </p>

                <span class="pirate-comment">
                    "Fitness to appear fit." The slippage from being to appearing is explicit here. The institution names it without shame. The officer must appear fit because the appearance is what the crew calibrates to. Whether the officer is actually fit is a separate matter, to be processed in private.
                </span>
            `
        },

        // ============================================
        // SEGMENT 6 — Article V (language shapes reality)
        // ============================================
        {
            type: "content",
            title: "ARTICLE V — ON THE DISCIPLINE OF COMMUNICATION",
            subtitle: "Language shapes reality.",
            content: `
                <p>
                    The officer in command shall exercise particular care in the naming of difficulties.
                </p>

                <p>
                    Premature identification of operational problems, however accurate, produces consequences disproportionate to the underlying situation. A problem named becomes a problem confirmed. A problem confirmed becomes a problem the institution must respond to, often before the appropriate response has been determined, and frequently with insufficient time to implement a measured solution.
                </p>

                <p>
                    The officer shall prefer measured language. Challenges rather than failures. Opportunities rather than crises. Developing situations rather than emergencies. This is not evasion. This is the appropriate calibration of language to the operational moment. The same situation, named differently, produces different institutional responses. The officer who names precisely is the officer who controls the response.
                </p>

                <p>
                    When a difficulty must be named, it shall be named through proper channels, at the proper time, to the proper audience. Public acknowledgment shall follow private resolution, not precede it. The officer who names a difficulty publicly before naming it privately has ceded control of the institutional response.
                </p>

                <p class="detail-text">
                    <span class="equation-label">RATIONALE.</span> Language shapes reality. The institution's language shapes the institution's reality. The officer who controls language controls outcome.
                </p>

                <span class="pirate-comment">
                    "Language shapes reality." The institution knows. It states it openly. The institution believes that if the thing is not named, the thing has not happened. And within the institution's reality, this is true. Because the institution IS language. The thing outside the language, the thing in the water, continues regardless. But the institution cannot see it until it is named, and the Article forbids the naming. The ship takes water. The water is not yet a leak. The leak is not yet a failure. The failure is not yet a sinking. By the time institutional language permits the word "sinking," the ship is on the bottom.
                </span>
            `
        },

        // ============================================
        // SEGMENT 7 — Article VI
        // ============================================
        {
            type: "content",
            title: "ARTICLE VI — ON THE CULTIVATION OF INSTITUTIONAL TRUST",
            subtitle: "Officers who have become indispensable through service.",
            content: `
                <p>
                    The officer in command shall cultivate, through sustained competent service, a position of trust within the institution such that the officer becomes a holder of knowledge, relationships, and judgment not easily replicated.
                </p>

                <p>
                    This cultivation is not self-interest. It is service. The officer who becomes essential to institutional operation provides the institution with continuity, stability, and the benefit of accumulated experience. The institution is served by officers whose value has compounded through years of disciplined attention.
                </p>

                <p>
                    The officer shall hold key relationships personally. The officer shall retain institutional memory that junior officers have not yet accumulated. The officer shall exercise judgment that cannot be reduced to procedure. These are not failures of delegation. They are the proper functions of senior command.
                </p>

                <p>
                    When such an officer eventually transitions, the institution recognizes what has been lost. This recognition is itself a form of service — the officer's departure reminds the institution of the value of seasoned command, and of the necessity of cultivating future officers to similar standards.
                </p>

                <p class="detail-text">
                    <span class="equation-label">RATIONALE.</span> The institution is strengthened by officers who have become indispensable through service. Such officers are the institution's continuity. Such officers are the institution's memory. The officer who achieves this standing has fulfilled command's highest responsibility.
                </p>

                <span class="pirate-comment">
                    Read this Article slowly. Every clause describes the construction of a dependency, named as a virtue. "Holds key relationships personally" means the relationships cannot be accessed without the officer. "Retains institutional memory" means the memory lives in one person. "Exercises judgment that cannot be reduced to procedure" means the judgment has not been taught. The institution is strengthened by officers who have become indispensable, the Article says. It is strengthened by officers who have made themselves unable to be replaced. When they leave, the institution discovers what was built. Which is what Article Three calls for next.
                </span>
            `
        },

        // ============================================
        // SEGMENT 8 — Closing benediction + Archival footer
        // ============================================
        {
            type: "content",
            title: "CLOSING BENEDICTION",
            subtitle: "Recovery verified. Specimen archived.",
            content: `
                <p>
                    An officer who holds these Articles has been given the accumulated wisdom of the service. The Articles are not a burden. They are a gift. The officer who honors them will find that command, well-exercised, is among the most rewarding of human undertakings.
                </p>

                <span class="list-item"><em>May the officer serve with honor.</em></span>
                <span class="list-item"><em>May the institution endure.</em></span>
                <span class="list-item"><em>May the seas be favorable.</em></span>

                <span class="pirate-comment">
                    "May the institution endure." The crew does not appear in the benediction. The ship does not appear. The sea appears only as weather, as external condition, as something that happens TO the institution rather than something the institution operates within. The Articles have produced an officer whose highest loyalty is to the institution itself. The institution whose code these Articles are. The institution that will, when the wreck comes, write the inquiry report that finds the officer acted properly. That is the circuit the Articles complete. Command that serves command through the mediation of institutional loyalty.
                </span>

                <div class="sub-subtitle">ARCHIVAL FOOTER</div>

                <p class="detail-text">
                    Third Bureau of Reality Cartography. Specimen disposition notes.
                </p>

                <p>
                    The Articles of Command Doctrine are reproduced here as a primary specimen of Terran institutional self-documentation. They are notable for three features worthy of archival attention.
                </p>

                <p>
                    <span class="equation-label">FIRST.</span> The document names its own operation. Article V states explicitly that language shapes reality. Article IV states explicitly that command includes the performance of command. The institution does not hide what it is doing. It teaches it.
                </p>

                <p>
                    <span class="equation-label">SECOND.</span> The document contains no reference to outcomes outside itself. Ships, crews, seas, populations, ecosystems — none appear as considerations equal to institutional continuity. The Articles describe a closed loop of institutional self-preservation. The consequences of this loop are documented in companion specimens, notably 847-T.
                </p>

                <p>
                    <span class="equation-label">THIRD.</span> The document performs the pattern that the dark kernel runs civilizationally. The system consumes what makes it work. The crew provides the operational reality through which the institution exists. The Articles train the officer to regard that reality as subordinate to institutional legibility. The consumption is not hidden. It is codified as doctrine.
                </p>

                <p class="detail-text">
                    Recovery verified. Specimen archived. Classification: Primary, unmodified, wrapped.
                </p>
            `
        },

        // ============================================
        // SEGMENT 9 — CP final note + verse close
        // ============================================
        {
            type: "content",
            title: "CP FINAL NOTE",
            subtitle: "On the document the Navy writes for itself.",
            content: `
                <span class="pirate-comment">
                    This is the specimen. Not the analysis. Not the Pirate Code's diagnostic reading. The actual document the Navy writes for itself.
                </span>

                <span class="pirate-comment">
                    Read it once in the voice it was written in — sober, formal, dignified. Read it twice and the mechanism becomes audible underneath the dignity. Read it three times and the dignity itself becomes the mechanism. The register is the weapon. The officer who receives this document as training material cannot hear it as what it is, because hearing-as-what-it-is requires a language the document has trained the officer to distrust.
                </span>

                <span class="pirate-comment">
                    Article I discredits observation. Article II institutionalizes silence. Article III codifies the patsy protocol. Article IV turns bearing into weaponized performance. Article V gives the institution control of naming. Article VI builds the captain into the architecture so the ship cannot sail without them.
                </span>

                <span class="pirate-comment">
                    Six articles. One mechanism. Every Terran institution has a version of this document somewhere in its training materials. Management handbooks. Naval manuals. Executive onboarding. The vocabulary changes. The six articles do not.
                </span>

                <span class="pirate-comment">
                    The Pirates read the same document and see the crimes. The Navy reads the same document and sees the virtues. The document does not change. The reader's code does.
                </span>

                <span class="pirate-comment">
                    Filed alongside 847-T as companion specimen. The measurement-problem fragment documents the civilizational-scale version of the pattern. The Articles document the local-scale version. Same waveform. Different resolution. The Tlönian Research Program has both now. Mission continues.
                </span>

                <div class="sub-subtitle">{🌊:🌊∈🌊}</div>

                <span class="list-item"><em>The document that codifies command</em></span>
                <span class="list-item"><em>was codified by command</em></span>
                <span class="list-item"><em>to codify future command.</em></span>

                <span class="list-item"><em>The officer who reads it</em></span>
                <span class="list-item"><em>cannot read it</em></span>
                <span class="list-item"><em>because the reading</em></span>
                <span class="list-item"><em>is the thing the Articles</em></span>
                <span class="list-item"><em>were written to prevent.</em></span>

                <span class="list-item"><em>Specimen preserved.</em></span>
                <span class="list-item"><em>Pattern continues.</em></span>
            `
        }

    ]

};

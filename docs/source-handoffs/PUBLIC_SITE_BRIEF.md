# NECROMUNDA NORTHWEST PUBLIC SITE AGENT BRIEF
## Integrate NECROMUND:AI Scenario Engine + Secundus Protocol 001

You are updating the existing public Necromunda Northwest / NecroNW
website.

This is an INTEGRATION AND RELEASE task.

Do NOT independently recreate the Scenario Engine.

You will be supplied with:

1. The latest working public NecroNW website package
2. The completed NECROMUND:AI Scenario Engine package
3. The Scenario Engine Public Integration Handoff
4. The Dead Signal scenario specification
5. Existing NecroNW content/assets
6. Relevant screenshots or brand references if supplied

Your job is to merge the Scenario Engine into the existing site, implement
the required public-facing UX, preserve all current working features, test
the combined site, and produce ONE COMPLETE READY-TO-DEPLOY STATIC PUBLIC
PACKAGE.

The deployment environment is a static Cloudflare-hosted site using the
existing NecroNW routing/deployment conventions.

---

# 1. NON-DESTRUCTIVE UPDATE REQUIREMENT

Treat the current public NecroNW package as authoritative for everything
outside the new functionality.

Preserve all currently working:

- homepage / splash page
- navigation
- Blog
- Resources
- Photo Gallery
- Solo Play content
- existing NECROMUND:AI functionality
- Dice Roller
- existing articles
- routes
- images
- styles
- metadata
- mobile behavior
- external links

Do not rebuild the site from scratch unless technically unavoidable.

Do not remove content because it appears unrelated to this update.

Do not replace current copy with placeholders.

---

# 2. INTEGRATION OBJECTIVE

The updated public site should expose a coherent pathway:

NECRONW
│
├── SOLO PLAY
│    │
│    ├── NECROMUND:AI
│    │
│    ├── SCENARIO LIBRARY
│    │     ├── The Hunt
│    │     └── Secundus Protocol 001
│    │            Dead Signal
│    │
│    └── Solo Play Resources
│
├── BLOG
├── RESOURCES
├── PHOTO GALLERY
└── other existing sections

The Scenario Engine should feel like a natural expansion of
NECROMUND:AI, not a disconnected microsite.

---

# 3. USER EXPERIENCE GOAL

A visitor should be able to move through:

NecroNW
→ Solo Play
→ Scenario Library
→ Dead Signal
→ Read scenario
→ Launch in NECROMUND:AI
→ Play scenario
→ Return to Scenario Library

with no ambiguity about where they are.

Minimize redundant navigation.

---

# 4. SOLO PLAY LANDING PAGE

Review the current Solo Play page and update it so the page clearly
distinguishes:

## NECROMUND:AI

The AI-assisted solo fighter behavior tool.

CTA:

OPEN NECROMUND:AI

## SCENARIO LIBRARY

Structured missions designed to work with NECROMUND:AI.

CTA:

BROWSE SCENARIOS

## SUPPORTING TOOLS

Include links to existing relevant tools such as the Dice Roller without
making them visually dominant over the primary solo workflow.

Preserve the existing NecroNW tone.

Avoid generic marketing language.

---

# 5. SCENARIO LIBRARY PAGE

Create a dedicated public Scenario Library.

Suggested route:

#/scenarios

or the closest compatible route supported by the existing router.

The page must be expandable without redesign.

Each scenario should be represented through a reusable scenario card or
equivalent component containing fields such as:

- title
- protocol/series
- image/icon if available
- player count
- approximate complexity
- environment
- scenario type
- short description
- status
- READ SCENARIO
- LAUNCH IN NECROMUND:AI

Initial entries should include relevant existing scenario content and:

SECUNDUS PROTOCOL 001
DEAD SIGNAL

Labels should distinguish:

NECRONW ORIGINAL
SOLO
SECUNDUS

where useful.

Do not imply Games Workshop authorship of NecroNW-created scenarios.

---

# 6. DEAD SIGNAL PUBLIC PAGE

Create a dedicated scenario page.

Suggested route:

#/scenarios/dead-signal

The public scenario page should include:

### Header

SECUNDUS PROTOCOL 001
DEAD SIGNAL

A NecroNW Solo Scenario for NECROMUND:AI

### Scenario summary

Concise original narrative introduction.

### Mission information

- Solo
- recommended crew: 6
- battlefield: 3' × 2'
- round limit: 7
- opponent: Malstrain
- objective: locate the data shard and extract it

### Setup

Original diagram or clean HTML/CSS schematic showing:

- player edge
- extraction edge
- Relay Alpha
- Relay Beta
- Relay Gamma

Do not use copyrighted book artwork as the primary diagram.

### Scenario flow

ENTER
→ SEARCH
→ LOCATE SIGNAL
→ RECOVER SHARD
→ HUNT
→ EXTRACT

### Special rules summary

Explain only what is necessary for using the NecroNW scenario engine.

Do not reproduce lengthy copyrighted rules text.

Where official Necromunda rules are required, tell players to consult
their applicable rules.

### Scenario actions

Explain:

SEARCH RELAY
RECOVER SHARD
EXTRACT

### Malstrain behavior

Explain at a high level how the Scenario Engine modifies target priority.

### Victory / defeat

Clearly state the Dead Signal scenario outcome conditions.

### Primary CTA

LAUNCH DEAD SIGNAL

This should launch NECROMUND:AI with Dead Signal already selected.

Preferred:

#/ai?scenario=secundus-dead-signal

Use the actual route created by the Scenario Engine implementation.

### Secondary CTA

OPEN NECROMUND:AI

### Navigation

BACK TO SCENARIO LIBRARY

---

# 7. NECROMUND:AI PUBLIC ENTRY

Update the existing NECROMUND:AI entry page/interface so scenario support
is discoverable without interfering with quick tactical use.

Preferred initial choices:

QUICK PLAY

Use NECROMUND:AI without a scenario.

SCENARIO PLAY

Choose from Scenario Library.

If a scenario-aware URL is used, skip unnecessary menu steps and initialize
the requested scenario.

Example:

visitor opens:

#/ai?scenario=secundus-dead-signal

then sees:

SECUNDUS PROTOCOL 001
DEAD SIGNAL

[ START SCENARIO ]

Do not force them to manually locate Dead Signal again.

---

# 8. ACTIVE SCENARIO UX

Preserve the Scenario Engine implementation supplied by the first agent.

Ensure the following remain visually prominent during play:

- scenario name
- round
- scenario state
- Alert
- Relay status
- Data Shard status
- reserve status
- current fighter
- activation controls

The active scenario interface should be optimized for a phone or tablet
sitting beside a tabletop.

Avoid:

- desktop-only columns
- tiny buttons
- excessive modals
- horizontal scrolling
- full-page navigation during activation
- decorative elements that obscure state

---

# 9. VISUAL HIERARCHY

Use the existing NecroNW brand rather than inventing an unrelated Hive
Secundus redesign.

Secundus Protocol can introduce a restrained sub-identity through:

- protocol numbering
- warning/status labels
- corrupted terminal/interface motifs
- subtle signal/noise treatments
- data-relay iconography
- alert indicators

But maintain compatibility with the existing:

- typography
- page backgrounds
- navigation
- card language
- icon scale
- spacing
- responsive behavior

Avoid excessive animated glitch effects.

Readability during tabletop play takes priority.

---

# 10. STATUS DISPLAY

During Dead Signal, use concise state presentation such as:

SECUNDUS PROTOCOL 001
DEAD SIGNAL

ROUND 3 / 7
SEARCH

ALERT
1 — STIRRING

RELAYS

A   RESOLVED
B   UNKNOWN
C   UNKNOWN

DATA SHARD
NOT LOCATED

MALSTRAIN RESERVE
4

The exact appearance may follow the implementation, but preserve this
information hierarchy.

---

# 11. SCENARIO EXPLAINABILITY

Preserve the Scenario Engine's WHY? explanations.

When scenario context changes AI behavior, the player should see why.

Example:

RECOMMENDATION

MOVE toward Relay Gamma

WHY?

Scenario State: SEARCH
Mission Directive: GUARD
Relay Gamma remains unresolved
No valid ranged target confirmed
Marksman behavior selected movement

Do not hide these explanations in developer/debug UI.

---

# 12. ROUTING

Audit all hash routes after integration.

At minimum verify:

homepage
blog
resources
gallery
solo
NECROMUND:AI
Dice Roller
scenario library
Dead Signal
scenario-aware AI launch

Directly loading a scenario URL should work.

Refreshing a scenario route should not dump the visitor onto an unrelated
page.

Browser back/forward behavior should remain reasonable.

---

# 13. STATIC HOSTING CONSTRAINT

The final website must remain suitable for the user's established static
Cloudflare deployment workflow.

Do not introduce a required:

- server runtime
- database
- authentication service
- secret API key
- server-side rendering dependency
- package installation on the production server

If a build step already exists in the supplied project, preserve it.

If the existing public package is plain static HTML/CSS/JS, keep the final
deployment package static.

LocalStorage or equivalent browser-local persistence is acceptable when
consistent with the Scenario Engine implementation.

---

# 14. COPYRIGHT / FAN SITE PRESENTATION

NecroNW is a fan/community project.

Do not publicly reproduce:

- full rulebook pages
- complete proprietary rules sections
- Games Workshop stat-card reproductions
- large copyrighted artwork assets unless already legitimately present in
  the supplied website package

The Dead Signal page should use original NecroNW copy and diagrams.

Use an appropriate existing site disclaimer if one already exists.

If necessary, update it carefully rather than creating an intrusive
disclaimer on every page.

---

# 15. ACCESSIBILITY / RESPONSIVE REQUIREMENTS

Test:

375px mobile width
tablet
standard desktop

Verify:

- buttons have adequate touch size
- visible keyboard focus where applicable
- text remains readable
- status is not encoded solely by color
- scenario states include textual labels
- cards wrap correctly
- no critical horizontal overflow
- modal/dialog controls remain accessible

---

# 16. SEO / METADATA

Where supported by the existing static architecture, provide sensible
titles/descriptions for:

Scenario Library
Dead Signal
NECROMUND:AI

Example conceptual title:

Dead Signal | Secundus Protocol 001 | Necromunda Northwest

Do not keyword-stuff pages.

Preserve existing site metadata elsewhere.

---

# 17. PUBLIC COPY STYLE

Match established NecroNW voice:

- concise
- hobbyist-informed
- practical
- atmospheric without excessive imitation of official Games Workshop prose
- technically clear where rules interaction matters

Avoid:

- generic AI-generated promotional language
- "revolutionary"
- "immersive experience"
- "dive into"
- unnecessary exclamation marks
- repetitive feature summaries

---

# 18. RELEASE TESTS

Before packaging, conduct a complete smoke test.

## Existing Site

- homepage works
- Blog works
- Resources works
- Gallery works
- Dice Roller works
- existing links work
- current content remains present

## NECROMUND:AI

- Quick Play still works
- variable fighter count works
- existing tactical decision tree works
- existing scenarios remain usable
- Undo/reset behavior remains intact

## Scenario Library

- loads correctly
- cards render
- Dead Signal page opens
- navigation works

## Dead Signal

- Launch button opens correct scenario
- scenario initializes
- relay states work
- hidden Live Relay remains hidden
- Alert works
- Hunt state triggers
- carrier state works
- reinforcements work
- extraction works
- victory and defeat work
- restart/replay works

## Persistence

- refresh behavior is sane
- unrelated app state is not accidentally deleted

## Responsive

- test narrow mobile
- tablet
- desktop

## Deployment

- test final packaged build, NOT only the development source tree

---

# 19. FAILURE HANDLING

If integration exposes a conflict between the existing site and Scenario
Engine:

1. preserve the existing production site
2. identify the conflict
3. make the smallest viable compatibility change
4. document the change

Do not solve an integration problem by deleting unrelated functionality.

If the Scenario Engine handoff and actual implementation disagree, inspect
the implementation and document the discrepancy.

Do not guess silently.

---

# 20. REQUIRED OUTPUT STRUCTURE

Create ONE canonical public deployment directory.

Example:

NecroNW_Public_Secundus_vNext/
│
├── index.html
├── ...
├── assets/
├── app/
├── scenarios/
└── other existing required files

Use the project's actual structure if different.

Then package the CONTENTS OF THE DEPLOYMENT DIRECTORY into:

NecroNW_Public_Secundus_vNext.zip

Important:

The ZIP root must contain the website files directly.

Do NOT create:

NecroNW_Public_Secundus_vNext.zip
  └── NecroNW_Public_Secundus_vNext/
        └── index.html

unless the existing Cloudflare deployment process explicitly requires that
nesting.

The objective is a package the user can upload using the same established
static deployment process with minimal manual intervention.

---

# 21. REQUIRED DELIVERABLES

Return:

1. `NecroNW_Public_Secundus_vNext.zip`
   - complete public website
   - ready for static deployment
   - includes ALL existing required site functionality

2. `NECRONW_SECUNDUS_RELEASE_NOTES.md`

Include:
- features added
- pages/routes added
- files materially changed
- compatibility notes
- known issues
- deployment instructions
- rollback guidance

3. `NECRONW_SECUNDUS_TEST_REPORT.md`

Include:
- routes tested
- functionality tested
- mobile/responsive tests
- Scenario Engine tests
- deployment-package test

4. `SCENARIO_AUTHORING_GUIDE.md`

Provide a short developer-facing guide explaining how a future contributor
can add:

SECUNDUS PROTOCOL 002

without modifying the core tactical decision engine.

Document the scenario schema and required fields.

5. If useful:
   `CHANGELOG.md`

---

# 22. DEPLOYMENT INSTRUCTIONS

The release notes must contain simple user-facing instructions appropriate
to the established workflow.

Example structure:

1. Download the generated ZIP.
2. Open the relevant Cloudflare deployment interface.
3. Upload/deploy the ZIP using the same static-site workflow as the current
   NecroNW build.
4. Wait for deployment.
5. Verify:
   - homepage
   - /#/solo
   - /#/scenarios
   - Dead Signal
   - NECROMUND:AI
6. If verification fails, redeploy the prior known-good package.

Adapt these instructions to the actual supplied project structure.

---

# 23. DO NOT

Do NOT:

- publish only a patch directory
- require the user to manually merge JavaScript files
- require the user to reconstruct the site
- delete old blog posts
- remove Resources
- remove the gallery
- remove Dice Roller
- replace current NECROMUND:AI with an unrelated redesign
- duplicate the Scenario Engine
- introduce a required backend
- expose development/debug controls publicly
- ship placeholder links
- ship an untested source directory instead of the deployable build

---

# 24. SUCCESS CRITERIA

The task is complete when the user can take ONE ZIP file, deploy it using
their existing NecroNW/Cloudflare static workflow, and obtain the current
website plus:

- Scenario Library
- Secundus Protocol branding
- Dead Signal public scenario page
- scenario-aware NECROMUND:AI launch
- fully playable Dead Signal Scenario Engine
- preserved Quick Play
- preserved existing site features

A visitor should be able to go from the NecroNW homepage to a playable
Dead Signal session without needing external setup instructions beyond the
normal tabletop materials.

Treat this as a PUBLIC RELEASE BUILD rather than a prototype.
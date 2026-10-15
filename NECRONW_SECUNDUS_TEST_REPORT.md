# NecroNW Secundus test report

Release `1.0.0-alpha.4`, NECROMUND:AI `3.3.1`, Dead Signal `1.1.0`.

**Result: passed.** The combined public build was zipped, extracted into an independent directory, and served from that extracted `public/` directory for browser tests. Final archive verification confirms identical deployed asset bytes. The Cloudflare account was not changed.

## Automated engine validation

Both supplied Vitest files passed: **51 tests**. Tests were rerun after the host compatibility fix. Coverage includes the existing tactical resolver, Priority/Action/End flow, variable fighter state, named rules and weapon-specific ammunition; scenario initialization and hidden state; action eligibility/cost; SEARCH/HUNT; stable carrier references; drop/recover/transfer; reserve queues, placement and controller confirmation; Out of Action recycling; outcomes; migration and legacy scenario versions.

The only scenario-source integration change is a URL-selection listener in `ScenarioPanel.tsx`. Tactical resolution, scenario definitions and runtime transitions match the supplied app. The browser test reproduces and verifies the fixed case: changing the scenario hash while an app document is already open.

## Public routes and preserved content

| Area | Validation |
| --- | --- |
| `/#/` | Existing homepage loads; Dead Signal notice added |
| `/#/solo` | Three-part hub, app entry, scenario browsing, supporting tools; quick-start dialog opens and closes with Escape |
| `/#/blog` | Six entries retained; four complete new articles open with full article bodies |
| `/#/resources` | All 13 resource cards retained |
| `/#/gallery` | Seven photos decode; enlarged original loads and dialog closes |
| `/#/dice` | Integrated roller generates a result |
| `/apps/underhive-dice/` | Standalone roller generates a result |
| `/#/scenarios` | Two reusable cards, search, Read Scenario and app launch links |
| `/#/scenarios/the-hunt` | Existing PDF link and explicit manual Quick Play guidance |
| `/#/scenarios/dead-signal` | Two relays in the original schematic; direct load, refresh, title, back/forward |
| `/#/ai` | Quick Play and Scenario Play entry |
| `/#/ai?scenario=secundus-dead-signal` | Redirects to correct nested app; setup preselected; saved scenario resumes |
| `/apps/necromund-ai/#/ai?scenario=secundus-dead-signal` | App loads at production subpath and initializes current scenario |

All existing article data, Resource Cache data, gallery images, downloads, dice implementation and standalone dice app assets were verified unchanged by hashes. A total of **36 existing public files** are byte-identical. Four outer website files and the app build were intentionally updated; `scenario-pages.js`, the current guide and app host stylesheet were added. The release has **49 public files**. `wrangler.json` is byte-identical to the supplied configuration.

Existing external links were preserved by data/file comparison. Third-party availability was not rechecked as part of this integration.

## Browser gameplay checks

The supplied v3.3.1 browser playthrough was run against the nested app inside the extracted deployment build. It passed:

- Two-relay initialization, six-player default crew, four initial AI actors and hidden live-relay HUD.
- Direct fighter-card Out of Action → Reserve, reserve replenishment and Undo.
- Tactical recommendations and visible WHY/decision-path context in SEARCH and HUNT.
- Decoy search, Alert increase, live search, shard assignment and HUNT transition.
- Refresh during an active player activation without losing progress.
- Genestealer arrival guarantee; queued reinforcement survives refresh; legal deployment confirmation and next round.
- Drop Shard, Recover Shard, extraction victory and downloadable result JSON.
- Reset restoring the previous roster and replay without reloading.
- Passing exhausted AI opportunities.
- Legacy three-relay save warning and explicit restart into the two-relay version.
- Out of Action while a fighter is actively taking its turn, followed by Undo.

Additional combined-site checks passed:

- Seven-player custom crew setup.
- Opening the public launch link during an existing scenario resumes its state without reinitialization.
- Quick Play Add Fighter, save/refresh, tactical decision generation, End Activation, Undo and sample-battle reset.
- Defeat after all six player fighters are reported removed through the UI.
- Round-seven defeat and stable final round from a saved-game fixture. Unit tests separately simulate full round progression.

The tests inspect hidden local state only to choose deterministic test actions; no secret state was added to the public interface.

## Upgrade and persistence

A separate browser test loaded the supplied alpha3 app and its service worker, modified a saved fighter, then switched the server to the packaged alpha4 app on the same origin. It waited for the replacement worker controller, reloaded, and verified:

- NECROMUND:AI V3.3.1 loaded.
- The modified alpha3 fighter persisted.
- An in-document Dead Signal link selected the setup.
- Starting and resetting the scenario restored the preceding alpha3 battle.
- An unrelated localStorage entry remained intact.
- Registered app service-worker scope was exactly `/apps/necromund-ai/`.

An initial test that reloaded before controller activation intermittently displayed the old cached interface. The corrected upgrade test waits for controller activation and passes. Release notes explain refresh/reopen behavior without clearing site data.

## Responsive and visual checks

Public routes were checked at **320, 375, 768 and 1280 px**. The supplied active-scenario playthrough checks the same widths. No critical horizontal overflow was detected. Textual stage, Alert, relay and reserve labels remain visible; state is not communicated by color alone.

Desktop Solo Play and Scenario Library screenshots, a mobile Dead Signal page, its mobile setup diagram and the active mobile HUD were visually reviewed. A clipped decorative card heading was corrected. Primary public actions have at least 48px height; host-app navigation has 44px targets. Existing app controls retain supplied touch styles and keyboard focus. Screenshot evidence is under `docs/screenshots/`.

No browser page errors or missing local assets were recorded in the completed combined-site run. This is Chromium validation, not a physical-device Safari/Firefox certification or a complete accessibility audit.

## Deployment-package checks

- ZIP contains `wrangler.json` and `public/` at archive root, without an extra enclosing directory.
- Only `public/` is served by the supplied Wrangler configuration. Source, tests, handoffs and documentation remain outside assets.
- No installed dependencies, local account cache or operating-system metadata is included.
- All app HTML, JS, CSS, icon, manifest and service-worker output is present at the nested production path.
- Wrangler **4.145.0** accepted the extracted configuration with `deploy --config wrangler.json --dry-run` and exited successfully.
- ZIP integrity and byte-for-byte correspondence with the browser-tested public assets are checked before delivery.

## Evidence and reproduction

Machine-readable results: `docs/site-validation.json`, `browser-validation.json`, `upgrade-validation.json`, `unit-validation.json`, `deployment-validation.json`, `asset-comparison.json`, `engine-source-comparison.json`, and `package-validation.json`.

For browser tests, install Playwright/Chromium in a development environment, then run `node tests/site-smoke.cjs`. `BROWSER_EXECUTABLE` can select a Chromium binary; `TEST_SITE_ROOT` selects an extracted `public/` directory. The upgrade test additionally requires `BASELINE_ROOT` pointing to the alpha3 `public/` directory. The full engine playthrough is invoked by the site test.

Tabletop balance, every official rules interaction and Cloudflare live-domain behavior after deployment are outside this validation. Verify the published release identifier and app version after running Wrangler.

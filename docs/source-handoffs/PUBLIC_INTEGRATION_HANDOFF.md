# Public integration handoff — NECROMUND:AI v3.3

## Objective

Integrate this tested app into the existing NecroNW public website. Preserve site content, gallery, Resources, Dice Roller, existing links and The Hunt download. This work extends the recovered v3.1 React source; do not replace its tactical resolver with another implementation.

## Files

Added: `src/scenarios/types.ts`, `dead-signal.ts`, `runtime.ts`, `ScenarioPanel.tsx`, `runtime.test.ts`; `scripts/scenario-browser-smoke.cjs`, `scripts/nested-build-smoke.cjs`; architecture/specification/review/changelog/validation/handoff documents under `docs/`.

Changed: `src/App.tsx`, `src/types.ts`, `src/styles.css`, `src/components/FighterCard.tsx`, build outputs under `dist/` and associated TypeScript build metadata. Existing `src/engine/resolver.ts`, activation/state modules, core rules, seed and migration were preserved.

## Build and runtime

Node/npm project. `npm ci`, `npm test`, `npm run build`. Vite builds a client-only React PWA. No backend, API key, AI service, external font, new raster asset or database is required. The lockfile is supplied.

For the original standalone host, use the root-base `dist/` output. For NecroNW, run:

```sh
npx vite build --base=/apps/necromund-ai/ --outDir=integration/necromund-ai --emptyOutDir
```

Copy the **entire** resulting `integration/necromund-ai/` directory into `public/apps/necromund-ai/` in the alpha3 package. Do not copy just a hashed JS file. Verify HTML asset paths, manifest scope and generated service-worker paths. Reapply NecroNW's app navigation and storage banner if desired without changing the `root` mount or React entry scripts. Existing alpha3 standalone CSS/navigation additions are outside this source and will not be automatically retained by a raw directory replacement.

A ready-built nested-path app is included at `integration/necromund-ai/` in the source package. The root `dist/` is the standalone test app, not the nested-path public replacement.

## Routes

Scenario ID: `secundus-dead-signal`, version `1.1.0`.

Standalone: `/#/ai?scenario=secundus-dead-signal` or `/?scenario=secundus-dead-signal`. These open the library/setup; they do not silently reset a saved game.

Embedded: `/apps/necromund-ai/#/ai?scenario=secundus-dead-signal`.

The preferred outer site route `/#/ai?scenario=secundus-dead-signal` must be added to the **NecroNW site router**, not assumed to exist. Parse the outer hash path and query separately, then launch or embed the nested app with the scenario query. Preserve existing `/#/solo`, `/#/dice`, blog, gallery and Resources routes. The app itself has no external route redesign.

## APIs and invariants

`BattleState.scenario` is optional. `initializeScenario` takes a registered definition, named crew, extraction edge and assignment mode. Immutable runtime functions validate and return the next whole battle. `resolveWithScenario` must call the existing resolver; mission and target context modify intent, not combat legality.

End Phase processing is idempotent using `lastEndRound`; reserve actors are queued once and only added to `fighters` after confirmed deployment. Never auto-advance past a pending queue. Every carrier reference is an actor ID, never an array position. Terminal result creation must remain single-shot. The public HUD uses `publicScenario`; never render `hidden` or `original` or export active secret state.

## Compatibility risks

- localStorage is origin-specific. A battle saved on the ChatGPT standalone host will not automatically migrate to `necronw.org`. Existing battles on NecroNW retain the key `n2-necromund-ai-v03` and can load if the new app stays at the same origin.
- PWA service-worker caches can retain older app files. Use the generated cache revision, verify updates in an existing install, and keep the nested app's scope confined to `/apps/necromund-ai/`.
- The prior global battle is stored inside an active scenario for Reset. Do not strip that snapshot during migration.
- Browser-only storage is not secure hidden information against developer-tools inspection. Normal UI concealment is intentional.
- Fighter profiles/equipment are deliberately absent. Setup must continue to ask for legitimate references.
- Scenario source definitions are versioned. Do not change a saved version's semantics without migration or a new definition version.

## Must not change during publishing

Do not rewrite core actions, archetype priorities, normal Priority/Action/End flow, weapon-specific ammunition, Group Activation, named rule exceptions or migration. Do not remove Undo, change actor IDs to positions, skip deployment confirmation, leak the live relay early, duplicate recycled actors, auto-infer tabletop facts or add campaign advancement. Do not broaden the standalone host's audience without the user's instruction.

## Acceptance

Run unit tests and production build. Run the browser smoke script with Playwright available (optional `BROWSER_EXECUTABLE` selects an installed Chromium) and inspect 320/375 px layouts. Verify a fresh session, a resumed activation, an End Phase reload, SEARCH→HUNT, reinforcements, extraction/defeat and Reset. Test the final nested-path build within the actual site before generating the Cloudflare upload ZIP. This handoff is not a claim that the public NecroNW website has already been replaced.

## v3.3 revision notes

The current Dead Signal definition is 1.1.0: TWO relays (Alpha/Beta), predefined type/loadout names and archetypes, and Out of Action recycling for Brood Scum, Tyramites and Genestealers. The previous 1.0.0 definition is retained in `src/scenarios/dead-signal-v1.ts` solely for existing saves. Do not delete it or silently convert old saves. Explain that Reset Scenario / reinitialize starts the revised mission.

Use `recordMalstrainOutOfAction` for scenario casualties. Do not simply splice registered Malstrain from the roster: that bypasses reserve replenishment and group repair. Recycled profiles and casualty counts must survive storage, Undo and migration. The controller selection for a returning Tyramite must use a currently deployed Brood Scum. The one-time Genestealer deployment guarantee must not be retriggered by every casualty.

Current validation is in `TEST_RESULTS_V3_3.md`; historical v3.2 material is retained under `docs/legacy-v3-2/`. The new source package includes both standalone `dist/` and refreshed nested-path `integration/necromund-ai/` builds.

## v3.3.1 interface fix

Added visible Out of Action → Reserve controls on AI cards and active tactical/result screens. Earlier 1.0.0 saves display their rules version and an explicit restart button for the two-relay scenario. Current 1.1.0 saves retain progress. All 51 unit tests and browser playthrough passed, including direct card casualties, Undo, active fighter casualties and legacy restart.

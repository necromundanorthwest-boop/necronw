# Adding Secundus Protocol 002

The editable app is in `source/necromund-ai/`; the deployed app is in `public/apps/necromund-ai/`. The website's mission cards and briefings live in `public/scenario-pages.js`. Keep the tactical resolver (`src/engine/resolver.ts`) unchanged.

## Supported scope

A second Secundus mission can reuse the supplied engine when it uses one hidden relay/search network, one actor-linked artifact, player-confirmed actions, stage-specific directives, an Alert-like counter and reserve waves. There is no arbitrary event scripting, multi-artifact system, full gang generation or campaign progression layer.

Some interface wording still says Malstrain, relay and shard; the result schema includes `maxAlert` and shard fields. For the smallest compatible addition, keep `alert`, `shard`, `alpha`/`beta`, the SEARCH/HUNT stages and existing actor kinds. Broader themes may require presentation/runtime extensions with tests, although the core tactical decision engine should still remain unchanged. Physical-D6 prompts are currently written for two or three objectives.

## 1. Author a versioned definition

Create `src/scenarios/protocol-002.ts`. Use `ScenarioDefinition` from `types.ts`; inspect `dead-signal.ts` as the working example. Required fields:

| Fields | Contents |
| --- | --- |
| `id`, `version`, `title`, `protocol`, `family`, `description` | Stable machine ID, semantic version and public identity |
| `roundLimit`, `recommendedCrew` | Positive mission defaults |
| `setup`, `environment` | Original setup instructions and `{id,title,reminder}` records |
| `objectives` | Unique `{id,title}` records; retain `alpha` as the initial UI selection unless adjusting the panel |
| `hidden` | At least one `{id,kind:'randomObjective'}` record; current runtime uses the first live-objective network |
| `counters` | `{id,title,initial,max,labels}`; one label for each integer value |
| `artifact` | `{id,title,initial}`; compatible initial state `NOT_LOCATED` |
| `actions` | Unique ID/title/label, allowed stages, eligibility type, normal-action cost, effects and confirmation text |
| `events` | `onDecoy` and `onLive` effect arrays |
| `states` | Initial stage and directives indexed by stage and actor kind |
| `force`, `reserve` | Actor templates with stable ID/name/kind/archetype/weapon role; optional equipment name, unlock and controller type |
| `reinforcement` | Counter ID, start round, bands, guaranteed-unlock ID, placement text and optional recycling kinds |
| `victory`, `defeat`, `achievements` | Condition arrays and achievement records |

Allowed action eligibility values: `unsearched`, `dropped`, `carried`, `otherCarrier`. Actions require a player activation, legality confirmation, affordable cost and no duplicate use of that action ID in the same activation.

Effect vocabulary: `counter` (`id`, optional `add`/`min`), `stage`, `unlock`, `assign`, `drop`, `extract`. Artifact effects use the single carried artifact. Condition vocabulary: `artifact`, `roundLimit`, `noPlayers`, `searchedAll`, `playersAtLeast`. Victory/achievement condition lists require all listed conditions; defeat triggers when any listed defeat condition is met.

A directive supplies `mission`, a supported `coreMission`, priority descriptions and movement intent. These adapt the existing resolver's context. They do not select a second combat action or override legal targeting restrictions.

Actor templates require a unique stable `id`, `name`, `kind`, `behaviour` (`BRAWLER`, `MARKSMAN` or `ADAPTIVE`) and valid weapon `role`. Optional `unlock` controls eligibility; `requiresController` names the deployed actor kind required for that actor. Wave bands must cover each supported counter value. A first-only burst falls back to one actor on subsequent occurrences.

Do not edit a released definition's semantics in place. Retain old versions so saved `id` + `version` pairs can still resolve. The current registry deliberately retains Dead Signal 1.0.0 for historical saves while advertising only 1.1.0.

## 2. Register it

In `src/scenarios/dead-signal.ts`, import the new definition and add it to `scenarioLibrary`. Ensure `definitionFor` can still resolve every retained saved version. Do not create circular imports by importing the Dead Signal module back into a new definition module that the registry imports; author the new definition independently or move shared data to a neutral module.

The app automatically lists registered definitions and accepts its ID through `?scenario=...` in the nested app URL. Initialization must remain explicit and preserve the previous battle snapshot.

## 3. Add the public mission

In `public/scenario-pages.js`:

- Add a catalog entry with `slug`, `title`, `series`, `tags`, `players`, `complexity`, `environment`, `type`, `status`, `version`, `description`, `launch`, `launchLabel`, and `art`.
- Add a dedicated page renderer and dispatch it by slug. Do not allow a new slug to fall through to the current Dead Signal briefing.
- Write original instructions and a useful diagram; identify the mission as fan-made.
- Link directly to `/apps/necromund-ai/#/ai?scenario=YOUR-ID`, or extend the outer site's explicit scenario-ID allowlist in `public/app.js` if using `/#/ai?scenario=YOUR-ID`.
- Extend the title/description mapping for the new briefing.

Reusable cards and search require no layout redesign. “The Hunt” remains a manual PDF entry and must not be marked as an automated scenario until it has a tested definition/runtime.

## 4. Validate and build locally

From `source/necromund-ai/`:

```sh
npm ci
npm test
npm run build -- --base=/apps/necromund-ai/ --outDir=integration/necromund-ai --emptyOutDir
```

Copy the entire generated `integration/necromund-ai/` output into `public/apps/necromund-ai/`. Keep the public site and app navigation. The HTML intentionally links to `/apps/necromund-ai/necronw-shell.css`; Vite leaves that absolute public URL unchanged and copies the stylesheet into the build.

The lockfile pins the supplied dependency versions. Do not replace the deployed app with its source folder or a root-base build.

Add meaningful tests for initialization, secret concealment, eligibility/action cost, discovery, waves, controller restrictions, stable carrier IDs, casualties/recycling, outcomes, Undo and save/version compatibility. Test navigation from the actual public briefing and a refresh on the nested path. Check 375px, tablet and desktop widths.

Keep localStorage key `n2-necromund-ai-v03` and PWA scope `/apps/necromund-ai/`. Never use a site-wide `localStorage.clear()` or unregister unrelated service workers to add a scenario.

## 5. Release

Bump `public/release.json`, update the release/test notes, package the complete website and run the smoke test against the ZIP-extracted `public/` directory. Deploy with the existing root `wrangler.json`. Protocol 002 should add scenario content and compatible adapters, not replace the core tactical decision tree.

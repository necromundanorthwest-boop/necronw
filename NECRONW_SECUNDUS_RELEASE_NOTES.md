# NecroNW Secundus release — alpha.4

Release: `1.0.0-alpha.4` · NECROMUND:AI `3.3.1` · Dead Signal scenario `1.1.0`.
Prepared from the supplied alpha3 website and v3.3.1 Dead Signal archives on 30 September 2026. This package has not been deployed to the user's Cloudflare account.

## Added

- Solo Play now separates NECROMUND:AI, the Scenario Library and supporting tools.
- Dedicated Scenario Library with reusable, searchable cards for Dead Signal and The Hunt.
- Dead Signal public briefing: setup, original two-relay schematic, actions, environment reminders, opponent intent, reinforcements and outcomes.
- NECROMUND:AI entry with Quick Play and Scenario Play choices.
- Scenario-aware launch opens the supplied app with Dead Signal selected. A saved scenario resumes rather than being replaced.
- Updated app includes visible Out of Action → Reserve controls, preset Malstrain names/archetypes and two-relay play.
- App navigation returns to Scenario Library, the Dead Signal brief, Solo Play, dice and home.
- A restrained Dead Signal notice on the existing homepage and a current downloadable AI guide.

## Routes

| Route | Purpose |
| --- | --- |
| `/#/solo` | Solo Play hub |
| `/#/scenarios` | Searchable public Scenario Library |
| `/#/scenarios/dead-signal` | Secundus Protocol 001 briefing |
| `/#/scenarios/the-hunt` | Existing PDF mission and manual Quick Play guidance |
| `/#/ai` | Quick Play / Scenario Play entry |
| `/#/ai?scenario=secundus-dead-signal` | Direct launch into the nested app |
| `/apps/necromund-ai/#/ai?scenario=secundus-dead-signal` | Actual app scenario entry |
| `/apps/necromund-ai/` | Existing app address, retained |

The homepage, Blog, Resources, Photo Gallery, integrated Dice Roller, standalone dice app, article routes and downloads remain available at their existing addresses.

## Material changes

- `public/app.js`: new routes, hash-query parsing, Solo Play template, current quick-start dialog and homepage notice.
- `public/scenario-pages.js`: new public catalog, briefings, original schematic and AI entry.
- `public/styles.css`: scoped public scenario styles and responsive layouts.
- `public/content.js`: AI version and current guide link only; existing article/gallery content retained.
- `public/release.json`: alpha.4 release identifier.
- `public/apps/necromund-ai/`: complete nested-path production build of the supplied v3.3.1 app, with host navigation restored. Obsolete hashed v3.1 assets were replaced by the current build.
- `public/resources/necromund-ai-v3-3-1-guide.md`: current guide; the previous guide URL also remains available.
- `source/necromund-ai/`: editable app source and lockfile, outside deployed assets.

Twenty-two of the 23 supplied app source files under `src/` match the v3.3.1 archive byte for byte. A small `ScenarioPanel.tsx` compatibility change listens for hash/history changes so a scenario link works when the app is already open; it does not initialize or reset a battle. The app build also restores HTML host navigation/title/robots metadata and adds a small navigation stylesheet. The tactical resolver, scenario definitions and scenario runtime are unchanged. A detailed file comparison is in `docs/asset-comparison.json` and `docs/engine-source-comparison.json`.

## Compatibility decisions

1. **Two relays:** the public-site brief contains older Alpha/Beta/Gamma examples. The current v3.3.1 source, specification and handoff explicitly use Alpha/Beta and replenishing reserves. Public copy follows that implementation.
2. **The Hunt:** the supplied engine does not implement it as a runtime scenario. Its existing five-page PDF remains intact; the library explicitly labels manual scenario resolution and offers Quick Play. No false automated-launch entry was added.
3. **Discovery:** the live relay immediately assigns the shard to its searching fighter. Recover Shard is needed after a drop, not as a second compulsory pickup at discovery.
4. **Existing saves:** the key `n2-necromund-ai-v03` and nested app address are retained. Reset Scenario restores the exact preceding battle snapshot. The engine's explicit v1.0.0 legacy scenario restart remains available; old three-relay saves are not silently converted.
5. **In-document scenario links:** the supplied panel read the scenario query only on its first render. A hash/history listener now updates the setup selection when opening a scenario link in an existing app document. Active scenario state still takes precedence.
6. **Origin matters:** saves on `necronw.org`, the Workers address and a ChatGPT-hosted app are separate. Use the same address and browser to resume a game.
7. **Static hosting:** no backend, authentication service, database or secret key was added. Wrangler still deploys only `public/`.

## Deploy with the established Wrangler workflow

1. Keep the known-good alpha3 ZIP as a backup.
2. Download and extract `NecroNW_Public_Secundus_vNext.zip` into a new folder.
3. Open Terminal in the extracted folder containing **`wrangler.json` and `public/`**. On macOS, type `cd` followed by a space, drag that folder into Terminal, then press Return.
4. Run:

```sh
npx wrangler@4 deploy --config wrangler.json
```

5. Complete Cloudflare login if requested, using the account that owns the existing `splashpage` Worker. Wait for successful deployment.
6. Check https://splashpage.necromundanorthwest.workers.dev/release.json — it must show `1.0.0-alpha.4`.
7. Review the homepage, `/#/solo`, `/#/scenarios`, `/#/scenarios/dead-signal`, Blog, Resources, Gallery and Dice Roller.
8. Launch Dead Signal, confirm **NECROMUND:AI V3.3.1**, and start a test game. The HUD should show two relays and four initial Malstrain fighters. Reset Scenario when done.

The ZIP has no extra enclosing folder: `wrangler.json`, `public/`, the release documents, source, scripts and tests are at ZIP root. `public/` is intentionally retained because the existing Wrangler configuration points there. No repository, Pages command, manual merging or production build is required.

`wrangler deploy` activates the release. `wrangler versions upload` alone does not activate it. This package preserves the supplied Worker name and compatibility date; it does not alter custom-domain settings. If `necronw.org` does not match the Workers address, check the custom domain's Worker assignment.

Wrangler 4.145.0 accepted the extracted deployment package with `deploy --config wrangler.json --dry-run`. The dry run made no account changes.

## Browser updates and rollback

The app's PWA scope remains `/apps/necromund-ai/`. Returning visitors may briefly see the previous cached interface while the service worker updates. If the website release is alpha.4 but the app still says V3.1, close other app tabs, reopen the same app address while online, and reload. On macOS use Command–Shift–R; on Windows/Linux use Ctrl–Shift–R. Do not clear site data to troubleshoot a cache problem if you want to keep saved battles.

To roll back website assets, extract the known-good alpha3 package and run its Wrangler deployment command from that folder. A website rollback does not rewind browser-local saved game data. Finish/reset a test scenario and download its result before rolling back where possible; scenario progress needs the matching scenario-aware app version to resume.

## Known limits

- The Hunt remains manual; only Dead Signal has scenario tracking in this release.
- Gameplay balance has not been validated by a physical tabletop playtest. Automated checks validate transitions, integration and interface behavior.
- Measurements, legal placement, official profiles, Nerve/Broken rules, controller restrictions and combat resolution remain player-confirmed.
- The app stores hidden relay information locally; it is concealed in the ordinary interface, not secured against developer-tools inspection.
- The current engine supports one hidden search network and one carried artifact. It is not a full Hive Secundus campaign engine.
- Browser checks use Chromium. Physical-device Safari/Firefox and installed-app UX were not independently tested.
- Existing external destinations were preserved; third-party availability was not re-audited for this release. The previous review reported NecroNW Discord invite expiry on 10 October 2026 and Sump City Radio on 23 October 2026. Refresh those invites separately before expiry if still applicable.

Official deployment references:
- https://developers.cloudflare.com/workers/static-assets/get-started/
- https://developers.cloudflare.com/workers/wrangler/commands/workers/

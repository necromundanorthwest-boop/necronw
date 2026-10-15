# Dead Signal Event Play — Stage B handoff

Prepared 15 October 2026 UTC / 14 October Pacific. Status: implemented and locally verified candidate; no remote repository upload, Pages activation, DNS change or production deployment has occurred.

## Authority and version

The user approved advancement to Stage B and a dedicated public GitHub repository, superseding the original handoff's restriction against changing hosts. Preserve the custom domain and save path during eventual hosting migration. P1 full loadout integration and printable aid were not requested and are not implemented.

Baseline source archive: `NecroNW_Start_Here_alpha5(3).zip`, SHA-256 `3499ce5f421b3bb1030e4b2c0294a6a509f718c554bea389ed0976cb5e5f1013`. Local Git `main` baseline: `2576c04` (full SHA in repository history). Candidate branch: `feature/dead-signal-event-ux`; implementation commit: `fc20792`. Subsequent documentation/hosting commits are part of the delivered candidate; run `git rev-parse HEAD` for the final tip. The delivery includes a Git bundle containing both branches and all commits.

Website candidate `1.0.0-alpha.6`; app rules remain `3.3.1`; scenario remains `1.1.0`; save schema remains 3. No migration of the battle save is introduced. Runtime, Dead Signal definitions and tactical engine are byte-unchanged against the baseline.

## What changed

Before: scenario controls were distributed across the dashboard, with no explicit event handoff/resume presentation. Unreadable save data could silently fall back to a sample and then be overwritten.

After: Solo Play and the Dead Signal briefing have an Event Play entry. The same nested app receives `event=1`; selecting it does not initialize/reset a battle. A compact next-operation panel points to existing controls, offers Resume Current Expedition, shows incomplete work on handoff, and explains interruption recovery. The original roster is behind a disclosure in Event Play; existing controls remain available. End Phase recovery explicitly instructs users to verify prior physical checks rather than repeat their effects. Unreadable or unsupported saves stop automatic writes and offer a raw-data download, retry and explicitly confirmed replacement.

GitHub preparation adds a CI/browser workflow, a manual Pages workflow, README, contributor instructions, bug report template, AGENTS.md and hosting migration guide. A build script packages Vite at `/apps/necromund-ai/` and retains the shell stylesheet and previous hashed assets. The stale alpha.4 site-test assertion was replaced with the actual release manifest. Start Here is now included in route smoke coverage.

No account registration, participant ownership, cloud save, backend, alternative rule engine, endless mission, new enemies or new equipment was added. Physical numbered explorer cards remain the way to identify unclaimed models; participant identity is not stored.

## Verification results

Environment: Linux; Node 24.19.0; npm 11.9.0; Vitest 5.0.0; Vite 8.3.0. Browser automation: runtime Playwright 1.62.1 with Chromium 153 obtained through a temporary npm browser package. The initial Playwright browser-download attempt failed; a separate temporary binary then allowed all tests below to execute. No browser dependency or binary is included in the repository.

| Command | Result |
| --- | --- |
| `npm test` from source app | 68 passed across 3 files (51 original + 17 new) |
| `node scripts/build-site.mjs` | Passed, nested path packaged; known runtime shell-CSS resolution warning |
| `BROWSER_EXECUTABLE=<chromium> node tests/site-smoke.cjs` | Passed; 11 public routes at 320/375/768/1280; blog/resources/gallery/dice; saved battles; defeat paths; invokes complete scenario playthrough |
| `BROWSER_EXECUTABLE=<chromium> node tests/event-play-smoke.cjs` | Passed; Event Play at 390/768/1280; interrupted player/AI activations, recorded costs, handoff immutability, navigation, cached offline reload and unreadable-save preservation |
| `BASELINE_ROOT=<alpha5>/public BROWSER_EXECUTABLE=<chromium> node tests/upgrade-smoke.cjs` | Passed against distinct alpha.5 baseline; modified fighter and unrelated storage retained, scenario reset restored prior battle, service-worker scope retained |
| `git diff main -- source/necromund-ai/src/engine source/necromund-ai/src/scenarios/runtime.ts source/necromund-ai/src/scenarios/dead-signal.ts` | Empty |

Reports: `docs/site-validation.json`, `docs/browser-validation.json`, `docs/event-play-validation.json`, `docs/upgrade-validation.json`. Historical screenshot files were restored rather than delivered as fresh visual evidence. Fresh 390px and 768px screenshots were inspected internally. A narrow Config label and sticky-bar overlap were corrected; screenshots are not included as deliverables. Automated checks and screenshots do not replace physical-device usability inspection.

An initial Event Play offline test exposed a duplicate precache entry introduced in the packaging script. The redundant injection was removed; the existing Vite public asset copy already included the shell stylesheet. The final cached-app offline test passes. No correction to the rule engine was needed.

## Acceptance matrix

| Item | Evidence / remaining limit |
| --- | --- |
| A1 | Browser initialization verifies four initial Malstrain, four reserve actors and two relays; sample battle replaced only on initialization |
| A2 | Browser compares saved battle across public briefing/Event Play navigation and reload; run state retained |
| A3 | Browser records AI Resolve/Continue action/history/cost; existing complete tactical playthrough and unit tests pass |
| A4 | Browser player activation survives reload and records one normal action; existing runtime scenario-action/condition tests pass |
| A5 | Existing unit tests cover search, transfer, carrier removal/drop, recovery/extraction; complete browser playthrough covers search/drop/recovery/extraction; no hidden-relay display added |
| A6 | Existing runtime tests cover configured identity/equipment recycling; browser scenario exercises casualty/reserve/queued deployment and refresh |
| A7 | Handoff does not mutate battle; incomplete state shown. Two-minute unfamiliar-participant trial still required |
| A8 | Interrupted player and AI advice reloads pass; explicit unrecorded-physical-action reconciliation instructions. Actual tablet sleep/wake not tested |
| A9 | Browser covers extraction and both defeat paths; reset restores previous battle; deliberate replay works |
| A10 | All existing routes and tools exercised; engine unchanged; no backend introduced |
| A11 | Automated widths pass. Intended tablet touch targets, contrast, overlap, focus and physical usability still need human inspection |
| A12 | Distinct alpha.5 cache upgrade and cached app offline reload pass with saved data retained. New public pages/PDFs/Discord are not guaranteed offline |

The candidate is suitable for review and a tablet rehearsal. It is not signed off for unattended convention operation. Record A7 human trial and A8/A11 intended-device checks before claiming full acceptance. If reconciliation of a physical action is uncertain, pause for the operator.

## Repository and hosting status

No accessible site repository exists in the connected account. The user selected a dedicated repository. Suggested target: `necromundanorthwest-boop/necronw`; that URL is proposed, not created. Existing accessible repositories are separate games and were not modified. The connector lacks repository-creation and Pages/DNS administration tools. Next required account action: create an empty public repository and share/grant its URL. See `docs/GITHUB_HOSTING.md` for exact source-upload, Pages and domain steps.

The Pages workflow runs on manual dispatch, not automatically on source upload. It packages only `public/` and requires Pages to report canonical base URL `https://necronw.org`. This site uses root-absolute paths and should not be switched to a `/necronw/` project URL without a separate path migration. Retaining HTTPS necronw.org and the nested app path preserves the storage origin. Test the actual expedition after DNS cutover.

## Next session

1. Recover this repository from the bundle, read this document and check branch/HEAD.
2. Upload both baseline and candidate branches to the created GitHub repository; open a review PR and inspect CI results.
3. Complete the intended-tablet visual/touch/sleep/wake checks and a second-person handoff trial. Record failures honestly; use assisted operation if needed.
4. Configure Pages/custom domain, record existing DNS/Worker bindings, deploy the reviewed artifact and verify the live custom-domain paths and saved expedition. Do not clear site data.
5. Keep the previous Worker and alpha.5 archive for rollback. Asset/DNS rollback never reverses physical actions or local mission progress.

Rollback and cutover details: `docs/GITHUB_HOSTING.md`. The original alpha.5 instructions remain in `docs/ALPHA5_README.md`. Never treat result JSON as a restorable battle backup.

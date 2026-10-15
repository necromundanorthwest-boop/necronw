# Necromunda Northwest

Public website and NECROMUND:AI tabletop companion. Current working branch: `feature/dead-signal-event-ux`. Website candidate: `1.0.0-alpha.6`; app rules: `3.3.1`; Dead Signal: `1.1.0`.

Start with [the release handoff](docs/EVENT_RELEASE_HANDOFF.md). Stage B implements Event Play; production remains unchanged until hosting is configured and a release is published. Source and hosting are intended for a dedicated public GitHub repository. See [GitHub hosting and migration](docs/GITHUB_HOSTING.md).

## Local work

Requires Node 24 and npm. Install the companion dependencies:

```sh
cd source/necromund-ai
npm ci
npm test
cd ../..
node scripts/build-site.mjs
node scripts/serve.mjs
```

Open http://localhost:4173/#/solo. Event Play: http://localhost:4173/#/ai?scenario=secundus-dead-signal&event=1.

Builds package the companion under `public/apps/necromund-ai/`. The existing shell stylesheet and older hashed assets are retained. The site needs no backend.

## Browser verification

Install Playwright and its Chromium browser in a separate directory, or use the GitHub Actions check. Set `CODEX_PRIMARY_RUNTIME_NODE_MODULES` to that directory's `node_modules` when Playwright is not locally resolvable. `BROWSER_EXECUTABLE` can select an installed Chromium executable.

```sh
node tests/site-smoke.cjs
node tests/event-play-smoke.cjs
```

The site suite also runs the complete scenario browser playthrough. To test a real cache upgrade, extract the baseline public tree separately and use:

```sh
BASELINE_ROOT=/absolute/path/to/baseline/public node tests/upgrade-smoke.cjs
```

## Source map

- `public/`: deployable site, content, photos, tools and app assets.
- `source/necromund-ai/`: React/TypeScript source and rule tests.
- `tests/`: browser regression tests.
- `docs/`: release authority, validation reports and historical specifications.
- `.github/`: checks, manual Pages publication and bug report template.
- `wrangler.json`: retained Cloudflare rollback configuration.

[Contributing](CONTRIBUTING.md) describes issue reports and pull requests. [AGENTS.md](AGENTS.md) guides future Work sessions. The original alpha.5 deployment README is preserved in `docs/ALPHA5_README.md`; older reports/screenshots describe their historical release, not this candidate.

## Tabletop use and saves

This is an unofficial tabletop companion. Players measure, confirm legality, roll and resolve effects using their legitimate references. Browser state stays with the current HTTPS origin and browser. Preserve `necronw.org` and the app path during migration. Do not clear site data to fix cached assets. Generated AI advice and Undo history do not survive refresh; use the recovery instructions before continuing an interrupted physical action.

The public source is available for review and contributions. No blanket license is asserted for third-party rules, documents, photographs or other assets.

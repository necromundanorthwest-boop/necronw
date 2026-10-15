# Contributing to NecroNW

Use Issues for reproducible bugs, accessibility findings, corrections and proposed content. Include the release, route, device/browser, steps, expected behavior and observed behavior. Avoid attaching another participant’s personal information or saved game data without permission.

Make a feature branch and a focused pull request. Preserve the current engine and scenario rules unless the proposal explicitly changes them. Explain the trigger, resulting behavior and validation. Content contributions need attribution and permission to redistribute source assets; public visibility alone is not a blanket reuse license.

Install with `cd source/necromund-ai && npm ci`, run `npm test`, then from the repository root run `node scripts/build-site.mjs` and `node scripts/serve.mjs`. Browser scripts require Playwright and Chromium. Pages publication runs on main pushes or manual dispatch and requires the custom domain configuration in `docs/GITHUB_HOSTING.md`.

For future ChatGPT Work sessions, provide the repository URL, branch/commit and `docs/EVENT_RELEASE_HANDOFF.md`. Source, tests and that handoff are the project authority. Never clear browser storage to fix cached assets.

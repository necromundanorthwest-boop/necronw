# NecroNW working instructions

Read README.md and docs/EVENT_RELEASE_HANDOFF.md before editing. Preserve unrelated site pages and assets. The scenario authority is source/necromund-ai/src/scenarios/runtime.ts and the existing tactical engine; do not duplicate rule logic in the UI. Retain the save key n2-necromund-ai-v03, HTTPS necronw.org origin and /apps/necromund-ai/ path.

Use feature branches. Run source unit tests and scripts/build-site.mjs; run site and Event Play browser smoke tests before release. Report physical-device checks separately. Treat historical docs and screenshots as historical. Never include credentials or unpublished user documents in commits. Do not change asset licensing or grant third-party rights.

The source branch is a candidate until the release handoff says otherwise. GitHub Pages uses the public directory as its artifact; .github/workflows/pages.yml runs on main pushes or manual dispatch after domain setup. Keep wrangler.json and the alpha.5 baseline for rollback. DNS and cache rollback do not revert browser-local state.

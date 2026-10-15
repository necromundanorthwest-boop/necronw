# Necromunda Northwest — Start Here / alpha.5

Complete replacement website package for the existing Cloudflare Worker `splashpage`.

This release adds the approved Start Here design as a permanent page at `/#/start-here` and below the homepage hero. It updates all NecroNW Discord links to `https://discord.gg/qf9KP3KVk`. Blog posts, Resources, photos, dice tools, NECROMUND:AI 3.3.1 and Dead Signal are preserved.

## Deploy from a Mac

1. Extract this ZIP into a new folder. Keep the previous release for rollback.
2. Open Terminal and type `bash` followed by a space. Do not press Return yet.
3. Drag **DEPLOY.command** from the extracted folder into Terminal, then press Return.

The script finds its own folder and runs Wrangler with the correct configuration. Terminal does not need to start inside the website folder. Complete Cloudflare login if Wrangler requests it. The script publishes to the existing `splashpage` Worker.

Alternatively, from the folder containing `wrangler.json`:

```sh
npx wrangler@4 deploy --config wrangler.json
```

Only `public/` is uploaded. No production build or manual file merge is needed.

## Verify after deployment

- Open `https://splashpage.necromundanorthwest.workers.dev/release.json` and confirm `1.0.0-alpha.5`.
- Open `https://splashpage.necromundanorthwest.workers.dev/#/start-here`.
- Check the configured custom domain, `https://necronw.org/#/start-here`, separately; this package does not change domain routing.
- Check Start Here in the navigation and below the homepage hero.
- Expand “Not sure what to post?” and follow the Discord invitation.
- On a phone, check the navigation, gang-building article, solo-play link, and dice roller.

If the custom domain still shows an older release while the Worker has alpha.5, check which deployment serves that domain. Do not clear saved app data to update website content.

## Editing

- `public/start-here.js`: shared Start Here content and the NecroNW Discord URL used by Resources.
- `public/index.html`: site navigation and footer; update the footer invite too if its code changes later.
- `public/styles.css`: layout and responsive rules.
- `public/app.js`: page routing and homepage placement.
- `public/release.json`: release identification.

## Validation and supporting files

See `START_HERE_RELEASE_NOTES.md` for this release's checks and limits. Existing Secundus reports and screenshots describe alpha.4; they are retained as historical material and are not evidence of fresh browser tests for alpha.5.

The `source/necromund-ai/` directory remains editable app source. This release does not change application logic or saved-data formats.

This ZIP has been prepared for deployment. No live Cloudflare deployment was performed during its preparation.

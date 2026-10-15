# Start Here — release 1.0.0-alpha.5

Prepared October 9, 2026 from the retained alpha.4 website package.

## Changes

- Added the approved Start Here design below the homepage hero.
- Added a permanent `/#/start-here` page, page title, description, and active navigation state.
- Added Start Here as the first navigation item and primary homepage action; Dice Roller remains directly accessible beside it.
- Added the native, keyboard-accessible “Not sure what to post?” disclosure.
- Linked existing Kill Team crossover content, Solo Play, Dice Roller and Resources.
- Set the exact requested NecroNW invitation to `https://discord.gg/qf9KP3KVk` in the new section, global footer, and both Resources entries.
- Added responsive two-row navigation for small screens and stacked newcomer cards below 540px.
- Added a Start Here recovery link to the 404 page.
- Added `DEPLOY.command`, which resolves its own working directory to avoid the earlier `wrangler.json` path error.

No event page was added. No account system, new community channel, registration form, or unready download is implied by this page.

## Checks performed for this release

- All top-level JavaScript modules pass Node syntax checks.
- Executed the site's route renderer in a simulated DOM for Start Here, home, the Kill Team article, Solo Play, Resources, Dice Roller, Gallery and Dead Signal. Expected page content rendered for each.
- Confirmed Start Here has one h1 on its standalone page and receives the current-page navigation state.
- Checked generated page IDs and referenced local files.
- Confirmed both Resources invitations use the shared exact Discord URL.
- Confirmed no old `discord.com/invite/qf9KP3KVk` links remain in deployed text files.
- Compared against alpha.4: all app bundles, gallery/font assets, downloadable resources, posts, and scenario definitions are unchanged. No original public file is missing.
- Checked the deploy script's syntax and tested its working-directory behavior using a local substitute for npx; no external deployment occurred.
- Validated archive extraction and required files before delivery.

## Verification limits

- A fresh browser layout or interaction run was not performed. The Sites skill's managed-preview workflow requires an available control-browser skill, which is not available in this session. Responsive CSS was added, but device rendering remains a post-deployment check.
- Wrangler is not installed or cached here, so its dry-run validation was not rerun. `wrangler.json` is unchanged from alpha.4.
- Shell requests to the public site returned HTTP 403, so no byte-for-byte live-source comparison was possible. The earlier visual review showed the same alpha.4-era content and NECROMUND:AI 3.3.1.
- There is no Cloudflare API token or saved Wrangler login in this environment. The release has not been published.
- The Discord invitation was confirmed live earlier in this conversation. Its public page does not disclose future expiration.

## Rollback

Deploy the retained alpha.4 package using its original Wrangler configuration. This release does not modify browser-local battle storage or application data formats.

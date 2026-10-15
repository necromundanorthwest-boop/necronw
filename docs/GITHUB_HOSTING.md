# GitHub source and hosting migration

Target: a dedicated public repository, suggested name `necronw`, under `necromundanorthwest-boop`. The repository has not yet been created or uploaded. The connected GitHub tools can write existing repositories but do not expose repository creation or Pages/DNS administration. No GitHub credentials were available through a local CLI. No remote URL is asserted to exist.

## Publish the source first

Create an empty public repository at https://github.com/new, with no initial README, license or gitignore. Share its URL with the Work session and grant the GitHub connection access. This permits an existing-repository upload without mixing the site into one of the game repositories.

The delivery archive includes `necronw-history.bundle`. To recover the exact branches and commits locally:

```sh
git clone necronw-history.bundle necronw
cd necronw
git switch feature/dead-signal-event-ux
git remote remove origin
git remote add origin https://github.com/necromundanorthwest-boop/necronw.git
git push origin main feature/dead-signal-event-ux
```

Substitute the actual created repository URL if named differently. The bundle contains an untouched alpha.5 baseline on `main` and the Stage B candidate on the feature branch. Open a pull request from the feature branch. GitHub Actions checks run on push and pull requests. Pages is manual, so uploading source does not itself replace the live site. If pushing through a local terminal, GitHub will use that user's normal Git authentication; never put tokens in remote URLs or commit files.

Repository features prepared: source and packaged site, regression/browser tests, AGENTS.md, contribution instructions, bug report template and release handoff. Enable Issues; use pull requests for changes. No blanket reuse license has been added for third-party references, photographs or other assets.

## Move hosting after candidate review

Keep `https://necronw.org` and `/apps/necromund-ai/` unchanged. A browser save belongs to its origin, not the hosting vendor, so retaining the same HTTPS domain avoids creating a separate storage origin. This still requires a real saved-expedition test after cutover. The default `github.io/necronw/` project URL is not a supported production URL for this package's root-absolute links.

1. Record current DNS records, Cloudflare Worker domain/route bindings and current deployment/version identifiers. Preserve the original alpha.5 archive and the Git baseline.
2. Review and merge the tested candidate when ready. In repository Settings → Pages select **GitHub Actions**. Configure custom domain **necronw.org** in Pages settings before changing DNS. Domain verification in GitHub account settings is recommended by GitHub to protect the name.
3. Run **Publish to GitHub Pages** from Actions on the reviewed branch. It runs source tests, builds the nested app, runs browser smoke suites and uploads only `public/`. The workflow verifies that Pages reports `https://necronw.org` as the base URL.
4. Follow GitHub's official apex-domain DNS instructions. Ensure HTTPS is issued/enforced. If DNS is managed in Cloudflare, preserve DNS management there while replacing only the hosting destination. Resolve any Worker domain/route binding that still intercepts the website. Do not delete the Worker deployment itself; retain it for rollback.
5. Verify the custom domain, release.json, homepage, Start Here, article/resource/gallery assets, both dice tools, Quick Play, The Hunt and the direct Event Play route. On the event tablet, verify an existing expedition survives navigation, reload and service-worker update. Never clear site data.
6. Record GitHub deployment URL, commit, time, DNS changes and tablet results in EVENT_RELEASE_HANDOFF.md. Keep the old Worker available through its separate preview address, whose local saves are separate.

GitHub Pages does not interpret Cloudflare `_headers` or `wrangler.json`; neither configures GitHub hosting. The workflow uses an Actions artifact rather than assuming the repository root or `/docs` is the website. A CNAME file alone is insufficient to configure a custom domain for Actions publication.

Official references, checked during this work:

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages

## Rollback

For an asset-only rollback on Pages, build and publish the baseline commit after repeating checks. For hosting rollback, restore the recorded DNS/Worker binding and verify `necronw.org/release.json`. If redeploying alpha.5 to the existing Worker, use its original extracted directory containing wrangler.json and public, then run `npx wrangler@4 deploy --config wrangler.json`.

Do not clear storage or unregister the service worker as a routine rollback step. Event Play introduces no saved-state schema change; rolling assets back does not rewind recorded physical game progress. A still-open tab may retain older code until reloaded. Reconcile tabletop actions before resuming after any interruption.

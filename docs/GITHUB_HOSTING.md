# GitHub source and hosting migration

Repository: https://github.com/necromundanorthwest-boop/necronw (public). Source upload is complete. The connected GitHub app can write this repository; Pages configuration and DNS administration are not exposed through its available tools. No Pages activation, domain change or production deployment has occurred.

## Source and review

- `main` preserves the exact supplied alpha.5 tree: GitHub commit `8c9fd62f05c80c619aa1298c973943ef40cf3154`.
- `feature/dead-signal-event-ux` contains the Stage B candidate, source, assets and workflows.
- Review: https://github.com/necromundanorthwest-boop/necronw/pull/1.

Clone the public repository for future work:

```sh
git clone https://github.com/necromundanorthwest-boop/necronw.git
cd necronw
git switch feature/dead-signal-event-ux
```

The prior delivery archive's Git bundle retains the original local history. GitHub import commits have different commit IDs because the connection required a repository initialization commit; their imported source trees were verified identical. Do not force-push the old bundle over GitHub history. Use the live repository and branch going forward.

Repository features: source and packaged site, regression/browser tests, AGENTS.md, contribution instructions, bug report template and release handoff. GitHub Actions checks run on pushes and pull requests. Pages publication runs on main pushes or manual dispatch, so source upload does not replace the live site. No blanket reuse license has been added for third-party references, photographs or other assets.

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

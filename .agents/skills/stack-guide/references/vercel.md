# Vercel (website hosting)

## Setup
1. vercel.com -> **Add New** -> **Project** -> import the git repo (GitLab or GitHub). **Root Directory** = `web` (the site folder). Framework preset: Vite. Build: `npm run build`; output: `dist`. If the import dialog's Root Directory picker shows only "(root)" (seen with GitLab), deploy with root, let that first build fail, then type the folder in **Settings -> Build and Deployment -> Root Directory** as `admin` (no `./`) and Redeploy.
2. Production Branch = `main`. Pushes to `main` auto-deploy; other branches get preview URLs. Do not use a "create deployment" API/CLI unless auto-deploy failed, and ask first.
3. Project -> **Settings -> Domains** -> add apex and `www`; copy the DNS values into Cloudflare DNS (see cloudflare-dns.md). Redirect one to the other.
4. Environment variables: only public build-time `VITE_*` values (site key, function URLs). Set per environment (Production / Preview). Never a secret.

## vercel.json patterns
- `"cleanUrls": true`.
- **Ignored build step**: skip deploys when nothing under the site folder changed, so app-only pushes do not rebuild the site:
  `"ignoreCommand": "if [ -n \"$VERCEL_GIT_PREVIOUS_SHA\" ] && git cat-file -e \"$VERCEL_GIT_PREVIOUS_SHA^{commit}\" 2>/dev/null; then git diff --quiet \"$VERCEL_GIT_PREVIOUS_SHA\" HEAD -- .; else git diff --quiet HEAD^ HEAD -- .; fi"`
- **One repo, several Vercel projects** (site `web/`, admin panel `admin/`, ...): one Vercel project per folder, and EVERY project's own `vercel.json` carries the ignored build step above. `.` is that project's Root Directory, so a push builds only the projects whose folder changed; app-only or docs-only pushes build none. Check before relying on it: from the folder, `git diff --quiet <commit>^ <commit> -- . && echo SKIP || echo BUILD` on a past commit that touched it and one that did not. A failed lookup of the previous SHA falls back to `HEAD^`, never to skipping. It takes effect once it is on the production branch.
- **Rewrites** for token pages served by a static shell: `/c/:token`, `/g/:token` -> `/app-shell.html` (invite links that open the app or a landing).
- **Headers**: `X-Robots-Tag: noindex` and `Referrer-Policy: no-referrer` on token and confirmation pages (`/c/*`, `/g/*`, `/early-access/*`); `Content-Type: application/json` for `/.well-known/assetlinks.json` (Android app links).
- Static SPA fallback is automatic for Vite builds with prerendered routes; a catch-all rewrite to `index.html` is only needed if you do not prerender.

## Build
`vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs && node scripts/seo-check.mjs` - prerender every public route to static HTML (SEO) and fail the build if titles, descriptions, canonical or OG tags are missing. See the `site-builder` skill.

## Deploy checklist
1. Build passes locally (`npm run build`, `npm run lint`).
2. Updates data has the new entry with the REAL date (run `date`).
3. Ask the owner, then push to `main` (merge `dev` -> `main` first).
4. Do not poll the live site with curl; ask the owner to check in a private window.
5. Search Console / Bing Webmaster: add the domain property (DNS TXT), submit the sitemap.

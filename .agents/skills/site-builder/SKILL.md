---
name: site-builder
description: Build or extend the product marketing website for an app - Vite + React + Tailwind + GSAP on Vercel, story-led home page, interactive mockup demos, updates page fed by one data file, waitlist with an edge function, screenshots, theme/language toggles, SEO. Use when the user says "build the website", "landing page", "add a section/page to the site", "website for my app", "updates page", "waitlist", "make the site match the app", or "add a demo to the site".
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Site builder

## 0. Ask first
Before building ANY section, page or flow: "Want to see mockups first?" (even for small sections). If yes, run the `mockup-lab` skill and iterate until agreed; the agreed mockup is the spec. Ask again at each stage. Also: any visual effect (scroll-drawn lines, connectors, animation) follows the library-first rule: search for an open-source library, offer 2 or 3 options (include "already installed"), get approval, then build. GSAP (ScrollTrigger, DrawSVG, MotionPath) is the proven pick for scroll storytelling.

## 1. Stack (site lives in `web/`, independent from the app)
Vite + React 19 + TypeScript + Tailwind 4 (`@tailwindcss/vite`) + react-router-dom + GSAP + lucide-react. Own `package.json` and lockfile. Scripts: `dev` (port 3000), `build` (client + SSR prerender + SEO check), `lint` (`tsc --noEmit`). Hosted on Vercel from `main` (see `studio-services` stack-guide `vercel.md`). Structure: `references/structure.md`.

## 2. Design language
- Same tokens as the app (colors, fonts, radius, icon style) so site and app read as one product; after an app UI revamp, remind the owner to restyle the site.
- Roomy, minimal, lifted cards, big type with one accent phrase, app screens floating with depth, one signature texture (e.g. concentric rings) reused for quiet depth.
- Light and dark parity. Logo shape per the project rule (circular pre-cut PNGs + `rounded-full`).
- No sparkle/"AI" icons; no "AI" in the hero copy. Never claim a feature you have not verified (keep a FEATURE_CLAIMS doc and check copy against it).
- Header holds quick toggles (theme, language) one tap away, not hidden inside the menu.
- Responsive from phone width; test 360, 768, 1280. Respect `prefers-reduced-motion` (still frames).

## 3. Home page: story-led
Hero (rotating headlines) -> numbered chapters (each: a short claim, a floating app screen or live demo, one line of proof) -> **What's new strip** (latest 2 or 3 updates, link to /updates) -> use cases / stories -> closing CTA (store badge or waitlist). One 1100px content width; header inside it. Each chapter is a file in `src/sections/`; `Home.tsx` only composes them. Chapter threads (a line that draws as you scroll) use GSAP.

## 4. Mockups as live demos
- Every agreed mockup is kept (`docs/product/mockups/`, indexed in its README with date and decisions) and reused: strip the proposal/decision panel, keep only the phone, use fictional names, follow the site theme.
- Publish as static `web/public/demos/<name>.html`; embed in a `DemoStage` with a phone frame (iframe; full screen on phones). Built with a scripted flow runner so an **autoplay story mode** (no visitor input) can be added for screen-recording or embedding.
- **Story-mode contract** (a demo that plays itself on the page): the page sends `{theme, lang, cmd: "play" | "toggle"}` over postMessage; the demo reports `{cap, beat, n, playing}` back. The page shows `cap` under the phone, lights the step that matches `beat`, and labels its own Play / Pause / Play again button. Autoplay once when the phone is mostly in view and the demo has reported, never with reduced motion. Accept messages only from that iframe's `contentWindow`. Reuse the stage's phone frame so the demo sits raised like the others.
- **Headless screenshots:** headless Chrome gives blank shots when the page is scrolled to a far section (hide the other sections in a temporary copy instead) and won't go below about 500px wide, so check phone width in the mockup's Phone view or on a real phone.
- Rule: never delete mockups; swap any real person's name before publishing.

## 5. Updates page from ONE data file
`src/data/updates.ts`, newest first; a release is one new entry at the top. Shape in the `site-updates` skill (`references/updates-data.md`); writing each entry after a release is that skill's job. Same text mirrors `docs/release/WHATS_NEW.md`. Real date (`date`), audience-friendly words, `version` for store builds vs `needs` for OTAs. A config constant (`UPDATES_STOPS: "day" | "month"`) selects timeline grouping (admin-toggle pattern).

## 6. Waitlist and contact
Form -> Turnstile -> Supabase edge function `waitlist` (`verify_jwt=false`; origin allow-list, Turnstile, quotas) -> row + double opt-in email via Resend; confirm and remove pages are `noindex`. Setup: stack-guide `email.md`. Never send to real users without the owner's OK.

## 7. Screenshots
Capture real screens from the app running with demo data (fictional names), light and dark, same device frame. Export **webp**, sized for display (max about 1200 px wide for hero, 600 px for floating), `loading="lazy"` below the fold, explicit width/height to avoid layout shift. Store file naming: `web/public/screens/<feature>-<light|dark>.webp`. Store listing slides are a separate job (`store-listing-kit` skill).

## 8. SEO and sharing
Per-route title (under 60 chars), description (under 160), canonical, OG + Twitter tags; OG image 1200x630 generated by a script (`npm run og`); prerender every public route at build and fail the build if tags are missing (`seo-check`); `robots.txt`, sitemap, JSON-LD (Organization, SoftwareApplication). Add the domain to Search Console and Bing. Privacy, Terms and Delete-account pages must exist before the first store submission.

## 9. Ship
`npm run lint && npm run build` -> ask the owner -> merge `dev` to `main` -> push -> the owner checks in a private window (do not curl-poll). Then a release-log entry if it announces an app release.

## Checklist per change
Mockup asked and agreed - library approved - fictional names - no "AI" up front - dark mode checked - 360px checked - reduced motion - real dates - SEO check passes.

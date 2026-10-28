---
name: store-listing-kit
description: Create a premium app-store listing from the codebase — designed screenshot slides (real app captures framed with headline overlays, light + dark), a feature graphic, and paste-ready listing copy — and deliver it as one review webpage with download buttons for every graphic (plus download-all zip) and copy buttons for every text field. Use when the user asks for Play Store / App Store screenshots, store graphics, a feature graphic, a store listing, ASO copy, "make the listing look premium", or "prepare the app for the store". Works in any project with a runnable mobile app (Android emulator, iOS simulator, or a web build).
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Store listing kit

End result: a private Artifact page holding every store asset, each with a **Download** button (and **Download all** as a zip), every text field with a **Copy** button and a live character count, plus an upload checklist. Graphics are rendered from HTML templates so any headline can be changed and re-rendered in seconds.

Kit files live next to this skill in `kit/`. Copy them into the project (default `docs/release/store-assets/kit/`, with `raw/`, `out/`, `review/` beside it) and edit the copies, never the originals here. The example values in `store-kit.config.json`, `slides.json` and `listing.json` come from the WowTodo project (Example (WowTodo), a worked reference: 7 slides, Hindi headline, callouts); replace all of them.

## 0. Ground rules (apply throughout)
- **Real UI, fictional data.** Capture the actual app; never mock screens. Use believable, local-feeling fictional content (names, places, currency). Never show real users' data, emails, or the project owner's own account.
- **Store policy** (see `references/specs.md`): no "#1", "Best", "Top", rankings, prices/discounts, "Download now", or other apps' trademarks in graphics. Captions must describe features that exist in the shipped build.
- **Respect project rules.** Read CLAUDE.md, memory, and any design-system/brand docs first. Banned words/icons (e.g. "no AI wording up front", "no sparkle icon") apply to captions and copy. Use the app's own colours and fonts; logo shape exactly as the brand uses it.
- **Owner approves before rendering at scale.** Storyboard and headlines are proposed in chat first (step 2); the owner edits; then build.
- Delegation: in sessions that use helper agents, give screen capture and template building to separate helpers (non-overlapping folders); the main session writes the copy and reviews every image.

## 1. Learn the product from the code (15 min, read-only)
Collect into a short fact sheet (keep it in chat or `store-assets/FACTS.md`):
- App id / package / bundle id, display name, version, platforms, permissions (from app.json / AndroidManifest / Info.plist).
- **Verified features only**: what actually works today (status docs, tests, feature inventory). Mark anything untested — it does not go in captions until verified.
- Brand: colour tokens (light + dark), fonts (find local TTFs in node_modules or assets), logo file + shape, voice/tone examples from onboarding copy and the website.
- Audience and market (languages, region), privacy facts (what data leaves the device, ads, account deletion) — needed for the description and Data Safety.
- Existing listing drafts, privacy policy URL, website, support email.

## 2. Storyboard (propose, get approval)
Read `references/copy.md`. Propose 5–8 slides as a table: `# | mode (light/dark) | headline | subline | screen to capture | callout (optional)`.
- Slides 1–3 sell the core benefit (they're the ones shown in search). One benefit per slide; headline 2–6 words, max 2 lines.
- Light/dark: mostly light with 1–2 dark slides, first dark around slot 4, never strict alternation. Dark slides show dark-mode captures.
- Callouts ("breaking the frame" cards: a speech bubble, a notification, a chip) on at most 2 slides, only where the screen alone doesn't tell the story or has empty space.
- Also propose the feature-graphic line (≤5 words) and the short description.
Ask only what's genuinely the owner's call (wording rules, which feature to feature, untested features).

## 3. Capture real screens
Follow `references/capture.md` (Android emulator demo-mode status bar, iOS simulator status bar override, web fallback). Save as `raw/<screen>-<light|dark>.png` at native resolution plus `raw/INDEX.md` (one line per file). Quality bar per image: no keyboard, toasts, spinners, debug overlays, half animations, cut text, real personal data; status bar clean (time 9:41, full battery, wifi only — no "3G"/carrier).
Create content through the real flows. If the UI can't express something (e.g. a field isn't editable), choose different content rather than faking it, and report the product gap.

## 4. Build and render the graphics
1. Copy `kit/` into the project: `store-kit.config.json`, `slides.json`, `slide.html`, `feature.html`, `render.mjs`, `listing.json`, `build-review.mjs`, `review-template.html`.
2. Fill `store-kit.config.json`: product name, wordmark, logo path + shape, font files (display, body, optional script font for non-Latin headlines), light/dark tokens, canvas size, feature-graphic content. Paths are relative to the config file.
3. Fill `slides.json` from the approved storyboard (`emphasis` = the one word in the accent colour; `callouts` with pixel positions on the 1080×1920 canvas).
4. `node render.mjs` (needs Edge or Chrome, Python 3 + Pillow). Outputs `out/01-<id>.png …`, `out/feature-graphic.png`, `out/contact-sheet.png`. It flattens alpha (Play rejects alpha) and reports missing raw images.
5. **Review every image individually** with the Read tool, not just the contact sheet. Check: fonts loaded (no fallback serif), non-Latin script renders, no text overlap, callouts don't cover key UI text, phone position identical across slides, captions true to the screen shown. Fix → re-render. Common fixes: subline gap (text block is centred in its zone), empty-looking screens (add a callout or pick a fuller screen), odd app data visible (retake).

## 5. Write the listing copy
Fill `listing.json` (field, limit, text) following `references/copy.md`: app name ≤30, short description ≤80, full description ≤4000, plus optional release notes / promo text / keywords for the App Store. Verify counts (the review page shows them live; over-limit turns red). Store the text in the repo's listing doc as well.

## 6. Build and publish the review page
1. `node build-review.mjs` → `review/` with `index.html`, the original PNGs (download targets) and JPG previews.
2. Publish with the Artifact tool: `file_path` = `review/index.html`, `files` = every other file in `review/` mapped to its own name, `capabilities: {"downloads": true}`, icon `image`. Downloads use the platform's `downloads` capability (the viewer confirms each save; a zip for "Download all"); plain `<a download>` links do not work in Artifacts, so never swap the template's mechanism for one.
3. Look at the published page once. Send the owner the link and the upload steps (`references/specs.md` → "Where it goes").
4. Republishing after edits: re-render → `node build-review.mjs` → publish the same `file_path` again (same URL; omit `icon` and `capabilities`).

## 7. Hand-off
- Commit the kit copy, raw captures, renders and listing text (not `review/`, which is generated).
- Update the project's status doc: where assets live, the review URL, product gaps noticed while capturing (bad generated text, non-editable fields, odd defaults) — these matter before a public launch.
- If the listing will be localized, duplicate `slides.json`/`listing.json` per locale (`slides.hi.json`) and render into `out/<locale>/`.

## References
- `references/specs.md` — Google Play and App Store sizes, formats, limits, policy no-gos, where each asset is uploaded.
- `references/copy.md` — headline/subline formulas, description structure, tone, banned patterns.
- `references/capture.md` — clean status bar commands, theme switching, driving the UI, Devanagari/other-script input, web fallback.

---
name: site-updates
description: Keep the website true to the product after every successful release or deployment — writes the updates-page entry and What's new in plain words, finds every page, screenshot, demo and FAQ the change makes stale and refreshes them, checks the build, and ships with the next approved push; can draft an announcement for the waitlist or users. Runs on its own at the end of a release (called by release-ritual) and on demand. Use when the user says "update the website", "site updates", "add this to the updates page", "the site is out of date", "announce this release", or right after a deploy.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Site updates

Goal: within the same day as a release, someone visiting the website sees what's new, and nothing on the site
describes the product as it used to be. One skill owns this so it can improve on its own.

## When it runs
- **Automatically**: as the "public" step of `release-ritual` (store build or OTA), with the release as input.
- **On demand**: after any successful deployment, including website-only changes and backend features users notice.
- Skip it for releases with nothing a user would notice (pure refactors, internal fixes): log the release
  internally only and say so in one line.

## 1. Work out what shipped
Read: the newest `docs/release/RELEASE_LOG.md` rows, commits since the last entry in the site's updates data, the
merged branches and agreed mockups behind them, and `docs/release/WHATS_NEW.md`. Make a short list of
**user-visible** changes. For each, note how users get it:
- **store build** → entry gets `version` ("update from the store");
- **over-the-air** → entry gets `needs` ("arrives on its own on version X or newer");
- **website only** → no version field; it's live after deploy.

## 2. Write the entry (same words in two places)
- The site's updates data (shape in `references/updates-data.md`) and `docs/release/WHATS_NEW.md`.
- **Real date only**: run `date` first. Several releases on one day share that date. Never a future date.
- 2–4 word title; 3–6 items, each a short benefit (`lead`) plus one everyday sentence (`text`).
- Plain words, benefit first, fictional names in examples, none of the project's banned words (check the
  playbook and project overrides; e.g. some projects never say "AI" up front), no internal terms (component names,
  ids, libraries).
- Store release notes (if a store build): a ≤500-character version per language, saved in `WHATS_NEW.md` for the
  console.

## 3. Find what's now stale (the part people forget)
Search the website for every place the change touches and list it:
- feature sections and chapter copy that describe the old behaviour;
- screenshots (light and dark, every language) that show the old UI → recapture with `device-qa` on demo data,
  or pull from a fresh `store-listing-kit` run;
- live demos built from mockups (`public/demos/*`) → update the demo to match what shipped;
- FAQ, pricing and plan tables, the home "What's new" strip, the store badge or version notice;
- SEO: page titles and descriptions, Open Graph images, sitemap entries for new pages.
Show the list to the owner in ≤8 lines with a recommendation for each (update now / later / leave). Small copy fixes
can go straight in; new screenshots, demo changes and new sections need the owner's OK (and a `mockup` first for a
new section, per the playbook).

## 4. Check
`npm run build` (and the type check) passes; preview locally at phone and desktop widths, light and dark, each
language. The updates page shows the new entry on top, the home strip picks it up, the version notice reads
correctly. No console errors.

## 5. Ship
Commit on `dev` ("site: updates entry <title> + <what else>"). The site goes live with the next **approved** push to
the deploy branch (playbook: ask before push, batch, no polling the live site — ask the owner to check in a private
window).

## 6. Announce (optional, ask first)
Offer a short announcement draft: waitlist or users email (through the project's email skill/provider), a social
post, or an in-app notice. Never send anything without an explicit yes.

## 7. Report
Three lines: the entry title and date, what else on the site changed or is waiting for the owner, and whether it
is live or waiting for the push.

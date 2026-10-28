---
name: studio-start
description: "Start a new project with Studio Method (App + Site Kit), or bring an existing repo into the method. Asks what you're building (app, website or both; AI or not; which services), scaffolds it, or for an existing repo first reads the whole codebase, says back what it understood and builds the project's status, map and memory from it; then sets up the status/handoff/contract docs, checks the recommended plugins (ponytail), and hands over to the working contract. Safe to run by accident: a project that already has its docs gets a catch-up offer instead, and it asks which folder when the repo sits one level down. Use when the user says \"studio start\", \"start a new project\", \"set up studio method\", \"adopt the method\", \"use our working style here\", or opens a repo that has no docs/project folder yet."
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Studio start

Goal: in one sitting, a project either **exists and runs** (new) or **works the Studio way** (existing), with the
three project docs in place and the owner knowing the next step. Short questions, sensible defaults, nothing
destructive.

## 0. Check the toolbox (every time, 1 minute)
1. Check `.agents/skills/` for the needed Studio Method skills. Claude reads the same directory through `.claude/skills`. Plugin registration is unnecessary for this shared installation.
2. Use existing host skills when available. Do not install extra plugins or replace this shared installation automatically.
3. Load `working-contract` and `playbook`; apply the project overrides first.

## 1. Where are we, and is it already set up?
Run these checks first, in this order, before reading any code.
1. **Right folder?** If the current folder is not a git repo (`git rev-parse --show-toplevel` fails) but a folder
   one or two levels down is (has `.git`), ask which folder is the project and work there. Never `git init` in a
   folder that contains an existing repo, and never scaffold next to one.
2. **Already on the method?** If the project has a status doc (`docs/project/CURRENT_STATE.md` or an equivalent
   such as `PROJECT_STATUS.md`) **and** a `HANDOFF.md`, it is already set up. Say so in one line, then
   AskUserQuestion:
   - **Catch up** (Recommended): run `catch-up` and stop here.
   - **Fill the gaps**: create only what's missing from 3d, plus `PROJECT_MAP.md` and `PRODUCT_BRIEF.md` if absent,
     from a targeted read of what they need. No full codebase read; the status doc and existing memory are not
     touched.
   - **Full re-read**: section 3, only when the owner says the docs are badly out of date. The status doc is then
     merged as in 3c, never rewritten.
3. **New or existing?**
- **Existing**: the folder has code (`package.json`, `app.json`, `src/`, git history). → section 3.
- **New**: empty or near-empty folder. → section 2.
- Unsure? Ask once.

## 2. New project
### 2a. Ask (AskUserQuestion, at most 4 questions per call, defaults first and marked Recommended)
1. **Name and one-line purpose.** Free text via "Other". The name becomes the folder, package and app name.
2. **What are we building?** App + website (Recommended) · App only · Website only · Something else.
3. **Platforms** (app only): Android first (Recommended) · Android + iOS · iOS first.
4. **AI in the product?** None · Yes, server-side through an edge function (Recommended when used) · Yes, plus voice.
5. **Services** (multi-select): Supabase (auth, database, storage, edge functions) · Cloudflare R2 (large files) ·
   Email (Resend for sending, a mailbox host for receiving) · Google sign-in · Payments later.
6. **Languages**: English only · English + one more (name it). Bilingual copy is set up from day one if yes.
7. **Hosting and code home**: GitLab private (Recommended) or GitHub; website on Vercel; domain on Cloudflare DNS.

Write the answers to `docs/project/DECISIONS.md` (dated) before scaffolding, and draft
`docs/product/PRODUCT_BRIEF.md` from them (template in the `product-pulse` skill) for the owner to confirm.

### 2b. Scaffold (check current docs for every command; never trust a remembered version)
- **Repo**: `git init -b main`, then a `dev` branch. Rule: all work on `dev` or branches from it; only `dev` merges
  to `main`. `.gitignore` covers `.env*` except `.env.example`.
- **App** (`app/`): the current `create-expo-app` template with TypeScript and Expo Router. Add a theme tokens file
  (light + dark), a copy file per language, and the app's real name, package id and scheme in `app.json`.
- **Website** (`web/`): Vite + React + TypeScript, Tailwind, GSAP only when motion needs it (library-first rule).
  Then hand to the `site-builder` skill (studio-site) for the story-led home page.
- **Backend** (`app/supabase/` when chosen): `supabase init`, local stack, first migration, an edge function proxy
  for any AI calls (keys never in the app). Hand to `stack-guide` (studio-services).
- **Environment**: run `env-setup` (studio-services). It writes `.env.example`, explains where each value comes
  from, and the user pastes secrets into `.env` themselves.

### 2c. Docs and rules (same as section 3d; `PROJECT_MAP.md` starts with the scaffold's layout)
Then: first commit on `dev` ("Studio start: scaffold"), offer to create the remote (see `github-to-gitlab` for the
GitLab flow), and suggest the first `mockup-lab` session for the main screen before any feature code.

## 3. Existing project
The first job is to **understand the whole codebase**, say back what you understood, and turn it into the
project's status and memory. Nothing in the repo changes until the owner has confirmed the understanding.

### 3a. Read everything (read-only)
Small repo: read it in the main session. Larger repo (roughly 150+ source files): split it into areas (app,
website, backend, shared) and give each to a read-only helper running in parallel (within the working contract's
helper limits). Each reports ≤25 lines; the main session still reads the entry points, navigation and data layer
itself. Cover:
1. **What it is and for whom**: README, onboarding and store/site copy, app name and description.
2. **Stack and versions**: every `package.json`, `app.json`/`eas.json`, `vercel.json`, `supabase/config.toml`,
   other config files.
3. **Structure**: folders and what lives where, entry points, routes/navigation, screens and pages.
4. **Data and services**: database schema (migrations), access rules (RLS), edge functions, storage buckets,
   external APIs and AI calls, env var **names** (`.env.example`; never print values).
5. **Features**: each user-facing feature with its state: working / partial / stubbed / broken, judged from code,
   tests, `TODO`/`FIXME`, and git history.
6. **Build, test, release**: scripts, CI, EAS profiles, OTA, website deploys, the last release.
7. **Health**: run the type check and tests if they're cheap and safe; note failing ones, risky or very old
   dependencies, committed secrets (report, don't print), dead code, obvious bugs.
8. **How work has gone so far**: existing docs (they are **kept**), branch flow, commit style, recent focus
   (`git log --oneline -50`), open branches and uncommitted work.

### 3b. Say back what you understood
One message in plain words, ≤25 lines: what the product is, how it's built, the feature list with states, what
looks risky or unfinished, which packs fit, and what you couldn't work out. Then AskUserQuestion: "Looks right" /
"I'll correct it", plus the 1–3 questions only the owner can answer (usually: goals and audience, the branch and
release flow, who deploys).

### 3c. Build the project's memory (after the owner confirms)
- **Status**: `docs/project/CURRENT_STATE.md` with Summary · Working · Open/broken · Next, from the confirmed
  understanding. If a status doc already exists, **merge into it**: add what's missing and correct lines that are
  wrong, but never rewrite it from scratch or drop existing detail (release IDs, gotchas, deferred gaps, dates).
  Show the owner the diff before committing.
- **Map**: `docs/project/PROJECT_MAP.md`, the codebase map helpers read first: folders, entry points,
  routes/screens, data model, functions, services and env var names, build/run/release commands.
- **Shared project memory** (`docs/project/MEMORY.md`): one memory per fact the code doesn't hold: the owner's
  role and preferences, product goals and audience, deadlines, which account owns which service (never secrets),
  and every correction from 3b as a feedback memory with its Why. Add each to `MEMORY.md`. Read `MEMORY.md`
  first: update a memory that already covers a fact instead of adding a duplicate.
- **Product brief**: `docs/product/PRODUCT_BRIEF.md` (template in `product-pulse`): who it's for, the problem,
  the promise, the market, current bets. The product-lead agent reads it before every pulse.
- **Decisions**: record in `DECISIONS.md` only what's confirmed (by the owner, or plainly by commits/docs).

### 3d. Docs and rules (create only what's missing; never overwrite)
- `docs/project/CURRENT_STATE.md` (status: summary, working, open/broken, next), `HANDOFF.md`,
  `WORKING_CONTRACT.md` (from the working-contract skill, with a `## Project overrides` heading), `DECISIONS.md`.
  Equivalents that already exist are adopted under their own names.
- `docs/product/mockups/README.md` (mockup index), `docs/agent-notes/` (helper notes).
- For apps: `docs/release/RELEASE_LOG.md` and `WHATS_NEW.md`.
- `CLAUDE.md`: add a short **Studio Method** section (keep everything already there):
  ```
  ## Studio Method
  This project follows Studio Method (App + Site Kit). Every session: load working-contract + playbook.
  Docs: docs/project/{CURRENT_STATE,HANDOFF,WORKING_CONTRACT,DECISIONS}.md.
  Words: "catch up", "check out", "mockup", "teach", "optimize repo", "harvest" (see playbook glossary).
  Project overrides: <none yet>
  ```
- Project memory: save only facts the repo doesn't record (who the owner is, release cadence, accounts by role
  — never secrets). The general rules stay in the playbook; don't copy them into memory.

### 3e. Hand over
Commit on `dev` or a branch from it, never directly on `main` (no `dev` yet? ask: create `dev` (Recommended) or
use a feature branch). Message: "Studio start: project map, status and method docs". Then give a `catch-up`-style
snapshot and ask what to work on.

## 4. Finish
One closing message: what was set up, what the user must still do (env values, console steps, plugin installs),
and the exact next step. Record "Studio Method <version> adopted <date>" in `CURRENT_STATE.md` (run `date`).

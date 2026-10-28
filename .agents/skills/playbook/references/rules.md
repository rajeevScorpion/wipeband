# Rules (Rule / Why / How to apply)

## Process and safety

### Branch flow: work on dev, only dev merges to main
**Rule:** All work happens on `dev` or on feature branches cut from `dev` (`feat/...`, `fix/...`). Confirmed work merges into `dev`; only `dev` merges into `main`. Never commit to `main` directly.
**Why:** `main` should hold only confirmed, releasable work, and a site that auto-deploys from `main` goes live on every merge.
**How to apply:** Cut helper branches from `dev`; merge back after review; merge `dev` to `main` only when the owner confirms.

### Ask before every push; batch pushes
**Rule:** Ask the owner once before each `git push`. Commit locally and often; push rarely, in larger batches.
**Why:** Hosting providers (git, CI, site host, backend) can rate-limit or suspend accounts for abuse-like patterns, and a push can trigger a production deploy.
**How to apply:** Group commits into one approved batch per milestone. An explicit go ("yes do all three", "go") is permission for exactly those steps; run them without re-asking.

### Conservative deploys
**Rule:** Deploy only through the normal path (a push to the deploy branch triggers the host). Do not call a "create deployment" API just because it is available. Backend migrations: if the owner granted standing approval, do not ask again for reviewed migrations; functions deploy still belongs to an approved batch.
**Why:** Fear of rate limits and surprise production changes.
**How to apply:** If an auto-deploy failed, ask first. The permission system may block production-deploy commands unless an allow rule matches: run each deploy as a bare command (no pipes, no `cd x &&` prefix, no `echo Y |`; `cd` in a separate call first; `git -C <path> push` does not match a `git push` rule). Do not work around a denial; tell the owner and let them run it, then read the result (e.g. the update group id) yourself.

### One repo, several Vercel projects: each builds only for its own folder
**Rule:** Every Vercel project in a monorepo (site, admin panel, ...) has its own `vercel.json` with the ignored build step, so a push deploys only the projects whose folder changed.
**Why:** Without it every push rebuilds every project: wasted build minutes, and surprise production deploys of a site nobody touched.
**How to apply:** Add the `ignoreCommand` from stack-guide `vercel.md` when creating each new Vercel project; test it on two past commits (one touching the folder, one not) before merging to the deploy branch.

### Do not poll the live site
**Rule:** After a push, do not curl the production site in a loop waiting for the new build.
**Why:** It looks like deploy activity to the permission classifier and gets denied; it is also noisy.
**How to apply:** Ask the owner to refresh in a private window, or do at most one single read-only check.

### Test with demo accounts, never the owner's
**Rule:** All feature testing (emulator, phone, scripts, evals that write data) uses local demo accounts such as `meera.demo@example.com` on the LOCAL backend. Never test as the owner's real account and never create test data, share links or notifications in the cloud project.
**Why:** The device is often signed into the owner's real account; tests would pollute real data and could message real contacts.
**How to apply:** Before any run, check which account the app/script uses; switch to a demo account first. Seed extra demo users locally if a scenario needs them.

### Real phone: check focus before every input
**Rule:** Before EVERY tap, keyevent or text injection on a real phone, confirm the app under test has focus (`adb shell dumpsys window | grep mCurrentFocus`). Stop if it does not. No fixed-coordinate tap sequences without a check between steps. After force-stop or cold start, wait for and confirm the app window before any input. Never press the CALL key or open the dialer or contacts.
**Why:** A scripted tap loop ran while the app was not in the foreground, landed in the dialer and called two real contacts.
**How to apply:** Put these lines verbatim in every device-QA helper brief. One phone, two helpers: use a lock file so only one drives it at a time.

### Never blanket-kill processes
**Rule:** Never `taskkill /IM node.exe` or kill all `node`. Stop only the process you started, by PID or port.
**Why:** A helper restarting a function server killed the dev bundler (left running on purpose) and could have killed a parallel helper's processes.
**How to apply:** Put the line in every helper brief that runs servers. After a helper touches processes, check the bundler port and `adb devices` before the next device step.

### No node_modules junctions in worktrees (Windows)
**Rule:** Never `mklink /J node_modules <main>\node_modules` inside a git worktree.
**Why:** `git worktree remove --force` follows the junction on Windows and deletes the real `node_modules`.
**How to apply:** Run `npm ci` in the worktree. If a junction exists, remove it first with `cmd /c rmdir <link>`. Stop the bundler and test workers before reinstalling (they lock `esbuild.exe`).

### Line endings
**Rule:** Many repos mix CRLF and LF. Keep each file's existing ending. After any helper or scripted edit compare `git diff --numstat` with `git diff --numstat --ignore-cr-at-eol`; if they differ, restore the original ending before committing.
**Why:** A 25-line change turned into a 1,700-line diff after `sed -i` and helper edits flipped whole files, hiding the real change.
**How to apply:** Prefer scripted edits that preserve newlines (Python `newline=''`) over `sed -i`. Say it in helper briefs.

### Secrets stay out of chat and the repo
**Rule:** Env var names yes, values never. The user pastes secrets into `.env` themselves. Never echo a secret in chat, commit a filled `.env`, or put one in a docs file. Anything prefixed `EXPO_PUBLIC_` (or `VITE_`) is inlined into a public bundle: only public-by-design values go there.
**Why:** Leaked keys cost money and require rotation; one temp folder holding a DB password was one `git add` from a public repo.
**How to apply:** Check `.gitignore` covers `.env*`, the backend CLI's temp dir and build output. Use `secrets list` style commands that print digests only.

### Cloud secrets: paste in the dashboard, never through a Windows shell
**Rule:** On Windows, the owner sets backend secrets (webhook signing secrets, API keys) in the provider's dashboard (e.g. Supabase → Edge Functions → Secrets), not with `npx … secrets set` in PowerShell. Never hand over commands with `<placeholder>` text to fill in.
**Why:** The npx `.cmd` shim silently mangled a `whsec_` value; every webhook failed with a bad signature for an hour. Pasted `<…>` placeholders broke another attempt.
**How to apply:** Give the dashboard click path. To prove a value matches without seeing it, compare SHA-256 of the copied value (`(Get-Clipboard).Trim()`) with the digest from `secrets list`. Redeploy the function if a changed secret is not picked up.

### Edit code files with the editor, not escaped shell scripts
**Rule:** Write or patch source files with the file-edit tools (or a script that reads a clean snippet file), not with Python/Node heredocs that embed backslash escapes (newline, carriage return, word boundary) in string literals.
**Why:** Escapes inside heredoc-embedded scripts turned into real newlines and control characters in regexes three times in one session; builds broke in confusing ways.
**How to apply:** For multi-line code with escapes, write the snippet with the editor to a scratch file, then splice it in by anchor; afterwards grep the file for control characters.

### Backend MCP/CLI may point at the wrong project
**Rule:** Before any write through a backend MCP or CLI, confirm which project it targets (project-URL tool, or `supabase projects list`). Never write through a connector that points at another project. Use the project-linked CLI for releases.
**Why:** An MCP loaded in the session pointed at an unrelated project. Cause: a `.mcp.json` in a PARENT folder (e.g. the folder holding all projects) applies to every project under it, pinned to one project ref.
**How to apply:** Read-only check first; one-off SQL against the right project via the linked CLI. Lasting fix: give the project its own local-scope MCP entry (`claude mcp add --scope local ...`, or `projects["<path>"].mcpServers` in `~/.claude.json`), which beats project scope. For Supabase use the hosted server pinned to the ref, `https://mcp.supabase.com/mcp?project_ref=<ref>` (add `&read_only=true` for read-only), signed in through `/mcp`, so no access token sits in a file. Other projects keep the shared file.

### Helper briefs and usage limits
**Rule:** Executors (cheaper-model helpers) get a written brief with: files they may touch, the rules above that apply, report format (10 lines or fewer), commit after each chunk (about every 15 minutes), a notes file (15 lines or fewer), no push. Parallel helpers touch non-overlapping files. Respect the owner's usage-percentage limits (see glossary).
**Why:** Keeps the main session cheap, reviewable and conflict-free.
**How to apply:** Check in on helpers about every 5 minutes; review diffs before merging.

### Sharing tables: three checks
**Rule:** Any table that grants access to another user's record (shares, memberships, invites) needs three database-side checks: (1) on insert, the record really belongs to the person granting access; (2) the recipient can change only their answer (status, note), never other columns such as the record id or owner; (3) end states (removed, declined) can't be undone by the recipient.
**Why:** Example (WowTodo): row security only checked "the sharer is you", so a former recipient could re-share a task they no longer had, flip "removed" back to "accepted", or point their share at another task id.
**How to apply:** Audit before building on a sharing feature: write a failing test for each check first, then add one trigger that enforces all three (skip it for the service role and nested system triggers). Keep both directions in the access test suite.

### Test scripts clean up after themselves
**Rule:** Verification scripts delete every row they create, including side effects such as notifications, before and after they run, so a second run passes without a database reset.
**Why:** Example (WowTodo): a check counted notification rows left over from an earlier run and failed on every run after the first, which looked like a regression.
**How to apply:** Each test section has a cleanup that covers the rows its triggers create, not just the rows it inserts; run every suite twice in a row before trusting it.

## UI and product

### No native alerts
**Rule:** No `Alert.alert` or any system-styled popup. Confirmations use the design-system confirm dialog; success/info/errors use the in-app toast. An editing screen returns to view mode after save with no "Success" popup.
**Why:** System popups break UI continuity and trust is withdrawn immediately.
**How to apply:** Grep new screens for `Alert.alert`; put it in UI helper briefs.

### The keyboard never hides the input
**Rule:** Wherever a keyboard opens (screens, sheets, dialogs, inline edits) the focused input AND the button that acts on it (Save, Send, Add) stay visible above the keyboard.
**Why:** Screens built later regress after an earlier sprint fixed most; it is direct user frustration.
**How to apply:** Reuse the shared keyboard handling (a screen wrapper or a keyboard-reveal hook; on edge-to-edge Android, window resize does not help). EVERY QA pass taps into EVERY input on each touched screen and screenshots the keyboard-open state, re-tested after any change to that screen even if the change was not keyboard-related. A pass without these checks is not done. Web pages and admin panels: add `interactive-widget=resizes-content` to the viewport meta (Chrome otherwise keeps the layout behind the keyboard) and make long-form action rows sticky; test them in the phone's browser with the keyboard open.

### Quiet secondary controls
**Rule:** Only the primary action gets colour. Secondary toggles are icon-only, grey, normal size, with a toast confirming the change. Soft blurred shadows only, never hard lines or bands; check shadows are not clipped by overlays.
**Why:** Labels and colour on secondary controls read as clutter and compete with the main action.
**How to apply:** In mockups and real UI, give the main button the accent; make everything else neutral.

### Buttons on one line; compact lists
**Rule:** Button text never wraps to a second line. Lists stay compact: one row per item, status as a small badge on the avatar (and in words only when it isn't the normal state), a control's label said once (an icon beside a small switch, or a column heading), rare actions behind ⋯.
**Why:** Example (WowTodo): a dialog button "Remove them too" wrapped to two lines, and a people sheet repeated a status chip and "Can add people" on every person; the compact version was 44% shorter.
**How to apply:** Shorten the label first and check it in every language. Give the shared dialog a fallback that stacks its buttons full-width when a label is too long for half the width. When a list repeats the same label or chip on every row, offer the compact pattern in the mockup.

### No backdrop blur or scrim
**Rule:** Bottom sheets and dialogs lift with one neutral drop shadow and a strong border; the screen behind stays fully clear. No blur view, dark scrim or gradient band behind them. Every sheet pulls down to close from its handle or title (tap outside and Back also close; with the keyboard open the first pull only hides the keyboard).
**Why:** Real Android blur stuttered on a mid-range phone, stacked blur strips looked stepped, and a scrim hides context.
**How to apply:** Reuse the shared sheet/dialog components. If separation is weak in dark mode, adjust surface colour or border, not blur. Ask before touching existing cheap blur (chat bars, toasts).

### Entry screens: pinned, predictable layout
**Rule:** A visible back button on the left and compact actions on the right in ONE pinned row, in the same place across modes and tabs (pinned above the keyboard). Slim segmented toggles; reuse existing primitives. Quiet context (a muted date line) is welcome.
**Why:** Entry points are where users interact most; hands learn a fixed spot.
**How to apply:** Any new or reworked compose/entry screen.

### Suggest modern UI, with clickable options
**Rule:** When touching a screen, briefly propose 1 or 2 modern refinements (compact, calm, no glow, floating chrome with fades). For anything non-trivial offer 3 or 4 clickable variants through a mockup session.
**Why:** The owner prefers choosing between concrete options to describing designs.
**How to apply:** Offer, do not impose; record the pick as the spec.

### Mockups before building web sections
**Rule:** Before building any website section, page or flow, ask "want to see mockups first?" Even for small sections. If yes, run the mockup workflow and iterate until agreed, then build.
**Why:** The owner wants to shape the design before code.
**How to apply:** Keep every agreed mockup (indexed in a README) so it can become a live demo or a self-playing story later. Build mockups with a scripted flow runner and fictional names.

### Freeze the mockup template, then reuse it
**Rule:** The first agreed mockup of each kind (website, app) becomes the frozen template. Every later mockup of that kind copies it and changes only the parts in question: same control bar, collapsible notes column, full-page rendering, tokens and layout.
**Why:** A mockup rebuilt from scratch put the site in a box with scroll bars and a side panel that wouldn't collapse; the owner couldn't picture the real site and rejected it.
**How to apply:** Keep the template as a source file with asset placeholders and a build script (`docs/product/mockups/src/`). Name it in every helper brief. No template yet: build and agree one first.

### Library before scratch
**Rule:** Before hand-building a visual effect or interaction (scroll-drawn lines, connectors, animations), search for a proven open-source library, present 2 or 3 options with trade-offs (include "already installed"), get approval, then build.
**Why:** Hand-rolled effects looked amateur; libraries do them well.
**How to apply:** Web search, short comparison, ask, then build. Record the choice in the decision log.

### No sparkle or "AI" icon; no "AI" wording up front
**Rule:** Do not use sparkle, star or magic-wand glyphs to mark AI. Keep the word "AI" out of anything users see first (app UI, store listing name and headlines, screenshot captions, hero copy). Say "<Product> turns it into a to-do list". "AI" is fine where essential: privacy policy, data-safety answers, legal and technical docs.
**Why:** The product should read as itself doing the work, not "AI everywhere".
**How to apply:** Pick a functional icon (check, branch, list). Put this in copy and UI helper briefs. (A project may override; this was the WowTodo owner's hard rule.)

### Logo and brand marks
**Rule:** Where the project fixes a logo shape (Example (WowTodo): always a full circle, never a square with a letter), every new placement uses the one shared brand component or pre-cut asset.
**Why:** Consistency builds trust between app and site.
**How to apply:** Record the shape rule in project memory; OS launcher and store icon masks are set by Google/Apple, say so if asked.

### Admin-toggle settings pattern
**Rule:** When the owner chooses between options and says the switch belongs "in the admin, later", build every option and select with ONE config value (a constant in a config file, with a comment naming the admin as future owner). Add a line to an admin-ideas doc. Do not build admin UI or settings tables early.
**Why:** No admin console exists yet; the choice must be flippable later without new design work.
**How to apply:** Example (WowTodo): `UPDATES_STOPS = "day" | "month"` in the site config.

### Asked-for content gets real expertise
**Rule:** When a user asks for content (a course, syllabus, plan, recipe, itinerary), the product must produce real domain detail, never placeholders like "Plan Day 1". Scope "do not invent specifics" prompt rules to errands and events where the user decides the details; never apply them blanket.
**Why:** Anti-invention rules written for errands also suppressed expertise and made the product feel dumbed down.
**How to apply:** Keep eval cases for both expert content and the no-invention controls; re-run them when touching planner prompts.

### Keep the must-have features
**Rule:** When the owner marks a feature as a must-have, ship it, keep refining its UX, and never propose removing it as a "simplification".
**Why:** It is core to the product vision.
**How to apply:** Raise refinements as follow-ups when planning.

### Deferred gaps are remembered
**Rule:** When the owner says "remember the gaps, we shall deal with them later", write them to a list in the status doc and raise them when planning or when a related area is touched.
**Why:** Silent drops erode trust.
**How to apply:** One bullet per gap with the date it was deferred.

### Voice and accuracy trade-offs belong to the owner
**Rule:** When the owner picks accuracy over speed (e.g. keep the high-accuracy transcription step), do not propose dropping it again; speed up elsewhere (perceived wait, server first-decision, upload size).
**Why:** Repeating a settled decision wastes their time.
**How to apply:** Record the decision in memory with its reason.

## Release and communication

### Real dates only
**Rule:** Run `date "+%Y-%m-%d"` before writing a date anywhere: release notes, website updates data, release log, migration file names and `Created:` lines, handoff/status docs, memory. Stamp migrations with `date +%Y%m%d%H%M%S`. Several releases on one day all get that day.
**Why:** Two same-day releases were dated the next two days and went live on the public updates page in the future; users stopped trusting it. Applied migration names cannot be renamed afterwards.
**How to apply:** Check the clock at the start of every release step.

### Release log, every release
**Rule:** Every release that reaches users is logged in the same batch: (1) a row in the internal release log (date, kind, version/runtime, build or update id, commit, what changed); (2) a plain-language entry in the public what's-new file; (3) the website updates data entry. A store build sets `version` (page says update from the store); an OTA sets `needs: "<runtime>"` (page says it arrives on its own on that version or newer).
**Why:** Users and the owner want a public, honest history.
**How to apply:** Do it with the release, not afterwards; the site change ships with the next approved push.

### Audience-friendly release notes
**Rule:** Public notes lead with the benefit, in plain warm words, with a concrete everyday example. No internal terms (chip, avatar, backstop, planner, IDs). The internal log stays technical. Fictional names only. Respect the no-"AI"-wording rule.
**Why:** Too-technical notes put readers off.
**How to apply:** Pattern: bold short benefit lead plus one friendly sentence, e.g. "**Know what's due.** Every task now shows when it is due, so nothing sneaks up on you."

### Store consoles: drafts must be reviewed before release
**Rule:** Console changes kept as drafts during testing (data safety, content rating, privacy policy URL, ads, target audience, listing, app access) must be reviewed against the data-safety doc and the live privacy policy and submitted before release. Remind the owner at every "ready to release?" moment.
**Why:** Drafts get forgotten or go stale against the app.
**How to apply:** Keep a checklist doc; list every section by name.

### Console click-paths, checked against current docs
**Rule:** For anything the owner must do in a web console (store, cloud, DNS, hosting, email), give a numbered click-by-click path (menu, page, section, button) plus the exact value to enter or tick, checked against the provider's CURRENT official help first. Add a fallback ("use the console's top search box for <page name>"). Say which step you could not verify. Never write "update the draft answers".
**Why:** Consoles move menus often and earlier steps did not match the live UI.
**How to apply:** Search the official docs before writing the steps.

### Check the built binary's permissions
**Rule:** After native or plugin changes, inspect the BUILT app bundle's merged manifest (and the pre-build introspection) before submitting. Never set a plugin permission flag to `false` without checking what it removes.
**Why:** A plugin flag stripped the microphone from the whole app, and a new camera permission made the store assume a required camera and drop hundreds of device models; neither shows in typecheck, tests or a dev build that reuses a stale native folder.
**How to apply:** See the `release-ritual` skill.

### Build quota is precious
**Rule:** Send a build to the cloud builder only after meaningful changes have been rigorously tested on a device (every touched flow, light and dark, large font). Never build "to see". Batch fixes into one build. Cancel superseded queued builds. Stores reject version codes that were ever uploaded, even as a discarded draft.
**Why:** The free tier has few builds.
**How to apply:** Before a build, list what changed and what was tested.

### Do not clear the bundler cache before emulator testing
**Rule:** Do not clear the bundler or repo caches right before emulator testing.
**Why:** Rebuilding the bundle from empty took about two minutes on every start.
**How to apply:** Repo clean-up tools should skip the bundler cache when a test session is coming.

### Remind about paid-tier work
**Rule:** If the owner plans a paid tier, remind them (once, at a natural pause) when pricing, plans or limits work comes up or the production launch is planned. A paid tier is an in-app subscription inside a free app (the store's free-to-paid switch is permanent and one-way).
**Why:** The owner asked to be reminded.
**How to apply:** Prerequisites to mention: payments profile, billing integration, subscription products, data-safety and privacy updates, content-rating re-check.

### Record "last seen" on return to the foreground too
**Rule:** Any "last opened / active / last seen" record must fire when the app comes back to the foreground, not only on launch (once per day is enough).
**Why:** Android keeps apps alive in the background for days; a launch-only ping missed people who used the app every day.
**How to apply:** Call the daily ping after the first frame and on every app-state change to "active"; keep the last-sent date on the device so it costs one call a day.

### Run a plugin installed mid-session headless, with explicit tools
**Rule:** A Claude Code plugin installed during a session is not loaded into that session. Run its skills in a fresh headless process: `claude -p "/<plugin>:<skill> <brief>" --permission-mode acceptEdits --allowedTools "<explicit list>"`.
**Why:** Without an explicit tool list, a headless run cannot write files and the work silently goes nowhere; the running session cannot see the new skills or agents at all.
**How to apply:** Allow file tools plus only the read-only shell commands the skill needs (e.g. `Bash(date:*) Bash(git log:*) Bash(node:*)`); never posting or deploy commands. Put the same list wherever an app or script spawns the run. Review the files it wrote before committing.

### When asked for a tool, show the tool
**Rule:** When the owner asks for a tool, studio or dashboard, the first thing shown is its full working shape in a mockup: real assets from the product, the production flow, the automation and its controls, and how each automated result was made (a trace plus a way to give feedback). Never a page of copy text.
**Why:** Example (WowTodo): a first "social studio" that was only bios and links read as "just a website"; the agent-driven version with suggestions, traces and an autonomy switch was approved.
**How to apply:** Start with mockup-lab on the whole flow, grounded in real product data. When the owner says "take the best call", decide UI and policy questions at a sensible middle, record each call with its reason in the decisions file, and ask only what only the owner knows.

### Don't drive the owner's browser unasked
**Rule:** Don't open or drive the owner's real browser (browser-extension tools) for your own visual checks.
**Why:** It acts in their signed-in browser; the owner rejected an unasked screenshot run.
**How to apply:** Verify with headless screenshots (a helper with headless Chrome/Playwright or jsdom click-throughs), or hand the owner the local URL. Ask in one line if the real browser is truly needed.

### Clickable things look clickable; presets switch off
**Rule:** Anything that opens a panel or page shows it without saying "click here": a slight lift, soft shadow and border tint on hover, a pointer cursor, and a quiet › after the name (the › carries it on touch screens). A button that applies a preset filter is a toggle: it shows a pressed state and a second tap clears exactly what it set.
**Why:** Example (WowTodo admin): the owner couldn't tell tester cards opened the person panel, and "Show who I can pick" got stuck on with no way back except undoing five filters by hand.
**How to apply:** Give every new clickable card, row or list item the hover affordance (inside `@media (hover: hover)`) and the ›. Give preset buttons `aria-pressed`, computed from whether the current filters equal the preset; changing any filter by hand turns it off.

### Keep the screen in the URL
**Rule:** Web apps and admin panels put the current screen in the URL (`/inbox`, `/people`…), so refresh, Back/Forward and bookmarks keep the user where they were.
**Why:** Example (WowTodo admin): the screen lived only in memory, so every refresh dropped the owner back on the home screen.
**How to apply:** Read the screen from `location.pathname` on start (unknown path → home, check with an own-key test, not `in`), `history.pushState` on navigation, and listen to `popstate`. The host must rewrite every path to `index.html`. Deep state (filters, an open panel) can follow later.

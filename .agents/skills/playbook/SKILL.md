---
name: playbook
description: The standing rules and shared vocabulary for building apps and sites with the Studio Method kit. Load at the start of EVERY session, alongside the working-contract skill, and again whenever a rule is in doubt (alerts, keyboards, dates, pushes, deploys, test accounts, real-phone testing, release notes, console steps). Triggers - "playbook", "house rules", "what are the rules", "start of session", "before I push", "before I deploy".
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Playbook

Hard rules learned the expensive way (lost data, burned build quota, real phone calls placed by a tap loop, future-dated release notes). They apply to every project in this kit. A project can add its own overrides in its own docs, and those win.

## When to load
- Every session start, together with `working-contract` (status/handoff docs, plan-vs-execute split, usage limits).
- Before: a push, a deploy, a release, a device test, a UI change, a console task, a prompt change, a dated write-up.
- When the owner uses a shorthand word you do not recognise: look it up in `references/glossary.md`.

## How to use
1. Read `references/rules.md` once at session start. Each rule is **Rule / Why / How to apply**; skim the headings, read the full text of the ones your task touches.
2. Put the rules that matter into every helper brief (subagent prompt). Helpers do not inherit memory. The always-include set:
   - Never kill all `node` processes; stop only the PID/port you started.
   - Keep each file's existing line endings; compare `git diff --numstat` with `--ignore-cr-at-eol`.
   - Before ANY tap/keystroke on a real phone, confirm the app under test has focus.
   - Test with demo accounts only, never the owner's real account.
   - No native `Alert`, no backdrop blur, the keyboard must never hide the focused input.
   - No AI attribution in commits or PRs.
   - Commit, but never push.
3. Run `date` before writing any date anywhere (rule "Real dates only").
4. If a rule conflicts with what the owner just said, the owner wins; then record the new decision in the project's memory or status doc so it is not lost.

## Quick index (details in rules.md)
- **Process and safety:** branching (dev to main), ask before push, conservative deploys, no polling the live site, demo accounts only, focus check on real phones, no blanket process kills, no `node_modules` junctions in worktrees, line endings, secrets never in chat or repo, wrong-project MCP check, helper briefs.
- **UI and product:** no native alerts, keyboard never hides input, quiet secondary controls, no backdrop blur, entry-screen layout, suggest modernisations, mockups before building, reuse the frozen mockup template web sections, library before scratch, no sparkle icon or "AI" wording, admin-toggle pattern, asked-for content gets real expertise.
- **Release and communication:** real dates, release log every release, audience-friendly notes, store-console drafts reviewed, console click-paths checked against docs, built-binary permission check, build quota, paid-tier reminders.

## Adding a rule
When the owner corrects you or a mistake costs time, append a rule to the project's memory in the same Rule / Why / How to apply shape, with the real date. Promote it into the kit only if it is project-neutral.

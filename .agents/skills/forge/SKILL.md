---
name: forge
description: Add a new skill to Studio Method, or improve an existing one, as the owner of the method repo — from a workflow that just worked, an idea in IDEAS.md, or a request like "make a payments skill". Researches current docs, drafts the skill in the right pack, validates, versions, commits and (after asking) pushes. Use when the user says "forge", "make this a skill", "add a skill for …", "update the … skill", "build the next skill from the roadmap".
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Forge

Goal: a new or improved skill in the Studio Method repo that another project can use without this conversation.
Only the method's owner forges (people who just install the plugin can't push).

## 1. Pin down the skill (≤3 questions, defaults first)
- **What job does it do, end to end?** One sentence a stranger understands ("Add Play Billing subscriptions to an
  Expo app, with a paywall and a server check").
- **Which pack?** `studio-core` (way of working) · `studio-app` (mobile) · `studio-site` (website) ·
  `studio-services` (backends, DNS, email, payments providers). New pack only if none fits.
- **New or change?** For a change, read the current skill first and keep its name and trigger phrases.

## 2. Gather what's true
- From this project: the steps that actually worked, the gotchas, the commands, the files touched.
- From the outside: current official docs for every tool and console it touches (versions, policies and console
  menus change; date what you checked). Store-policy and payments rules must come from the provider's own pages.
- From the method: `playbook` rules that apply (e.g. ask before push, real dates, no secrets in chat).

## 3. Write
Folder `plugins/<pack>/skills/<name>/`:
- `SKILL.md`: frontmatter `name` (kebab-case) and `description` (what it does + "Use when …" trigger phrases);
  body = numbered steps a fresh session can follow, what "done" means, and what to ask the owner. Aim ≤150 lines.
- `references/*.md`: the depth (provider setup, click paths, code patterns, policy notes, examples).
- `scripts/` only for steps that are mechanical and repeat (validate, render, check); reference them relative to the
  skill folder or from `.agents/skills/`.
- Everything the plugin needs at run time (templates, schemas, scripts, examples) lives **inside the plugin folder**:
  an install copies only that folder, so files elsewhere in the repo are missing for users. Keep one copy.
- Project-neutral: fictional examples, placeholders for ids, "Example (<project>)" labels where a real case helps.

## 4. Check
1. `claude plugin validate .` from the repo root.
2. Dry run: read the SKILL.md as if you were a fresh session in an empty project. Every step must be doable from
   what's written (no "as discussed").
3. If the skill has scripts, run them once on sample input.

## 5. Ship
1. Bump the pack's version (`plugin.json` and its entry in `.claude-plugin/marketplace.json`): new skill = minor,
   fix = patch.
2. Update `README.md` (skills table) and remove the item from `IDEAS.md` if it came from there.
3. Commit on `main`: `forge: <skill> (<pack> <version>)`. Ask before pushing.
4. Tell the owner how projects get it: `/plugin marketplace update studio-method`, then update the pack.

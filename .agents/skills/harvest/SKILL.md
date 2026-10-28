---
name: harvest
description: Carry what this session learned back into Studio Method so every project gets it — new hard rules, gotchas, shared words, skill fixes and new skill ideas — after the owner approves each one. Runs as the last step of check-out, or on demand. Use when the user says "harvest", "add this to the method", "remember this for all projects", "make this a skill", or at check-out.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Harvest

Goal: lessons that would help **any** project move from this repo into the Studio Method repo, rewritten so they
are project-neutral, approved by the owner, versioned and committed. Nothing goes in silently.

## 1. Collect candidates (from this session only)
Look at: feedback and project memories saved today, rules the owner stated ("never…", "always…", "from now on…"),
gotchas written into the status doc or helper notes, steps that went wrong and the fix that worked, things the owner
had to explain twice, and skills that needed a workaround.

## 2. Filter
Keep a candidate only if all are true:
- it helps beyond this project (a stack, a service, a way of working) — brand details, people and one-off bugs stay
  in the project;
- it isn't already covered: search the method repo (`playbook/references/rules.md`, `glossary.md`, the skill it
  would belong to);
- it can be written without personal data (no emails, account ids, device serials, paths, real names).

## 3. Ask
AskUserQuestion, multi-select, at most 5 candidates. Each option says what it is and where it would go:
- **Rule** → `studio-core/skills/playbook/references/rules.md` (Rule / Why / How to apply)
- **Word** → `playbook/references/glossary.md`
- **Skill fix** → the named skill's SKILL.md or reference
- **New skill idea** → `IDEAS.md` at the repo root (one line: name, what it does, where it came from)

Nothing selected → say "Nothing harvested" and stop.

## 4. Write
1. **Find the method repo.** Use the path the project's memory or CLAUDE.md records ("Studio Method repo: …").
   If none, ask once and save it to project memory. If the repo isn't on this machine, write the approved items to
   `docs/agent-notes/harvest-<date>.md` in this project and tell the owner to run harvest where the repo lives.
2. Pull first (`git pull --ff-only`), then edit. Match the file's existing format; keep entries short.
3. Rewrite neutrally: "Example (<project>)" is fine for illustration; secrets and personal details never.
4. Bump the patch version of each changed pack in its `.claude-plugin/plugin.json` **and** the matching entry in
   `.claude-plugin/marketplace.json` (they must agree), then run `claude plugin validate .` from the repo root.
5. Commit on `main` of the method repo: `harvest: <short list>`. Follow the project's attribution rule.
   **Ask before pushing** (one line: "Push Studio Method <version>?").

## 5. Tell the owner
Two lines: what was added, and how other projects get it:
```
/plugin marketplace update studio-method
```
then restart Claude Code (or `/plugin` → update) in those projects.

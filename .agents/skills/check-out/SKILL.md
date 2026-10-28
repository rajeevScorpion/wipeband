---
name: check-out
description: Close a work session cleanly so a fresh session can pick up with no loss — take stock of git/helpers/processes, ask what to carry over, update the status doc, save lasting memories, write HANDOFF.md, flag release loose ends, tidy merged branches, list owner-only to-dos, and end with a starter line for the next session. Use when the user says "check out", "check-out", "/check-out", "wrap up", "close the session", "end session", "hand off", or "let's continue in a fresh session". Pairs with catch-up. Works in any project.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Check out

Goal: everything a fresh session needs is written down, committed, and nothing is left running or unrecorded.
Follows the `working-contract` skill (docs location, no AI attribution, ask before push). Keep output short.

## 1. Take stock (cheap, no code reading)
Run from the repo root (it may be a subfolder, e.g. `app/`):
- `git status --short`, `git branch --show-current`, `git log --oneline -5`
- Branches not merged into the integration branch (`dev`, else `main`): `git branch --no-merged <dev>`
- Unpushed: `git log --oneline @{u}..` per branch with an upstream; `dev` vs `main`: `git log --oneline main..dev`
- Helpers still running (background agents), recurring timers (CronList), Monitors.
- `docs/agent-notes/*` left behind.
- Repo clean due: `node ".agents/skills/optimize-repo/scripts/check-due.mjs"` (prints only when due; skip if the script is missing).
- Background processes worth stopping: dev servers and bundlers (e.g. Metro on port 8081), emulators/simulators (`adb devices`), local databases (e.g. `npx supabase status`).

## 2. Ask (one AskUserQuestion, 1–3 questions)
- **Next focus** for the fresh session (offer the next steps the status doc names; Other = free text).
- **Carry-overs**: files/plans to read first, decisions already made, constraints (Other = path or note).
- Only if relevant: commit/stash/leave uncommitted work; push now or leave for later; stop background processes.
Don't ask what the docs or git already answer.

## 3. Release loose ends (flag, don't fix unless asked)
- Commits on `dev` not on `main`; on `main` but not shipped (no OTA/build after them).
- Shipped but missing records: RELEASE_LOG row, WHATS_NEW entry, website updates entry (if the project keeps them).
- Cloud migrations in the repo but not applied (e.g. `npx supabase db push --dry-run` when a Supabase project is linked).
List them in the handoff under Open; mention the top one in the reply.

## 4. Update the status doc
Existing file only (`PROJECT_STATUS.md` / `CURRENT_STATE.md` / similar, often `docs/` or `docs/project/`). Rewrite stale lines,
don't append a diary: Last updated + commit, what shipped/changed this session, open/broken, next actions.
Fold useful lines from `docs/agent-notes/*` in, then delete those notes.

## 5. Memory
Save only what lasts beyond this repo's docs and isn't derivable from code/git: owner preferences and corrections
(feedback, with **Why** / **How to apply**), project constraints or decisions, external references. Check for an existing
memory first and update it; delete memories proven wrong; add one index line per new memory in `MEMORY.md`.
Nothing worth saving → skip and say so in one line. Update `docs/project/MEMORY.md` with the host file-editing tool. Do not store project context in private host memory.

## 6. Write HANDOFF.md (overwrite)
```
# Handoff — <date>[, usage <n>%]
**Stopped at:** what shipped / where work stopped (IDs: commit, OTA/build, migration)
**In flight:** branches, uncommitted work, helpers, running processes (or "nothing")
**Next session:** the focus the user chose + files/plans to read first + decisions already made
**Owner to-do:** things only the owner can do (phone tests, console reviews, approvals, paths to provide)
**Open:** loose ends, known issues (link status doc sections rather than repeat them)
**How we work:** project-specific rules worth repeating (push/deploy permissions, commands that differ from defaults)
```
Keep it under ~40 lines. It is the anchor catch-up reads first.

## 7. Tidy
- Delete local branches fully merged into `dev`/`main` (`git branch -d`, never `-D`); list what was deleted.
- Cancel this session's timers/monitors. Stop helpers only if the user agreed; record anything unfinished in the handoff.
- Stop background processes only if the user said yes in step 2.

## 8. Product pulse (only if a user-facing feature was finished this session)
Run `product-pulse` (studio-core); it skips itself if a pulse ran in the last 3 days.

## 9. Harvest
Run the `harvest` skill (studio-core) to offer lessons from this session to the method.

## 9. Commit (and push only with a yes)
Commit the doc changes on the integration branch (follow the project's branching rule; fast-forward `main` only if the
project does that for docs). No AI attribution unless the project's contract overrides it. Push only if the user approved in step 2 or has standing approval.

## 10. Reply (≤6 lines)
- Done: status · handoff · memories (n) · branches tidied · processes stopped
- Top loose end / owner to-do
- Starter line to paste in the fresh session, e.g. `catch up — then start <focus>; read <file> first`

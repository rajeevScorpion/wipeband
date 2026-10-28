---
name: working-contract
description: A standing way of working that applies to every session in any project. Covers the three project docs (status, handoff, working contract), host-independent execution and optional delegation, helper-agent check-ins and commits, usage-percentage limits, and token-lean communication. Use at the start of every session, whenever delegating to subagents, when the user reports a usage percentage, before committing, and when asked for a handoff.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Working contract

Goal: low token cost, and no lost work across sessions or helper agents.

Hard rules and shared words live in the `playbook` skill (studio-core); load it with this one.

## 1. Session start
1. Look for the three docs (default `docs/`). Match existing equivalents first. A status file may be named
   `PROJECT_STATUS.md`, `CURRENT_STATE.md`, `STATUS.md` or similar, and may live in a subfolder such as `docs/project/`.
   **If one exists, read it and keep updating it. Never recreate or overwrite it.**
2. Create only what's missing, using the templates below.
3. If `HANDOFF.md` has content, read it first and continue from its next step.

## 2. The three docs
- **Status** (`PROJECT_STATUS.md`): the long-lived record of what the project is, what works, what's open and what's next.
  **Update it in every commit you make.** Keep it current, not a diary. Rewrite stale lines rather than appending.
- **Handoff** (`HANDOFF.md`): a snapshot for a fresh session: where we stopped, work in flight (including helper agents
  and their uncommitted work), open questions, and the exact next step. Write it only at 90% usage or when the user asks.
  Overwrite it each time.
- **Contract** (`WORKING_CONTRACT.md`): a short copy of sections 3–6, so helper agents and other sessions can follow it
  without this skill. Add project-specific overrides there.

## 3. Roles
The current host plans, executes, and reviews. Use helpers only when permitted by the host and useful for the task; no model is required.

## 4. Helper agents
- **Brief** each helper with: the goal, the files in scope, what "done" means, and its notes path.
  Ask for a report of 10 lines or fewer.
- **Commit often.** A helper commits after each working chunk, at least every ~15 min of work, never leaving
  large uncommitted changes. It does not edit the status doc (the main session does, to avoid conflicts).
- **Notes.** Each helper keeps `docs/agent-notes/<task>.md` (15 lines or fewer): done, in progress, next, gotchas.
  It updates the notes at each commit. When its work is merged into status, the main session folds in what matters
  and deletes the note.
- **Check-ins** every ~5 minutes while helpers run (use a recurring timer if the session has one; cancel it when
  they're done). Ask: what's done, what's left, last commit? Nudge a commit if it's overdue.
- Parallel helpers must touch non-overlapping files; otherwise run them one after another.
- **No AI attribution** in commits or PRs (no `Co-Authored-By: Claude` lines) is the default. Put it in every helper brief.
  A project may override this in its `WORKING_CONTRACT.md` under `## Project overrides`; follow the override if present.

## 5. Usage limits (the user reports the percentage)
| Usage | Rule |
|---|---|
| < 75% | at most 2 helpers in parallel |
| 75–85% | at most 1 helper |
| 85–90% | main session stops its own work; only wait for helpers to report and commit |
| ≥ 90% | write `HANDOFF.md` (or earlier if asked) |

With no percentage reported, usage is unknown. Do not infer remaining allowance.

## 6. Communication (token discipline)
- Short outputs. No recaps of what the user can see, and no filler.
- Keep thinking brief. It exists only to reach a better answer; the user doesn't read it.
- Findings, analysis and questions go in plain language. Name functions or files only when the user needs them to act.
- Don't let this framework bloat the work: docs stay short, and no ceremony beyond what's listed here.

## Templates (create only if missing)

`PROJECT_STATUS.md`
```
# Project Status
**Updated:** <date> · **Commit:** <hash>
## Summary  (2–3 lines)
## Working
## Open / broken
## Next
```

`HANDOFF.md`
```
# Handoff — <date>, usage <n>%
**Stopped at:**
**In flight:** (helpers, branches, uncommitted work)
**Open questions:**
**Next step:**
```

`WORKING_CONTRACT.md`: sections 3–6 above, condensed, plus a `## Project overrides` heading.

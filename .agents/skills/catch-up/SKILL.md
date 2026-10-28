---
name: catch-up
description: Give the user a 4–5 line snapshot of where the project was left, from the status/handoff docs, then offer what to do next. Use when the user says "catch up", "catch me up", "/catch-up", "where did we leave off", "what happened last", or "pick up from where we left". Works in any project.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Catch up

Goal: the user is starting a session and wants to know, in seconds, where things stand. Keep it cheap.

## 1. Read (only what's needed)
1. `HANDOFF.md` first (default `docs/`, or `docs/project/` etc.). If it has a "next step", that's the anchor.
2. Then the status doc (`PROJECT_STATUS.md`, `CURRENT_STATE.md`, `STATUS.md` or similar) — just the Summary,
   Open/broken and Next sections.
3. Glance at `docs/agent-notes/` (if any) and `git log --oneline -5` + `git status --short` for uncommitted work.
4. Nothing found? Say so in one line and offer to create the docs (per the `working-contract` skill).
Don't read code, don't explore further.

## 2. Reply — 4–5 bullets max, plain words
- **Last session:** what we were doing / where it stopped (with date if known)
- **In flight:** unfinished task, branch or uncommitted work (or "nothing")
- **Open loose ends:** 1–2 unclosed items from status/handoff
- **Next step:** the exact next step the docs name

No file paths unless needed to act. No recap beyond this.

## 3. Offer three choices
Use AskUserQuestion (single select) with:
1. **Continue** — resume the in-flight task / next step (name it). Mark "(Recommended)" if something is mid-way.
2. **Start something new** — user describes it.
3. **Close loose ends** — tackle an unclosed item (name the top one or two).

If nothing is in flight, drop option 1 and offer the other two. Then act on the choice.

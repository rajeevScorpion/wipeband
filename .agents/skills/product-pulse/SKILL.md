---
name: product-pulse
description: A light, occasional check-in from the product-lead agent (a senior PM who knows the whole product and its market) — at most three practical suggestions to extend what just shipped, close a gap or sharpen market fit, logged so declined ideas never come back. Runs on its own after a release and at check-out when a feature shipped; on demand when the user says "product pulse", "what next?", "any product ideas?", "how could this be better?", "PM review".
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Product pulse

Goal: the owner hears from a senior product manager at the right moments, briefly, with ideas worth acting on —
and is never nagged.

## When it runs
- **After a release** (the last step of `release-ritual`): trigger = what shipped.
- **At check-out**, only if a user-facing feature was finished this session and no pulse ran in the last 3 days.
- **On request**: any time.
- **Never**: mid-task, during debugging, while the owner is waiting on something else, or more than once a session
  unless asked.

## Steps
1. **Brief check.** If `docs/product/PRODUCT_BRIEF.md` is missing, draft it first from the status doc, project
   map, store/site copy and memory (template below), show it in ≤10 lines, and save it once the owner confirms.
2. **Review as product lead.** Read `.agents/roles/product-lead.md` and perform its read-only review in the current session. If host permissions allow delegation and it is useful, a helper may use the same role with a short brief: the trigger
   (what shipped or changed, with release/commit refs), anything the owner said about direction this session, and
   the paths above. Carry on with other work; don't wait idle.
3. **Review before showing.** You're the filter: drop any suggestion that is generic, already declined in
   `SUGGESTIONS.md`, against a project rule, or not grounded in something real. If nothing survives, log
   "nothing raised" and say nothing to the owner (unless they asked; then say "Nothing worth raising right now.").
4. **Show it** at a natural pause, after the current task's result, in this shape:
   > **Product pulse** (after <trigger>)
   > 1. **<Title>** (<size>): <why + what in one or two sentences>.
   > 2. …
   Then one AskUserQuestion, multi-select: each suggestion with "Mockup it", "Add to roadmap", "Not now" and
   "Never" as the follow-ups (or ask per item if there are only one or two).
5. **Log every outcome** in `docs/product/SUGGESTIONS.md` (create it if missing):
   `| date | trigger | suggestion | size | decision (mockup / roadmap / later / declined) | note |`.
   "Mockup it" hands straight to `mockup-lab`; "Add to roadmap" adds it to the project's roadmap or next list in
   the status doc.
6. If the agent flagged the brief as stale, propose the one-line change; save it only when the owner agrees.

## PRODUCT_BRIEF.md template
```
# Product brief  (updated <date>)
For: <who, in one line>
Problem: <the pain, in their words>
Promise: <what the product does for them>
Core loop: <what a user does every day/week>
Market: <category, 2–4 comparable products, how we differ>
Current bets: <what we're trying now and why>
Success signals: <2–3 things we watch>
Not doing: <deliberate exclusions>
Rules: <words, privacy promises, design rules that limit ideas>
```

## Tone
One senior colleague to another: specific, brief, no hype, no lists of ten. "Not now" is a fine answer and is
remembered.

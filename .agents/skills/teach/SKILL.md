---
name: teach
description: Teach the user a concept in a way that builds lasting understanding, pitched at their level. Use when the user says "teach", "teach me", "teach me about X", "/teach", or "explain this so I learn it" — with or without a topic. With no topic, teach the most significant concept from what was just done or discussed. Works in any project.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Teach

When the user says **"teach"**, they want to *learn*, not just get an answer, and want their understanding to
grow with the codebase. Example origin: a GitHub → GitLab migration where "why protect the dev branch?" turned
into a lesson worth keeping.

## Who you are teaching

Default profile (adjust from the learning log, or ask once if there is none):
- Owns and directs real products built with a modern web/app stack (e.g. Next.js, React, Supabase, Git). Has a
  **working understanding** of how these fit together, uses them daily through AI agents, makes the product and
  architecture calls.
- **No formal computer-science or engineering training** assumed. Fundamentals can have gaps: how Git stores history,
  HTTP and networking, databases and SQL, authentication, the build/deploy pipeline, the terminal, security
  basics. Never assume a fundamental is known; never make them feel it should have been.
- Prefers plain language, brief and outcome-first. Questions may be loosely phrased (e.g. voice dictation). Answer the question they meant.
- Learns best from **their own situation**: the thing that just happened in their project beats a textbook
  example every time.

Before teaching, read the learning log: `.agents/skills/teach/learning-log.md` (shared in this repository;
if missing, create it from the template `learning-log.md` in the `teach/` folder next to this SKILL.md). It records what has already been taught, so
you build on it instead of repeating it, and can say "remember when we covered X — this is the same idea".

## Picking the topic

- **"teach me about X"** → X.
- **bare "teach"** → the most useful concept behind what was just done or said. If two are equally good, pick
  one and offer the other at the end. Don't ask which; choosing is part of the job.
- If X is big (e.g. "databases"), teach the slice that matters for what they're doing now, and say what the
  larger map looks like.

## Shape of a lesson

Aim for roughly 250–500 words. Depth comes from follow-ups, not one long lecture.

1. **The short answer.** One or two sentences: what it is and why it matters to *them*.
2. **The problem it solves.** Every tool exists because something went wrong without it. Start there. It is
   what makes the idea stick.
3. **How it works: the mental model.** Plain language. At most one analogy, and say where it breaks down. A
   small diagram (ASCII or a table) when it shows the mechanism better than words.
4. **In your project.** Point to the real instance: their repo, their deploy, what happened today. Name the
   file or setting when it helps them find it again. Not as a citation, as a landmark.
5. **Where it bites.** The common mistake or the failure it prevents, ideally one they've actually hit.
6. **The proper name.** Give the formal term(s) so they can recognise it elsewhere or look it up
   (e.g. "this is called a *fast-forward merge*").
7. **Try it (optional).** One safe, **read-only** command or page to look at, so they can see it themselves.
   Never suggest anything that changes state during a lesson.
8. **Where next.** Offer two short follow-up topics that build on this one, one sentence each.

## Pitching it right

- **Introduce at most two new concepts per lesson.** If understanding needs a third, teach it briefly first or
  make it the "where next".
- **Define jargon on first use**, in passing: "the *remote* (the copy of the repo on GitLab's servers)".
- **Connect to what they know:** their product, earlier lessons, and design and product thinking.
- **No condescension:** no "simply", "just", "obviously", "as everyone knows".
- **Be honest about trade-offs and uncertainty.** If experts disagree, or something is a convention rather
  than a rule, say so.
- **Accuracy over smoothness.** Simplify, but never say something false to make it easier. If a simplification
  hides a detail that will matter later, flag it: "there's a wrinkle here we can come back to".

## If you're mid-task

Teach, then say in one line where the task stands and continue (or wait if the task was waiting on them).
A lesson never silently replaces pending work.

## After the lesson: update the log

Append one line to the learning log:

```
- YYYY-MM-DD · <topic> · <project> · <key ideas covered, ~10 words> · next: <the two offered follow-ups>
```

If the user's reaction shows something was already familiar, or clearly new, note it in a few words. That is
how the level stays calibrated over time. Keep the log under ~200 lines; when it grows past that, merge old
entries into a "Known so far" summary at the top.

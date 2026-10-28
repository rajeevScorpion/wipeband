---
name: optimize-repo
description: Reclaim disk space in the current repository by finding and safely deleting regenerable build caches and junk (.next, .next-*, .turbo, node_modules/.cache, test reports, stale git worktrees, Python/Rust caches), never touching source, git history, env files or uncommitted work. Use when the user says "optimize repo", "clean the repo", "free disk space", "repo is too big", or when a session-start reminder says a routine clean is due (every 15 days). Works in any project.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Optimize repo

Routine disk hygiene for any repository. Run this when the user says "optimize repo", and every 15 days as routine. An optional SessionStart hook
(`scripts/check-due.mjs`, in the `scripts/` folder next to this SKILL.md) can remind you when a repo is due; it is
optional setup, not installed by this skill. Without it, check the last-run date yourself (step 5).

Example: a Next.js 16 repo had grown to 37 GB, of which ~36 GB was Turbopack caches (`.next` 18.8 GB,
`.next-agent` 16.2 GB, `.next-verify` 2.1 GB); the source was ~11 MB and `node_modules` 0.9 GB.

## 1. Measure (before)

- Find the repo root: `git rev-parse --show-toplevel`. Work only inside it.
- Size each top-level entry. On Windows `du` over millions of small files is very slow (a 37 GB tree took
  10+ minutes serially), so measure the likely-large folders **in parallel, in the background**, and tell the
  user you're measuring rather than going quiet:
  `for d in .next .next-* node_modules .git .turbo dist build out target coverage; do ( [ -e "$d" ] && du -sm "$d" ) & done; wait`
- Note the total and which folders dominate.

## 2. Candidates (regenerable only)

| Kind | Paths |
|---|---|
| JS build caches | `.next/`, `.next-*/` (agent/verify builds), `.turbo/`, `.vercel/output/`, `node_modules/.cache/`, `.parcel-cache/`, `.svelte-kit/`, `.nuxt/`, `.output/`, `.eslintcache`, `*.tsbuildinfo` |
| Test output | `coverage/`, `playwright-report/`, `test-results/`, `.nyc_output/` |
| Python | `__pycache__/`, `.pytest_cache/`, `.mypy_cache/`, `.ruff_cache/` |
| Build output | `dist/`, `build/`, `out/` — **only** when gitignored and clearly a build artefact for this project |
| Ask first (slow to rebuild) | Rust `target/`, `.gradle/`, `node_modules/` (only suggest a reinstall if it is abnormally large, e.g. > 3 GB) |
| Git | stale worktrees: `git worktree list`, then `git worktree prune`; leftover `.claude/worktrees/*` with no live worktree. Offer `git gc` only if the pack is > 1 GB. |

## 3. Safety gates — every deletion must pass all of them

1. The path is inside the repo root and is not `.git`, any `.env*`, or source.
2. `git ls-files <path> | wc -l` is **0** — nothing tracked lives inside it.
3. `git check-ignore -v <path>` confirms it is ignored (show the rule).
4. Nothing is using it: no dev server or build running. Check processes and ports
   (Windows: `Get-CimInstance Win32_Process -Filter "Name='node.exe'"` and `Get-NetTCPConnection -State Listen`;
   POSIX: `ps`/`lsof`). Use a project's own status script if it has one (e.g. `npm run dev:agent:status`).
   Editor helpers such as MCP servers are not dev servers — never kill them.
5. `git status --short` before and after must be identical — the clean must never change the working tree.

If a dev server **is** running and holds a cache: do not delete that cache. Stop only servers you (the agent)
started; for the user's own server, ask them to stop it.

Never: delete anything tracked or not ignored, touch uncommitted work, delete global caches outside the repo
(npm/pnpm store, pip cache) unless asked, or run destructive git commands (`reset --hard`, `clean -fdx`).

## 4. Delete

- Use explicit paths (`rm -rf ./.next-agent`), never globs that could widen (`rm -rf .*`).
- Prefer the project's own clean script only if it actually works — verify it removed the folder. (Next.js 16
  dropped `next clean`; `npm run clean` scripts that call it silently do nothing — delete `.next` directly and
  tell the user the script is broken.)

## 5. Report and record

- Before/after sizes, what was deleted, what was skipped and why, anything the user must do (stop a server,
  fix a broken clean script). Mention that the first dev start after clearing a cache is slower.
- Record the run so the 15-day reminder resets:
  `node ".agents/skills/optimize-repo/scripts/record-run.mjs" "<repo root>"`
  (state is kept in `docs/project/repo-maintenance.json`).

## Optional: SessionStart reminder
To get the 15-day reminder, register `node ".agents/skills/optimize-repo/scripts/check-due.mjs"` as a
SessionStart command hook in your Claude Code settings (a later `hooks/` in this plugin may provide it). It reads
the hook JSON on stdin and prints a one-line reminder only when due.

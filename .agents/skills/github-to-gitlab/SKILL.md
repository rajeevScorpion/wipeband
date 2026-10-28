---
name: github-to-gitlab
description: Move the current repository's code from GitHub to GitLab safely — audit, secrets/size scan, local backups, push to a new private GitLab project with explicit refspecs, verify by hash, make GitLab the default remote, protect branches, and record the move. Use when the user says "move to GitLab", "switch from GitHub to GitLab", "migrate this repo to GitLab", or names a repo to move off GitHub. Covers code only; hosting (Vercel etc.) is a separate, optional stage at the end. Works in any project.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# GitHub → GitLab

Background: this procedure was written after a GitHub account was suspended (pushes fail with `403 Your account is
suspended`). In that situation **the local disk may be the only copy of unpushed work**, so nothing here may risk
local history. Record each move in a `GITLAB_MIGRATION.md` (step 7) so the next repo can follow the same path.

Fixed facts:
- GitLab namespace: `<your-namespace>` (ask the user once; personal or group), projects **private**, lowercase repo name.
- Git signs in to GitLab through Git Credential Manager (browser OAuth on the first push). No tokens in URLs.
- Commit author: ask the user which name/email to use (`<name> <your-email>`); no Co-Authored-By trailer by default
  (a project may override this in `WORKING_CONTRACT.md`).
- Backups go outside the repo, e.g. `<backup-dir>/git/<repo>-<YYYY-MM-DD>/` (ask the user for the location).

Rules: brief the user in bullets before any step that writes anything remote. Never `--force`, never
`--mirror` push, never rewrite history without an explicit yes. The user does the GitLab web UI steps and the
browser sign-in; give exact clicks and wait.

## 0. Audit (read-only)

- Repo shape: one repo or several (e.g. a native app and a Next.js admin in separate folders, each with its
  own `.git`)? Run the whole procedure per git repo.
- `git status`, `git stash list`, `git branch -a -vv`, `git tag -n1`, `git remote -v`, `git fsck`, `.git` size.
- Commits ahead of the GitHub remote for each branch: `git log --oneline origin/<b>..<b>`.
- Uncommitted work: report it and ask whether to commit it before the move (it's not in any backup otherwise).
- Branches already merged into `main`/`dev`: list them; the default is to keep them local only.
- Report a short table: branches (ahead count, merged?), tags, stashes, uncommitted files.

## 1. Secrets and size scan (before anything leaves the disk)

- Tracked files AND history: `.env*` (except `.env.example`), keystores (`*.jks`, `*.keystore`, `*.p12`,
  `*.p8`, `*.mobileprovision`), `google-services.json`, `GoogleService-Info.plist`, service-account JSON,
  `credentials.json`, EAS/Expo credentials, private keys (`BEGIN .*PRIVATE KEY`), obvious API keys.
  Use `git log --all --name-only --format= | sort -u` for names and `git grep` / `git log -p -G` for contents.
- Blobs over 50 MB: `git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '$1=="blob" && $3>50000000'`. Check for Git LFS (`.gitattributes`, `git lfs ls-files`); LFS objects need `git lfs push`.
- If anything sensitive is tracked: stop and report. The project is private, but say whether the secret should
  be rotated; history rewriting only with the user's yes, and after the backup.

## 2. Local backups (no remote changes)

```bash
B="/d/Backups/git/<repo>-$(date +%F)"; mkdir -p "$B"
git bundle create "$B/<repo>.bundle" --branches --tags && git bundle verify "$B/<repo>.bundle"
git clone --mirror "$(git rev-parse --show-toplevel)" "$B/<repo>-mirror.git"
git for-each-ref --format='%(objectname) %(refname)' refs/heads refs/tags > "$B/<repo>-refs.txt"
```
Stashes and uncommitted files are not in a bundle — mention that if any exist.

## 3. Create the GitLab project (user, by hand)

Give the exact steps: gitlab.com → New project → Create blank project → name `<repo>` (lowercase), namespace
`<your-namespace>`, visibility **Private**, **untick** "Initialize repository with a README". Wait for confirmation.

## 4. Push (explicit refspecs only)

```bash
git remote add gitlab https://gitlab.com/<your-namespace>/<repo>.git
git push gitlab refs/heads/main:refs/heads/main   # first, so GitLab makes it the default branch
git push gitlab refs/heads/dev:refs/heads/dev     # and any other live branch the user approved
git push gitlab --tags                             # or tag by tag if some are throwaway
```
If the default branch is `master`, push it first instead. The first push opens the browser sign-in; the user
completes it. Feature branches merged into main/dev: only if the user says so.

## 5. Verify by hash

```bash
for ref in $(git for-each-ref --format='%(refname)' refs/heads refs/tags); do
  l=$(git rev-parse "$ref"); g=$(git ls-remote gitlab "$ref" | cut -f1)
  [ -z "$g" ] && echo "NOT PUSHED $ref" && continue
  [ "$l" = "$g" ] && echo "OK       $ref" || echo "MISMATCH $ref local=$l gitlab=$g"
done
git clone --bare https://gitlab.com/<your-namespace>/<repo>.git "$B/verify.git"
git -C "$B/verify.git" rev-list --branches --tags --count   # compare with the same count for the pushed refs locally
git -C "$B/verify.git" fsck
```
"NOT PUSHED" is fine only for refs the user chose to keep local. Report the table.

## 6. Make GitLab the default remote

```bash
git remote rename origin github      # keep GitHub as a read-only reference
git remote rename gitlab origin
git fetch origin
git branch -u origin/main main       # and each other pushed branch
```

## 7. GitLab settings (user, by hand)

Settings → Repository → Protected branches: `main` is protected by default; add `dev` (and any long-lived
branch). Allowed to merge/push: Maintainers. **Allowed to force push: off.** Nudge once about 2FA
(`https://gitlab.com/-/profile/two_factor_auth`) if it's still off.

## 8. Record

- Update README / CLAUDE.md / onboarding docs that mention the GitHub URL or `gh` commands (GitLab's CLI is `glab`).
- Add `GITLAB_MIGRATION.md`: date, GitLab URL, refs and hashes pushed, refs kept local, backup path, rollback
  (`git remote remove origin` + rename `github` back, or restore from the bundle).
- Commit with the user's chosen author, no trailer. It can wait for the next push.
- If this project has Claude memory, record the move there.

## Optional later stage: hosting

Only if the repo is deployed and the user asks. Stage A/B: prove an
isolated test project deploys from GitLab first, then reconnect; check env vars, domains and cron survive;
private repos on Vercel Hobby need the commit author to match the account owner.

## Rollback

Pushing only adds data on GitLab and a remote locally. `git remote remove gitlab` (or, after step 6, rename the
remotes back) undoes the local side; delete the GitLab project to undo the remote side. Full restore: `git clone <bundle>`.

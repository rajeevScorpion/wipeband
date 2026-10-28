# Supabase

## Local stack
- Start from the app folder that holds `supabase/`: `supabase start` (Docker required). Stop: `supabase stop`.
- **Remap ports** in `supabase/config.toml` if another Supabase project lives on the machine (default 54xxx collides). Example (WowTodo): API 55321, DB 55322, Studio 55323, mail inbox 55324, pooler 55329, shadow DB 55320, analytics 55327.
- Config changes (new auth provider, new function entry) need `supabase stop && supabase start`; `start` alone does not re-read them. A stale function bundle looks like "my change had no effect": add a new field to the response to prove the code is live.
- After a stop, the first `start` sometimes fails with a container name conflict (vector); run it again.
- Local anon/service keys are fixed demo values printed by `supabase status`; they are the same for every local stack. Local `EXPO_PUBLIC_SUPABASE_URL`: `http://127.0.0.1:<api-port>` with `adb reverse tcp:<port> tcp:<port>` on emulator and phone (Google OAuth rejects private IPs like 10.0.2.2).
- Disable services you do not use (e.g. `[storage] enabled = false`) if a container fails against the pinned CLI.
- Reclaiming Docker disk: prune old images (`docker image prune -a --filter "until=504h"`), `fstrim` in the WSL distro, then compact the VHDX; compact without fstrim does nothing.

## Demo users
Seed a few local-only accounts (e.g. `meera.demo@example.com`, `riya.demo@example.com`) with one shared dev password stored in the testing doc. Tests sign in as them; never as a real person. If the real sign-in is Google-only, add a script that fetches a session with the demo password (`/auth/v1/token?grant_type=password`) and writes it into the app's storage on a debug build (see `device-qa`).

## Migrations
- Files in `supabase/migrations/`, named `YYYYMMDDHHMMSS_short_name.sql`, ordered by timestamp. **Stamp with the real clock** (`date +%Y%m%d%H%M%S`). A migration already applied to cloud can never be renamed; never edit an applied migration, add a new one.
- Header comment: purpose + `Created:` real date.
- Replay locally: `supabase db reset` (script it, e.g. `npm run db:reset:local`). Regenerate DB types after every migration (`gen:types`) so the client is typed.
- Compare local with cloud: a `db:diff:cloud` script, or `supabase migration list --linked`.
- Push: `supabase db push --yes --workdir <app folder>` as a bare command. Review the migration list first. Standing approval from the owner may cover it; otherwise ask.
- One-off SQL on the cloud project: newer CLI versions have `supabase db query --linked "<sql>"` (pin the version, e.g. `npx -y supabase@<version> db query --linked ...`). Do not use an MCP that may point elsewhere.

## Edge functions
- Folder per function under `supabase/functions/<name>/`, shared code in `_shared/`. Serve locally with `supabase functions serve --env-file supabase/functions/.env` (gitignored). Deploy: `supabase functions deploy <name>`.
- **verify_jwt**: set per function in `config.toml`. Default `true` for anything a signed-in user calls (AI proxy, delete-account). Use `verify_jwt = false` ONLY when the caller has no user JWT, and then the function must authenticate another way:
  - public website forms (waitlist, demo): origin allow-list + Turnstile + quotas;
  - database/pg_net or pg_cron callers: shared secret header (`x-cron-secret`) compared in code;
  - functions that validate the user token themselves against `/auth/v1/user` (mixed user + cron endpoints).
  When you deploy, the config's `verify_jwt` applies; passing `--no-verify-jwt` on the command line is the equivalent for a one-off. Write the reason in a comment above each `false`.
- Secrets: `supabase secrets set NAME=value` (the owner runs it, value never in chat), `supabase secrets list` shows digests only. Local secrets: `supabase/functions/.env`. Keep a names-only table in the env docs.
- Defaults should fail safe: a missing rollout flag means "off".

## Cron with Vault secrets
Scheduled functions use `pg_cron` + `pg_net` + Vault:
1. Store the function URL and a random `cron_secret` in Vault (`vault.create_secret(...)`) on each project (local and cloud separately). Writing Vault secrets needs the owner's explicit go.
2. The same secret is set as a function secret (`CRON_SECRET`).
3. The migration schedules `cron.schedule('name', '<cron expr>', $$ select net.http_post(url := (select decrypted_secret from vault.decrypted_secrets where name='...'), headers := jsonb_build_object('x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name='cron_secret'))) $$)`. Make the migration skip scheduling with a NOTICE if the Vault secret is missing.
4. Verify with a manual call (expect 200) and `select * from cron.job_run_details`.

## Row-level security
- RLS on for every table in `public`; policies per role. Anon key is public by design, RLS is the real control.
- Keep `verify:rls`-style scripts that sign in as two demo users and assert they cannot read each other's rows; run them after every migration touching policies.
- SECURITY DEFINER functions: set `search_path`, check `auth.uid()` inside, grant execute narrowly.
- Account deletion must cascade or null out personal data (store requirement); test it with a script.

## CLI and project pinning
- `supabase` as an EXACT devDependency (not a range); call `./node_modules/.bin/supabase` or npm scripts. A bare `npx supabase` may fetch a newer CLI whose container image tags no longer resolve, breaking the local stack (this happened after clearing the npm cache).
- Add `supabase/.temp/` to `.gitignore` at the repo root: it contains the pooler URL with the DB password.
- Confirm the link: `supabase projects list` and the linked ref file. An MCP server loaded in a session may be connected to a different project; run its project-URL tool before any write and prefer the CLI for releases.

## Auth URL configuration
Cloud dashboard: Authentication -> URL Configuration -> add the app's deep link (`<scheme>://**`) to Redirect URLs; without it, Google sign-in in the store build fails. Site URL = the production website.

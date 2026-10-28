---
name: env-setup
description: Wizard that turns the chosen services (Supabase, Cloudflare R2/Turnstile, Resend, Zoho, Google sign-in, EAS, OpenAI/Gemini, Vercel) into a complete list of required environment variables, explains where each value comes from (console click paths), creates or refreshes `.env.example`, and has the user paste secrets into `.env` themselves. Use when the user says "set up env", "environment variables", ".env", "where do I get the key for X", "create .env.example", "switch to local/cloud backend", or after adding a service.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Env setup

Never echo a secret value in chat. The user pastes values into the files themselves; you only handle NAMES, purposes and where to find each value.

## Steps
1. **Pick services.** Ask which of these the project uses (default = all in the stack): backend (Supabase), AI provider(s), media storage (R2), email (Resend/Zoho), bot check (Turnstile), Google sign-in, EAS, site (Vercel).
2. **Build the list** from the table below, only for the chosen services. Detect what the repo already reads: grep `process.env.`, `import.meta.env.` and `Deno.env.get(` so the list matches the code, and flag dead names (e.g. a billable key still under `EXPO_PUBLIC_`).
3. **Create/refresh the three files** (names and comments only, empty values):
   - `app/.env.example` - client (public) values, plus the local-stack block.
   - `app/supabase/functions/.env.example` - function secrets for local serving.
   - `web/.env.example` - `VITE_*` public values.
   Each variable gets a one-line comment: purpose, public or secret, where to get it. Mark billable ones.
4. **Check `.gitignore`** contains `.env`, `.env.*` with `!.env.example`, `supabase/.temp/`, `android/`, `ios/`, `dist`, `*.keystore`, `*.jks`, `google-services.json` if it holds secrets. Run `git ls-files | grep -i "\.env"` to confirm no filled env file is tracked; if one is, stop and tell the user (history rewrite and key rotation are their call).
5. **Hand over the click paths** for each missing value (section below), one service at a time. Give numbered steps; say which you could not verify against current docs.
6. **User fills `.env`.** Say: "Open `<path>`, paste the value after `NAME=`, save, tell me when done." After they confirm, verify without printing: check the name exists and is non-empty (`grep -c '^NAME=.\+' file`), never `cat` the file.
7. **Cloud secrets** (`supabase secrets set NAME=...`): the user runs the command themselves; you may prepare it with a placeholder. Verify with `supabase secrets list` (digests only).
8. **Naming hygiene.** One name per value: after a backend or OAuth-client move, fold temporary names (`NEW_SUPABASE_*`, `NEW_GOOGLE_*`) into the standard ones and delete exact duplicates (compare values in a script, never print them). Credentials kept only for reference (DB password, account access token) must NOT use `SUPABASE_ACCESS_TOKEN` / `SUPABASE_DB_PASSWORD` in `app/.env`: the Supabase CLI loads that file for `env()` and would use them over its own login. Better: a password manager.
9. **Record names** (not values) in `docs/engineering/ENVIRONMENT_VARIABLES.md`: table of Name / Purpose / Public? / Where set.

## Variables by service
| Service | Names | Public? | Where set |
|---|---|---|---|
| Supabase client | `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` | yes (RLS is the control) | `app/.env`, EAS profile env |
| Supabase CLI/functions | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | secret (service role) | injected by the platform in functions; never in app |
| Google sign-in | `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`; local stack: `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID`, `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET` | id public, secret not | `app/.env`; Supabase dashboard (cloud) |
| AI | `OPENAI_API_KEY`, `GEMINI_API_KEY`, model selectors, `AGENT_ROLLOUT`, `AGENT_OWNER_IDS` | secret | `functions/.env`, `supabase secrets set` |
| R2 | `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET` | secret | same |
| Email | `RESEND_API_KEY`, `WAITLIST_FROM`, `WAITLIST_REPLY_TO`, `CONTACT_TO`, `SITE_URL`, `WAITLIST_EMAIL_DAILY_LIMIT` | key secret | same |
| Bot check | `TURNSTILE_SECRET_KEY`; site: `VITE_TURNSTILE_SITE_KEY` | secret / public | same / `web/.env` |
| Cron/push | `CRON_SECRET`, `PUSH_SECRET` (+ Vault entries) | secret | function secret + Vault |
| Site | `VITE_DEMO_URL`, `VITE_WAITLIST_URL` | public | `web/.env`, Vercel env |
| EAS | `EXPO_TOKEN` (CI only) | secret | CI secret store |

## Where each value comes from (click paths; verify against current docs)
- **Supabase URL + anon key (cloud):** supabase.com/dashboard -> your project -> **Project Settings -> API** (or **Connect**) -> Project URL, anon/publishable key. Service role key is on the same page: never in the app.
- **Supabase local:** run `supabase status` in the app folder; it prints the local URL and anon key.
- **Google client ids:** Google Cloud console -> **APIs & Services -> Credentials** -> Web client (see stack-guide google-signin.md).
- **OpenAI:** platform.openai.com -> **API keys -> Create new secret key** (set a spending limit under Billing -> Limits). **Gemini:** aistudio.google.com -> **Get API key**; attach billing before relying on it.
- **R2:** Cloudflare dashboard -> **R2 Object Storage -> Manage R2 API Tokens -> Create API token** (Object Read & Write, scoped to the bucket); Account ID on the R2 overview page.
- **Resend:** resend.com -> **API Keys -> Create API Key** (Sending access, domain-restricted).
- **Turnstile:** Cloudflare dashboard -> **Turnstile** -> your widget -> Site key / Secret key.
- **Expo token:** expo.dev -> Account settings -> **Access tokens** (CI only).
If the user cannot find a page, tell them to use the console's top search box with the page name.

## Local-vs-cloud block swap
Keep both backends in `app/.env` as two labelled blocks; exactly one is active (the other lines commented out):
```
# --- CLOUD (default) ---
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
# --- LOCAL (QA only; adb reverse the ports) ---
# EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:<api-port>
# EXPO_PUBLIC_SUPABASE_ANON_KEY=<local demo anon key from supabase status>
```
Swap protocol for QA: (1) copy `.env` to a backup outside git, (2) swap the blocks, (3) start the bundler, test, (4) restore the backup and prove it is byte-exact with `cmp .env <backup>`, (5) delete the backup only after `cmp` passes. `EXPO_PUBLIC_*` values are inlined at bundle time: restart the bundler after any swap. Alternatively export the two variables in the shell that starts the bundler and leave `.env` untouched. The CLOUD block stays the default for a reason: `eas update` bundles from the local `.env`, not from the `eas.json` build profile, so an OTA shipped while LOCAL is active points every user's app at `127.0.0.1`.

## Done when
`.env.example` files match the code's reads, `.gitignore` is correct, every required name is filled (verified by presence, not value), `ENVIRONMENT_VARIABLES.md` lists names and purposes, and no secret appeared in chat.

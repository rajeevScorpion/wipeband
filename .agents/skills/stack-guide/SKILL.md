---
name: stack-guide
description: How the services in an Expo app + marketing site stack fit together - Supabase (database, auth, edge functions), Cloudflare R2 and DNS, Vercel, Resend + Zoho email, Google sign-in, EAS builds/OTA, and AI providers behind an edge-function proxy. Use when wiring, debugging or deploying any of these, or when the user asks "how do I set up Supabase / R2 / Vercel / email / Google sign-in / EAS / OpenAI", "which service does what", "why does X fail only in the cloud/locally".
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Stack guide

One map of the stack, then a reference per service. Read only the reference you need.

## The map
```
Expo app (React Native) ──HTTPS──> Supabase (Postgres + Auth + Edge Functions)
   │  EAS Build -> store binary          │  functions hold ALL third-party secrets
   │  EAS Update -> OTA JS bundles       ├──> AI providers (server-side keys only)
   │                                     ├──> Cloudflare R2 (media; signed links)
   │                                     └──> Resend (transactional email)
Website (Vite/React) ── Vercel (auto-deploy from main) ── waitlist/contact -> Supabase function
DNS: Cloudflare (A/CNAME for site, MX/TXT for Zoho + Resend)
Inboxes: Zoho Mail (contact@, privacy@, support@)   Sign-in: Google -> Supabase Auth
```

## Principles (apply everywhere)
1. **Secrets live server-side.** The app and site bundles are public. Only the backend URL, anon key and public client ids go in `EXPO_PUBLIC_*` / `VITE_*`. Everything billable is an edge-function secret.
2. **Local and cloud are separate backends.** Enabling something in the cloud dashboard does nothing locally and vice versa (auth providers, secrets, cron, Vault). Every feature is verified on local first with demo accounts, then pushed.
3. **Pin tool versions** (backend CLI exact in devDependencies; do not rely on bare `npx`).
4. **Anonymous endpoints need three guards:** origin allow-list, bot check (Turnstile) and server-side quotas.
5. **Ask before pushing or deploying** and follow the `playbook` rules. Env var names only in docs, never values.
6. **Check which project a tool points at** before any write (MCP, CLI link, dashboard org).

## Which reference
| Task | File |
|---|---|
| Database, auth, migrations, functions, cron, RLS, local stack | `references/supabase.md` |
| Media storage bucket, signed links, retention | `references/cloudflare-r2.md` |
| Domain records, Turnstile, proxy settings | `references/cloudflare-dns.md` |
| Site hosting, deploy-from-main, rewrites, headers | `references/vercel.md` |
| noreply@ sending and real inboxes | `references/email.md` |
| Google sign-in (device + local + cloud) | `references/google-signin.md` |
| Store builds, OTA, quota, runtime versions | `references/eas.md` |
| LLM calls, Whisper, model switching, rollout flags | `references/ai-providers.md` |

For env vars and `.env` handling use the `env-setup` skill. For releases use `release-ritual`.

## Order of setup for a new project
1. Backend project (local stack first, then cloud) -> 2. Auth (Google) -> 3. Domain + DNS -> 4. Site host -> 5. Email -> 6. Edge functions + secrets -> 7. Storage (if media) -> 8. EAS project + first build -> 9. Store console.
Each step: do the local variant, verify, then cloud, then record names (not values) in the env docs.

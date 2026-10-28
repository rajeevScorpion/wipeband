# Cloudflare R2 (media storage)

Use when the app stores user media (voice notes, photos). Keys never touch the app; an edge function hands out short-lived signed links after a membership check.

## Setup
1. Cloudflare dashboard -> **R2 Object Storage** -> **Create bucket**. Make one bucket per environment: `<app>-media` (cloud) and `<app>-media-dev` (local). Keep buckets private.
2. R2 -> **Manage R2 API Tokens** -> **Create API token** -> permission **Object Read & Write**, scoped to those buckets. Copy Access Key ID and Secret once.
3. Note the **Account ID** (R2 overview page, right sidebar).
4. Set function secrets (names only here): `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`. Local: `supabase/functions/.env` with the dev bucket. Cloud: `supabase secrets set ...` run by the owner.
5. R2 is S3-compatible: endpoint `https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com`, region `auto`. Sign requests with SigV4 (a small S3 client in the function).
6. If the media account differs from the DNS account that is fine; R2 needs no domain for signed links.

## Pattern
- Table `<media>` (id, owner, parent id, kind check, size, `last_viewed_at`). Widen the `kind` check when adding image support (it started as voice only).
- Edge function (`verify_jwt = false`, validates the token against `/auth/v1/user` itself): actions `upload-url` (PUT, checks the caller is a member of the chat/task, enforces size/kind), `play-url` (GET; stamps `last_viewed_at`), and a daily `cleanup` that proves itself with `x-cron-secret`.
- Client uploads directly to the signed PUT link; shows an upload ring and Retry.

## Retention
Example rule (WowTodo): remove from the server when nobody has viewed it for 30 days; phones that already played it keep their copy, others see "No longer available". Schedule the cleanup with pg_cron + Vault (see supabase.md). Paid tiers can keep longer later.

## Checks
- CORS is not needed for native app uploads; needed for browser uploads (set on the bucket).
- Privacy policy and store data-safety answers must cover audio and photos shared with other users.
- iOS: record in AAC .m4a (native on both platforms); cross-play on a real iPhone before any iOS release.

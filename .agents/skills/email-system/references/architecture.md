# Email system: architecture and code patterns

Supabase (Postgres + Deno edge functions) + Resend. Names below are the defaults; keep them unless the project
already has equivalents.

## Tables (one migration, RLS on, no client policies; service role only)
| Table | Key columns | Notes |
|---|---|---|
| `email_templates` | `id`, `key` unique (`[a-z][a-z0-9_]{1,39}`), `name`, `kind` (`service`\|`update`) | One row per email the system can send |
| `email_template_versions` | `template_id`, `version`, `subject` ≤200, `body` ≤10000, `button_label?`, `button_url?`, `status` (`draft`\|`published`\|`archived`), `created_by`, `published_at` | `unique(template_id, version)`; partial unique index `where status='published'` = one live version |
| `email_log` | `to_email`, `signup_id?`, `user_id?` (cascade), `kind`, `subject`, `body`, `template_key`, `template_version`, `category`, `status` (`sent`\|`delivered`\|`delayed`\|`bounced`\|`complained`\|`failed`\|`suppressed`), `status_at`, `provider_id` (indexed), `message_id` | `body` = filled text without layout, so the panel can show what was sent |
| `email_inbound` | `provider_id` unique, `message_id`, `from_email`, `from_name`, `to_email`, `subject`, `text` ≤50000, `signup_id?`, `user_id?` (cascade), `status` (`new`\|`read`\|`done`), `forwarded_at` | One row per reply received |
| `email_suppressions` | `email` pk (lower-case), `reason` (`bounced`\|`complained`\|`unsubscribed`\|`manual`), `source` | Kept after account deletion (it only stops mail) — say so in the privacy policy |
| `user_profiles` | `+ email_updates boolean default false`, `email_updates_at` | The app writes its own row (existing own-row update policy) |

Seed v1 (published) of each email the code sends today: confirmation, tester invite/reminder/you're-in/survey,
`reply` (body `{{message}}`), `blank` (one-off, `{{message}}`). Keep the code copy as the fallback when no version is
published. Extend the RLS check script (both directions) and the account-deletion check for the new tables.

## Shared sender `functions/_shared/email.ts`
```
sendEmail(deps, { to, templateKey, vars, category?, signup_id?, user_id?, quote?, kind?, footer?,
                  subject?, body?, from?, replyTo?, headers?, tpl? }) -> 'sent'|'suppressed'|'no_consent'|'daily_limit_hit'
```
1. Template: published version (or `tpl` override for a test send, or code copy).
2. Render: fill `{{name}}`, `{{first_name}}`, `{{link}}`, ... (HTML-escape every value; subject on one line).
   Publishing rejects unknown placeholders.
3. Layout (fixed, table-based, inline styles, light colour scheme): round logo + name linked to the site, white
   rounded card on a rounded tinted panel on white, optional eyebrow, paragraphs, optional button with "Button not
   working? Open this link", optional quote box ("You wrote"), footer = reply line + support address + tagline;
   update emails add the unsubscribe line. A hidden preheader = first ~110 chars of the body. Plain-text part too.
4. Suppressed address → log `suppressed`, no send. `unsubscribed` blocks only `update`; bounced/complained block all.
5. `update` needs consent: waitlist opt-in, or account `email_updates = true`.
6. `update` → token = `b64url(email) + "." + b64url(HMAC-SHA256(EMAIL_UNSUB_SECRET, "unsub:" + email))`;
   footer link `<site>/email/unsubscribe?t=<token>`; headers `List-Unsubscribe: <<functions>/email-events/unsubscribe?t=<token>>`
   and `List-Unsubscribe-Post: List-Unsubscribe=One-Click`.
7. Daily cap: count today's `email_log` rows (not suppressed) ≥ `EMAIL_DAILY_LIMIT` → `daily_limit_hit`.
8. Resend `POST /emails` with `from` (`EMAIL_FROM`), `reply_to` (`EMAIL_REPLY_TO`, fallback the old inbox),
   `headers`, `tags: [{name:'kind', value}]` → log with provider id, template key/version, category, body.

Env: `RESEND_API_KEY` (Full access — see gotchas), `EMAIL_FROM`, `EMAIL_REPLY_TO`, `EMAIL_INBOX` (forward target),
`EMAIL_DAILY_LIMIT`, `EMAIL_UNSUB_SECRET` (never rotate: old links break), `RESEND_WEBHOOK_SECRET`, `SITE_URL`.

## `email-events` function (verify_jwt off)
- **Route** from the last path segment (`/webhook`, `/unsubscribe`).
- **Svix verification on the RAW body** (`await req.text()` before any JSON parse): headers `svix-id`,
  `svix-timestamp`, `svix-signature` (also accept `webhook-*`); key = base64-decode(secret without `whsec_`, trimmed);
  HMAC-SHA256 of `${id}.${timestamp}.${body}`, base64; any space-separated `v1,<sig>` may match; constant-time compare;
  reject |now − timestamp| > 5 min. Test with Svix's published vector (secret `whsec_plJ3nmyCDGBKInavdOK15jsl`,
  id `msg_loFOjxBNrRLzqYUf`, ts `1731705121`, expected `v1,rAvfW3dJ/X/qxhsaXPOyyCGmRKsaKWcsNccKXlIktD0=`), time check off.
- On failure return `401 {code:'bad_signature', why:'missing_headers'|'stale_timestamp'|'mismatch'}`; on a thrown
  error `500 {code:'server_error', why:'<step> <status>'}` (status only, never bodies or addresses).
- **Delivery events** (`email.delivered|delivery_delayed|bounced|complained|failed|suppressed`): update `email_log`
  by `provider_id` (a late `delivered` must not overwrite `bounced`/`complained`); permanent bounce and complaint →
  suppression; complaint also turns consent off. Idempotent.
- **`email.received`**: the webhook has metadata only (no body). `GET https://api.resend.com/emails/receiving/{email_id}`
  for `text`/`html`/headers (throw → 500 → Resend retries; nothing stored yet) → match person (signup email or
  store-account email, then auth user by email via a service-role-only RPC) → insert into `email_inbound`
  (`on conflict (provider_id) do nothing`; skip forwarding if it already existed) → forward to `EMAIL_INBOX` via Resend
  with `reply_to` = the sender and subject `Reply from <sender>: <subject>`.
- **Unsubscribe**: always 200 (mail apps need it) with `{ok:true, valid:boolean}`; valid token → suppression
  `unsubscribed` + consent/`email_updates` off. CORS only for the site origins (JSON call from the web page). The web
  page does nothing on load (mail scanners prefetch links) — the person taps a button.

## Admin function actions (audit every write)
`templates_list`, `template_get` (versions + placeholder list), `template_create` (new key → draft v1),
`template_save_draft`, `template_publish` (archives the old one; rejects unknown placeholders), `template_restore`
(old version → new draft), `template_preview` (unsaved fields + sample vars → html), `template_test` (to the signed-in
admin, subject prefixed `[Test]`), `inbox_list` (+ counts), `inbox_get` (message + our emails with `body` + their
replies), `inbox_set`, `inbox_reply` (`reply` template; quote = **only the new part** of their text; headers
`In-Reply-To`/`References` = their `message_id`), `send_email` (template + audience, dry run returns counts, result
`{sent, skipped_no_consent, suppressed, daily_limit_hit}`), `person` (+ emails, inbound).

## Admin screens
- **Inbox**: list rows become cards under 640 px (name, person chip, time; then subject · preview on its own line).
  Thread: our emails and their replies oldest first; each reply shows only its new text with the quoted history
  behind a native `<details>` "Earlier message". Reply box stays after sending; the thread refreshes.
- **Templates**: editor actions in a sticky bar so Save/Test/Publish stay above the keyboard; heading = template name.
- Viewport meta `interactive-widget=resizes-content`; input/textarea text colour = foreground (not inherited muted).

## Splitting quoted history (same rule on server and in the panel)
```ts
const t = text.replace(/\r\n/g, '\n');
const marks = [/\n[^\n]*\bOn [^\n]*(?:\n[^\n]*)?wrote:\s*\n/, /\n-{2,}\s*Original Message\s*-{2,}/i, /\n(?:>[^\n]*\n?)+\s*$/];
const at = Math.min(...marks.map((m) => t.search(m)).filter((i) => i >= 0));
return Number.isFinite(at) && at > 0 ? [t.slice(0, at).trim(), t.slice(at).trim()] : [t.trim(), ''];
```
Check it on: a Gmail reply, "wrote:" wrapped onto the next line, Outlook "Original Message", only `>` lines, plain text.

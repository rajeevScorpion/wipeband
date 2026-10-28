# Go-live click paths (checked against Resend and Zoho docs, 2026-10-22)

Order: alias → receiving subdomain → webhook → secrets → migration + deploys → merge → OTA. Until secrets are set,
the sender falls back to the old From/Reply-To, so nothing breaks mid-way.

## 1. Human inbox alias (Zoho example)
Zoho **Mail Admin Console** (mailadmin.zoho.com) → **Users** → the main user → **Mailbox Settings → Email Alias** →
**Add** → `hello` @ domain, leave "Set as Mailbox Address" unticked → Add.
Not "accounts.zoho.com → My Email Addresses" — that page only adds sign-in addresses. If Zoho says "This operation
has been restricted", email support-as@zohocorp.com with the address.

## 2. Resend receiving subdomain
1. resend.com → **Domains** → **Add domain** → `reply.<domain>`, same region as the sending domain. Leave Tracking
   Subdomain empty and open/click tracking off.
2. Resend may offer one-click Cloudflare authorization for its sending records (DKIM TXT `resend._domainkey.reply`,
   CNAMEs `send.reply`, `rsend.reply`) — safe: all under the subdomain, one-time.
3. On the domain page turn **Enable Receiving** on → it lists an **MX** for `reply` (e.g. `receive-<region>.forge.rmta.net`,
   priority 10). Add it in Cloudflare by hand: DNS → Records → Add → MX, name `reply`, mail server + priority as shown.
   Never touch the root `@` MX records.
4. Wait until all records read **Verified**.
Free plan: 3 domains, 100 emails/day (received mail counts), 1 webhook endpoint.

## 3. Webhook
resend.com → **Webhooks** → **Add webhook** → URL `https://<project>.supabase.co/functions/v1/email-events/webhook`,
events `email.received`, `email.delivered`, `email.delivery_delayed`, `email.bounced`, `email.complained`,
`email.failed`, `email.suppressed` → save → the webhook page shows the **Signing secret** (`whsec_…`) with a copy icon.

## 4. API key
resend.com → **API Keys** → **Create** → permission **Full access** (a sending-only key gets 401 from the receiving
API) → copy once. Delete the old sending-only key after the live test passes.

## 5. Secrets — Supabase dashboard, not the shell
Supabase Dashboard → project → **Edge Functions → Secrets**: `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET` (paste from the
copy icon), `EMAIL_FROM` (`Name <hello@domain>`), `EMAIL_REPLY_TO` (`Name <hello@reply.domain>`), `EMAIL_INBOX`,
`EMAIL_DAILY_LIMIT` (below the plan's daily limit), `EMAIL_UNSUB_SECRET` (32 random bytes, base64url; never change).
Verify by name with `supabase secrets list` (digests only). To prove a value matches without showing it, compare
SHA-256 of the copied value with the listed digest.

## 6. Deploy
`supabase db push` (migration) → `supabase functions deploy email-events --no-verify-jwt`, then the functions that
send → merge to the production branch (admin site, unsubscribe page, privacy policy) → OTA/build for the app switch
(after the store data-safety form is updated if the release also collects new data).

## 7. Debugging the reply loop
Resend → Webhooks → the endpoint → each event shows status code, attempts and response body (our `why`).
Resend → Emails → **Receiving** shows whether the reply reached Resend at all. **Replay** resends an event with a
fresh signature; a 200 also forwards the reply. Resend retries failed events for hours.

# Cloudflare DNS (and Turnstile)

## Move a domain to Cloudflare
1. dash.cloudflare.com -> **Add a domain** -> enter `example.com` -> Free plan.
2. Cloudflare scans existing records. Delete leftovers you do not use (old registrar forwarding MX and SPF) after confirming with the owner.
3. At the registrar, replace nameservers with the two Cloudflare ones. Wait until the domain shows **Active**.

## Records for the stack (typical)
| Purpose | Type / Name | Value source | Proxy |
|---|---|---|---|
| Website apex | per Vercel (A `@` or CNAME) | Vercel -> Project -> Settings -> Domains shows the exact values | DNS only (grey cloud) unless you have reasons |
| `www` | CNAME | Vercel value | DNS only |
| Zoho inbox | MX `@` x3, TXT SPF, TXT verification, DKIM TXT (`zmail._domainkey`) | Zoho admin console shows each | n/a |
| Resend sending | CNAME `send`, CNAME `rsend`, TXT `resend._domainkey` | Resend -> Domains | DNS only |
| DMARC | TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:contact@example.com` | you | n/a |
| App links | none in DNS; host `/.well-known/assetlinks.json` from the site | | |

Rules:
- **One SPF record per name.** Zoho owns the root; Resend lives on the `send` subdomain so there is no clash.
- Never use Cloudflare Email Routing on a root domain that Zoho owns (root MX).
- Start DMARC at `p=none`, read reports for 2 to 3 weeks, then move to `quarantine`.
- Always take a screenshot or export of the zone before bulk deletes (DNS -> Records -> Export).

## Turnstile (bot check for anonymous forms)
1. Dashboard -> **Turnstile** -> **Add widget** -> name, hostnames (production + `localhost`), mode Managed.
2. Copy **Site key** (public, goes in the site config / `VITE_TURNSTILE_SITE_KEY`) and **Secret key** (function secret `TURNSTILE_SECRET_KEY`).
3. The site renders the widget; the edge function verifies the token at `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
4. Cloudflare publishes always-pass test keys for local development; use them locally only.

## Checks
`dig`/`nslookup` the records (or use mxtoolbox) after changes; propagation is usually minutes. Send a test mail in and out; in Zoho/Gmail use "Show original" to confirm SPF, DKIM and DMARC all PASS.

# Store specs and policy (re-check the console at upload time; stores change limits)

## Google Play

| Asset | Spec | Notes |
|---|---|---|
| App name | ≤ 30 chars | No "#1/best/top", no emoji, no keyword stuffing. Fallback: plain brand name |
| Short description | ≤ 80 chars | Shown under the name; one clear benefit + key differentiator |
| Full description | ≤ 4000 chars | Plain text; CAPS headings and `-` bullets render fine |
| App icon | 512×512, 32-bit PNG, ≤ 1 MB | Full-bleed square artwork; Play applies the mask. No pre-rounded corners or drop shadow |
| Feature graphic | 1024×500, JPG or 24-bit PNG (**no alpha**) | Required. Keep key content away from the outer ~10% (may be overlaid by a play button) |
| Phone screenshots | 2–8; JPG or 24-bit PNG (**no alpha**); each side 320–3840 px; long side ≤ 2× short side | Use 1080×1920 (9:16). ≥ 4 screenshots at ≥ 1080 px helps eligibility for promotion/recommendations. Raw 1080×2400 phone captures exceed 2:1, so they must be framed |
| Tablet screenshots (7", 10") | same rules | Optional; needed to be featured on tablets |
| Promo video | YouTube URL (public or unlisted, ads off) | Optional; 30–60 s |

**Metadata policy no-gos (text and graphics):** performance or ranking claims ("#1", "Best", "Top", "App of the Year" without the award), price or promotion info ("free", "50% off", "sale") in graphics, calls to action ("Download now", "Install now"), misleading or unrelated imagery, other brands' trademarks, excessive caps/emoji/symbols, user testimonials presented as unverified quotes.

**Where it goes (Play Console):**
- Grow users → Store presence → **Main store listing**: app name, short + full description, icon, feature graphic, phone/tablet screenshots, video.
- Grow users → Store presence → **Store settings**: category, tags, contact email, website.
- Policy and programs → **App content**: privacy policy URL, app access (reviewer sign-in instructions), ads, content rating, target audience, data safety, government/financial/health declarations.
- Custom store listings / translations: per-language text and graphics (Main store listing → Manage translations).

## Apple App Store

| Field | Limit |
|---|---|
| Name | ≤ 30 |
| Subtitle | ≤ 30 |
| Promotional text | ≤ 170 (editable without a new build) |
| Description | ≤ 4000 |
| Keywords | ≤ 100 chars, comma-separated, no spaces after commas, don't repeat words from the name |
| What's New | ≤ 4000 |

Screenshots: 1–10 per device size, PNG/JPG, no alpha. Provide the largest iPhone size App Store Connect asks for (6.9": 1320×2868 or 1290×2796; 6.5": 1242×2688 or 1284×2778); smaller sizes are scaled from it. iPad (13": 2064×2752) only if the app supports iPad. App preview videos optional (15–30 s). Same no-gos: no pricing, no rankings, no Apple trademarks misused, no device frames that misrepresent the device.

Set `canvas` in `store-kit.config.json` to the target size (e.g. `{ "width": 1290, "height": 2796 }`); the template scales from a 1080-wide design space, so callout coordinates stay valid.

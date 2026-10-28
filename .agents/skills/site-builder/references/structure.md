# Site structure (Example: WowTodo `web/`)

```
web/
  index.html            # shell + default meta
  vite.config.ts        # react + tailwind plugins, port 3000
  vercel.json           # cleanUrls, ignoreCommand, rewrites, headers (see stack-guide vercel.md)
  scripts/
    prerender.mjs       # render each public route to static HTML after SSR build
    seo-check.mjs       # fail build on missing title/description/canonical/og
    og/generate.mjs     # build 1200x630 OG images
  public/
    demos/*.html        # standalone mockup demos (phone only), one per feature
    screens/*.webp      # app screenshots, light + dark
    og/                 # generated OG images
    icon-64.png icon-128.png apple-touch-icon.png   # pre-cut circular logo
    robots.txt  sitemap.xml  .well-known/assetlinks.json
  src/
    main.tsx  entry-server.tsx  App.tsx      # client + SSR entry, routes
    config.ts           # public constants: DEMO_URL, WAITLIST_URL, TURNSTILE_SITE_KEY, UPDATES_STOPS
    index.css           # Tailwind 4 + tokens (CSS variables, light/dark)
    pages/              # Home, About, Updates, Stories, StoryDetail, Privacy, Terms, DeleteAccount, invite/confirm pages, NotFound
    sections/           # one file per home chapter: Capture, Organise, Together, Grows, Moments, Stories, Tail
    components/         # Navbar, Footer, Page, SectionWrapper, ThemeProvider/Toggle, PhoneFrame, DemoStage, UpdateNotice, waitlist/, ui/
    data/               # updates.ts, stories.ts, faq.ts, seo.ts  (content separate from layout)
    lib/                # gsap.ts (plugin registration), waitlist.ts, useMediaQuery.ts, utils.ts
```

## Conventions
- Content in `data/`, layout in `sections/`, so a release or story edit never touches components.
- `lib/gsap.ts` registers plugins once and guards `window` for SSR; sections call it inside `useEffect`/`useGSAP` and clean up on unmount.
- `seo.ts` maps route -> title/description/OG so prerender and `seo-check` share one source.
- Theme: `ThemeProvider` sets `data-theme` on `<html>` and stores the choice; default follows the OS; the toggle is in the header.
- Language toggle: dictionary files per language, key lookup in one helper; never concatenate translated fragments.
- Token and invite pages (`/c/:token`, `/g/:token`) are static shells that read the token client-side; `noindex`.
- Public demo endpoint (`web-demo` edge function) is anonymous: origin allow-list + Turnstile + daily quotas.

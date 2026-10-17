# Phase 0 — Checkpoint & Codebase Discovery Report

- **Checkpoint ID**: `checkpoint/wipeband-before-sep26-review`
- **Archive Path**: `/.checkpoint_before_sep26.tar.gz`
- **SHA-256 Hash**: `f4b3b766dff1f9f846cbceef3e138e795fbfcd339efe531d4a6a82f61d823dca`
- **Restore Command**: `tar -xzf /.checkpoint_before_sep26.tar.gz -C /`
- **Framework**: Next.js 15 App Router (TypeScript + Tailwind CSS + `motion/react`)
- **Checkout Mode**: Stripe Checkout Session API (`/api/checkout/route.ts`) with safe scaffold fallback when `STRIPE_SECRET_KEY` is not set in environment.
- **Confirmed User Decisions Applied**:
  1. **Age Positioning**: Use `Designed for kids ages 2–6` across the site.
  2. **Co-Inventor Story**: Present Sachin and Tiana as co-inventors on `/our-story` and homepage preview with external link to `https://tianaswebsite.com/`.
  3. **Reviews & UGC**: Keep existing parent quotes (`Henry M.`, `Sarah K.`) with unverified buyer badges removed, and provide structured slots for linked reviews and real-life UGC (`Preschool`, `Soccer`, `Road trip`, `Airplane`).
  4. **Checkout Trust Signals**: Display all 5 approved trust signals beside checkout (`Soft, kid-friendly silicone`, `30-day returns`, `Secure checkout`, `Refillable and reusable`, `Patented design`).
  5. **Starter Kit & Bundle**: Dominant `$19.95` Starter Kit module (`1 reusable Wipeband`, `5 tissue packs`, `30 fresh tissue layers total`), Refills as secondary cross-link, Amazon as tertiary text link, and Family Bundle hidden across UI and checkout routes.

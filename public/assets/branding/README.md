# Branding Assets Guide

Place your official logo and branding files in this directory (`/public/assets/branding/`).

### Recommended Files:
1. **Logo (SVG - Recommended)**:
   - File path: `/public/assets/branding/wipeband_logo.svg`
   - Will automatically be loaded by `WipebandLogo` across the header, footer, and navigation.

2. **Favicon / App Icon**:
   - File path: `/public/favicon.ico`
   - Automatically picked up by Next.js in the browser tab.

### Where It Appears:
- **Site Header**: In the top navigation bar (`components/layout/SiteHeader.tsx`).
- **Site Footer**: In the footer brand block (`components/layout/SiteFooter.tsx`).
- **Mobile Menu**: In mobile drawer navigation.

# Public Asset Placeholders

The AI coder should create placeholder files/components matching the paths in `seed-data/assets.json`.

Do not create final image artwork.

Recommended implementation:
- placeholder media component renders a brand-tinted box
- aspect ratio comes from asset config
- filename shown as a small development label
- actual images can later be copied into `/public/assets/...` using the same filenames

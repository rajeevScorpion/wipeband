# Visual / Media Asset Contract (separate production thread)

Final visual creation is outside this code-review pass. Improve the **slots, responsive geometry, fallback and interaction** now. The code should be complete without missing-image icons.

## Required slots

- `home_hero_usage_loop.webm` and/or `.mp4`: silent 6–10s loop, natural child nose wipe + remove used top tissue + reveal fresh layer; **do not generate fictitious or misleading usage**.
- `home_hero_usage_poster.webp`: clear still fallback.
- `home_three_steps_wear.webp`, `wipe.webp`, `tear.webp`: real product-use visuals.
- `home_six_layers_peel.webp` or animation: white layered tissues, accurate Wipeband construction. No CAD-brown layer shading from technical reference.
- `ugc_preschool`, `ugc_soccer`, `ugc_road_trip`, `ugc_airplane`: real licensed photos/clips and original links.
- `our_story_sachin_tiana`: real approved portraits only, otherwise textual founder block.

## Functional specification

Use a component with autoplay muted loop playsInline only when approved video exists; lazy-load noncritical formats. Respect prefers-reduced-motion: display static poster and do not autoplay in reduced-motion mode. Poster fallback must render with its intended aspect ratio if the video is absent/broken. Video has no audio dependency. No visual regressions when files are inserted later. Do not bake headlines into media. Use responsive crops and alt text.

**Product correctness:** Wipeband fits like a watch on the wrist, white tissue mounted facing outward. During use, the white soft tissue surface faces and makes natural contact with the nose, **not the hard band/holder**. Strap, tissue holder, layer geometry, colors/prints must match approved product references. Never invent metal parts or import brown coloring from CAD diagrams. This applies to asset review, not a license to generate new images in the site build.

## Fallback behavior

No blank box, broken image or pretend photograph. Use clean brand-aligned placeholder UI where approved footage is unavailable. The site should remain client-ready with intentionally styled placeholders while assets are collected.

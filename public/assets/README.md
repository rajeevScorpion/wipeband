# Wipeband Public Assets Directory

In Next.js, static files are served directly from the `/public` directory.
Any file placed inside `/public/assets/...` is accessible in the browser and across the application at `/assets/...`.

## Directory Structure

```text
/public/
  └── assets/
      ├── lifestyle/
      │   ├── home_hero_child-using-wipeband_desktop.webp  (16:10 ratio)
      │   ├── home_hero_child-using-wipeband_mobile.webp   (4:5 ratio)
      │   ├── home_howitworks_wear.webp                    (4:3 ratio)
      │   ├── home_howitworks_wipe.webp                    (4:3 ratio)
      │   ├── home_howitworks_tear.webp                    (4:3 ratio)
      │   ├── home_usecase_school.webp                     (4:3 ratio)
      │   ├── home_usecase_playdate.webp                   (4:3 ratio)
      │   ├── home_usecase_travel.webp                     (4:3 ratio)
      │   ├── ourstory_founders_family.webp                (16:9 ratio)
      │   ├── ourstory_kitchen_table.webp                  (4:3 ratio)
      │   ├── schools_classroom_pack.webp                  (16:10 ratio)
      │   └── campaign_parenting_hero.webp                 (16:10 ratio)
      │
      ├── product/
      │   ├── home_hero_wipeband-product.webp              (1:1 ratio)
      │   ├── home_features_exploded-product.webp          (4:3 ratio)
      │   ├── product_starter-kit_hero.webp                (1:1 ratio)
      │   ├── product_starter-kit_dinosaur.webp            (1:1 ratio)
      │   ├── product_starter-kit_unicorn.webp             (1:1 ratio)
      │   ├── product_starter-kit_wonder-wings.webp        (1:1 ratio)
      │   ├── product_family-bundle_hero.webp              (1:1 ratio)
      │   ├── product_refills_hero.webp                    (1:1 ratio)
      │   ├── product_refills_pack-open.webp               (4:3 ratio)
      │   └── product_wrist-fit_dimensions.webp            (4:3 ratio)
      │
      └── branding/
          ├── wipeband_logo.svg
          └── favicon.ico
```

## How It Works in Wipeband
The site's `PlaceholderMedia` component is designed to:
1. Render high-fidelity, brand-aligned illustrations and placeholders if image files are not yet uploaded.
2. When you drop the actual `.webp`, `.png`, or `.jpg` file with the corresponding filename into `/public/assets/...`, it seamlessly renders your live photography and product visuals without any code refactoring!

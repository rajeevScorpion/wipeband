# Updates data shape (`src/data/updates.ts`)

```ts
// Keep in step with docs/release/WHATS_NEW.md and RELEASE_LOG.md
// Newest first. A new release is one new entry at the top of the array.
export type UpdateItem = { lead: string; text: string }

export type Update = {
  date: string      // YYYY-MM-DD, the REAL date (run `date`)
  title: string     // 2 to 4 friendly words: "Photos in chat"
  version?: string  // store build: page says "New app version, update from the store"
  needs?: string    // OTA: page says "Arrives on its own if you have version X or newer"
  items: UpdateItem[]
}
```

Exactly one of `version` / `needs` per entry.

## Writing an entry
- 3 to 6 items. `lead` = short benefit in plain words ("Know what's due."); `text` = one friendly sentence with an everyday example.
- No internal terms (chip, avatar, planner, IDs, component names), no "AI" wording, fictional names only.
- Several releases the same day all carry that day's date.

Good: `{ lead: "Photos in chat.", text: "In a task chat, tap the photo button to take a photo or pick up to 5 from your gallery, add a caption and send." }`
Bad: `{ lead: "ImagePicker integration", text: "Added expo-image-manipulator pipeline" }`

## Page behaviour
- Timeline grouped by `UPDATES_STOPS` (`"day"` | `"month"`, in `config.ts`); load about 8 on scroll with a "Show more".
- A notice component compares the visitor's installed version (if known) with `version`/`needs`.
- Home "What's new" strip reads `updates.slice(0, 3)`.

## Release batch (same commit set)
1. Row in `docs/release/RELEASE_LOG.md` (technical). 2. Entry in `docs/release/WHATS_NEW.md` (plain). 3. Entry here. 4. Build passes (`npm run build`). 5. Site ships with the next approved push.

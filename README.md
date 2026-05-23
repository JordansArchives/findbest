# FindBest

A Manifest V3 Chrome extension that sorts Instagram and TikTok feeds by likes, comments, views, shares, and saves, then exports the results to CSV.

No backend, no accounts, no API keys. Everything runs in the browser.

---

## Status: Phase 0 — Scaffolding

Phase 0 ships:

- Vite + TypeScript + Manifest V3 build via `@crxjs/vite-plugin`
- Full brand token system in `src/branding.ts` (single source of truth)
- Shadow DOM mounting utility with self-hosted fonts loaded via `@font-face`
- Selector adapter layer + remote `selectors.json` loader with 24h cache and graceful fallback
- Brand-styled popup and options pages
- Proof-of-life badge that mounts on instagram.com and tiktok.com to confirm fonts + Shadow DOM work

Sorting and CSV export land in Phase 1+.

---

## Setup

### 1. Install dependencies

```bash
cd "/Users/jordanwatkins/Documents/Claude/Find Best"
npm install
```

### 2. Drop in the font files

Phase 0 references self-hosted fonts that aren't yet committed. Put these `.woff2` files into `public/fonts/`:

```
public/fonts/
  awesome-serif-300.woff2
  awesome-serif-400.woff2
  awesome-serif-500.woff2
  awesome-serif-700.woff2
  trip-sans-400.woff2
  trip-sans-500.woff2
  trip-sans-700.woff2
  trip-sans-900.woff2
  trip-sans-mono-400.woff2
```

These are the same fonts used on jordanwatkins.xyz. Copy them from the site repo:

```bash
cp ~/Documents/Claude/jordanwatkins-site/fonts/AwesomeSerif-LightRegular.woff2 public/fonts/awesome-serif-300.woff2
cp ~/Documents/Claude/jordanwatkins-site/fonts/AwesomeSerif-Regular.woff2 public/fonts/awesome-serif-400.woff2
cp ~/Documents/Claude/jordanwatkins-site/fonts/AwesomeSerif-MediumRegular.woff2 public/fonts/awesome-serif-500.woff2
cp ~/Documents/Claude/jordanwatkins-site/fonts/AwesomeSerif-BoldRegular.woff2 public/fonts/awesome-serif-700.woff2
cp ~/Documents/Claude/jordanwatkins-site/fonts/trip-sans.woff2 public/fonts/trip-sans-400.woff2
cp ~/Documents/Claude/jordanwatkins-site/fonts/trip-sans-medium.woff2 public/fonts/trip-sans-500.woff2
cp ~/Documents/Claude/jordanwatkins-site/fonts/trip-sans-bold.woff2 public/fonts/trip-sans-700.woff2
cp ~/Documents/Claude/jordanwatkins-site/fonts/trip-sans-ultra.woff2 public/fonts/trip-sans-900.woff2
cp ~/Documents/Claude/jordanwatkins-site/fonts/trip-sans-mono-regular.woff2 public/fonts/trip-sans-mono-400.woff2
```

The fonts will still render with system fallbacks if these files are missing — you'll just see Georgia and a system sans instead of Awesome Serif and Trip Sans.

### 3. Build for unpacked install

```bash
npm run build
```

This produces a `dist/` folder.

### 4. Load in Chrome

1. Open `chrome://extensions/`
2. Toggle **Developer mode** on (top-right)
3. Click **Load unpacked**
4. Select the `dist/` folder

You should now see the **FindBest** icon in your Chrome toolbar.

### 5. Verify

- Click the FindBest icon — the popup shows the brand hero, status section, and an accent-colored "Check for selector updates" button. Awesome Serif headline, Trip Sans body.
- Visit `instagram.com` — a small "FindBest — READY ON INSTAGRAM" badge appears in the bottom-right corner.
- Visit `tiktok.com` — same badge, labeled for TikTok.
- Click the refresh button in the popup — it fetches from `https://raw.githubusercontent.com/JordansArchives/findbest/main/selectors.json`. "Last updated" timestamp should change.

If any of those don't work, that's a Phase 0 bug worth catching before moving on.

---

## Dev workflow

```bash
npm run dev
```

Builds to `dist/` with HMR for the popup/options pages. Content script changes still require manually reloading the extension at `chrome://extensions/` (Chrome limitation, not ours).

---

## Project layout

```
.
├── manifest.config.ts        Typed MV3 manifest, read by @crxjs
├── vite.config.ts
├── selectors.json            Mirrors src/selectors/defaults.json — fetched by the loader
├── public/fonts/             Self-hosted .woff2 files (you drop in)
└── src/
    ├── branding.ts           Single source of truth for all visual tokens
    ├── shared/
    │   ├── shadow-mount.ts   Shadow DOM mounting + font/style injection
    │   ├── styles.ts         Compiles branding tokens to CSS custom properties
    │   ├── fonts.ts          Builds @font-face block
    │   └── phase0-badge.ts   Proof-of-life UI (deleted in Phase 1)
    ├── selectors/
    │   ├── schema.ts         TS types for selectors.json
    │   ├── defaults.json     Bundled fallback (empty in Phase 0)
    │   ├── loader.ts         Remote fetch + 24h cache + fallback chain
    │   └── adapter.ts        getPosts/getLikes/etc. — interface only in P0
    ├── background/
    │   └── service-worker.ts MV3 background, owns selector fetching
    ├── content/
    │   ├── instagram.ts      IG content script entry
    │   └── tiktok.ts         TT content script entry
    ├── popup/
    │   ├── index.html
    │   ├── popup.ts
    │   └── popup-styles.ts
    └── options/
        ├── index.html
        ├── options.ts
        └── options-styles.ts
```

---

## Architecture notes

**Why a remote `selectors.json`?** Instagram and TikTok routinely change their page structure. When that happens, we update one file in this public repo and every installed extension picks it up within 24 hours — no rebuild, no Chrome Web Store update cycle. The bundled `defaults.json` is the fallback when GitHub is unreachable.

**Why Shadow DOM?** Host-page CSS on Instagram and TikTok is aggressive and unpredictable. Shadow DOM gives us guaranteed style isolation in both directions — their CSS can't break our UI, ours can't bleed into theirs.

**Why self-hosted fonts via `web_accessible_resources`?** Custom fonts inside a content script's Shadow DOM need to be fetchable from the host page's origin. Listing each `.woff2` in `web_accessible_resources` with the IG and TT matches is what makes that work.

**Why no React?** Content scripts injected into IG/TT need to stay light. React would mean shipping ~40KB of runtime into every page load. Vanilla TS keeps the content script footprint under a few KB.

---

## Phased build

- **Phase 0** ← we are here. Scaffold, brand, mount proof-of-life UI.
- **Phase 1** — Instagram profile sort (likes/comments/views).
- **Phase 2** — Instagram CSV export.
- **Phase 3** — TikTok parity (sort + export, including views/shares/saves).
- **Phase 4** — Custom filters and saved filter presets.
- **Phase 5** — Self-monitoring + maintenance UX.

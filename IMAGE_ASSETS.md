# Image Asset Inventory — Kapital Insurance Group

> Canonical list of **every image** the website uses or expects.
> **Formats are PNG or JPG only.** No `.webp` assets anywhere.
>
> **Format rules**
> - **PNG** → logos, brand marks, icons, transparent graphics, agent cutouts, UI graphics, badges, decorative elements, illustrations.
> - **JPG** → hero / lifestyle / office / team / customer / background / service / city / blog / review photography.
>
> **Status legend:** `Existing` (file or code present) · `Placeholder` (rendered by `<Photo>` branded placeholder until a real `src` is added) · `Missing` (referenced by code but no file present).

---

## 1. Master Asset Table

| # | Component / Page | Purpose | File Name | Path | Size (px) | Ratio | Format | Transparent | Priority | Status |
|---|------------------|---------|-----------|------|-----------|-------|--------|-------------|----------|--------|
| 1 | Home — `Hero.tsx` | Hero portrait (advisor) | `hero-jenisffer.jpg` | `/public/images/hero/hero-jenisffer.jpg` | 1600×2000 | 4:5 | JPG | No | Critical | Placeholder |
| 2 | Home — `MeetAdvisor.tsx` | "Meet your advisor" portrait | `advisor-jenisffer.jpg` | `/public/images/about/advisor-jenisffer.jpg` | 1200×1500 | 4:5 | JPG | No | Critical | Placeholder |
| 3 | `/about` — `about/page.tsx` | About page portrait | `about-jenisffer.jpg` | `/public/images/about/about-jenisffer.jpg` | 1200×1500 | 4:5 | JPG | No | High | Placeholder |
| 4 | `/auto-insurance` — `[service]/page.tsx` | Service hero photo (desktop only) | `auto-insurance.jpg` | `/public/images/services/auto-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Medium | Placeholder |
| 5 | `/commercial-auto-insurance` | Service hero photo | `commercial-auto-insurance.jpg` | `/public/images/services/commercial-auto-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Medium | Placeholder |
| 6 | `/home-insurance` | Service hero photo | `home-insurance.jpg` | `/public/images/services/home-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Medium | Placeholder |
| 7 | `/business-insurance` | Service hero photo | `business-insurance.jpg` | `/public/images/services/business-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Medium | Placeholder |
| 8 | `/general-liability-insurance` | Service hero photo | `general-liability-insurance.jpg` | `/public/images/services/general-liability-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 9 | `/workers-compensation` | Service hero photo | `workers-compensation.jpg` | `/public/images/services/workers-compensation.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 10 | `/life-insurance` | Service hero photo | `life-insurance.jpg` | `/public/images/services/life-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 11 | `/health-insurance` | Service hero photo | `health-insurance.jpg` | `/public/images/services/health-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 12 | `/motorcycle-insurance` | Service hero photo | `motorcycle-insurance.jpg` | `/public/images/services/motorcycle-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 13 | `/boat-insurance` | Service hero photo | `boat-insurance.jpg` | `/public/images/services/boat-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 14 | `/renters-insurance` | Service hero photo | `renters-insurance.jpg` | `/public/images/services/renters-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 15 | `/flood-insurance` | Service hero photo | `flood-insurance.jpg` | `/public/images/services/flood-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 16 | `/umbrella-insurance` | Service hero photo | `umbrella-insurance.jpg` | `/public/images/services/umbrella-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 17 | `/commercial-insurance` | Service hero photo | `commercial-insurance.jpg` | `/public/images/services/commercial-insurance.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 18 | `/sr22` | Service hero photo | `sr22.jpg` | `/public/images/services/sr22.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 19 | `/notary` | Service hero photo | `notary.jpg` | `/public/images/services/notary.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 20 | `/start-an-llc` | Service hero photo | `start-an-llc.jpg` | `/public/images/services/start-an-llc.jpg` | 1200×900 | 4:3 | JPG | No | Low | Placeholder |
| 21 | `seo.ts` JSON-LD (Organization / LocalBusiness / Article) | Brand logo for Google rich results & social | `logo.png` | `/public/logo.png` | 512×512 | 1:1 | PNG | Yes | Critical | Missing |
| 22 | `layout.tsx` `icons.apple` | iOS home-screen / bookmark icon | `apple-icon.png` | `/public/apple-icon.png` | 180×180 | 1:1 | PNG | No (opaque) | High | Missing |
| 23 | `layout.tsx` `icons.icon` | Classic browser favicon | `favicon.ico` | `/public/favicon.ico` | 16/32/48 (multi) | 1:1 | ICO | Yes | High | Missing |
| 24 | `layout.tsx` `icons.icon` (svg) | Vector site icon | `icon.svg` | `/src/app/icon.svg` | Vector | 1:1 | SVG | Yes | High | Existing |
| 25 | `opengraph-image.tsx` + `seo.ts` | Default Open Graph / Twitter card | `opengraph-image` (route) | `/src/app/opengraph-image.tsx` | 1200×630 | 1.91:1 | PNG (runtime) | No | High | Existing (auto-generated) |

**Notes**
- **#23 `favicon.ico`** and **#24 `icon.svg`** are deliberately ICO/SVG (favicon and vector icon standards) — they are not raster photography and are out of scope for the PNG/JPG photo rules. No `.webp` involved.
- **#25 OG card** is generated at request time by `src/app/opengraph-image.tsx` (Next.js `ImageResponse`) and is emitted as **PNG**. No file to create.

---

## 2. Assets Rendered as Code (NO image file required)

These are visible on the site but rendered as **inline SVG or text**, so they need no PNG/JPG file:

| Element | Where | Rendered as |
|---------|-------|-------------|
| Company logo / wordmark | `Logo.tsx` | Inline SVG |
| Service icons (car, home, shield, umbrella, …) | `Icon.tsx` | Inline SVG set |
| Google "G" rating mark | `GoogleRating.tsx` | Inline SVG |
| Carrier names (GEICO, Progressive, …) | `CarrierLogos.tsx` | Text wordmarks |
| Cities served | `CitiesServed.tsx` | Text pill links |
| Review/testimonial avatars | `Reviews.tsx` | Author initials |
| Hero / footer / photo textures | `Hero.tsx`, `Footer.tsx`, `Photo.tsx` | CSS gradients |

---

## 3. `/public` Folder Structure

Folders marked **(empty / not used)** follow the agreed convention but currently hold no assets because those elements render as code. Only `/public/favicon.ico`, `/public/apple-icon.png`, and `/public/logo.png` are paths the code references literally today.

```
/public/
├── favicon.ico                 ← Missing — create (multi-size 16/32/48)
├── apple-icon.png              ← Missing — create (180×180, PNG)
├── logo.png                    ← Missing — create (512×512, transparent PNG)
│
└── images/
    ├── README.md
    │
    ├── hero/
    │   └── hero-jenisffer.jpg          ← Critical
    │
    ├── about/
    │   ├── advisor-jenisffer.jpg       ← Critical (home "Meet your advisor")
    │   └── about-jenisffer.jpg         ← High (About page)
    │
    ├── services/
    │   ├── auto-insurance.jpg
    │   ├── commercial-auto-insurance.jpg
    │   ├── home-insurance.jpg
    │   ├── business-insurance.jpg
    │   ├── general-liability-insurance.jpg
    │   ├── workers-compensation.jpg
    │   ├── life-insurance.jpg
    │   ├── health-insurance.jpg
    │   ├── motorcycle-insurance.jpg
    │   ├── boat-insurance.jpg
    │   ├── renters-insurance.jpg
    │   ├── flood-insurance.jpg
    │   ├── umbrella-insurance.jpg
    │   ├── commercial-insurance.jpg
    │   ├── sr22.jpg
    │   ├── notary.jpg
    │   └── start-an-llc.jpg
    │
    ├── team/            (empty / not used — no team-grid component)
    ├── backgrounds/     (empty / not used — backgrounds are CSS gradients)
    ├── icons/           (empty / not used — icons are inline SVG)
    ├── logos/           (empty / not used — brand logo is inline SVG; raster logo lives at /public/logo.png)
    ├── carriers/        (empty / not used — carriers are text)
    ├── cities/          (empty / not used — cities are text pills)
    ├── reviews/         (empty / not used — avatars are initials)
    ├── blog/            (empty / not used — articles have no cover-image field)
    ├── calculator/      (empty / not used — calculators are pure UI)
    ├── quote/           (empty / not used — quote wizard is pure UI)
    ├── footer/          (empty / not used — footer texture is CSS)
    └── og/              (empty / not used — OG card generated by opengraph-image.tsx)
```

> **Wiring note:** Service and portrait photos do not appear automatically. The `<Photo>` components currently have **no `src`**. To display a photo, set e.g. `src="/images/hero/hero-jenisffer.jpg"`. Filenames above are the agreed convention.

---

## 4. Production Checklist (by Priority)

### Critical — required before launch
- [ ] `images/hero/hero-jenisffer.jpg` — Home hero portrait (4:5). **JPG.**
- [ ] `images/about/advisor-jenisffer.jpg` — Homepage "Meet your advisor" portrait (4:5). **JPG.**
- [ ] `logo.png` — 512×512 transparent brand logo (Google schema + social). **PNG.**

### High Priority — strongly recommended before launch
- [ ] `images/about/about-jenisffer.jpg` — About-page portrait (4:5). **JPG.**
- [ ] `apple-icon.png` — 180×180 iOS icon. **PNG.**
- [ ] `favicon.ico` — multi-size browser favicon. **ICO.**

### Medium Priority — top 4 service pages
- [ ] `images/services/auto-insurance.jpg`
- [ ] `images/services/commercial-auto-insurance.jpg`
- [ ] `images/services/home-insurance.jpg`
- [ ] `images/services/business-insurance.jpg`

### Low Priority / Optional — remaining service photos (4:3 JPG)
- [ ] `images/services/general-liability-insurance.jpg`
- [ ] `images/services/workers-compensation.jpg`
- [ ] `images/services/life-insurance.jpg`
- [ ] `images/services/health-insurance.jpg`
- [ ] `images/services/motorcycle-insurance.jpg`
- [ ] `images/services/boat-insurance.jpg`
- [ ] `images/services/renters-insurance.jpg`
- [ ] `images/services/flood-insurance.jpg`
- [ ] `images/services/umbrella-insurance.jpg`
- [ ] `images/services/commercial-insurance.jpg`
- [ ] `images/services/sr22.jpg`
- [ ] `images/services/notary.jpg`
- [ ] `images/services/start-an-llc.jpg`

---

## 5. Production Notes
- **Photography → JPG.** Source quality ~80–85%; portraits 4:5 (long edge ~2000px), service photos 4:3 (~1200px wide).
- **Logos / icons / badges / graphics → PNG** (transparent where noted).
- `next/image` (via `<Photo>`) still optimizes and serves modern formats at runtime; **source masters are PNG/JPG only** per these rules.
- **No `.webp` files** are to be added to this project.

# Kapital Insurance Group — Lead Generation Website

A premium, SEO-first insurance website for **Kapital Insurance Group** (a UniVista
Insurance franchise in Hialeah, FL — agent Jenisffer Bravo). Built to generate
**phone calls and quote requests**, not just inform.

Stack: **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase · Vercel**

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values (optional for local dev)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

The site runs fully without any env vars — the quote API degrades gracefully and
logs leads to the server console until Supabase/notifications are configured.

---

## Architecture

### Routes (122 pre-rendered pages)
| Route | Purpose |
|---|---|
| `/` | Home — full conversion funnel (hero → services → trust → savings → reviews → FAQ → CTA) |
| `/[service]` | 18 SEO service pages (`/auto-insurance`, `/home-insurance`, …) |
| `/[service]/[city]` | 75 local-SEO pages (`/auto-insurance/hialeah`, …) for 5 priority lines × 15 cities |
| `/quote` | 8-step Quote Wizard → `/api/quote` → Supabase |
| `/learn` + `/learn/[slug]` | Insurance Learning Center (15 original articles) |
| `/calculators` | Interactive savings calculator + estimators |
| `/about`, `/contact` | Agency / NAP / trust |
| `/privacy`, `/terms` | Legal (noindex) |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | SEO infrastructure |
| `/api/quote` | Lead intake (validate → store → notify) |

### Data layer (`src/data/`)
All content is **original** and typed. Add a service, city, or article = edit one file.
- `services.ts` — service catalog (copy, benefits, coverages, FAQs, internal links)
- `locations.ts` — cities (ZIPs, nearby, local blurbs)
- `articles.ts` — Learning Center
- `testimonials.ts`, `faqs.ts`

### SEO (`src/lib/seo.ts`)
Centralized metadata builder + 9 JSON-LD schema generators: Organization,
InsuranceAgency, LocalBusiness, Service, FAQ, Article, Breadcrumb, Review, Speakable.
Canonical URLs, Open Graph, Twitter cards, and a dynamic OG image are all wired in.

### Lead system
`Quote Wizard → /api/quote → validate (zod) → Supabase leads table → email + SMS`
- `supabase/schema.sql` — `leads` + `lead_events` tables, RLS, status enum, stats view (Lead Dashboard / CRM / conversion tracking ready)
- `src/lib/notifications.ts` — provider-agnostic email (Resend) + SMS (Twilio), graceful when unconfigured

---

## Configuration

1. **Domain** — set `site.url` in `src/lib/site.ts` and `NEXT_PUBLIC_SITE_URL`.
2. **Supabase** — run `supabase/schema.sql`, then set `NEXT_PUBLIC_SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` (server-only).
3. **Notifications** — add `RESEND_API_KEY` (email) and Twilio keys (SMS). See `.env.example`.
4. **Photography** — drop real photos of Jenisffer / lifestyle shots into
   `/public/images` and pass `src="/images/…"` to `<Photo>`. Until then, elegant
   branded placeholders render automatically.

## Design system
UniVista Blue (`brand-*`) with **red reserved exclusively for CTAs** (`accent-*`).
Tokens live in `src/app/globals.css`. Soft shadows, rounded cards, Plus Jakarta Sans
display + Inter body, mobile-first, scroll-driven reveal animations (reduced-motion safe).

## Deploy (Vercel)
Push to Git, import to Vercel, set env vars, deploy. No extra config required.

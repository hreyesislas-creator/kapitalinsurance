import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { GoogleRating, GoogleG } from "@/components/ui/GoogleRating";
import { site } from "@/lib/site";

const TRUST_POINTS = [
  "Licensed local agent",
  "20+ carriers compared",
  "Bilingual service",
  "Same-day coverage",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Premium, barely-there background: light blue wash + radial glow + topographic contours */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-brand-100/60 blur-3xl [animation:aurora_18s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-30%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-brand-50 blur-3xl [animation:aurora_22s_ease-in-out_infinite_reverse]" />
        <TopographicTexture className="absolute right-0 top-0 h-full w-2/3 text-brand-800/[0.04]" />
        <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(circle_at_1px_1px,rgba(10,61,145,0.045)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:py-16">
        {/* Copy */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3.5 py-1.5 text-[0.82rem] font-semibold text-brand-800 shadow-soft backdrop-blur [animation:fade-in_0.6s_ease_both]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-600" />
            </span>
            UniVista Insurance Franchise · Hialeah, FL
          </div>

          <h1 className="mt-4 text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-ink-900 [animation:fade-up_0.7s_var(--ease-out-soft)_both] sm:text-[3.3rem] lg:text-[3.6rem]">
            Save More.
            <br />
            <span className="text-gradient">Stay Protected.</span>
          </h1>

          <p className="mt-4 max-w-lg text-lg font-medium leading-snug text-ink-700 [animation:fade-up_0.7s_var(--ease-out-soft)_0.06s_both]">
            Protect your family. Protect your business. Save every month.
          </p>
          <p className="mt-2.5 max-w-lg text-[1.02rem] leading-relaxed text-ink-600 [animation:fade-up_0.7s_var(--ease-out-soft)_0.1s_both]">
            We compare 20+ top-rated carriers in minutes to find South Florida better coverage for
            less — with a real, bilingual advisor who answers the phone.
          </p>

          <div className="mt-6 flex flex-col gap-3 [animation:fade-up_0.7s_var(--ease-out-soft)_0.16s_both] sm:flex-row">
            <Button href="/quote" variant="primary" size="lg" className="sm:px-8">
              Get My Free Quote
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
            <Button href={site.phone.href} variant="secondary" size="lg">
              <PhoneIcon /> Call {site.phone.display}
            </Button>
          </div>

          {/* Above-the-fold trust */}
          <div className="mt-6 flex flex-col gap-4 [animation:fade-up_0.7s_var(--ease-out-soft)_0.24s_both] sm:flex-row sm:items-center">
            <GoogleRating />
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5">
              {TRUST_POINTS.map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-sm font-medium text-ink-600">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-600" aria-hidden>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual composition — real-agent layout */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none [animation:scale-in_0.8s_var(--ease-out-soft)_both]">
          {/* soft frame behind photo */}
          <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100/60 to-transparent" />
          <Photo
            src="/images/hero/hero-jenisffer.jpg"
            alt="Jenisffer Bravo, licensed bilingual insurance advisor at Kapital Insurance Group in Hialeah, Florida"
            priority
            aspect="aspect-[4/5]"
            rounded="3xl"
            sizes="(min-width: 1024px) 44vw, 90vw"
            className="shadow-lift ring-1 ring-black/5"
          />

          {/* Floating badge — Google rating (top-left) */}
          <div className="absolute -left-3 top-6 flex items-center gap-2 rounded-2xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur [animation:fade-up_0.8s_var(--ease-out-soft)_0.36s_both]">
            <GoogleG className="h-5 w-5" />
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-ink-900">4.9 ★</p>
              <p className="text-[0.68rem] text-ink-500">{site.rating.count}+ reviews</p>
            </div>
          </div>

          {/* Floating badge — 20+ carriers (top-right) */}
          <div className="absolute -right-3 top-16 hidden items-center gap-2 rounded-2xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur [animation:fade-up_0.8s_var(--ease-out-soft)_0.46s_both] sm:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-700">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-ink-900">20+ carriers</p>
              <p className="text-[0.68rem] text-ink-500">compared for you</p>
            </div>
          </div>

          {/* Floating badge — savings (bottom-right) */}
          <div className="absolute -right-2 bottom-20 flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white/95 px-4 py-3 shadow-lift backdrop-blur [animation:fade-up_0.8s_var(--ease-out-soft)_0.56s_both] sm:right-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-50 text-accent-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v18M7 7h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h8" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-[1.3rem] font-extrabold text-ink-900">$67<span className="text-sm font-semibold text-ink-500">/mo</span></p>
              <p className="text-[0.68rem] font-medium text-ink-500">avg. saved by switchers*</p>
            </div>
          </div>

          {/* Floating badge — Licensed & Local (bottom-left) */}
          <div className="absolute -left-3 bottom-6 flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white/95 px-4 py-3 shadow-lift backdrop-blur [animation:fade-up_0.8s_var(--ease-out-soft)_0.66s_both]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-800 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 4l7 2.5v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5v-5L12 4Z" /><path d="M9.5 12l1.8 1.8L15 10" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-ink-900">Licensed &amp; Local</p>
              <p className="text-xs text-ink-500">Jenisffer Bravo · Hialeah</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopographicTexture({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      {[0, 26, 52, 78, 104, 130, 156, 182].map((o) => (
        <path
          key={o}
          d={`M${40 + o} 360 Q ${120 + o} ${300 - o}, ${200} ${320 - o / 2} T ${380 - o} ${260 - o}`}
        />
      ))}
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}

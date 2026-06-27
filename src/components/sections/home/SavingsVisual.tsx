import Image from "next/image";
import { GoogleG } from "@/components/ui/GoogleRating";
import { site } from "@/lib/site";

/**
 * Visual composition for the dark-blue Savings section. Renders an image slot
 * with floating trust badges layered on top, so the panel feels alive and
 * conversion-focused instead of an empty blue block.
 *
 * SWAP-IN: When Jenisffer's real photo is ready, drop it in /public/images and
 * set SAVINGS_IMAGE to its local path (e.g. "/images/savings/jenisffer-savings.jpg").
 * The photo then replaces the premium placeholder with NO layout changes — same
 * 4:5 frame, same floating badges.
 */
const SAVINGS_IMAGE: string | null = null;

export function SavingsVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:mr-0 lg:ml-auto lg:max-w-md">
      {/* soft glow frame behind the panel */}
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2.25rem] bg-gradient-to-br from-brand-500/30 via-brand-700/20 to-transparent blur-sm"
      />

      {/* Image / placeholder slot — fixed 4:5 frame so a real photo swaps in cleanly */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 shadow-lift">
        {SAVINGS_IMAGE ? (
          <Image
            src={SAVINGS_IMAGE}
            alt="Jenisffer Bravo helping a South Florida family save on their insurance"
            fill
            sizes="(min-width: 1024px) 44vw, 90vw"
            className="object-cover"
          />
        ) : (
          <SavingsPlaceholder />
        )}
      </div>

      {/* Floating badge — 4.9 Google Rating (top-left) */}
      <div className="absolute -left-3 top-6 flex items-center gap-2 rounded-2xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur">
        <GoogleG className="h-5 w-5" />
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-ink-900">{site.rating.value.toFixed(1)} ★</p>
          <p className="text-[0.68rem] text-ink-500">Google rating</p>
        </div>
      </div>

      {/* Floating badge — 20+ Carriers Compared (top-right) */}
      <div className="absolute -right-3 top-20 hidden items-center gap-2 rounded-2xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur sm:flex">
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

      {/* Floating badge — Average Savings (bottom-left, hero stat) */}
      <div className="absolute -left-3 bottom-6 flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white/95 px-4 py-3 shadow-lift backdrop-blur">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-50 text-accent-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v18M7 7h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h8" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-[1.3rem] font-extrabold text-ink-900">$804<span className="text-sm font-semibold text-ink-500">/yr</span></p>
          <p className="text-[0.68rem] font-medium text-ink-500">avg. savings*</p>
        </div>
      </div>

      {/* Floating badge — Quotes in Minutes (bottom-right) */}
      <div className="absolute -right-2 bottom-24 flex items-center gap-2 rounded-2xl border border-ink-100 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur sm:right-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-800 text-white">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-ink-900">In minutes</p>
          <p className="text-[0.68rem] text-ink-500">free quotes</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Premium, savings-themed branded placeholder shown until the real photo lands.
 * Deep-navy gradient + rising-savings chart and coin motif — intentionally rich
 * so the panel never reads as empty.
 */
function SavingsPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950" role="img" aria-label="Illustration: insurance savings growing over time">
      {/* dotted texture */}
      <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.10)_1px,transparent_0)] [background-size:20px_20px]" />
      {/* soft glow */}
      <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-400/30 blur-3xl" />

      {/* Rising savings chart */}
      <svg viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-white/85" fill="none" aria-hidden>
        <defs>
          <linearGradient id="savingsArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {/* growth columns */}
        {[
          { x: 70, h: 70 },
          { x: 115, h: 120 },
          { x: 160, h: 175 },
          { x: 205, h: 235 },
        ].map((b) => (
          <rect key={b.x} x={b.x} y={300 - b.h} width="26" height={b.h} rx="6" fill="rgba(255,255,255,0.16)" />
        ))}
        {/* trend line + area */}
        <path d="M55 250 L120 200 L175 150 L240 80 L240 300 L55 300 Z" fill="url(#savingsArea)" />
        <path d="M55 250 L120 200 L175 150 L240 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {[
          [55, 250],
          [120, 200],
          [175, 150],
          [240, 80],
        ].map(([cx, cy]) => (
          <circle key={`${cx}`} cx={cx} cy={cy} r="5.5" fill="#fff" />
        ))}
        {/* upward arrow head */}
        <path d="M222 80 L240 80 L240 98" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Coin / dollar emblem */}
      <div className="absolute left-1/2 top-7 -translate-x-1/2">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/12 ring-1 ring-white/25 backdrop-blur">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v18M7 7h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h8" />
          </svg>
        </span>
      </div>

      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">We compare. You save.</p>
        <p className="mt-1 text-[0.7rem] text-white/55">Photo coming soon</p>
      </div>
    </div>
  );
}

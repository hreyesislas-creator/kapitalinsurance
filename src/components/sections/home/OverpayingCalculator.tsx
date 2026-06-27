"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";

const TYPES = ["Auto", "Home", "Business", "Commercial Auto", "Renters", "Motorcycle"] as const;

/**
 * Conversion-focused estimator. Produces a transparent, clearly-labeled
 * illustrative estimate (NOT an actuarial quote) and routes the visitor into
 * the Quote Wizard with their inputs pre-filled.
 */
export function OverpayingCalculator() {
  const router = useRouter();
  const [premium, setPremium] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("Auto");
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const estimate = () => {
    const p = parseFloat(premium);
    if (!p || p < 10) return setError("Enter your current monthly premium.");
    if (!/^\d{5}$/.test(zip)) return setError("Enter a valid 5-digit ZIP code.");
    setError("");
    // Illustrative overpay band by line of business (conservative).
    const rate = type === "Home" ? 0.13 : type === "Business" || type === "Commercial Auto" ? 0.15 : 0.18;
    setResult(Math.round(p * 12 * rate));
  };

  const goToQuote = () => {
    const params = new URLSearchParams({ type, premium, zip });
    router.push(`/quote?${params.toString()}`);
  };

  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="60-second savings check"
        title="How much are you overpaying?"
        description="Rates change constantly. See an instant estimate of what you could be saving — then get your real, personalized quote."
      />

      <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
        <div className="grid md:grid-cols-2">
          {/* Inputs */}
          <div className="p-6 sm:p-8">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-ink-700">Current monthly premium</label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-ink-400">$</span>
                  <input
                    inputMode="numeric"
                    value={premium}
                    onChange={(e) => { setPremium(e.target.value.replace(/[^\d.]/g, "")); setError(""); }}
                    placeholder="180"
                    aria-label="Current monthly premium"
                    className="w-full rounded-xl border border-ink-200 py-3 pl-8 pr-4 text-lg font-semibold text-ink-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink-700">Insurance type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as (typeof TYPES)[number])}
                  aria-label="Insurance type"
                  className="mt-1.5 w-full rounded-xl border border-ink-200 px-4 py-3 text-ink-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                >
                  {TYPES.map((t) => <option key={t} value={t}>{t} Insurance</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink-700">ZIP code</label>
                <input
                  inputMode="numeric"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => { setZip(e.target.value.replace(/\D/g, "").slice(0, 5)); setError(""); }}
                  placeholder="33012"
                  aria-label="ZIP code"
                  className="mt-1.5 w-full rounded-xl border border-ink-200 px-4 py-3 font-semibold tracking-wider text-ink-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
              </div>

              {error && <p className="text-sm font-medium text-accent-700" role="alert">{error}</p>}

              <button
                type="button"
                onClick={estimate}
                className="shine w-full rounded-full bg-brand-800 px-6 py-3.5 font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-900 hover:shadow-card"
              >
                Estimate My Savings
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-center bg-gradient-to-br from-brand-800 to-brand-950 p-6 text-white sm:p-8">
            {result === null ? (
              <div className="text-center text-brand-100/80">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                    <path d="M4 17l5-5 4 3 7-8" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-4 text-sm">Enter your details and tap <span className="font-semibold text-white">Estimate My Savings</span> to see your number.</p>
              </div>
            ) : (
              <div className="[animation:fade-up_0.5s_var(--ease-out-soft)_both]">
                <p className="text-sm text-brand-100/80">You may be paying around</p>
                <p className="mt-1 text-5xl font-extrabold">
                  <CountUp value={result} />
                  <span className="text-lg font-semibold text-brand-200"> /yr</span>
                </p>
                <p className="mt-1 text-brand-100/85">more than necessary on your {type.toLowerCase()} insurance.</p>
                <button
                  type="button"
                  onClick={goToQuote}
                  className="shine mt-6 w-full rounded-full bg-accent-600 px-6 py-3.5 font-semibold text-white shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-accent-700"
                >
                  Get My Personalized Quote
                </button>
                <p className="mt-4 text-xs leading-relaxed text-brand-100/60">
                  This is an estimate only. Final rates depend on your coverage, driver profile, ZIP code, carrier, and underwriting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Skip the animation but still land on the final value (next frame, so the
      // state update happens in a callback rather than synchronously in the effect).
      raf.current = requestAnimationFrame(() => setN(value));
      return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    }
    const duration = 900;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value]);

  return <span>${n.toLocaleString()}</span>;
}

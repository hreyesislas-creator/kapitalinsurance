"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Illustrative savings estimator. Uses a transparent, clearly-labeled estimate
 * to drive quote intent — not a binding quote.
 */
export function SavingsCalculator() {
  const [premium, setPremium] = useState(180);
  const [type, setType] = useState("Auto");
  const [insured, setInsured] = useState<"yes" | "no">("yes");

  // Conservative illustrative savings band by line of business.
  const rate = type === "Auto" ? 0.18 : type === "Home" ? 0.14 : 0.16;
  const bump = insured === "no" ? 0.04 : 0; // lapsed shoppers often see bigger swings
  const monthly = Math.round(premium * (rate + bump));
  const yearly = monthly * 12;

  return (
    <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
      <div className="grid lg:grid-cols-2">
        {/* Inputs */}
        <div className="p-7 sm:p-9">
          <h2 className="text-xl font-bold text-ink-900">Estimate your savings</h2>
          <p className="mt-1.5 text-sm text-ink-500">Adjust the sliders to see a rough idea of what you could save.</p>

          <div className="mt-7 space-y-7">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-ink-700">Coverage type</label>
              </div>
              <div className="mt-2 flex gap-2">
                {["Auto", "Home", "Business"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                      type === t ? "border-brand-600 bg-brand-50 text-brand-800" : "border-ink-200 text-ink-600 hover:border-brand-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-ink-700">Current monthly premium</label>
                <span className="text-sm font-bold text-brand-800">${premium}/mo</span>
              </div>
              <input
                type="range"
                min={40}
                max={600}
                step={5}
                value={premium}
                onChange={(e) => setPremium(Number(e.target.value))}
                className="mt-3 w-full accent-brand-700"
              />
              <div className="mt-1 flex justify-between text-xs text-ink-400">
                <span>$40</span>
                <span>$600</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-ink-700">Currently insured?</label>
              <div className="mt-2 flex gap-2">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setInsured(v)}
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold capitalize transition-all ${
                      insured === v ? "border-brand-600 bg-brand-50 text-brand-800" : "border-ink-200 text-ink-600 hover:border-brand-200"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col justify-center bg-gradient-to-br from-brand-800 to-brand-950 p-7 text-white sm:p-9">
          <p className="text-sm font-medium text-brand-100/80">Estimated potential savings</p>
          <p className="mt-2 text-5xl font-extrabold">
            ${yearly.toLocaleString()}
            <span className="text-lg font-semibold text-brand-200">/yr</span>
          </p>
          <p className="mt-1 text-brand-100/80">about ${monthly}/month back in your pocket</p>

          <Link
            href={`/quote?type=${type}`}
            className="mt-7 inline-flex w-fit items-center justify-center rounded-full bg-accent-600 px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-accent-700"
          >
            Get My Real Quote
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-brand-100/60">
            Estimate only, for illustration. Actual savings depend on your profile, coverage, and
            carrier. Get a free quote for your exact numbers.
          </p>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { StarRating } from "@/components/ui/StarRating";

export const metadata: Metadata = buildMetadata({
  title: "Get a Free Insurance Quote — Compare & Save",
  description:
    "Get a free, no-obligation insurance quote from Kapital Insurance Group in Hialeah. Our quick quote wizard compares top Florida carriers in minutes. Auto, home, business & more.",
  path: "/quote",
});

const TRUST = [
  "No obligation, ever",
  "Takes about 2 minutes",
  "Bilingual local team",
  "Same-day coverage available",
];

export default function QuotePage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white py-10 sm:py-14 lg:py-16">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl" />
      <div className="container-page relative">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Compare carriers. <span className="text-brand-800">Start saving.</span>
          </h1>
          <p className="mt-3 text-lg text-ink-600">
            Answer a few quick questions and we&apos;ll shop the market for your best rate — free.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <StarRating value={site.rating.value} />
            <span className="text-sm font-semibold text-ink-700">
              {site.rating.value}/5 · {site.rating.count}+ happy clients
            </span>
          </div>
        </div>

        <Suspense fallback={<div className="mx-auto h-96 max-w-2xl animate-pulse rounded-3xl bg-ink-100" />}>
          <QuoteWizard />
        </Suspense>

        <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-500">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600" aria-hidden>
                <path d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

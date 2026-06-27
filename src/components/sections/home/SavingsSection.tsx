import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { SavingsVisual } from "./SavingsVisual";

const HIGHLIGHTS = [
  "Bundle home + auto and save on both",
  "Multi-vehicle & multi-policy discounts",
  "Safe-driver & paid-in-full savings",
  "Loyalty and renewal reviews every year",
];

export function SavingsSection() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-15%] top-[-10%] h-96 w-96 rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-80 w-80 rounded-full bg-brand-800/50 blur-3xl" />
      </div>

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-200">
            <span aria-hidden className="h-px w-5 bg-brand-300/60" /> Real savings, real fast
          </p>
          <h2 className="text-[1.85rem] font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.08]">
            Switch and save hundreds a year
          </h2>
          <p className="mt-4 max-w-md text-[1.075rem] leading-relaxed text-brand-100/80">
            Rates drift up every year. If you haven&apos;t compared in the last 12 months, you&apos;re
            probably overpaying — let&apos;s find out in minutes, free.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-[0.97rem] text-brand-50">
                <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" variant="primary" size="lg">See How Much You Could Save</Button>
            <Button href={site.phone.href} variant="white" size="lg">Call {site.phone.display}</Button>
          </div>
          <p className="mt-4 text-xs text-brand-100/60">
            Savings vary by driver, coverage, ZIP code, and carrier.
          </p>
        </div>

        <SavingsVisual />
      </div>
    </section>
  );
}

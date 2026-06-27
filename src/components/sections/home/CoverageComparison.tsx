import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";

const ROWS = [
  { label: "Compares multiple carriers", us: true, them: false },
  { label: "Independent, unbiased advice", us: true, them: false },
  { label: "Bilingual local agent", us: true, them: false },
  { label: "Stacks every discount", us: true, them: false },
  { label: "Same-day certificates & ID cards", us: true, them: true },
  { label: "Handles SR-22 & high-risk", us: true, them: false },
  { label: "One agency for personal + business", us: true, them: false },
  { label: "Tied to a single company's prices", us: false, them: true },
];

export function CoverageComparison() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="The independent advantage"
        title="Why an independent agency beats going direct"
        description="Going direct gives you one company and one price. Kapital compares multiple top-rated carriers to find you better coverage for less."
      />

      {/* Plain-language contrast */}
      <div className="reveal mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Going direct</p>
          <p className="mt-2 text-lg font-bold text-ink-900">One company. One price.</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
            You only see that single company&apos;s rate — and you have to do all the shopping yourself.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6 ring-1 ring-brand-100">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-600">With Kapital</p>
          <p className="mt-2 text-lg font-bold text-ink-900">20+ carriers. Your best rate.</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
            We compare the market for you and stack every discount to find better coverage for less.
          </p>
        </div>
      </div>

      <div className="reveal mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-ink-100 bg-ink-50/70 px-5 py-4 text-sm font-semibold sm:px-7">
          <span className="text-ink-500">What you get</span>
          <span className="w-24 text-center text-brand-800">Kapital</span>
          <span className="w-24 text-center text-ink-400">Direct</span>
        </div>
        <ul>
          {ROWS.map((row) => (
            <li
              key={row.label}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-ink-50 px-5 py-3.5 last:border-0 sm:px-7"
            >
              <span className="text-[0.97rem] text-ink-700">{row.label}</span>
              <span className="flex w-24 justify-center">
                <Mark on={row.us} positive />
              </span>
              <span className="flex w-24 justify-center">
                <Mark on={row.them} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-9 text-center">
        <Link
          href="/quote"
          className="shine inline-flex items-center gap-2 rounded-full bg-accent-600 px-7 py-3.5 font-semibold text-white shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-accent-700"
        >
          Compare My Rates Free
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
    </Section>
  );
}

function Mark({ on, positive = false }: { on: boolean; positive?: boolean }) {
  if (on) {
    return (
      <span
        className={`grid h-7 w-7 place-items-center rounded-full ${positive ? "bg-brand-800 text-white" : "bg-ink-100 text-ink-500"}`}
        aria-label="Yes"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-50 text-ink-300" aria-label="No">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SavingsCalculator } from "@/components/calculators/SavingsCalculator";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insurance Calculators — Estimate Your Savings & Coverage",
  description:
    "Free insurance calculators from Kapital Insurance Group. Estimate your potential savings, coverage needs, and business or home insurance costs in seconds. Then get a real quote.",
  path: "/calculators",
});

const TOOLS = [
  { title: "Coverage Calculator", body: "Find out how much auto or home coverage you really need to protect your assets.", type: "Auto" },
  { title: "Business Insurance Estimator", body: "Estimate liability and property coverage for your South Florida business.", type: "Business" },
  { title: "Home Insurance Cost Estimator", body: "Get a ballpark on Florida homeowners coverage, including wind and flood.", type: "Home" },
];

export default function CalculatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="See your savings in seconds"
        subtitle="Use our free tools to estimate what you could save and how much coverage you need — then get a real, no-obligation quote from our team."
        crumbs={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculators" }]}
      />

      <Section tone="default">
        <SectionHeading
          align="left"
          eyebrow="Savings Calculator"
          title="How much could you be saving?"
        />
        <div className="mt-8">
          <SavingsCalculator />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="More tools" title="Estimate your coverage needs" />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.title}
              href={`/quote?type=${t.type}`}
              className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <h3 className="text-lg font-bold text-ink-900">{t.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{t.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Start now
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

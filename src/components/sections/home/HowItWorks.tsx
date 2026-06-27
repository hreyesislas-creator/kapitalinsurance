import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const STEPS = [
  {
    n: "1",
    title: "Tell us what you need",
    body: "Answer a few quick questions online or by phone. It takes about two minutes — no pressure, no spam.",
    icon: <><path d="M8 10h8M8 14h5" /><rect x="3" y="4" width="18" height="16" rx="2.5" /></>,
  },
  {
    n: "2",
    title: "We compare top carriers",
    body: "We shop 20+ A-rated Florida carriers at once and stack every discount you qualify for to find your best rate.",
    icon: <><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5" /></>,
  },
  {
    n: "3",
    title: "You save & get covered",
    body: "Choose your coverage and we bind it the same day — with digital ID cards and certificates ready instantly.",
    icon: <><path d="M12 4l7 2.5v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5v-5L12 4Z" /><path d="M9.5 12l1.8 1.8L15 10" /></>,
  },
];

export function HowItWorks() {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="How it works"
        title="Better coverage in three simple steps"
        description="We handle the comparison, the paperwork, and the discounts. You just enjoy the savings."
      />

      <div className="reveal relative mt-14">
        {/* Connecting line — horizontal (desktop) */}
        <div aria-hidden className="absolute left-[16.66%] right-[16.66%] top-9 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 md:block" />

        <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
          {STEPS.map((s) => (
            <li key={s.n} className="relative flex flex-col items-center text-center">
              {/* Node */}
              <span className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-4 border-white bg-brand-800 text-white shadow-card">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {s.icon}
                </svg>
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent-600 text-xs font-bold text-white ring-2 ring-white">
                  {s.n}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{s.title}</h3>
              <p className="mt-2 max-w-xs text-[0.97rem] leading-relaxed text-ink-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 text-center">
        <Button href="/quote" variant="primary" size="lg">
          Start My Free Quote
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Button>
      </div>
    </Section>
  );
}

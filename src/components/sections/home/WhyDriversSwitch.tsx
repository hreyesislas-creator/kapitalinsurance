import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";

/** Life-event triggers — each routes into the Quote Wizard with relevant context. */
const TRIGGERS: { label: string; type: string; icon: React.ReactNode }[] = [
  { label: "Buying a new car", type: "Auto", icon: <><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" /><path d="M4 13h16v4H4z" /><circle cx="7.5" cy="17.5" r="1.3" /><circle cx="16.5" cy="17.5" r="1.3" /></> },
  { label: "Monthly payment went up", type: "Auto", icon: <><path d="M12 3v18M7 7h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h8" /></> },
  { label: "Need commercial coverage", type: "Commercial Auto", icon: <><path d="M3 7h11v8H3z" /><path d="M14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="1.3" /><circle cx="17" cy="17" r="1.3" /></> },
  { label: "Buying a home", type: "Home", icon: <><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /></> },
  { label: "Starting a business", type: "Business", icon: <><rect x="3.5" y="7.5" width="17" height="11" rx="2" /><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" /></> },
  { label: "Adding a family member", type: "Auto", icon: <><circle cx="9" cy="8" r="3" /><path d="M3 19a6 6 0 0 1 12 0" /><path d="M16 11a3 3 0 1 0-1-5.8" /><path d="M21 19a5 5 0 0 0-5-5" /></> },
  { label: "Need SR-22 help", type: "SR-22", icon: <><circle cx="12" cy="10" r="5" /><path d="M9 14l-1 6 4-2 4 2-1-6" /></> },
  { label: "Want to bundle home + auto", type: "Home", icon: <><path d="M4 11l5-4 5 4" /><path d="M6 10v7h6v-7" /><path d="M13 15h7v3a1 1 0 0 1-1 1h-1M15 19a1 1 0 0 0 2 0" /></> },
];

export function WhyDriversSwitch() {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Sound familiar?"
        title="Why Florida drivers switch to Kapital"
        description="Life changes — and so should your coverage. Whatever brought you here, we'll find you a better fit in minutes."
      />
      <div className="reveal mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {TRIGGERS.map((t) => (
          <Link
            key={t.label}
            href={`/quote?type=${encodeURIComponent(t.type)}`}
            className="card-hover group flex flex-col items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft hover:border-brand-200 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-800 group-hover:text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {t.icon}
              </svg>
            </span>
            <span className="text-[0.95rem] font-bold leading-snug text-ink-900">{t.label}</span>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              Start quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

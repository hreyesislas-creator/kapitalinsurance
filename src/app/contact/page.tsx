import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { homeFaqs } from "@/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: `Contact ${site.name} — Hialeah, FL Insurance Agency`,
  description: `Contact Kapital Insurance Group in Hialeah, FL. Call ${site.phone.display} for a free, bilingual insurance quote on auto, home, commercial, and more. Same-day coverage available.`,
  path: "/contact",
});

const CARDS = [
  {
    title: "Call or text",
    body: site.phone.display,
    href: site.phone.href,
    cta: "Tap to call",
    icon: (
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    ),
  },
  {
    title: "Email us",
    body: site.email,
    href: `mailto:${site.email}`,
    cta: "Send email",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </>
    ),
  },
  {
    title: "Visit us",
    body: `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
    href: "#location",
    cta: "Get directions",
    icon: (
      <>
        <path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10Z" />
        <circle cx="12" cy="11" r="2" />
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's find you better coverage"
        subtitle="Call, text, email, or request a quote online. Our bilingual team in Hialeah is ready to help — and we can often have you covered the same day."
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      />

      <Section tone="default">
        <div className="grid gap-5 sm:grid-cols-3">
          {CARDS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-800 group-hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {c.icon}
                </svg>
              </span>
              <h2 className="mt-4 text-lg font-bold text-ink-900">{c.title}</h2>
              <p className="mt-1 text-ink-600">{c.body}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                {c.cta} →
              </span>
            </a>
          ))}
        </div>

        {/* Hours + quote prompt */}
        <div id="location" className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-ink-100 bg-ink-50/60 p-8">
            <h2 className="text-xl font-bold text-ink-900">Office hours</h2>
            <ul className="mt-4 space-y-2 text-ink-700">
              <li className="flex justify-between border-b border-ink-100 pb-2">
                <span>Monday – Friday</span> <span className="font-semibold">9:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-ink-100 pb-2">
                <span>Saturday</span> <span className="font-semibold">10:00 AM – 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span> <span className="font-semibold text-ink-400">Closed</span>
              </li>
            </ul>
            <p className="mt-5 text-sm text-ink-500">
              Serving Hialeah, Miami, Doral, and all of South Florida. Hablamos español.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-3xl bg-brand-900 p-8 text-white">
            <h2 className="text-2xl font-bold">Prefer to start online?</h2>
            <p className="mt-2 text-brand-100/85">
              Use our quick quote wizard and we&apos;ll compare carriers for you — it takes about two minutes.
            </p>
            <Link
              href="/quote"
              className="mt-5 inline-flex w-fit items-center justify-center rounded-full bg-accent-600 px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-accent-700"
            >
              Get My Free Quote
            </Link>
          </div>
        </div>
      </Section>

      <FaqSection faqs={homeFaqs} tone="muted" />
    </>
  );
}

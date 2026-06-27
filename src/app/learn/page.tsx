import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { articlesByDate } from "@/data/articles";

export const metadata: Metadata = buildMetadata({
  title: "Insurance Learning Center — Guides for Florida Drivers & Owners",
  description:
    "Clear, expert insurance guides from Kapital Insurance Group. Learn about Florida requirements, coverage options, and how to lower your premium — no jargon, just answers.",
  path: "/learn",
});

export default function LearnPage() {
  const [featured, ...rest] = articlesByDate;
  const categories = Array.from(new Set(articlesByDate.map((a) => a.category)));

  return (
    <>
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50/70 to-white">
        <div className="container-page py-8 sm:py-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Learning Center", path: "/learn" }]} />
          <div className="mt-6 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-700">Insurance Learning Center</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
              Get smart before you buy
            </h1>
            <p className="mt-4 text-lg text-ink-600">
              Plain-English guides to help Florida drivers, homeowners, and business owners make
              confident insurance decisions — and save money doing it.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c} className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-600">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section tone="default">
        {/* Featured */}
        <Link
          href={`/learn/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-lift lg:grid-cols-2"
        >
          <div className="bg-gradient-to-br from-brand-800 to-brand-950 p-8 text-white sm:p-10">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              Featured · {featured.category}
            </span>
            <h2 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">{featured.title}</h2>
            <p className="mt-3 text-brand-100/85">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white">
              Read the guide
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
          <div className="hidden items-center justify-center bg-brand-50 p-10 lg:flex">
            <div className="text-center">
              <p className="text-7xl font-extrabold text-brand-200">{featured.readMinutes}</p>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">min read</p>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              href={`/learn/${a.slug}`}
              className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">{a.category}</span>
                <span className="text-ink-500">{a.readMinutes} min</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900 group-hover:text-brand-800">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">{a.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Read more
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Have a question we didn't cover?"
        subtitle="Our bilingual team is happy to help — no pressure, no obligation. Get a free quote or just ask."
      />
    </>
  );
}

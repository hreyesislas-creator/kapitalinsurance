import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { articlesByDate } from "@/data/articles";

export function LearningPreview() {
  const featured = articlesByDate.slice(0, 3);

  return (
    <Section tone="muted">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="Insurance Learning Center"
          title="Get smart before you buy"
          description="Clear, no-jargon guides to help Florida drivers, homeowners, and business owners make confident decisions."
        />
        <Link
          href="/learn"
          className="hidden flex-shrink-0 items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50 sm:inline-flex"
        >
          View all articles
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {featured.map((a) => (
          <Link
            key={a.slug}
            href={`/learn/${a.slug}`}
            className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <span className="inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {a.category}
            </span>
            <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900 group-hover:text-brand-800">
              {a.title}
            </h3>
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-500">{a.excerpt}</p>
            <span className="mt-4 text-xs font-medium text-ink-500">{a.readMinutes} min read</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          View all articles
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}

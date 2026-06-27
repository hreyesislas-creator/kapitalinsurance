import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { servicesByPriority } from "@/data/services";

export function ServiceGrid() {
  // The four business priorities lead and are visually featured.
  const priority = servicesByPriority.slice(0, 4);
  const rest = servicesByPriority.slice(4, 12);

  return (
    <Section id="coverage" tone="default">
      <SectionHeading
        eyebrow="Coverage for every need"
        title="Insurance built around your life and your business"
        description="From the car in your driveway to the business that pays your bills — one local agency compares the market for all of it."
      />

      {/* Featured: the four priority lines */}
      <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {priority.map((service) => (
          <ServiceCard key={service.slug} service={service} featured />
        ))}
      </div>

      {/* The rest */}
      <div className="reveal mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/quote"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          See all coverage options &amp; get a quote
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}

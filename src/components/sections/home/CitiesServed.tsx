import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cities } from "@/data/locations";

export function CitiesServed() {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Local, where it counts"
        title="Serving Hialeah, Miami &amp; all of South Florida"
        description="A neighbor who knows your area — from Miami-Dade to Broward. Find dedicated coverage for your city."
      />
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
        {cities.map((c) => (
          <Link
            key={c.slug}
            href={`/auto-insurance/${c.slug}`}
            className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
          >
            {c.name}
          </Link>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-ink-500">
        Don&apos;t see your city?{" "}
        <Link href="/contact" className="font-semibold text-brand-700 hover:text-brand-900">
          We likely serve it too — get in touch.
        </Link>
      </p>
    </Section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { Reviews } from "@/components/sections/Reviews";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, localBusinessSchema, serviceSchema } from "@/lib/seo";
import { localServices, getService } from "@/data/services";
import { cities, getCity, getNearbyCities, citySlugs } from "@/data/locations";
import type { FAQ } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  // Only local-enabled services get city pages.
  return localServices.flatMap((service) =>
    citySlugs.map((city) => ({ service: service.slug, city })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city) return {};

  const noun = service.localNoun ?? service.name.toLowerCase();
  return buildMetadata({
    title: `${service.shortName} Insurance in ${city.name}, FL — ${service.name} Quotes`,
    description: `Looking for ${noun} in ${city.name}, ${city.county} County? Kapital Insurance Group compares top Florida carriers to find ${city.name} residents better coverage for less. Free, bilingual quotes.`,
    path: `/${service.slug}/${city.slug}`,
    keywords: [
      `${noun} ${city.name.toLowerCase()}`,
      `${service.shortName.toLowerCase()} insurance ${city.name.toLowerCase()}`,
      `cheap ${noun} ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} insurance agency`,
    ],
  });
}

export default async function LocalServicePage({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city || !service.localEnabled) notFound();

  const noun = service.localNoun ?? service.name.toLowerCase();
  const nearby = getNearbyCities(city.slug);
  const otherServices = localServices.filter((s) => s.slug !== service.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: service.name, path: `/${service.slug}` },
    { name: city.name, path: `/${service.slug}/${city.slug}` },
  ];

  // Localized FAQs (original per city/service combination).
  const localFaqs: FAQ[] = [
    {
      question: `How do I get the cheapest ${noun} in ${city.name}?`,
      answer: `The most effective way is to let an independent agency compare carriers for you. As a Hialeah-based UniVista franchise serving ${city.name}, we shop dozens of Florida carriers at once and stack every discount you qualify for — bundling, multi-policy, and safe-driver savings included.`,
    },
    {
      question: `Do you serve all of ${city.name}?`,
      answer: `Yes. We serve every neighborhood in ${city.name}${city.areas.length ? `, including ${city.areas.slice(0, 3).join(", ")}` : ""}, and the surrounding ${city.county} County area. You can handle everything by phone, online, or in person.`,
    },
    {
      question: `Can I get same-day ${service.shortName.toLowerCase()} coverage in ${city.name}?`,
      answer: `In most cases, yes. Once you choose your coverage we can bind your policy the same day and send digital documents immediately, so ${city.name} residents are protected right away.`,
    },
    ...service.faqs.slice(0, 2),
  ];

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema({ cityName: city.name, serviceName: service.name, path: `/${service.slug}/${city.slug}` }),
          serviceSchema({
            name: `${service.name} in ${city.name}`,
            description: `${service.name} for ${city.name}, FL residents and businesses.`,
            path: `/${service.slug}/${city.slug}`,
          }),
        ]}
      />

      <PageHero
        eyebrow={`${service.name} · ${city.name}, FL`}
        title={
          <>
            {service.name} in <span className="text-brand-800">{city.name}</span>
          </>
        }
        subtitle={`Better ${noun} for ${city.name} residents and businesses. We compare Florida's top carriers so you get the right coverage for less — with a real, bilingual local agent.`}
        crumbs={crumbs}
        icon={service.icon}
        stats={[
          { value: city.county, label: "County served" },
          { value: "20+", label: "Carriers compared" },
          { value: "Same-day", label: "Coverage available" },
          { value: "Free", label: "Local quote" },
        ]}
      />

      {/* Local intro */}
      <Section tone="default">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="max-w-2xl space-y-4 text-[1.02rem] leading-relaxed text-ink-600">
            <SectionHeading
              align="left"
              eyebrow={`Local ${service.shortName.toLowerCase()} experts`}
              title={`${service.name} made simple for ${city.name}`}
            />
            <p className="pt-2">{city.blurb}</p>
            <p>
              {service.intro[0]} As your local team for {city.name} and the rest of {city.county} County,
              we know the carriers, discounts, and coverage rules that affect you here — and we put them
              to work to lower your bill.
            </p>
            <p>
              Whether you live near {city.areas[0]} or run a business along the city&apos;s main corridors,
              getting covered is quick: request a quote online or call{" "}
              <a href="tel:+13057498219" className="font-semibold text-brand-700 hover:text-brand-900">
                (305) 749-8219
              </a>{" "}
              and we&apos;ll compare the market for you in minutes.
            </p>
            {city.localContext.map((paragraph, i) => (
              <p key={`local-${i}`}>{paragraph}</p>
            ))}
          </div>

          <aside className="lg:pl-4">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-ink-100 bg-ink-50/70 p-6 shadow-soft">
                <h3 className="text-lg font-bold text-ink-900">
                  {city.name} {service.shortName.toLowerCase()} quote
                </h3>
                <p className="mt-2 text-sm text-ink-600">Compare top carriers free — no obligation.</p>
                <Link
                  href="/quote"
                  className="mt-4 flex w-full items-center justify-center rounded-full bg-accent-600 px-5 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-accent-700"
                >
                  Start My Quote
                </Link>
              </div>
              <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">ZIP codes we serve</p>
                <p className="mt-2 text-sm text-ink-700">{city.zips.join(" · ")}</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why locals choose us"
          title={`What ${city.name} gets with Kapital Insurance Group`}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink-900">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <FaqSection
        faqs={localFaqs}
        title={`${service.name} in ${city.name} — FAQs`}
        description={`Common questions from ${city.name} residents about ${noun}.`}
      />

      <Reviews limit={3} tone="default" />

      {/* Nearby cities + other services internal linking */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-ink-900">
              {service.name} in nearby cities
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${service.slug}/${c.slug}`}
                  className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                >
                  {service.shortName} · {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink-900">Other coverage in {city.name}</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}/${city.slug}`}
                  className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                >
                  {s.name}
                </Link>
              ))}
              <Link
                href={`/${service.slug}`}
                className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 transition-all hover:bg-brand-100"
              >
                All {service.name} info
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title={`Get ${noun} in ${city.name} today`}
        subtitle={`Join your ${city.name} neighbors who switched and saved. Free quote, no obligation, se habla español.`}
        quoteLabel="Get My Free Quote"
      />
    </>
  );
}

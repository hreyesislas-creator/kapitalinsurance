import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { Reviews } from "@/components/sections/Reviews";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CtaBand } from "@/components/sections/CtaBand";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { getService, getRelatedServices, serviceSlugs } from "@/data/services";
import { cities } from "@/data/locations";

export const dynamicParams = false;

/**
 * Local service photography available in /public/images/services.
 * Only slugs listed here render a real photo in the hero; services without a
 * dedicated photo simply omit the hero image (no placeholder).
 */
const SERVICE_IMAGES: Record<string, string> = {
  "auto-insurance": "/images/services/auto-insurance.jpg",
  "business-insurance": "/images/services/business-insurance.jpg",
  "commercial-auto-insurance": "/images/services/commercial-auto-insurance.jpg",
  "home-insurance": "/images/services/home-insurance.jpg",
};

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(slug);
  const serviceImage = SERVICE_IMAGES[service.slug];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: service.name, path: `/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.metaDescription,
          path: `/${service.slug}`,
        })}
      />

      <PageHero
        eyebrow={service.heroEyebrow}
        title={service.heroHeadline}
        subtitle={service.heroSub}
        crumbs={crumbs}
        icon={service.icon}
        stats={[
          { value: "20+", label: "Carriers compared" },
          { value: "Same-day", label: "Coverage available" },
          { value: "Free", label: "No-obligation quote" },
          { value: "Bilingual", label: "English & Spanish" },
        ]}
      >
        {serviceImage && (
          <Photo
            src={serviceImage}
            alt={`${service.name} with Kapital Insurance Group in Hialeah, FL`}
            aspect="aspect-[4/3]"
            rounded="3xl"
            className="hidden lg:block shadow-card"
            sizes="(min-width: 1024px) 30vw, 0px"
          />
        )}
      </PageHero>

      {/* Intro / overview */}
      <Section tone="default">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="max-w-2xl">
            <SectionHeading
              align="left"
              eyebrow={`About ${service.name}`}
              title={`${service.name} in Hialeah & South Florida`}
            />
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-ink-600">
              {service.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Quick-quote rail */}
          <aside className="lg:pl-4">
            <div className="sticky top-28 rounded-2xl border border-ink-100 bg-ink-50/70 p-6 shadow-soft">
              <h3 className="text-lg font-bold text-ink-900">Get your free {service.shortName.toLowerCase()} quote</h3>
              <p className="mt-2 text-sm text-ink-600">
                Answer a few quick questions and we&apos;ll compare the market for you — no obligation.
              </p>
              <Link
                href="/quote"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-accent-600 px-5 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-accent-700"
              >
                Start My Quote
              </Link>
              <p className="mt-3 text-center text-xs text-ink-500">Takes about 2 minutes</p>
            </div>
          </aside>
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why choose us"
          title={`The Kapital advantage on ${service.name.toLowerCase()}`}
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

      {/* Coverage details */}
      <Section tone="default">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="What's covered"
              title="Coverage options built around you"
              description="We tailor your policy to your real needs — never more than you need, never less than you should have."
            />
          </div>
          <div className="space-y-3">
            {service.coverages.map((c, i) => (
              <div key={c.title} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-brand-800 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-ink-900">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Local SEO links for services with location pages */}
      {service.localEnabled && (
        <Section tone="muted">
          <SectionHeading
            eyebrow="Near you"
            title={`${service.name} in your city`}
            description="Dedicated local guidance for communities across Miami-Dade and Broward."
          />
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/${service.slug}/${c.slug}`}
                className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
              >
                {service.shortName} · {c.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <FaqSection
        faqs={service.faqs}
        title={`${service.name} — frequently asked questions`}
        description={`Common questions about ${service.name.toLowerCase()} in Florida, answered by our local team.`}
      />

      <Reviews limit={3} tone="muted" />

      <RelatedServices services={related} tone="default" />

      <CtaBand
        title={`Ready for better ${service.name.toLowerCase()}?`}
        subtitle="Compare top carriers in minutes and start saving today. Free, no-obligation, and bilingual."
        quoteLabel={`Get My ${service.shortName} Quote`}
      />
    </>
  );
}

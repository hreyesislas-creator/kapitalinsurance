import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reviews } from "@/components/sections/Reviews";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `About ${site.name} — Your Local Hialeah Insurance Agency`,
  description: `Meet ${site.agent.name} and the team at ${site.name}, a UniVista franchise in Hialeah, FL. Independent, bilingual, and dedicated to finding South Florida better coverage for less.`,
  path: "/about",
});

const VALUES = [
  { title: "Independent by design", body: "We're not tied to one company. We shop the whole market so your interests always come first." },
  { title: "Local & bilingual", body: "Born and based in Hialeah, we serve our neighbors in English and Spanish with a personal touch." },
  { title: "Honest guidance", body: "No upselling, no pressure. We recommend exactly the coverage you need — nothing more, nothing less." },
  { title: "Always available", body: "Real people who answer the phone, return your calls, and are here when you actually need us." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Your local insurance advocates in Hialeah"
        subtitle={`${site.name} is an independent ${site.franchiseOf} franchise built on a simple idea: South Florida deserves better coverage, lower prices, and service that actually feels personal.`}
        crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      />

      {/* Agent bio */}
      <Section tone="default">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Photo
            src="/images/about/advisor-jenisffer.jpg"
            alt={`${site.agent.name}, ${site.agent.role} at ${site.name}`}
            aspect="aspect-[4/5]"
            rounded="3xl"
            className="mx-auto max-w-sm shadow-card lg:mx-0"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <div>
            <SectionHeading align="left" eyebrow="Meet your agent" title={site.agent.name} />
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-ink-600">
              <p>
                As the licensed agent and owner of {site.name}, {site.agent.name} has made it her
                mission to take the stress and confusion out of insurance for South Florida families
                and business owners.
              </p>
              <p>
                She understands that behind every policy is a real person — a parent protecting their
                family, an entrepreneur protecting their dream, a homeowner protecting everything
                they&apos;ve built. That&apos;s why she treats every client like a neighbor, comparing
                the market carefully to find the right coverage at the right price.
              </p>
              <p>
                Fully bilingual and deeply rooted in the Hialeah community, Jenisffer and her team are
                proud to help you protect what matters most — and to be here for you long after the
                policy is signed.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "20+", l: "Carriers" },
                { v: "4.9★", l: "Client rating" },
                { v: "100%", l: "Bilingual" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-4 text-center">
                  <dt className="text-2xl font-extrabold text-brand-800">{s.v}</dt>
                  <dd className="mt-0.5 text-xs text-ink-500">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="muted">
        <SectionHeading eyebrow="What we stand for" title="The Kapital difference" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <h3 className="text-base font-bold text-ink-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Reviews tone="default" limit={6} />
      <CtaBand />
    </>
  );
}

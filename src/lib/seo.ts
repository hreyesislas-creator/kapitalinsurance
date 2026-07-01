import type { Metadata } from "next";
import { site } from "./site";

/** Build an absolute canonical URL from a path. */
export function absUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "" : clean}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** OG image path (absolute or root-relative). Defaults to dynamic OG. */
  image?: string;
  noindex?: boolean;
  keywords?: string[];
};

/** Centralized, consistent metadata builder for every page. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex,
  keywords,
}: PageMetaInput): Metadata {
  const url = absUrl(path);
  const ogImage = image ?? `/opengraph-image`;
  const fullTitle =
    path === "/" ? title : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/* ----------------------------------------------------------------------------
 * JSON-LD Schema builders
 * Each returns a plain object embedded via <JsonLd> in a <script type="application/ld+json">.
 * -------------------------------------------------------------------------- */

const ORG_ID = `${site.url}/#organization`;
const LOCALBUSINESS_ID = `${site.url}/#localbusiness`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: { "@type": "ImageObject", url: absUrl("/logo.png"), width: 1493, height: 395 },
    image: absUrl("/logo.png"),
    description: site.description,
    telephone: site.phone.e164,
    email: site.email,
    address: postalAddress(),
    areaServed: "Miami-Dade County, Florida",
    parentOrganization: {
      "@type": "Organization",
      name: site.franchiseOf,
    },
  };
}

export function insuranceAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": LOCALBUSINESS_ID,
    name: site.name,
    image: absUrl("/logo.png"),
    logo: absUrl("/logo.png"),
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card, Check, ACH",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: ["Hialeah", "Miami", "Doral", "Miami-Dade County", "Broward County"].map(
      (n) => ({ "@type": "City", name: n })
    ),
    knowsLanguage: site.languages,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.open,
      closes: h.close,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    founder: { "@type": "Person", name: site.agent.name, jobTitle: site.agent.role },
  };
}

export function localBusinessSchema(opts: { cityName: string; serviceName: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${absUrl(opts.path)}#localbusiness`,
    name: `${site.name} — ${opts.serviceName} in ${opts.cityName}`,
    image: absUrl("/logo.png"),
    url: absUrl(opts.path),
    telephone: site.phone.e164,
    priceRange: "$$",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: { "@type": "City", name: opts.cityName },
    parentOrganization: { "@id": ORG_ID },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: absUrl(opts.path),
    provider: { "@id": LOCALBUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Florida" },
    audience: { "@type": "Audience", audienceType: "Florida drivers, homeowners, and business owners" },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: absUrl(opts.path),
    url: absUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: opts.image ? absUrl(opts.image) : absUrl("/logo.png"),
    author: { "@type": "Person", name: opts.author ?? site.agent.name },
    publisher: { "@id": ORG_ID },
  };
}

export function reviewSchema(
  reviews: { author: string; rating: number; body: string; date: string }[]
) {
  // Attaches individual reviews to the single LocalBusiness node (same @id) that
  // already carries the aggregateRating in the sitewide layout schema. No
  // aggregateRating here — it must be emitted exactly once per page.
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": LOCALBUSINESS_ID,
    name: site.name,
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
    })),
  };
}

/** Speakable schema — flags answer-friendly content for voice assistants. */
export function speakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: site.address.street || undefined,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
}

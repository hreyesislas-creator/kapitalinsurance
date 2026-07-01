/**
 * Central source of truth for NAP (Name, Address, Phone), brand, and SEO defaults.
 * Used by metadata builders, JSON-LD schema, header, footer, and CTAs.
 */

export const site = {
  name: "Kapital Insurance Group",
  legalName: "Kapital Insurance Group LLC",
  franchiseOf: "UniVista Insurance",
  tagline: "We Compare. You Save.",
  description:
    "Kapital Insurance Group is a UniVista Insurance franchise in Hialeah, Florida. We compare top carriers to find you better auto, commercial, home, and business insurance for less. Free quotes in minutes.",
  // Update to the production domain when the project goes live.
  url: "https://www.kapitalinsurancegroup.com",
  locale: "en_US",
  agent: {
    name: "Jenisffer Bravo",
    role: "Licensed Insurance Agent & Owner",
  },
  phone: {
    display: "(305) 749-8219",
    e164: "+13057498219",
    href: "tel:+13057498219",
  },
  email: "quotes@kapitalinsurancegroup.com",
  address: {
    street: "5890 W 20 Ave",
    city: "Hialeah",
    region: "FL",
    regionName: "Florida",
    postalCode: "33016",
    country: "US",
    countryName: "United States",
  },
  geo: {
    // Hialeah, FL approximate center.
    latitude: 25.8576,
    longitude: -80.2781,
  },
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], open: "09:00", close: "18:00" },
    { days: ["Saturday"], open: "10:00", close: "14:00" },
  ],
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  // Aggregate rating used for Review schema + social proof. Update with real GBP data.
  rating: {
    value: 4.9,
    count: 187,
  },
  languages: ["English", "Spanish"],
} as const;

export const NAV_PRIMARY = [
  { label: "Auto", href: "/auto-insurance" },
  { label: "Commercial Auto", href: "/commercial-auto-insurance" },
  { label: "Home", href: "/home-insurance" },
  { label: "Business", href: "/business-insurance" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" },
] as const;

export const CTA = {
  quote: { label: "Get My Free Quote", href: "/quote" },
  call: { label: "Call Now", href: site.phone.href },
} as const;

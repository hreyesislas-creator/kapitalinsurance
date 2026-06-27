/**
 * Testimonials & reviews — power the Reviews/Testimonials sections and Review JSON-LD.
 * Representative of typical Kapital Insurance Group client feedback. Update with
 * verified Google Business Profile reviews before launch.
 */

export type Testimonial = {
  author: string;
  city: string;
  rating: number; // 1–5
  date: string; // ISO
  service: string;
  body: string;
};

export const testimonials: Testimonial[] = [
  {
    author: "Maria G.",
    city: "Hialeah",
    rating: 5,
    date: "2026-04-12",
    service: "Auto Insurance",
    body: "Jenisffer saved me over $90 a month on my car insurance and explained everything in Spanish. The whole thing took fifteen minutes and I had my ID cards the same day. I've already sent my whole family to her.",
  },
  {
    author: "Carlos R.",
    city: "Doral",
    rating: 5,
    date: "2026-03-28",
    service: "Commercial Auto Insurance",
    body: "I run a small delivery business and needed certificates fast to land a new contract. Kapital had everything ready within an hour. Professional, quick, and they actually answer the phone.",
  },
  {
    author: "Yanet P.",
    city: "Miami Lakes",
    rating: 5,
    date: "2026-03-10",
    service: "Home Insurance",
    body: "Florida home insurance was stressing me out until I called Kapital. They found me a better policy for less and walked me through my hurricane deductible so I finally understood it. Highly recommend.",
  },
  {
    author: "Andres M.",
    city: "Miami",
    rating: 5,
    date: "2026-02-22",
    service: "Business Insurance",
    body: "They set up my LLC and my general liability at the same time. One stop and I was ready to operate. You can tell they really know small business here in Miami.",
  },
  {
    author: "Daniela S.",
    city: "Pembroke Pines",
    rating: 5,
    date: "2026-02-05",
    service: "Auto Insurance",
    body: "After a ticket I needed an SR-22 and thought it would be a nightmare. They filed it same day and got me a price way lower than I expected. Lifesavers.",
  },
  {
    author: "Roberto L.",
    city: "Hialeah",
    rating: 5,
    date: "2026-01-18",
    service: "Home & Auto Bundle",
    body: "Bundled my home and two cars and saved on both. The team is patient, bilingual, and never made me feel rushed. This is how insurance should be.",
  },
  {
    author: "Ivette C.",
    city: "Coral Gables",
    rating: 5,
    date: "2026-01-03",
    service: "Umbrella Insurance",
    body: "They reviewed my coverage and recommended an umbrella policy I didn't even know I needed. Real advice, not a sales pitch. I feel genuinely protected now.",
  },
  {
    author: "Jose D.",
    city: "Miramar",
    rating: 5,
    date: "2025-12-15",
    service: "Workers Compensation",
    body: "Got my construction company compliant with workers' comp without overpaying. They understood the Florida requirements perfectly and made it painless.",
  },
];

/** Mapped into Review JSON-LD. */
export const reviewsForSchema = testimonials.map((t) => ({
  author: t.author,
  rating: t.rating,
  body: t.body,
  date: t.date,
}));

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Premium "Visit Our Office" section. Left = live Google Map, right = an elegant
 * location card (address, hours, phone, areas served, CTAs).
 *
 * SWAP-IN (no layout change required):
 *  - To show a real office photo instead of the map, set OFFICE_IMAGE to a local
 *    path in /public. Both fill the exact same framed area, so swapping never
 *    shifts the layout.
 */
const OFFICE_IMAGE: string | null = null;

const HOURS = [
  { days: "Mon – Fri", time: "9:00 AM – 6:00 PM" },
  { days: "Saturday", time: "10:00 AM – 2:00 PM" },
  { days: "Sunday", time: "Closed", closed: true },
];

const SERVING = [
  "Hialeah",
  "Miami",
  "Doral",
  "Kendall",
  "Miami Lakes",
  "Pembroke Pines",
  "Coral Gables",
];

export function VisitOffice() {
  const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
  const mapQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  // No-API-key Google Maps embed centered on the office address.
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;

  return (
    <section className="lg:col-span-12">
      <p className="mb-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-200">
        <span aria-hidden className="h-px w-5 bg-brand-300/60" /> Serving South Florida
      </p>

      <div className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — live Google Map (or office photo when OFFICE_IMAGE is set) */}
        <div className="relative min-h-[20rem] overflow-hidden rounded-3xl bg-brand-950 ring-1 ring-white/10 shadow-lift lg:min-h-[26rem]">
          {OFFICE_IMAGE ? (
            <Image
              src={OFFICE_IMAGE}
              alt={`${site.name} office in ${site.address.city}, ${site.address.region}`}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          ) : (
            <iframe
              src={mapEmbedSrc}
              title={`Map to ${site.name} at ${fullAddress}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>

        {/* Right — location card */}
        <div className="flex flex-col rounded-3xl bg-white p-7 text-ink-800 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-bold text-ink-900">{site.name}</h2>

          {/* Address */}
          <div className="mt-4 flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10Z" /><circle cx="12" cy="11" r="2" />
              </svg>
            </span>
            <address className="not-italic leading-relaxed">
              <span className="block font-semibold text-ink-900">{site.address.street}</span>
              <span className="block text-ink-600">
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </address>
          </div>

          {/* Hours + Phone */}
          <div className="mt-6 grid gap-6 border-t border-ink-100 pt-6 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600" aria-hidden>
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
                Office Hours
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {HOURS.map((h) => (
                  <li key={h.days} className="flex justify-between gap-3">
                    <span className="text-ink-600">{h.days}</span>
                    <span className={h.closed ? "font-medium text-ink-400" : "font-semibold text-ink-800"}>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600" aria-hidden>
                  <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
                </svg>
                Phone
              </p>
              <a href={site.phone.href} className="mt-3 inline-block text-lg font-bold text-brand-800 hover:text-brand-900">
                {site.phone.display}
              </a>
              <p className="mt-1 text-xs text-ink-500">English &amp; Spanish · Same-day coverage</p>
            </div>
          </div>

          {/* Serving */}
          <div className="mt-6 border-t border-ink-100 pt-6">
            <p className="text-sm font-bold text-ink-900">Serving</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SERVING.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-ink-200 bg-ink-50/60 px-3 py-1 text-xs font-medium text-ink-700"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={directionsHref} variant="primary" size="md" target="_blank" rel="noopener noreferrer" className="flex-1">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 11l19-9-9 19-2-8-8-2Z" />
              </svg>
              Get Directions
            </Button>
            <Button href={site.phone.href} variant="secondary" size="md" className="flex-1">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
              </svg>
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

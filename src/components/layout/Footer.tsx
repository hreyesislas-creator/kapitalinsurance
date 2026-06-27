import Link from "next/link";
import { site } from "@/lib/site";
import { servicesByPriority } from "@/data/services";
import { cities } from "@/data/locations";
import { articlesByDate } from "@/data/articles";
import { Logo } from "@/components/ui/Logo";
import { StarRating } from "@/components/ui/StarRating";
import { VisitOffice } from "@/components/sections/VisitOffice";

export function Footer() {
  const year = 2026;
  const topServices = servicesByPriority.slice(0, 8);
  const topArticles = articlesByDate.slice(0, 5);

  return (
    <footer className="bg-brand-950 text-brand-100">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-6 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">Ready to save on insurance?</h2>
            <p className="mt-1 text-brand-100/80">
              Get a free, no-obligation quote in minutes — or call and talk to a real person.
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="rounded-full bg-accent-600 px-6 py-3 font-semibold text-white shadow-[var(--shadow-cta)] transition-colors hover:bg-accent-700"
            >
              Get My Free Quote
            </Link>
            <a
              href={site.phone.href}
              className="rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/15"
            >
              Call {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-page grid gap-10 py-14 lg:grid-cols-12">
        {/* Brand + NAP */}
        <div className="lg:col-span-4">
          <Logo className="h-11 w-auto" invert />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/75">
            {site.name} is an independent {site.franchiseOf} franchise serving Hialeah, Miami, and all
            of South Florida. We compare top carriers to find you better coverage for less.
          </p>

          {/* Google rating */}
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-xl bg-white/5 px-3.5 py-2.5 ring-1 ring-inset ring-white/10">
            <span className="text-lg font-extrabold text-white">{site.rating.value.toFixed(1)}</span>
            <span>
              <StarRating value={site.rating.value} />
              <span className="block text-xs text-brand-100/70">{site.rating.count}+ Google reviews</span>
            </span>
          </div>

          <address className="mt-5 space-y-1.5 text-sm not-italic">
            <p>
              <a href={site.phone.href} className="text-base font-semibold text-white hover:text-brand-200">
                {site.phone.display}
              </a>
            </p>
            <p className="text-brand-100/75">
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
            <p className="text-brand-100/75">
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            </p>
          </address>

          {/* Hours */}
          <div className="mt-5 text-sm">
            <p className="font-semibold text-white">Office hours</p>
            <ul className="mt-1.5 space-y-1 text-brand-100/75">
              <li className="flex justify-between gap-6"><span>Mon – Fri</span> <span>9:00 AM – 6:00 PM</span></li>
              <li className="flex justify-between gap-6"><span>Saturday</span> <span>10:00 AM – 2:00 PM</span></li>
              <li className="flex justify-between gap-6"><span>Sunday</span> <span className="text-brand-100/50">Closed</span></li>
            </ul>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-brand-100/80">
              <span aria-hidden>🗣️</span> We help you in English &amp; Spanish
            </p>
          </div>
        </div>

        {/* Link columns */}
        <nav className="lg:col-span-2" aria-label="Insurance services">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Insurance</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {topServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-brand-100/75 transition-colors hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-3" aria-label="Cities served">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Areas We Serve</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {cities.slice(0, 12).map((c) => (
              <li key={c.slug}>
                <Link href={`/auto-insurance/${c.slug}`} className="text-brand-100/75 transition-colors hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <nav aria-label="Learning Center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Learning Center</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {topArticles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/learn/${a.slug}`} className="text-brand-100/75 transition-colors hover:text-white">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="mt-6" aria-label="Company">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li><Link href="/about" className="text-brand-100/75 hover:text-white">About</Link></li>
              <li><Link href="/calculators" className="text-brand-100/75 hover:text-white">Calculators</Link></li>
              <li><Link href="/contact" className="text-brand-100/75 hover:text-white">Contact</Link></li>
              <li><Link href="/quote" className="text-brand-100/75 hover:text-white">Get a Quote</Link></li>
            </ul>
          </nav>
        </div>

        {/* Visit Our Office — premium location section (live map embed swaps in here later) */}
        <VisitOffice />
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-brand-100/60 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved. {site.name} is an independent {site.franchiseOf} franchise.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

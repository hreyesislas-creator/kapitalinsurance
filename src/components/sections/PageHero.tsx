import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { StarRating } from "@/components/ui/StarRating";
import type { IconKey } from "@/data/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Interior page hero with breadcrumbs, headline, dual CTAs, and an optional
 * stat rail. Used by service, location, and content pages for a consistent,
 * conversion-first top of page.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  icon,
  stats,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  crumbs: Crumb[];
  icon?: IconKey;
  stats?: { value: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-100 bg-gradient-to-b from-brand-50/70 to-white">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="container-page relative py-8 sm:py-12 lg:py-16">
        <Breadcrumbs items={crumbs} />

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-brand-800">
              {icon && <Icon name={icon} className="h-4 w-4" />}
              {eyebrow}
            </div>
            <h1 className="mt-4 text-[2.2rem] font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{subtitle}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/quote" variant="primary" size="lg">
                Get My Free Quote
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
              <Button href={site.phone.href} variant="secondary" size="lg">
                Call {site.phone.display}
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-2">
                <StarRating value={site.rating.value} />
                <span className="text-sm font-semibold text-ink-700">
                  {site.rating.value}/5
                  <span className="font-normal text-ink-500"> · {site.rating.count}+ reviews</span>
                </span>
              </div>
              <span className="hidden h-4 w-px bg-ink-200 sm:block" aria-hidden />
              <p className="text-sm text-ink-500">Free &amp; no obligation · English &amp; Spanish</p>
            </div>
          </div>

          {children}
        </div>

        {stats && (
          <dl className={cn("mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4")}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink-100 bg-white px-5 py-4 shadow-soft">
                <dt className="text-2xl font-extrabold text-brand-800">{s.value}</dt>
                <dd className="mt-0.5 text-sm text-ink-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

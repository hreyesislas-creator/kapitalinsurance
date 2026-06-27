import Link from "next/link";
import type { Service } from "@/data/services";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function ServiceCard({
  service,
  className,
  featured = false,
}: {
  service: Service;
  className?: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/${service.slug}`}
      className={cn(
        "card-hover group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-soft hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        featured ? "border-brand-200/80 ring-1 ring-brand-100" : "border-ink-100 hover:border-brand-200",
        className,
      )}
    >
      {/* Featured accent + label */}
      {featured && (
        <>
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 to-brand-800" />
          <span className="absolute right-4 top-4 rounded-full bg-brand-50 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-brand-700">
            Popular
          </span>
        </>
      )}

      <span
        className={cn(
          "inline-grid h-14 w-14 place-items-center rounded-2xl ring-1 ring-inset transition-all duration-300 group-hover:scale-105",
          featured
            ? "bg-brand-800 text-white ring-brand-900/10"
            : "bg-brand-50 text-brand-700 ring-brand-100 group-hover:bg-brand-800 group-hover:text-white",
        )}
      >
        <Icon name={service.icon} className="h-7 w-7 transition-transform duration-500 group-hover:-rotate-6" />
      </span>

      <h3 className="mt-4 text-lg font-bold text-ink-900">{service.name}</h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-600">{service.heroSub}</p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
        Get a quote
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

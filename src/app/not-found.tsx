import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { servicesByPriority } from "@/data/services";
import { site } from "@/lib/site";

export default function NotFound() {
  const popular = servicesByPriority.slice(0, 4);
  return (
    <section className="grid place-items-center px-5 py-24 text-center">
      <div className="max-w-lg">
        <p className="text-7xl font-extrabold text-brand-100">404</p>
        <h1 className="mt-2 text-3xl font-bold text-ink-900">Page not found</h1>
        <p className="mt-3 text-ink-600">
          The page you&apos;re looking for moved or doesn&apos;t exist. Let&apos;s get you back on track —
          or grab a free quote while you&apos;re here.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/quote" variant="primary" size="lg">Get a Free Quote</Button>
          <Button href={site.phone.href} variant="secondary" size="lg">Call {site.phone.display}</Button>
        </div>
        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">Popular coverage</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {popular.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

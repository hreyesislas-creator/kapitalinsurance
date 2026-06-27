import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/** Reusable high-contrast conversion band used at the bottom of most pages. */
export function CtaBand({
  title = "Stop overpaying for insurance.",
  subtitle = "Get a free quote in minutes or call now — our bilingual team is ready to help you save.",
  quoteLabel = "Get My Free Quote",
}: {
  title?: string;
  subtitle?: string;
  quoteLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 sm:py-20">
      {/* decorative glow */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-600/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent-600/20 blur-3xl" />
      <div className="container-page relative text-center">
        <h2 className="mx-auto max-w-2xl text-[1.85rem] font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.08]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[1.075rem] leading-relaxed text-brand-100/85">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/quote" variant="primary" size="lg">
            {quoteLabel}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Button>
          <Button href={site.phone.href} variant="white" size="lg">
            Call {site.phone.display}
          </Button>
        </div>
        <p className="mt-5 text-sm text-brand-100/70">
          Free &amp; no obligation · Takes about 2 minutes · Hablamos español
        </p>
      </div>
    </section>
  );
}

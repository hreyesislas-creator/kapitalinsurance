/**
 * Carrier trust strip — communicates "we shop the market" with a continuous,
 * tasteful marquee of nationally recognized carriers we compare. Rendered as
 * clean monochrome wordmarks (no copyrighted logo art), the standard, honest
 * presentation for an independent agency.
 */
const CARRIERS = [
  "GEICO",
  "Progressive",
  "Travelers",
  "National General",
  "Safeco",
  "Mercury",
  "Bristol West",
  "Foremost",
  "Hartford",
];

export function CarrierLogos() {
  return (
    <section className="border-y border-ink-100 bg-white py-10">
      <div className="container-page">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-ink-500">
          We compare coverage options from top insurance carriers
        </p>
      </div>

      <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max [animation:marquee_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none] motion-reduce:justify-center motion-reduce:flex-wrap motion-reduce:gap-x-10">
          {[...CARRIERS, ...CARRIERS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-7 shrink-0 text-xl font-bold tracking-tight text-ink-300 transition-colors hover:text-brand-700 sm:text-2xl"
              aria-hidden={i >= CARRIERS.length}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

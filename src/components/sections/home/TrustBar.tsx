const STATS = [
  { value: "20+", label: "A-rated carriers compared" },
  { value: "5 min", label: "Average quote time" },
  { value: "Same-day", label: "Coverage & ID cards" },
  { value: "100%", label: "Bilingual service" },
];

export function TrustBar() {
  return (
    <section className="bg-ink-50/60">
      <div className="container-page">
        <dl className="reveal grid grid-cols-2 divide-ink-200/70 py-2 sm:divide-x lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-7 text-center">
              <dt className="bg-gradient-to-br from-brand-700 to-brand-900 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-ink-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

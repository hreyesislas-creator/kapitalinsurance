import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { GoogleRating } from "@/components/ui/GoogleRating";
import { site } from "@/lib/site";

const POINTS = [
  { title: "Bilingual: English & Spanish", body: "Get help in the language you're most comfortable with — todo en español también." },
  { title: "Local Florida expertise", body: "Based in Hialeah, serving Miami-Dade and Broward — I know our carriers and rules." },
  { title: "Auto, commercial, home & business", body: "One trusted advisor for your car, your home, and the business you've built." },
  { title: "Friendly, personal service", body: "No call centers. You work directly with me, and I'm here long after you sign." },
];

export function MeetAdvisor() {
  return (
    <section className="relative overflow-hidden bg-ink-50/70 py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-brand-50 blur-3xl" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Photo */}
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100/70 to-transparent" />
          <Photo
            src="/images/about/advisor-jenisffer.jpg"
            alt="Jenisffer Bravo, licensed bilingual insurance advisor and owner of Kapital Insurance Group"
            aspect="aspect-[4/5]"
            rounded="3xl"
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="shadow-card ring-1 ring-black/5"
          />
          {/* Signature badge */}
          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-ink-100 bg-white px-5 py-3 shadow-lift">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-800 text-sm font-bold text-white">JB</span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-ink-900">{site.agent.name}</p>
              <p className="text-xs text-ink-500">Licensed Agent &amp; Owner</p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="mt-6 lg:mt-0">
          <p className="mb-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
            <span aria-hidden className="h-px w-5 bg-brand-300" /> Meet your local advisor
          </p>
          <h2 className="text-[1.85rem] font-bold leading-[1.1] text-ink-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.08]">
            Work directly with Jenisffer Bravo
          </h2>
          <p className="mt-4 max-w-xl text-[1.075rem] leading-relaxed text-ink-600">
            A local, bilingual advisor serving Hialeah, Miami, and South Florida. Jenisffer treats
            every client like a neighbor — shopping the market to find you better coverage for less,
            and picking up the phone when you actually need her.
          </p>

          <ul className="mt-7 grid gap-4 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 13l4 4L19 7" /></svg>
                </span>
                <div>
                  <h3 className="text-[0.97rem] font-bold text-ink-900">{p.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-600">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={site.phone.href} variant="primary" size="lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
              </svg>
              Talk to Jenisffer
            </Button>
            <Button href="/quote" variant="ghost" size="lg">Get My Free Quote</Button>
            <div className="hidden sm:block"><GoogleRating /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

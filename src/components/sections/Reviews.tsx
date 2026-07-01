import { Section, SectionHeading } from "@/components/ui/Section";
import { StarRating } from "@/components/ui/StarRating";
import { GoogleG } from "@/components/ui/GoogleRating";
import { JsonLd } from "@/components/ui/JsonLd";
import { reviewSchema } from "@/lib/seo";
import { testimonials, reviewsForSchema } from "@/data/testimonials";
import { site } from "@/lib/site";

export function Reviews({
  tone = "default",
  limit = 6,
  withSchema = false,
}: {
  tone?: "default" | "muted";
  limit?: number;
  /**
   * Emit Review structured data. Only enable on pages where Google expects
   * review markup (home, About, a dedicated reviews page) — never on every
   * service/city page, where sitewide self-serving ratings risk being ignored.
   */
  withSchema?: boolean;
}) {
  const items = testimonials.slice(0, limit);

  return (
    <Section tone={tone}>
      {withSchema && <JsonLd data={reviewSchema(reviewsForSchema)} />}
      <SectionHeading
        eyebrow="Loved by South Florida"
        title="Hundreds of neighbors, one trusted advisor"
        description="Here's what real clients say about working with Jenisffer and the Kapital team."
      />

      <div className="mt-6 flex items-center justify-center gap-2.5">
        <GoogleG className="h-5 w-5" />
        <span className="text-sm font-semibold text-ink-800">{site.rating.value.toFixed(1)}</span>
        <StarRating value={site.rating.value} />
        <span className="text-sm text-ink-500">Based on {site.rating.count}+ Google reviews</span>
      </div>

      <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.author + t.date}
            className="card-hover relative flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft hover:border-brand-200 hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <StarRating value={t.rating} />
              <GoogleG className="h-4 w-4 opacity-70" />
            </div>
            <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink-700">
              &ldquo;{t.body}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-800 ring-1 ring-inset ring-brand-100">
                {t.author.split(" ").map((p) => p[0]).join("")}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink-900">{t.author}</p>
                <p className="text-xs text-ink-500">{t.city} · {t.service}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { buildMetadata, articleSchema, faqSchema, speakableSchema } from "@/lib/seo";
import { getArticle, getRelatedArticles, articleSlugs } from "@/data/articles";
import { getService } from "@/data/services";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/learn/${article.slug}`,
    keywords: article.keywords,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);
  const ctaService = getService(article.ctaService);
  const path = `/learn/${article.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Learning Center", path: "/learn" },
    { name: article.title, path },
  ];
  const formattedDate = new Date(article.datePublished).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: article.title,
            description: article.metaDescription,
            path,
            datePublished: article.datePublished,
            dateModified: article.dateModified,
            author: article.author,
          }),
          faqSchema(article.faqs),
          speakableSchema(["h1", ".article-intro"]),
        ]}
      />

      <article>
        {/* Header */}
        <header className="border-b border-ink-100 bg-gradient-to-b from-brand-50/60 to-white">
          <div className="container-page py-8 sm:py-12">
            <Breadcrumbs items={crumbs} />
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700">{article.category}</span>
                <span className="text-ink-500">{article.readMinutes} min read</span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-[2.6rem]">
                {article.title}
              </h1>
              <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-800 text-sm font-bold text-white">
                  JB
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-ink-900">{article.author}</p>
                  <p className="text-ink-500">Licensed Agent · Updated {formattedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page py-10 sm:py-14">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_280px]">
            {/* Body */}
            <div className="max-w-3xl">
              <div className="article-intro space-y-4 text-lg leading-relaxed text-ink-700">
                {article.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {article.sections.map((section) => (
                <section key={section.heading} className="mt-10">
                  <h2 className="text-2xl font-bold tracking-tight text-ink-900">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-[1.02rem] leading-relaxed text-ink-600">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-[1.02rem] text-ink-600">
                          <span className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* In-article CTA */}
              <div className="mt-12 overflow-hidden rounded-3xl bg-brand-900 p-8 text-center text-white">
                <h2 className="text-2xl font-bold">
                  {ctaService ? `Ready for a ${ctaService.shortName.toLowerCase()} quote?` : "Ready to save on insurance?"}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-brand-100/85">
                  Our bilingual team compares top Florida carriers to find you better coverage for less.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    href={ctaService ? `/quote?type=${encodeURIComponent(ctaService.shortName)}` : "/quote"}
                    variant="primary"
                    size="lg"
                  >
                    Get My Free Quote
                  </Button>
                  <Button href={site.phone.href} variant="white" size="lg">
                    Call {site.phone.display}
                  </Button>
                </div>
              </div>

              {/* FAQ */}
              {article.faqs.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-bold tracking-tight text-ink-900">Frequently asked questions</h2>
                  <div className="mt-5">
                    <FAQAccordion faqs={article.faqs} />
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-6">
                  <h3 className="text-base font-bold text-ink-900">Free quote in minutes</h3>
                  <p className="mt-2 text-sm text-ink-600">Compare carriers and start saving today.</p>
                  <Link
                    href="/quote"
                    className="mt-4 flex items-center justify-center rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
                  >
                    Get My Quote
                  </Link>
                </div>

                {ctaService && (
                  <div className="rounded-2xl border border-ink-100 p-6">
                    <h3 className="text-base font-bold text-ink-900">Related coverage</h3>
                    <Link
                      href={`/${ctaService.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
                    >
                      {ctaService.name}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mx-auto mt-16 max-w-5xl border-t border-ink-100 pt-10">
              <h2 className="text-2xl font-bold text-ink-900">Keep reading</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/learn/${a.slug}`}
                    className="group rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="text-xs font-semibold text-brand-700">{a.category}</span>
                    <h3 className="mt-2 font-bold leading-snug text-ink-900 group-hover:text-brand-800">{a.title}</h3>
                    <span className="mt-2 block text-xs text-ink-500">{a.readMinutes} min read</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

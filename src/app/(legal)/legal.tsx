import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/** Shared shell for simple legal/long-form pages. */
export function LegalLayout({
  title,
  updated,
  crumbLabel,
  path,
  children,
}: {
  title: string;
  updated: string;
  crumbLabel: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-ink-100 bg-gradient-to-b from-brand-50/50 to-white">
        <div className="container-page py-8 sm:py-10">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: crumbLabel, path }]} />
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-ink-500">Last updated: {updated}</p>
        </div>
      </header>
      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-5 text-[1.02rem] leading-relaxed text-ink-600 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-900">
          {children}
        </div>
      </div>
    </>
  );
}

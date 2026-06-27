import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <JsonLd data={breadcrumbSchema(items)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="font-medium text-ink-700" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-brand-700 transition-colors">
                    {item.name}
                  </Link>
                  <span aria-hidden className="text-ink-300">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

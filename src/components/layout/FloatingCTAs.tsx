"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/**
 * Mobile-first floating conversion bar: persistent Call + Quote actions.
 * Hidden on the quote flow itself to avoid distraction.
 */
export function FloatingCTAs() {
  const pathname = usePathname();
  if (pathname.startsWith("/quote")) return null;

  return (
    <>
      {/* Mobile: full-width sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md shadow-[0_-8px_24px_-16px_rgba(16,24,40,0.3)] lg:hidden">
        <div className="flex gap-2.5">
          <a
            href={site.phone.href}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-800 py-3 text-[0.95rem] font-semibold text-white"
          >
            <PhoneIcon /> Call Now
          </a>
          <Link
            href="/quote"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-600 py-3 text-[0.95rem] font-semibold text-white"
          >
            Free Quote
          </Link>
        </div>
      </div>

      {/* Desktop: floating call pill bottom-right */}
      <a
        href={site.phone.href}
        className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-brand-800 py-3 pl-3 pr-5 text-white shadow-lift transition-transform hover:scale-105 lg:flex"
        aria-label={`Call ${site.phone.display}`}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
          <PhoneIcon />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[0.7rem] uppercase tracking-wide text-brand-100/80">Call now</span>
          <span className="block text-sm font-bold">{site.phone.display}</span>
        </span>
      </a>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}

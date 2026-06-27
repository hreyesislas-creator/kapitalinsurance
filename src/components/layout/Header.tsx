"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, NAV_PRIMARY, CTA } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(16,24,40,0.06),0_8px_24px_-16px_rgba(16,24,40,0.25)]"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      {/* Micro top bar — phone + trust */}
      <div className="hidden border-b border-ink-100 bg-brand-950 text-white lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="text-brand-100/90">
            UniVista Insurance Franchise · Hialeah, FL · Se Habla Español
          </p>
          <div className="flex items-center gap-4 text-brand-100/90">
            <span>Mon–Fri 9–6 · Sat 10–2</span>
            <a href={site.phone.href} className="font-semibold text-white hover:text-brand-200">
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Logo className="h-10 w-auto sm:h-11" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_PRIMARY.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                  active ? "text-brand-800" : "text-ink-600 hover:text-brand-800 hover:bg-brand-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Button href={CTA.call.href} variant="ghost" size="sm" aria-label={`Call ${site.phone.display}`}>
            <PhoneIcon /> {site.phone.display}
          </Button>
          <Button href={CTA.quote.href} variant="primary" size="sm">
            {CTA.quote.label}
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button href={CTA.call.href} variant="ghost" size="sm" aria-label="Call now" className="px-3">
            <PhoneIcon />
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full text-ink-700 hover:bg-ink-100"
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M3 7h18" />
                  <path d="M3 12h18" />
                  <path d="M3 17h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-ink-100 bg-white lg:hidden animate-[fade-in_0.2s_ease]">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink-800 hover:bg-brand-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2.5">
              <Button href={CTA.quote.href} variant="primary" size="lg" className="w-full">
                {CTA.quote.label}
              </Button>
              <Button href={CTA.call.href} variant="secondary" size="lg" className="w-full">
                <PhoneIcon /> {site.phone.display}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}

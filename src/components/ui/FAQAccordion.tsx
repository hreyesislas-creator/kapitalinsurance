"use client";

import { useState } from "react";
import type { FAQ } from "@/data/services";
import { cn } from "@/lib/cn";

export function FAQAccordion({ faqs, className }: { faqs: FAQ[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white", className)}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="px-5 sm:px-6">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-[1.02rem] font-semibold text-ink-900">{faq.question}</span>
                <span
                  className={cn(
                    "grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-ink-200 text-ink-500 transition-transform duration-200",
                    isOpen && "rotate-45 border-brand-300 bg-brand-50 text-brand-700",
                  )}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-[0.97rem] leading-relaxed text-ink-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

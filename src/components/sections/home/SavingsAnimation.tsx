"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated savings card — counts up the figure and grows the comparison bars
 * once the card scrolls into view. Respects prefers-reduced-motion.
 */
export function SavingsAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(0);
  const target = 804;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setActive(true); setValue(target); return; }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || value === target) return;
    let start: number | null = null;
    let raf = 0;
    const duration = 1100;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-sm">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lift backdrop-blur-sm">
        <div className="rounded-2xl bg-white p-6">
          <p className="text-sm font-medium text-ink-500">Your estimated savings</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-5xl font-extrabold text-brand-800 tabular-nums">${value.toLocaleString()}</span>
            <span className="pb-2 text-sm font-semibold text-ink-500">/ year*</span>
          </div>
          <div className="mt-5 space-y-3">
            <Bar label="Going direct" value={100} grown={active} muted />
            <Bar label="With Kapital" value={62} grown={active} />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-500">
            *Illustrative example. Savings vary by driver, coverage, ZIP code, and carrier. We&apos;ll quote your real numbers free.
          </p>
        </div>
      </div>
    </div>
  );
}

function Bar({ label, value, grown, muted = false }: { label: string; value: number; grown: boolean; muted?: boolean }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-medium">
        <span className="text-ink-600">{label}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-out ${muted ? "bg-ink-300" : "bg-gradient-to-r from-brand-600 to-brand-800"}`}
          style={{ width: grown ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

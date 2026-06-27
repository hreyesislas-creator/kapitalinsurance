import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "brand" | "dark";
}) {
  const tones = {
    default: "bg-white",
    muted: "bg-ink-50",
    brand: "bg-brand-50",
    dark: "bg-brand-950 text-white",
  } as const;
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  invert?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em]",
            invert ? "text-brand-200" : "text-brand-700",
          )}
        >
          <span aria-hidden className={cn("h-px w-5", invert ? "bg-brand-300/60" : "bg-brand-300")} />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-[1.85rem] font-bold leading-[1.1] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.08]",
          invert ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[1.075rem] leading-relaxed text-pretty",
            centered && "mx-auto max-w-xl",
            invert ? "text-brand-100/80" : "text-ink-600",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

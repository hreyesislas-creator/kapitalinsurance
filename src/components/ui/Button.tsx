import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "shine group/btn inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-[transform,box-shadow,background-color,color] duration-200 ease-out active:translate-y-0 active:scale-[0.98] active:duration-75 focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap select-none will-change-transform";

const variants: Record<Variant, string> = {
  // Primary CTA — RED, reserved for the strongest conversion actions.
  primary:
    "bg-accent-600 text-white shadow-[var(--shadow-cta)] hover:bg-accent-700 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(224,25,51,0.55)] focus-visible:outline-accent-600",
  // Secondary — brand blue.
  secondary:
    "bg-brand-800 text-white shadow-soft hover:bg-brand-900 hover:-translate-y-0.5 hover:shadow-card focus-visible:outline-brand-800",
  ghost:
    "bg-white/70 text-brand-800 ring-1 ring-inset ring-brand-200 backdrop-blur hover:bg-brand-50 hover:ring-brand-300 focus-visible:outline-brand-800",
  white:
    "bg-white text-brand-900 shadow-soft hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2 min-h-[2.5rem]",
  md: "text-[0.95rem] px-5 py-2.5 min-h-[2.75rem]",
  lg: "text-base px-7 py-3.5 min-h-[3.25rem]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
} & ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">
  | ({ href?: undefined } & ComponentProps<"button">));

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    const external = href.startsWith("tel:") || href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} {...(rest as ComponentProps<"a">)} />
      );
    }
    return <Link href={href} className={classes} {...(rest as Omit<ComponentProps<typeof Link>, "href" | "className">)} />;
  }

  return <button className={classes} {...(props as ComponentProps<"button">)} />;
}

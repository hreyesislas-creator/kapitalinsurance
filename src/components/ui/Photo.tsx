import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Premium image slot — renders an optimized next/image from a local asset in
 * /public. Example: <Photo src="/images/hero/hero-jenisffer.jpg" alt="…" />.
 *
 * Uses `fill` + object-cover so the image fills its aspect-ratio frame, with
 * `priority` for above-the-fold images and lazy loading everywhere else.
 */
export function Photo({
  src,
  alt,
  priority,
  className,
  rounded = "2xl",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  aspect = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  rounded?: "xl" | "2xl" | "3xl" | "full";
  sizes?: string;
  aspect?: string;
}) {
  const radius = {
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div className={cn("relative overflow-hidden", radius, aspect, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

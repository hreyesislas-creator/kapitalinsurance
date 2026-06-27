import { cn } from "@/lib/cn";

export function StarRating({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-0.5 text-amber-400", className)} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < Math.round(value) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 17l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.5Z" />
        </svg>
      ))}
    </div>
  );
}

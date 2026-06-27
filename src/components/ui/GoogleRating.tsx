import { StarRating } from "./StarRating";
import { site } from "@/lib/site";

/** Google-style rating proof badge for hero / trust contexts. */
export function GoogleRating({ className }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-2xl border border-ink-100 bg-white/90 px-4 py-2.5 shadow-soft backdrop-blur ${className ?? ""}`}
    >
      <GoogleG className="h-6 w-6" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-ink-900">{site.rating.value.toFixed(1)}</span>
          <StarRating value={site.rating.value} className="scale-90" />
        </div>
        <span className="text-xs text-ink-500">
          {site.rating.count}+ Google reviews
        </span>
      </div>
    </div>
  );
}

/** Shared Google "G" mark — single source of truth for Google branding. */
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6Z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.4 1.1-3.9 1.1-3 0-5.5-2-6.4-4.8H1.8v3C3.7 21.4 7.5 24 12 24Z" />
      <path fill="#FBBC05" d="M5.6 14.6a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3Z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.5 0 3.7 2.6 1.8 6.4l3.8 3C6.5 6.7 9 4.8 12 4.8Z" />
    </svg>
  );
}

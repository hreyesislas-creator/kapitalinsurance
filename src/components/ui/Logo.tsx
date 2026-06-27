import { cn } from "@/lib/cn";

/**
 * Corporate agency wordmark — a solid protective shield emblem paired with a
 * strong uppercase wordmark and a "UniVista Insurance Agency" endorsement line.
 * Deliberately authoritative (no gradients/playful shapes) to read as a
 * trustworthy insurance agency rather than a SaaS startup.
 */
export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  const navy = invert ? "#ffffff" : "#0a3d91";
  const sub = invert ? "rgba(255,255,255,0.72)" : "#5d6a7a";
  const emblemFill = invert ? "#ffffff" : "#0a3d91";
  const emblemMark = invert ? "#0a3d91" : "#ffffff";

  return (
    <svg viewBox="0 0 196 46" className={cn(className)} role="img" aria-label="Kapital Insurance Group — a UniVista Insurance Agency">
      {/* Shield emblem */}
      <path
        d="M21 2.5 L37 7.2 V21 C37 31.5 30.4 38 21 41.5 C11.6 38 5 31.5 5 21 V7.2 Z"
        fill={emblemFill}
      />
      {/* Inner protective check / pillar mark */}
      <path
        d="M14.5 21.8 L19 26.2 L28 14.5"
        fill="none"
        stroke={emblemMark}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Wordmark */}
      <text
        x="48"
        y="22"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="0.5"
        fill={navy}
      >
        KAPITAL
      </text>
      <text
        x="49"
        y="35.5"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontSize="8"
        fontWeight="700"
        letterSpacing="3.4"
        fill={sub}
      >
        INSURANCE GROUP
      </text>
    </svg>
  );
}

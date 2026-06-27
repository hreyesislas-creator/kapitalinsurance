import type { IconKey } from "@/data/services";

type IconProps = {
  name: IconKey;
  className?: string;
};

/**
 * Lightweight inline SVG icon set (stroke-based, currentColor).
 * Inline SVG avoids an icon-library dependency and ships zero extra JS.
 */
const paths: Record<IconKey, React.ReactNode> = {
  car: (
    <>
      <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" />
      <path d="M4 13h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v8H3V7Z" />
      <path d="M14 9h3.5a1 1 0 0 1 .8.4L21 13v2h-7V9Z" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  home: (
    <>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6 10.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="11" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      <path d="M3.5 12h17" />
    </>
  ),
  shield: (
    <>
      <path d="M12 4l7 2.5v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5v-5L12 4Z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  hardhat: (
    <>
      <path d="M4 17a8 8 0 0 1 16 0" />
      <path d="M3 17h18" />
      <path d="M10 9.5V7a2 2 0 0 1 4 0v2.5" />
      <path d="M10 11V9.5M14 11V9.5" />
    </>
  ),
  motorcycle: (
    <>
      <circle cx="5.5" cy="16" r="2.5" />
      <circle cx="18.5" cy="16" r="2.5" />
      <path d="M5.5 16h6l3-4h3M14 8h3v2" />
      <path d="M8 12l2-2h4" />
    </>
  ),
  boat: (
    <>
      <path d="M4 14h16l-2 4a2 2 0 0 1-1.8 1.2H7.8A2 2 0 0 1 6 18l-2-4Z" />
      <path d="M7 14V7l8 2v5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="3.5" />
      <path d="M10.5 10.5 19 19m-3-3 2-2m-4 0 2-2" />
    </>
  ),
  wave: (
    <>
      <path d="M3 9c2 0 2 1.5 4 1.5S9 9 11 9s2 1.5 4 1.5S17 9 19 9" />
      <path d="M3 13c2 0 2 1.5 4 1.5S9 13 11 13s2 1.5 4 1.5S17 13 19 13" />
      <path d="M3 17c2 0 2 1.5 4 1.5S9 17 11 17s2 1.5 4 1.5S17 17 19 17" />
    </>
  ),
  heart: (
    <path d="M12 19s-6-4-8-7.5C2.6 9 3.5 6 6.5 6 8.4 6 9.5 7.2 12 9.5 14.5 7.2 15.6 6 17.5 6c3 0 3.9 3 2.5 5.5C18 15 12 19 12 19Z" />
  ),
  leaf: (
    <>
      <path d="M5 19c0-7 5-12 14-12 0 9-5 14-12 14-1.5 0-2-2-2-2Z" />
      <path d="M8 16c2.5-3 5-4.5 8-5.5" />
    </>
  ),
  umbrella: (
    <>
      <path d="M12 4c4.5 0 8 3.2 8 7H4c0-3.8 3.5-7 8-7Z" />
      <path d="M12 4v0M12 11v6a2 2 0 0 0 4 0" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="10" r="5" />
      <path d="M9 14l-1 6 4-2 4 2-1-6" />
      <path d="M10 10l1.3 1.3L14 8.5" />
    </>
  ),
  stamp: (
    <>
      <path d="M9 4.5h6a1 1 0 0 1 1 1V8a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V5.5a1 1 0 0 1 1-1Z" transform="translate(0 0)" />
      <path d="M7 15h10l1 3.5a1 1 0 0 1-1 1.3H7a1 1 0 0 1-1-1.3L7 15Z" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1.5" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h6" />
    </>
  ),
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

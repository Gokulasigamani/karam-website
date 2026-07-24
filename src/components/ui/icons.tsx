import type { SVGProps } from "react";

/**
 * Inline icon set — keeps the bundle free of an icon dependency and lets every
 * glyph inherit `currentColor`. Add to `icons` and the union type updates itself.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Megaphone(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 10v4a2 2 0 0 0 2 2h1l9 4V4L7 8H6a2 2 0 0 0-2 2Z" />
      <path d="M19 9a3.5 3.5 0 0 1 0 6M8 16v3.5a1.5 1.5 0 0 0 3 0V17" />
    </svg>
  );
}

function Users(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="9" cy="8" r="3.4" />
      <path d="M3 20a6 6 0 0 1 12 0M16.5 5.2a3.4 3.4 0 0 1 0 6.6M18 14.4A5.6 5.6 0 0 1 21.5 20" />
    </svg>
  );
}

function Building(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3 21h18M4 21V10l8-5.5L20 10v11" />
      <path d="M9.5 21v-5h5v5M9 12h.01M15 12h.01" />
    </svg>
  );
}

function ShieldCheck(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 3 5 6v5.5c0 4.3 3 8.2 7 9.5 4-1.3 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

function HandHeart(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M11.5 8.6 10.4 7.5a2.1 2.1 0 0 0-3 3l4.1 4 4.1-4a2.1 2.1 0 0 0-3-3l-1.1 1.1Z" />
      <path d="M3 20.5v-3a2 2 0 0 1 2-2h3l2.5 2h3a1.6 1.6 0 0 1 0 3.2H11" />
      <path d="M14 20.7h2.6a3 3 0 0 0 2.3-1.1L21 17" />
    </svg>
  );
}

function MapPin(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function FileText(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

function Stethoscope(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M4.5 3h2M13 3h2M10 12v2.5a5 5 0 0 0 10 0V13" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  );
}

function BookOpen(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 6.5C10.5 5 8.4 4.4 4 4.6v13c4.4-.2 6.5.4 8 1.9 1.5-1.5 3.6-2.1 8-1.9v-13c-4.4-.2-6.5.4-8 1.9Z" />
      <path d="M12 6.5V19" />
    </svg>
  );
}

function Home(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}

function Scale(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 4v16M7 20h10M5 8h14M12 4.5 5 8M12 4.5 19 8" />
      <path d="M5 8 2.5 14a3 3 0 0 0 5 0L5 8ZM19 8l-2.5 6a3 3 0 0 0 5 0L19 8Z" />
    </svg>
  );
}

function LifeBuoy(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="m5.6 5.6 3.8 3.8m5.2 5.2 3.8 3.8m0-12.8-3.8 3.8m-5.2 5.2-3.8 3.8" />
    </svg>
  );
}

function Check(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

function Verified(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M12 1.8l2.3 1.7 2.8-.3 1 2.7 2.4 1.5-.8 2.7.8 2.7-2.4 1.5-1 2.7-2.8-.3L12 22.2l-2.3-1.7-2.8.3-1-2.7-2.4-1.5.8-2.7-.8-2.7 2.4-1.5 1-2.7 2.8.3L12 1.8Z" />
      <path
        d="m8.7 12.2 2.2 2.2 4.3-4.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowUp(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 20V5m-6 6 6-6 6 6" />
    </svg>
  );
}

function Sun(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

function Moon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M20 13.5A8.2 8.2 0 0 1 10.5 4a8.5 8.5 0 1 0 9.5 9.5Z" />
    </svg>
  );
}

function Plus(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Menu(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function Close(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Facebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.5-1.5H16.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3H10v8h3.5Z" />
    </svg>
  );
}

function Twitter(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M17.2 3h3.3l-7.2 8.3L21.7 21h-6.6l-4.3-5.6L5.8 21H2.5l7.7-8.8L2.6 3h6.8l3.9 5.2L17.2 3Zm-1.2 16h1.8L8.1 4.8H6.2L16 19Z" />
    </svg>
  );
}

function Linkedin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M6.9 8.5H3.7V21h3.2V8.5ZM5.3 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.3 21h-3.2v-6.1c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9V21H10s.1-11.3 0-12.5h3.2v1.8c.4-.7 1.2-1.7 3-1.7 2.2 0 3.9 1.4 3.9 4.5V21Z" />
    </svg>
  );
}

/** Brand mark — an eight-petal bloom: many people, one effort. */
export function Logo(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props} aria-hidden="true">
      {[0, 45, 90, 135].map((angle) => (
        <ellipse
          key={angle}
          cx="16"
          cy="16"
          rx="4.4"
          ry="13"
          fill="currentColor"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
      {/* Always dark: the mark sits on lime as often as on the page */}
      <circle cx="16" cy="16" r="4" fill="var(--color-shade)" />
    </svg>
  );
}

export const icons = {
  megaphone: Megaphone,
  users: Users,
  building: Building,
  shieldCheck: ShieldCheck,
  handHeart: HandHeart,
  mapPin: MapPin,
  fileText: FileText,
  stethoscope: Stethoscope,
  bookOpen: BookOpen,
  home: Home,
  scale: Scale,
  lifeBuoy: LifeBuoy,
  check: Check,
  verified: Verified,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  sun: Sun,
  moon: Moon,
  plus: Plus,
  menu: Menu,
  close: Close,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Component = icons[name];
  return <Component {...props} />;
}

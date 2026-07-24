import { cn } from "@/lib/utils/cn";

/**
 * Two hands reaching toward each other — drawn rather than photographed, so the
 * banner is always on-brand, weighs nothing, and never depends on a stock image
 * loading. Built from rounded forms so it reads cleanly at any size.
 */
function Hand({ transform }: { transform: string }) {
  return (
    <g transform={transform} fill="currentColor">
      {/* sleeve and forearm */}
      <rect x="-40" y="50" width="118" height="52" rx="26" />
      {/* palm */}
      <rect x="64" y="34" width="80" height="84" rx="30" />
      {/* thumb */}
      <rect x="74" y="18" width="46" height="16" rx="8" transform="rotate(-32 74 26)" />
      {/* fingers */}
      <rect x="134" y="42" width="52" height="16" rx="8" />
      <rect x="136" y="63" width="60" height="16" rx="8" />
      <rect x="134" y="84" width="54" height="16" rx="8" />
      <rect x="128" y="103" width="42" height="15" rx="7.5" />
    </g>
  );
}

export function HelpingHands({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-lime-400",
        className,
      )}
      role="img"
      aria-label="Two hands reaching toward one another"
    >
      <svg
        viewBox="0 0 800 300"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full text-ink"
        aria-hidden="true"
      >
        {/* Halo behind the meeting point */}
        <circle cx="400" cy="150" r="112" fill="currentColor" opacity="0.08" />
        <circle cx="400" cy="150" r="72" fill="currentColor" opacity="0.08" />

        <Hand transform="translate(70 58) scale(1.55)" />
        <Hand transform="translate(730 58) scale(-1.55 1.55)" />
      </svg>
    </div>
  );
}

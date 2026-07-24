import { cn } from "@/lib/utils/cn";

/** Accessible progress indicator — screen readers get the value, not just a div. */
export function ProgressBar({
  value,
  label,
  className,
}: {
  /** 0–100. Clamped, so bad data can't overflow the track. */
  value: number;
  label: string;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-ink", className)}
    >
      <div
        className="h-full rounded-full bg-lime-400 transition-[width] duration-700 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

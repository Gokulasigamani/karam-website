import { cn } from "@/lib/utils/cn";

/** First letters of the first two words, e.g. "Anitha Raj" → "AR". */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const second = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + second).toUpperCase();
}

/**
 * A user's photo, or their initials on a tinted disc when there is none. Used in
 * the profile header and the ward-team list. `photo` is a small data-URL, so a
 * plain <img> (not next/image) keeps it self-contained and avoids the optimizer.
 */
export function Avatar({
  name,
  photo,
  className,
  textClassName,
}: {
  name: string;
  photo?: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-surface-strong text-ink select-none",
        className,
      )}
      aria-hidden={photo ? undefined : true}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={name} className="size-full object-cover" />
      ) : (
        <span className={cn("font-extrabold tracking-tight", textClassName)}>{initials(name)}</span>
      )}
    </span>
  );
}

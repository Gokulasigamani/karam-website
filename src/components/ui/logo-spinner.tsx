import { Logo } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * The one loading indicator for the whole app: a full-screen frosted panel with
 * the Karam mark spinning. Used for the opening splash, route transitions, and
 * the language switch, so loading always looks the same.
 *
 * Pure CSS animation (`animate-spin`) — no JavaScript state, so it works as a
 * server-streamed `loading.tsx` fallback as well as a client overlay.
 */
export function LogoSpinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "fixed inset-0 z-[100] grid place-items-center bg-canvas/85 backdrop-blur-xl",
        className,
      )}
    >
      <Logo className="size-14 animate-spin text-lime-500 [animation-duration:1.1s] sm:size-16" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

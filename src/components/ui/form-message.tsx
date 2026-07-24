import type { FormState } from "@/types/form";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./icons";

/**
 * The banner a form shows after submitting. `role="status"` means screen
 * readers announce the result without the user having to hunt for it.
 */
export function FormMessage({ state, className }: { state: FormState; className?: string }) {
  if (state.status === "idle" || !state.message) return null;

  const isSuccess = state.status === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 rounded-xl px-4 py-3.5 text-[0.8125rem] leading-relaxed font-medium",
        isSuccess ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
        className,
      )}
    >
      <Icon
        name={isSuccess ? "check" : "close"}
        strokeWidth={2.5}
        className="mt-0.5 size-4 shrink-0"
      />
      <span>{state.message}</span>
    </div>
  );
}

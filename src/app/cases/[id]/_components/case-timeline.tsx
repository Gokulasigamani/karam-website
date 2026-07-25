import type { CaseEvent } from "@/content/cases";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * The resolution trail. Completed steps get a filled marker, pending ones a
 * hollow outline — the shape carries the state, not just the colour, so it
 * still reads without colour vision.
 */
export function CaseTimeline({
  events,
  doneLabel,
  pendingLabel,
}: {
  events: CaseEvent[];
  doneLabel: string;
  pendingLabel: string;
}) {
  return (
    <ol className="mt-6">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;

        return (
          <Reveal as="li" key={event.title} delay={index * 60} className="flex gap-4">
            {/* Marker column: the rule is drawn by the spacer, so it stops at
                the last item instead of trailing off the end */}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                  event.done
                    ? "bg-lime-400 text-shade"
                    : "border-2 border-dashed border-hairline bg-canvas",
                )}
              >
                {event.done && <Icon name="check" className="size-3.5" />}
                <span className="sr-only">{event.done ? doneLabel : pendingLabel}</span>
              </span>
              {!isLast && <span aria-hidden="true" className="w-px flex-1 bg-hairline" />}
            </div>

            <div className={cn("pb-7", isLast && "pb-0")}>
              <p className="text-[0.6875rem] font-bold tracking-[0.1em] text-muted uppercase">
                {event.date}
              </p>
              <h3
                className={cn(
                  "mt-1.5 text-[0.9375rem] font-bold",
                  event.done ? "text-ink" : "text-muted",
                )}
              >
                {event.title}
              </h3>
              <p className="mt-1.5 max-w-xl text-[0.875rem] leading-[1.7] text-muted">
                {event.detail}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

import { departments, governmentIntro, governmentPoints } from "@/content/government";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

/**
 * The part that separates Karam from a petition site: named departments with
 * stated response times.
 *
 * One light panel instead of a grid of cards — the copy sits on an open column
 * on the left, the routing table on a soft surface at the right. Rows stagger in
 * on scroll and lift their pill on hover.
 */
export function Officials() {
  return (
    <Section id="officials" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="text-[1.625rem] leading-[1.15] font-extrabold text-ink sm:text-[2rem] lg:text-[2.375rem]">
              {governmentIntro.title}
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.65] text-muted lg:text-base">
              {governmentIntro.description}
            </p>
          </Reveal>

          {/* Open list, no cards — a rule and a tick per line */}
          <ul className="mt-9">
            {governmentPoints.map((point, index) => (
              <Reveal as="li" key={point} delay={120 + index * 80}>
                <div className="flex gap-4 border-t border-hairline py-5 last:border-b">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime-400 text-shade">
                    <Icon name="check" className="size-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-[0.875rem] leading-[1.65] text-muted">{point}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={100}>
          <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-6 sm:p-8 lg:p-9">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[1.0625rem] font-bold text-ink">Departments On Karam</h3>
              <span className="text-xs font-medium text-muted">Median first reply</span>
            </div>

            <ul className="mt-6">
              {departments.map((department, index) => (
                <Reveal as="li" key={department.name} delay={200 + index * 70}>
                  <div className="group flex items-center justify-between gap-4 border-t border-hairline py-4 last:border-b">
                    <div className="min-w-0">
                      <p className="truncate text-[0.9375rem] font-semibold text-ink">
                        {department.name}
                      </p>
                      <p className="mt-0.5 truncate text-[0.8125rem] text-muted">
                        {department.scope}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-elevated px-3 py-1.5 text-xs font-bold text-ink transition-colors duration-300 group-hover:bg-lime-400 group-hover:text-shade">
                      {department.responseTime}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

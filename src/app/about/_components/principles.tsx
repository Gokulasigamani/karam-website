import { principles } from "@/content/about";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/** Closing band: what Karam will not do, then the one thing it asks you to do. */
export function Principles() {
  return (
    <Container className="pb-16 lg:pb-20">
      <Reveal>
        <div className="card-pattern-invert rounded-[var(--radius-block)] bg-contrast px-6 py-12 text-paper sm:px-10 sm:py-14 lg:px-14">
          <h2 className="max-w-2xl text-[1.625rem] leading-[1.15] font-extrabold sm:text-[2rem] lg:text-[2.25rem]">
            Three Rules We Do Not Bend.
          </h2>

          <ul className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={100 + index * 90}>
                <span className="text-xs font-bold tabular-nums text-lime-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-bold">{principle.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-[1.7] text-white/55">
                  {principle.description}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={380}>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Button href={routes.raiseConcern} size="lg">
                Raise A Concern
              </Button>
              <Button href={routes.cases} variant="onDark" size="lg">
                See Live Cases
              </Button>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </Container>
  );
}

import { steps, stepsIntro } from "@/content/steps";
import { Section, SectionHeading, Card } from "@/components/ui/section";
import { Icon } from "@/components/ui/icons";

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeading title={stepsIntro.title} description={stepsIntro.description} />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number}>
            <Card className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-lime-200 text-ink">
                  <Icon name={step.icon} className="size-[1.125rem]" />
                </span>
                <span className="text-xs font-bold tracking-[0.1em] text-muted/60">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-10 text-[1.0625rem] font-bold text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[0.8125rem] leading-[1.65] text-muted">
                {step.description}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

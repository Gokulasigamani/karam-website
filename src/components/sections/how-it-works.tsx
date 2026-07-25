import { getTranslations } from "next-intl/server";
import { Section, SectionHeading, Card } from "@/components/ui/section";
import { Icon, type IconName } from "@/components/ui/icons";

/** Structure stays in code; the step text comes from the message catalog. */
const STEP_ICONS: IconName[] = ["megaphone", "users", "building", "shieldCheck"];

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <Section id="how-it-works">
      <SectionHeading title={t("title")} description={t("description")} />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Card className="card-pattern flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-lime-200 text-shade">
                  <Icon name={STEP_ICONS[index]} className="size-[1.125rem]" />
                </span>
                <span className="text-xs font-bold tracking-[0.1em] text-muted/60">
                  {String(index + 1).padStart(2, "0")}
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

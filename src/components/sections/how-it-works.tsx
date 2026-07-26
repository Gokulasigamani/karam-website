"use client";

import { useTranslations } from "next-intl";
import { Section, SectionHeading, Card } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionCta } from "@/components/ui/section-cta";
import { routes } from "@/constants/routes";
import { Icon, type IconName } from "@/components/ui/icons";

/** Structure stays in code; the step text comes from the message catalog. */
const STEP_ICONS: IconName[] = ["megaphone", "users", "building", "shieldCheck"];

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const tc = useTranslations("common");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeading title={t("title")} description={t("description")} />
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 80}>
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
          </Reveal>
        ))}
      </ul>

      <SectionCta
        primary={{ label: tc("raiseConcern"), href: routes.raiseConcern }}
        secondary={{ label: tc("seeAllCases"), href: routes.cases }}
      />
    </Section>
  );
}

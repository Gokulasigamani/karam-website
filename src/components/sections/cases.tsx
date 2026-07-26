"use client";

import { useTranslations } from "next-intl";
import type { CaseRecord } from "@/content/cases";
import { routes } from "@/constants/routes";
import { Section, SectionHeading } from "@/components/ui/section";
import { CaseCard } from "@/components/sections/case-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

/**
 * The landing-page teaser. A plain responsive grid — one column on phones, two
 * on tablets, three from `lg`. No horizontal rail: overflow scrollers are where
 * small-screen layouts usually break, and a stacked card reads better on a
 * phone anyway.
 *
 * The cases are fetched by the server page and passed in, so this stays a client
 * component that re-renders instantly on a language switch.
 */
const TEASER_COUNT = 3;

export function Cases({ cases }: { cases: CaseRecord[] }) {
  const t = useTranslations();
  const featured = cases.slice(0, TEASER_COUNT);

  return (
    <Section id="cases" className="pt-0 sm:pt-0 lg:pt-0">
      <SectionHeading title={t("casesTeaser.title")} description={t("casesTeaser.description")} />

      {featured.length > 0 && (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          {featured.map((record, index) => (
            <Reveal as="li" key={record.id} delay={index * 80} className="h-full">
              <CaseCard record={record} />
            </Reveal>
          ))}
        </ul>
      )}

      <Reveal className="mt-8 flex justify-center lg:mt-10">
        <Button href={routes.cases} variant="subtle" size="lg">
          {t("common.seeAllCases")}
          <Icon name="arrowRight" className="size-4" />
        </Button>
      </Reveal>
    </Section>
  );
}

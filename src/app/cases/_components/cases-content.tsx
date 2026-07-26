"use client";

import { useTranslations } from "next-intl";
import type { CaseRecord } from "@/content/cases";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { PageBanner, BannerStats } from "@/components/ui/page-banner";
import { CaseCard } from "@/components/sections/case-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

export function CasesContent({
  cases,
  image,
}: {
  cases: CaseRecord[];
  image: { url: string; alt: string };
}) {
  const t = useTranslations();
  const openCount = cases.filter((record) => record.status !== "Resolved").length;
  const supporters = cases.reduce((total, record) => total + record.supporters, 0);

  return (
    <>
      <PageBanner
        eyebrow={t("casesPage.eyebrow")}
        title={t("casesPage.title")}
        rotating={{
          prefix: t("casesPage.rotatingPrefix"),
          items: t.raw("casesPage.rotating") as string[],
        }}
        description={t("casesPage.description")}
        image={image}
        aside={
          <BannerStats
            stats={[
              { value: String(openCount), label: t("casesPage.statOpen") },
              { value: supporters.toLocaleString("en-IN"), label: t("casesPage.statSupporting") },
              { value: t("casesPage.verifiedValue"), label: t("casesPage.statVerified") },
            ]}
          />
        }
      />

      <Container className="pb-16 lg:pb-24">
        {cases.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {cases.map((record, index) => (
              <Reveal as="li" key={record.id} delay={index * 80} className="h-full">
                <CaseCard record={record} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-8 text-center lg:p-12">
              <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
                {t("casesPage.emptyTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-[0.875rem] leading-[1.7] text-muted">
                {t("casesPage.emptyBody")}
              </p>
              <Button href={routes.raiseConcern} className="mt-6">
                {t("common.raiseConcern")}
                <Icon name="arrowRight" className="size-4" />
              </Button>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="card-pattern mt-10 rounded-[var(--radius-block)] bg-surface p-7 lg:mt-12 lg:p-9">
            <h2 className="max-w-lg text-[1.375rem] leading-[1.2] font-extrabold text-ink lg:text-[1.625rem]">
              {t("casesPage.ctaTitle")}
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-muted">
              {t("casesPage.ctaBody")}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Button href={routes.volunteer} size="lg">
                {t("common.volunteerNearYou")}
                <Icon name="arrowRight" className="size-4" />
              </Button>
              <Button href={routes.raiseConcern} variant="dark" size="lg">
                {t("common.raiseConcern")}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}

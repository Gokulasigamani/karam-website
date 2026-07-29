"use client";

import { useTranslations } from "next-intl";
import type { PrivacySection } from "@/content/pages";
import { routes } from "@/constants/routes";
import { PageBanner } from "@/components/ui/page-banner";
import { PolicyArticle, PolicyFooterCard } from "@/components/sections/policy-article";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icons";

/**
 * Body of a legal page (privacy / terms / accessibility). A client component so
 * the whole document — banner, section list and long-form text — re-renders in
 * the chosen language the instant the switch is tapped.
 */
export function LegalContent({
  ns,
  asideIcon,
  reviewed = false,
}: {
  ns: "privacy" | "terms" | "accessibility";
  asideIcon: IconName;
  reviewed?: boolean;
}) {
  const t = useTranslations("legal");

  return (
    <>
      <PageBanner
        eyebrow={t(`${ns}.eyebrow`)}
        title={t(`${ns}.title`)}
        rotating={{
          prefix: t(`${ns}.rotatingPrefix`),
          items: t.raw(`${ns}.rotating`) as string[],
        }}
        description={t(`${ns}.description`)}
        aside={
          <p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-[0.75rem] font-semibold text-white/70">
            <Icon name={asideIcon} className="size-3.5" />
            {t(reviewed ? "lastReviewedLabel" : "lastUpdatedLabel")} {t("lastUpdated")}
          </p>
        }
      />

      <PolicyArticle
        sections={t.raw(`${ns}.sections`) as PrivacySection[]}
        footer={
          <PolicyFooterCard title={t(`${ns}.footerTitle`)} description={t(`${ns}.footerBody`)}>
            <Button href={routes.contact}>
              {t(`${ns}.footerCta`)}
              <Icon name="arrowRight" className="size-4" />
            </Button>
          </PolicyFooterCard>
        }
      />
    </>
  );
}

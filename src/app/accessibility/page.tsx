import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PrivacySection } from "@/content/pages";
import { accessibilityPage } from "@/content/pages";
import { routes } from "@/constants/routes";
import { PageBanner } from "@/components/ui/page-banner";
import { PolicyArticle, PolicyFooterCard } from "@/components/sections/policy-article";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "The standard Karam holds itself to, what that means in practice, where we currently fall short, and how to tell us something is blocking you.",
};

export default async function AccessibilityPage() {
  const t = await getTranslations();

  return (
    <>
      <PageBanner
        eyebrow={t("legal.accessibility.eyebrow")}
        title={t("legal.accessibility.title")}
        rotating={{
          prefix: t("legal.accessibility.rotatingPrefix"),
          items: t.raw("legal.accessibility.rotating") as string[],
        }}
        description={t("legal.accessibility.description")}
        image={accessibilityPage.image}
        aside={
          <p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-[0.75rem] font-semibold text-white/70">
            <Icon name="fileText" className="size-3.5" />
            {t("legal.lastReviewedLabel")} {t("legal.lastUpdated")}
          </p>
        }
      />

      <PolicyArticle
        sections={t.raw("legal.accessibility.sections") as PrivacySection[]}
        footer={
          <PolicyFooterCard
            title={t("legal.accessibility.footerTitle")}
            description={t("legal.accessibility.footerBody")}
          >
            <Button href={routes.contact}>
              {t("legal.accessibility.footerCta")}
              <Icon name="arrowRight" className="size-4" />
            </Button>
          </PolicyFooterCard>
        }
      />
    </>
  );
}

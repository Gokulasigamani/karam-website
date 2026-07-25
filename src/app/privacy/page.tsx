import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PrivacySection } from "@/content/pages";
import { privacyPage } from "@/content/pages";
import { routes } from "@/constants/routes";
import { PageBanner } from "@/components/ui/page-banner";
import { PolicyArticle, PolicyFooterCard } from "@/components/sections/policy-article";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Karam collects, who can see it, what is shared with government departments, and how to have it removed.",
};

export default async function PrivacyPage() {
  const t = await getTranslations();

  return (
    <>
      <PageBanner
        eyebrow={t("legal.privacy.eyebrow")}
        title={t("legal.privacy.title")}
        rotating={{
          prefix: t("legal.privacy.rotatingPrefix"),
          items: t.raw("legal.privacy.rotating") as string[],
        }}
        description={t("legal.privacy.description")}
        image={privacyPage.image}
        aside={
          <p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-[0.75rem] font-semibold text-white/70">
            <Icon name="fileText" className="size-3.5" />
            {t("legal.lastUpdatedLabel")} {t("legal.lastUpdated")}
          </p>
        }
      />

      <PolicyArticle
        sections={t.raw("legal.privacy.sections") as PrivacySection[]}
        footer={
          <PolicyFooterCard
            title={t("legal.privacy.footerTitle")}
            description={t("legal.privacy.footerBody")}
          >
            <Button href={routes.contact}>
              {t("legal.privacy.footerCta")}
              <Icon name="arrowRight" className="size-4" />
            </Button>
          </PolicyFooterCard>
        }
      />
    </>
  );
}

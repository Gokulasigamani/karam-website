import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PrivacySection } from "@/content/pages";
import { termsPage } from "@/content/pages";
import { routes } from "@/constants/routes";
import { PageBanner } from "@/components/ui/page-banner";
import { PolicyArticle, PolicyFooterCard } from "@/components/sections/policy-article";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Terms Of Use",
  description:
    "What Karam is and is not, what we ask of members and volunteers, and the limits of our responsibility.",
};

export default async function TermsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageBanner
        eyebrow={t("legal.terms.eyebrow")}
        title={t("legal.terms.title")}
        rotating={{
          prefix: t("legal.terms.rotatingPrefix"),
          items: t.raw("legal.terms.rotating") as string[],
        }}
        description={t("legal.terms.description")}
        image={termsPage.image}
        aside={
          <p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-[0.75rem] font-semibold text-white/70">
            <Icon name="scale" className="size-3.5" />
            {t("legal.lastUpdatedLabel")} {t("legal.lastUpdated")}
          </p>
        }
      />

      <PolicyArticle
        sections={t.raw("legal.terms.sections") as PrivacySection[]}
        footer={
          <PolicyFooterCard
            title={t("legal.terms.footerTitle")}
            description={t("legal.terms.footerBody")}
          >
            <Button href={routes.contact}>
              {t("legal.terms.footerCta")}
              <Icon name="arrowRight" className="size-4" />
            </Button>
          </PolicyFooterCard>
        }
      />
    </>
  );
}

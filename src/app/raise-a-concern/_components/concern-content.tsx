"use client";

import { useTranslations } from "next-intl";
import { ConcernForm } from "@/features/concern";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { PageBanner, BannerSteps } from "@/components/ui/page-banner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

export function ConcernContent({
  loggedIn,
  image,
}: {
  loggedIn: boolean;
  image: { url: string; alt: string };
}) {
  const t = useTranslations();

  return (
    <>
      <PageBanner
        eyebrow={t("concernPage.eyebrow")}
        title={t("concernPage.title")}
        rotating={{
          prefix: t("concernPage.rotatingPrefix"),
          items: t.raw("concernPage.rotating") as string[],
        }}
        description={t("concernPage.description")}
        image={image}
        aside={<BannerSteps steps={t.raw("concernPage.steps") as string[]} />}
      />

      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.85fr)] lg:gap-14">
          <Reveal>
            {loggedIn ? (
              <ConcernForm />
            ) : (
              <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-7 lg:p-8">
                <h2 className="text-[1.0625rem] font-extrabold text-ink">
                  {t("concernPage.loginTitle")}
                </h2>
                <p className="mt-2 max-w-md text-[0.875rem] leading-[1.7] text-muted">
                  {t("concernPage.loginBody")}
                </p>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <Button href={`${routes.signup}?next=${encodeURIComponent(routes.raiseConcern)}`}>
                    {t("common.createAccount")}
                  </Button>
                  <Button
                    href={`${routes.login}?next=${encodeURIComponent(routes.raiseConcern)}`}
                    variant="subtle"
                  >
                    {t("common.logIn")}
                  </Button>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={120}>
            <aside className="card-pattern-invert rounded-[var(--radius-block)] bg-contrast p-7 text-paper lg:sticky lg:top-24 lg:p-8">
              <h2 className="text-[1.0625rem] font-bold">{t("concernPage.reassuranceTitle")}</h2>

              <ul className="mt-5 space-y-4">
                {(t.raw("concernPage.reassurance") as string[]).map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-lime-400 text-shade">
                      <Icon name="check" className="size-2.5" strokeWidth={3} />
                    </span>
                    <span className="text-[0.8125rem] leading-[1.65] text-white/60">{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </Container>
    </>
  );
}

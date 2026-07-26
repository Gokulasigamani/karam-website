"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { VolunteerForm } from "@/features/volunteer";
import type { Role } from "@/features/auth/types";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { PageBanner, BannerStats } from "@/components/ui/page-banner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Icon, type IconName } from "@/components/ui/icons";

/** Icons stay in code; step text and stats come from the message catalog. */
const STEP_ICONS: IconName[] = ["mapPin", "users", "shieldCheck", "building"];

export function VolunteerContent({
  user,
  image,
}: {
  user: { role: Role; name: string } | null;
  image: { url: string; alt: string };
}) {
  const t = useTranslations();
  const steps = t.raw("volunteerPage.steps") as { title: string; description: string }[];
  const hasAccess = user?.role === "volunteer" || user?.role === "admin";

  return (
    <>
      <PageBanner
        eyebrow={t("volunteerPage.eyebrow")}
        title={t("volunteerPage.title")}
        rotating={{
          prefix: t("volunteerPage.rotatingPrefix"),
          items: t.raw("volunteerPage.rotating") as string[],
        }}
        description={t("volunteerPage.description")}
        image={image}
        aside={<BannerStats stats={t.raw("volunteerPage.stats") as { value: string; label: string }[]} />}
      />

      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {steps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 80}>
                  <div className="card-pattern rounded-[var(--radius-card)] bg-surface p-5 transition-colors duration-300 hover:bg-surface-strong">
                    <span className="grid size-9 place-items-center rounded-lg bg-lime-400 text-shade">
                      <Icon name={STEP_ICONS[index]} className="size-4" />
                    </span>
                    <h2 className="mt-4 text-[0.9375rem] font-bold text-ink">{step.title}</h2>
                    <p className="mt-1.5 text-[0.8125rem] leading-[1.6] text-muted">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={100}>
            <h2 className="text-[1.375rem] font-extrabold text-ink lg:text-[1.625rem]">
              {t("volunteerPage.registerTitle")}
            </h2>
            <p className="mt-2 text-[0.875rem] leading-[1.7] text-muted">
              {t("volunteerPage.registerSubtitle")}
            </p>

            <div className="mt-7">
              {!user ? (
                <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-7 lg:p-8">
                  <h3 className="text-[1.0625rem] font-extrabold text-ink">
                    {t("volunteerPage.loginTitle")}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-[1.7] text-muted">
                    {t("volunteerPage.loginBody")}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                    <Button href={`${routes.signup}?next=${encodeURIComponent(routes.volunteer)}`}>
                      {t("common.createAccount")}
                    </Button>
                    <Button
                      href={`${routes.login}?next=${encodeURIComponent(routes.volunteer)}`}
                      variant="subtle"
                    >
                      {t("common.logIn")}
                    </Button>
                  </div>
                </div>
              ) : hasAccess ? (
                <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-7 lg:p-8">
                  <h3 className="text-[1.0625rem] font-extrabold text-ink">
                    {t("volunteerPage.alreadyTitle")}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-[1.7] text-muted">
                    {t("volunteerPage.alreadyBody")}
                  </p>
                  <Button href={routes.verifyQueue} className="mt-5">
                    {t("auth.verifyCasesNearYou")}
                    <Icon name="arrowRight" className="size-4" />
                  </Button>
                </div>
              ) : (
                <VolunteerForm />
              )}
            </div>

            {user?.role === "member" && (
              <p className="mt-4 text-[0.75rem] text-muted">
                {t("volunteerPage.applyingAs", { name: user.name })}{" "}
                <Link href={routes.account} className="font-semibold text-ink hover:opacity-60">
                  {t("volunteerPage.switchAccount")}
                </Link>
                .
              </p>
            )}
          </Reveal>
        </div>
      </Container>
    </>
  );
}

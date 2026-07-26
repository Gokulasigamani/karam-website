"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "@/features/contact";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { PageBanner } from "@/components/ui/page-banner";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icons";

/** Icon + link stay in code; label/value/note come from the message catalog. */
const METHOD_META: { icon: IconName; href?: string }[] = [
  { icon: "megaphone", href: "tel:18000000000" },
  { icon: "fileText", href: "mailto:hello@karam.org" },
  { icon: "building" },
];

export function ContactContent({ image }: { image: { url: string; alt: string } }) {
  const t = useTranslations();
  const methods = t.raw("contactPage.methods") as { label: string; value: string; note: string }[];

  return (
    <>
      <PageBanner
        eyebrow={t("contactPage.eyebrow")}
        title={t("contactPage.title")}
        rotating={{
          prefix: t("contactPage.rotatingPrefix"),
          items: t.raw("contactPage.rotating") as string[],
        }}
        description={t("contactPage.description")}
        image={image}
      />

      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {methods.map((method, index) => {
                const meta = METHOD_META[index];
                return (
                  <Reveal as="li" key={method.label} delay={index * 80}>
                    <div className="card-pattern rounded-[var(--radius-card)] bg-surface p-5 transition-colors duration-300 hover:bg-surface-strong">
                      <span className="grid size-9 place-items-center rounded-lg bg-lime-400 text-shade">
                        <Icon name={meta.icon} className="size-4" />
                      </span>

                      <p className="mt-4 text-[0.6875rem] font-bold tracking-[0.1em] text-muted uppercase">
                        {method.label}
                      </p>

                      {meta.href ? (
                        <a
                          href={meta.href}
                          className="mt-1 block text-[0.9375rem] font-bold text-ink transition-opacity hover:opacity-60"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-[0.9375rem] font-bold text-ink">{method.value}</p>
                      )}

                      <p className="mt-1 text-[0.75rem] text-muted">{method.note}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={260}>
              <div className="card-pattern-invert mt-4 rounded-[var(--radius-card)] bg-contrast p-5 text-paper">
                <p className="text-[0.8125rem] leading-[1.65] text-white/60">
                  {t("contactPage.urgentNote")}
                </p>
                <Button href={routes.raiseConcern} size="sm" className="mt-4">
                  {t("common.raiseConcern")}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <h2 className="text-[1.375rem] font-extrabold text-ink lg:text-[1.625rem]">
              {t("contactPage.sendTitle")}
            </h2>
            <p className="mt-2 text-[0.875rem] leading-[1.7] text-muted">
              {t("contactPage.sendSubtitle")}
            </p>

            <div className="mt-7">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}

"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { founders } from "@/content/about";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Founders() {
  const t = useTranslations("about");
  const roles = t.raw("founders") as { role: string; focus: string }[];

  return (
    <Section id="founders" className="pt-0 sm:pt-0 lg:pt-0">
      <SectionHeading title={t("foundersTitle")} description={t("foundersDescription")} />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
        {founders.map((founder, index) => (
          <Reveal as="li" key={founder.name} delay={index * 90} className="h-full">
            <article className="card-pattern flex h-full flex-col rounded-[1.375rem] bg-surface p-3 transition-colors duration-300 hover:bg-surface-strong">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem]">
                <Image
                  src={founder.imageUrl}
                  alt={founder.imageAlt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col px-2 pt-5 pb-2 sm:px-2.5">
                <h3 className="text-[1.1875rem] font-extrabold text-ink">{founder.name}</h3>
                <p className="mt-1 text-xs font-bold tracking-[0.06em] text-muted uppercase">
                  {roles[index]?.role}
                </p>
                <p className="mt-3 text-[0.8125rem] leading-[1.65] text-muted">
                  {roles[index]?.focus}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import aboutHeroImage from "@/assets/hero-about.png";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function AboutHero() {
  const t = useTranslations("about");

  return (
    <Container className="pt-8 pb-14 lg:pt-14 lg:pb-20">
      <Reveal className="max-w-4xl">
        <span className="text-xs font-bold tracking-[0.12em] text-muted uppercase">
          {t("heroEyebrow")}
        </span>

        <h1 className="mt-4 text-[2rem] leading-[1.08] font-extrabold text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
          {t("heroTitle")}
        </h1>

        <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-muted lg:text-[1.0625rem]">
          {t("heroDescription")}
        </p>
      </Reveal>

      {/* Shown at its own proportions rather than cropped to a letterbox — the
          people at the edges of the frame are the point of the picture. */}
      <Reveal delay={120} className="mt-10 lg:mt-14">
        <Image
          src={aboutHeroImage}
          alt="Karam volunteers in white caps sitting with elderly residents outside a shelter, handing over parcels and holding hands."
          placeholder="blur"
          sizes="100vw"
          className="h-auto w-full rounded-[var(--radius-media)]"
        />
      </Reveal>
    </Container>
  );
}

import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { HelpingHands } from "@/components/ui/helping-hands";
import { Reveal } from "@/components/ui/reveal";

export async function AboutHero() {
  const t = await getTranslations("about");

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

      <Reveal delay={120} className="mt-10 lg:mt-14">
        <HelpingHands className="aspect-[16/9] rounded-[var(--radius-media)] sm:aspect-[21/9] lg:aspect-[24/9]" />
      </Reveal>
    </Container>
  );
}

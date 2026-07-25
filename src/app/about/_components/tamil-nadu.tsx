import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { tamilNaduIntro } from "@/content/about";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TextCycle } from "@/components/ui/text-cycle";
import type { IconName } from "@/components/ui/icons";
import { BannerCycle } from "./banner-cycle";

/** Icons stay in code; the point text comes from the message catalog. */
const STATE_ICONS: IconName[] = ["mapPin", "users", "building", "shieldCheck"];

/**
 * One self-contained banner, laid out as a wide rectangle: the fixed copy sits
 * on the left, the changing step on the right. Two columns keep it short
 * instead of stacking into a tall block.
 */
export async function TamilNadu() {
  const t = await getTranslations("about");
  const points = (t.raw("statePoints") as { title: string; description: string }[]).map(
    (point, index) => ({ ...point, icon: STATE_ICONS[index] }),
  );

  return (
    <Container className="pb-14 lg:pb-20">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[var(--radius-block)] bg-shade px-6 py-10 text-paper sm:px-9 sm:py-11 lg:px-12 lg:py-12">
          <Image
            src={tamilNaduIntro.image.url}
            alt={tamilNaduIntro.image.alt}
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          {/* Black shade, angled so the copy side stays darkest */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-shade via-shade/92 to-shade/72"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-shade/45" />

          <div className="relative grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-[0.6875rem] font-bold tracking-[0.12em] text-lime-400 uppercase">
                  {t("tnEyebrow")}
                </span>
                <span className="inline-flex items-baseline gap-1.5 rounded-full bg-white/8 px-2.5 py-1 text-[0.6875rem] font-semibold text-white/70">
                  {t("liveIn")}
                  <TextCycle items={tamilNaduIntro.districts} className="text-lime-400" />
                </span>
              </div>

              <h2 className="mt-4 text-[1.625rem] leading-[1.12] font-extrabold sm:text-[2rem] lg:text-[2.25rem]">
                {t("tnTitle")}
              </h2>

              <p className="mt-4 max-w-lg text-[0.875rem] leading-[1.7] text-white/55">
                {t("tnDescription")}
              </p>
            </div>

            <BannerCycle points={points} />
          </div>
        </div>
      </Reveal>
    </Container>
  );
}

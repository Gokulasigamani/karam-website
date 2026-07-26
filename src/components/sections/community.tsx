"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { statPhotos, type StatPhoto } from "@/content/stats";
import { routes } from "@/constants/routes";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";

const leftPhotos = statPhotos.slice(0, 2);
const rightPhotos = statPhotos.slice(2);

/**
 * Three real columns rather than photos floated over the type — the stat can
 * never collide with an image because it has a column of its own. Below `lg`
 * the photos drop into a strip under the text.
 *
 * Every photo is portrait and narrow, which keeps the section short.
 */
export function Community() {
  const t = useTranslations();

  return (
    <Section id="join" className="py-12 sm:py-14 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)_minmax(0,7.5rem)] lg:gap-10 xl:grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_minmax(0,8.5rem)] xl:gap-14">
        <PhotoColumn photos={leftPhotos} side="left" />

        <div className="text-center">
          <Reveal>
            <p className="text-[0.9375rem] font-medium text-ink sm:text-base lg:text-lg">
              {t("community.lead")}
            </p>

            <p
              className="my-1 leading-[0.95] font-extrabold tracking-[-0.055em] text-ink tabular-nums"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
            >
              {t("community.value")}
            </p>

            <p className="mx-auto max-w-lg text-[0.9375rem] font-medium text-ink sm:text-base lg:text-lg">
              {t("community.trail")}
            </p>
          </Reveal>

          {/* Photo strip for small screens, where the side columns are hidden */}
          <ul className="mt-8 grid grid-cols-4 gap-2.5 lg:hidden">
            {statPhotos.map((photo, index) => (
              <Reveal as="li" key={photo.src} delay={index * 70}>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={300}
                    height={400}
                    sizes="24vw"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={routes.volunteer} size="lg">
                {t("community.join")}
              </Button>
              <Button href={routes.raiseConcern} variant="subtle" size="lg">
                {t("common.raiseConcern")}
              </Button>
            </div>
          </Reveal>
        </div>

        <PhotoColumn photos={rightPhotos} side="right" />
      </div>
    </Section>
  );
}

/**
 * The second photo is inset and narrower, giving the stagger of the original
 * design without anything leaving its column.
 */
function PhotoColumn({ photos, side }: { photos: StatPhoto[]; side: "left" | "right" }) {
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      {photos.map((photo, index) => {
        const inset = index === 1;

        return (
          <Reveal key={photo.src} delay={index * 110}>
            <div
              className={cn(
                "overflow-hidden rounded-2xl",
                inset && "w-[76%]",
                inset && (side === "left" ? "ml-auto" : "mr-auto"),
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={300}
                height={400}
                sizes="(max-width: 1280px) 7.5rem, 8.5rem"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

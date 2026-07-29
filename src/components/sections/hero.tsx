"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import heroArtwork from "@/assets/hero-home.png";
import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

/**
 * Full-bleed opening card. The artwork is a finished composition — headline,
 * sub-copy and the Care / Collaborate / Change row are all set into the picture
 * — so nothing is drawn over it. The scrim and display wordmark this card used
 * to carry would only fight type that is already there, and the header states
 * the brand a few pixels above anyway.
 *
 * Everything interactive lives in the strip beneath the picture instead.
 */
export function Hero() {
  const t = useTranslations();

  return (
    <Container className="pt-2">
      <div className="overflow-hidden rounded-[var(--radius-media)] bg-shade">
        {/* The page still needs a real heading, and the artwork's is pixels.
            This carries it for search engines and screen readers, which is why
            the image below is `alt=""` — otherwise both would say the same
            sentence twice in a row. */}
        <h1 className="sr-only">{t("hero.headline")}</h1>

        <Image
          src={heroArtwork}
          alt=""
          priority
          placeholder="blur"
          sizes="100vw"
          className="h-auto w-full"
        />

        <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-5 text-paper sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 lg:px-8">
          {/* `SocialLinks` renders nothing until real profile URLs are set, so
              this row has to read correctly with only the line beside it */}
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-[0.9375rem] font-bold sm:text-base">{t("hero.help")}</p>
            <SocialLinks itemClassName="bg-white/10 text-white hover:bg-white/20" />
          </div>

          <Button href={routes.raiseConcern} size="lg" className="w-full sm:w-auto">
            {t("common.raiseConcern")}
          </Button>
        </div>
      </div>
    </Container>
  );
}

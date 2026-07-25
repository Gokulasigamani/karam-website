import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

/**
 * Full-bleed opening card. The wordmark scales with the viewport via `clamp()`
 * so it stays edge-hugging from 320px to ultrawide without breakpoint overrides.
 */
export async function Hero() {
  const t = await getTranslations();

  return (
    <Container className="pt-2">
      <div className="relative overflow-hidden rounded-[var(--radius-media)] bg-shade">
        <Image
          src="https://picsum.photos/seed/karam-hands/1920/1000"
          alt="Two people reaching out to hold each other's hands"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Legibility scrim, weighted to the bottom where the type sits */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25"
        />

        <div className="relative flex min-h-[420px] flex-col p-5 sm:min-h-[460px] sm:p-7 lg:min-h-[520px] lg:p-8">
          <SocialLinks
            className="justify-center"
            itemClassName="bg-black/25 text-white backdrop-blur-md hover:bg-black/40"
            showLabels
          />

          {/* `mt-auto` keeps this pinned to the bottom whether or not the social
              row above it renders (it is hidden until real profile URLs are set) */}
          <div className="mt-auto flex min-w-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h1 className="flex min-w-0 flex-wrap items-end gap-x-3 gap-y-1 text-paper">
              <span
                className="leading-[0.8] font-extrabold tracking-[-0.055em] [overflow-wrap:anywhere]"
                style={{ fontSize: "clamp(3.25rem, 12vw, 9.5rem)" }}
              >
                {siteConfig.name}
              </span>
              {/* No fixed `ch` cap — that was tuned for the two English words and
                  clips longer scripts. It wraps naturally and breaks if a single
                  word is too wide for the card. */}
              <span className="mb-1.5 max-w-full text-xl leading-[1.15] font-bold [overflow-wrap:anywhere] sm:max-w-[16ch] sm:text-[1.75rem] lg:mb-3 lg:text-[2rem]">
                {t("hero.help")}
              </span>
            </h1>

            <Button href={routes.raiseConcern} size="lg" className="w-full sm:w-auto">
              {t("common.raiseConcern")}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

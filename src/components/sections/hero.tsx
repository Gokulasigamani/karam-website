import Image from "next/image";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

/**
 * Full-bleed opening card. The wordmark scales with the viewport via `clamp()`
 * so it stays edge-hugging from 320px to ultrawide without breakpoint overrides.
 */
export function Hero() {
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

        <div className="relative flex min-h-[420px] flex-col justify-between p-5 sm:min-h-[460px] sm:p-7 lg:min-h-[520px] lg:p-8">
          <SocialLinks
            className="justify-center"
            itemClassName="bg-black/25 text-white backdrop-blur-md hover:bg-black/40"
            showLabels
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h1 className="flex flex-wrap items-end gap-x-3 gap-y-1 text-paper">
              <span
                className="leading-[0.8] font-extrabold tracking-[-0.055em]"
                style={{ fontSize: "clamp(3.75rem, 13vw, 9.5rem)" }}
              >
                {siteConfig.name}
              </span>
              <span className="mb-1.5 max-w-[7ch] text-2xl leading-[1.05] font-bold sm:text-[1.75rem] lg:mb-3 lg:text-[2rem]">
                Help Others
              </span>
            </h1>

            <Button href={routes.raiseConcern} size="lg" className="w-full sm:w-auto">
              Raise A Concern
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

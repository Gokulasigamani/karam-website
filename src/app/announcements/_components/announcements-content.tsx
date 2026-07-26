"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { BannerCarousel, type Banner } from "@/components/ui/banner-carousel";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StackedStories } from "./parallax-story";

/** Structure (images + links) stays in code; every string comes from messages. */
const SLIDE_META: { url: string; href: string }[] = [
  { url: "https://picsum.photos/seed/karam-ann-ration/1920/1080", href: routes.cases },
  { url: "https://picsum.photos/seed/karam-ann-volunteer/1920/1080", href: routes.volunteer },
  { url: "https://picsum.photos/seed/karam-ann-milestone/1920/1080", href: routes.raiseConcern },
  { url: "https://picsum.photos/seed/karam-ann-monsoon/1920/1080", href: routes.volunteer },
];

const CHAPTER_IMAGES = [
  "https://picsum.photos/seed/karam-ann-ch1/1920/1200",
  "https://picsum.photos/seed/karam-ann-ch2/1920/1200",
  "https://picsum.photos/seed/karam-ann-ch3/1920/1200",
];

const CARD_IMAGES = [
  "https://picsum.photos/seed/karam-ann-c1/800/600",
  "https://picsum.photos/seed/karam-ann-c2/800/600",
  "https://picsum.photos/seed/karam-ann-c3/800/600",
  "https://picsum.photos/seed/karam-ann-c4/800/600",
  "https://picsum.photos/seed/karam-ann-c5/800/600",
  "https://picsum.photos/seed/karam-ann-c6/800/600",
];

interface Slide {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
}
interface Chapter {
  eyebrow: string;
  title: string;
  body: string;
}
interface Item {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}
interface Stat {
  value: string;
  label: string;
}

export function AnnouncementsContent() {
  const t = useTranslations("announcements");

  const slides = t.raw("carousel.slides") as Slide[];
  const banners: Banner[] = slides.map((slide, index) => ({
    image: { url: SLIDE_META[index].url, alt: slide.title },
    eyebrow: slide.eyebrow,
    title: slide.title,
    description: slide.description,
    ctaLabel: slide.cta,
    ctaHref: SLIDE_META[index].href,
  }));

  const chapters = t.raw("chapters") as Chapter[];
  const storyStats = t.raw("storyStats") as Stat[];
  const items = t.raw("items") as Item[];

  return (
    <>
      {/* Hero carousel */}
      <Container className="pt-2">
        <BannerCarousel
          banners={banners}
          labels={{
            region: t("carousel.region"),
            previous: t("carousel.previous"),
            next: t("carousel.next"),
            goToSlide: t("carousel.goToSlide"),
          }}
        />
      </Container>

      {/* Intro */}
      <Section className="pb-6 sm:pb-8 lg:pb-10">
        <SectionHeading title={t("introTitle")} description={t("introDescription")} />
      </Section>

      {/* Story lead-in */}
      <Container className="pb-8 text-center lg:pb-10">
        <Reveal>
          <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-lime-600 uppercase">
            {t("storyKicker")}
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl text-[1.75rem] leading-[1.12] font-extrabold text-ink [text-wrap:balance] sm:text-[2.25rem] lg:text-[2.75rem]">
            {t("storyLead")}
          </h2>
        </Reveal>
      </Container>

      {/* Sticky-stack storytelling — each chapter scrolls up and over the last */}
      <Container className="pb-16 lg:pb-24">
        <StackedStories
          chapters={chapters.map((chapter, index) => ({
            ...chapter,
            image: CHAPTER_IMAGES[index],
          }))}
        />
      </Container>

      {/* Stats band — the story, resolved into numbers */}
      <Container className="pb-16 lg:pb-24">
        <Reveal>
          <div className="card-pattern-invert rounded-[var(--radius-block)] bg-contrast px-6 py-12 text-paper sm:px-10 sm:py-14 lg:px-14">
            <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-lime-400 uppercase">
              {t("statsTitle")}
            </span>
            <dl className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {storyStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-[2.5rem] leading-none font-extrabold tabular-nums lg:text-[3.25rem]">
                      {stat.value}
                    </span>
                    <span className="mt-3 block text-[0.8125rem] leading-snug text-white/60">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>

      {/* Announcement cards — normal section */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <SectionHeading title={t("listTitle")} description={t("listDescription")} />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          {items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 70} className="h-full">
              <article className="card-pattern flex h-full flex-col rounded-[1.375rem] bg-surface p-3 transition-colors duration-300 hover:bg-surface-strong">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem]">
                  <Image
                    src={CARD_IMAGES[index]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-paper px-3 py-1 text-xs font-semibold text-shade">
                    {item.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-2 pt-5 pb-2 sm:px-2.5">
                  <p className="text-[0.6875rem] font-bold tracking-[0.06em] text-muted uppercase">
                    {item.date}
                  </p>
                  <h3 className="mt-2 text-[1.0625rem] leading-[1.3] font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-[1.6] text-muted">{item.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <Container className="pb-16 lg:pb-24">
        <Reveal>
          <div className="card-pattern-invert rounded-[var(--radius-block)] bg-contrast px-6 py-12 text-paper sm:px-10 sm:py-14 lg:px-14">
            <h2 className="max-w-xl text-[1.625rem] leading-[1.15] font-extrabold sm:text-[2rem] lg:text-[2.25rem]">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.7] text-white/60">
              {t("ctaBody")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={routes.contact} size="lg">
                {t("ctaPrimary")}
              </Button>
              <Button href={routes.raiseConcern} variant="onDark" size="lg">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}

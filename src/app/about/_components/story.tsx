import Image from "next/image";
import { story } from "@/content/about";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * Two columns: the narrative on the left, a single tall photograph on the right
 * that sticks while the text scrolls past it.
 */
export function Story() {
  return (
    <Section className="pt-0 sm:pt-0 lg:pt-0">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-[1.625rem] leading-[1.15] font-extrabold text-ink sm:text-[2rem] lg:text-[2.375rem]">
              {story.title}
            </h2>
          </Reveal>

          <div className="mt-6 space-y-5">
            {story.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 32)} delay={80 + index * 70}>
                <p className="text-[0.9375rem] leading-[1.75] text-muted lg:text-base">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={320}>
            <blockquote className="mt-9 rounded-[var(--radius-card)] bg-surface p-6 lg:p-8">
              <p className="text-[1.0625rem] leading-[1.5] font-bold text-ink lg:text-[1.25rem]">
                &ldquo;{story.pullQuote}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)]">
              <Image
                src={story.imageUrl}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { PrivacySection } from "@/content/pages";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * The long-form document layout: a sticky contents list beside numbered-free
 * prose sections. Privacy, terms and accessibility all read the same way, so
 * they share one implementation — a heading that changes in three places is a
 * heading that ends up different in three places.
 */
export async function PolicyArticle({
  sections,
  footer,
}: {
  sections: PrivacySection[];
  /** Closing card. Every policy page ends with a way to ask about it. */
  footer?: ReactNode;
}) {
  const t = await getTranslations("legal");

  return (
    <Container className="pb-16 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)] lg:gap-16">
        <nav aria-label={t("onThisPage")} className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-[0.6875rem] font-bold tracking-[0.1em] text-muted uppercase">
            {t("onThisPage")}
          </h2>
          <ul className="mt-4 space-y-1">
            {sections.map((section) => (
              <li key={section.heading}>
                <a
                  href={`#${slugify(section.heading)}`}
                  className="block rounded-lg px-3 py-2 text-[0.8125rem] font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 50}>
              <section
                id={slugify(section.heading)}
                className="border-t border-hairline py-8 first:border-t-0 first:pt-0"
              >
                <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
                  {section.heading}
                </h2>

                <div className="mt-3 space-y-3.5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-[0.875rem] leading-[1.75] text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-lime-500" />
                        <span className="text-[0.875rem] leading-[1.7] text-muted">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}

          {footer && <Reveal>{footer}</Reveal>}
        </div>
      </div>
    </Container>
  );
}

/** Anchors are derived from headings so the contents list can't drift. */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The closing card used at the foot of every policy page. */
export function PolicyFooterCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  /** The call to action — usually a `Button`. */
  children: ReactNode;
}) {
  return (
    <div className="card-pattern mt-6 rounded-[var(--radius-block)] bg-surface p-7 lg:p-8">
      <h2 className="text-[1.0625rem] font-extrabold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-[0.875rem] leading-[1.7] text-muted">{description}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

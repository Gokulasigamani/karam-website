import type { Metadata } from "next";
import { privacyPage, privacySections } from "@/content/pages";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { PageBanner } from "@/components/ui/page-banner";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Karam collects, who can see it, what is shared with government departments, and how to have it removed.",
};

/** Anchors are derived from headings so the contents list can't drift. */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PrivacyPage() {
  return (
    <>
      <PageBanner
        eyebrow={privacyPage.eyebrow}
        title={privacyPage.title}
        rotating={privacyPage.rotating}
        description={privacyPage.description}
        image={privacyPage.image}
        aside={
          <p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-[0.75rem] font-semibold text-white/70">
            <Icon name="fileText" className="size-3.5" />
            Last updated {privacyPage.lastUpdated}
          </p>
        }
      />

      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)] lg:gap-16">
          {/* Contents */}
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-[0.6875rem] font-bold tracking-[0.1em] text-muted uppercase">
              On this page
            </h2>
            <ul className="mt-4 space-y-1">
              {privacySections.map((section) => (
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
            {privacySections.map((section, index) => (
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
                          <span className="text-[0.875rem] leading-[1.7] text-muted">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}

            <Reveal>
              <div className="card-pattern mt-6 rounded-[var(--radius-block)] bg-surface p-7 lg:p-8">
                <h2 className="text-[1.0625rem] font-extrabold text-ink">
                  Something here unclear?
                </h2>
                <p className="mt-2 max-w-md text-[0.875rem] leading-[1.7] text-muted">
                  Tell us which part and we will rewrite it. A policy nobody can read is not
                  a policy.
                </p>
                <Button href={routes.contact} className="mt-5">
                  Contact Us
                  <Icon name="arrowRight" className="size-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}

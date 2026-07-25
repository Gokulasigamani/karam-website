import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCases, getPublicCaseById } from "@/features/cases/server/cases.repo";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { StatusPill } from "@/components/ui/brand";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";
import { CaseTimeline } from "./_components/case-timeline";

interface CasePageProps {
  params: Promise<{ id: string }>;
}

/** Prerender the cases that exist at build time. */
export async function generateStaticParams() {
  const cases = await getCases();
  return cases.map((record) => ({ id: record.id }));
}

/**
 * Cases are live data now, so a valid id can appear after the build. `true`
 * lets a case added between builds render on demand; a genuinely unknown id
 * still hits `notFound()` below and returns a real 404.
 */
export const dynamicParams = true;

/** Cache each case page, refreshing it on the same interval as the listing. */
export const revalidate = 60;

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { id } = await params;
  const record = await getPublicCaseById(id);

  if (!record) return { title: "Case not found" };

  return {
    title: record.title,
    description: record.summary,
    openGraph: {
      title: record.title,
      description: record.summary,
      ...(record.imageUrl ? { images: [{ url: record.imageUrl, alt: record.imageAlt }] } : {}),
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { id } = await params;
  const record = await getPublicCaseById(id);

  if (!record) notFound();

  const t = await getTranslations("caseDetail");
  const tStatus = await getTranslations("caseStatus");

  return (
    <>
      {/* Banner. Not `PageBanner` — that one leads with a rotating line, and a
          case needs its status and location stated flatly instead. */}
      <Container className="pt-2 pb-10 lg:pb-14">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[var(--radius-block)] bg-shade px-6 py-12 text-paper sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            {record.imageUrl && (
              <Image
                src={record.imageUrl}
                alt={record.imageAlt}
                fill
                priority
                sizes="100vw"
                className="-z-20 object-cover"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-r from-shade via-shade/92 to-shade/70"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-shade/45" />

            <div className="relative">
              <Link
                href={routes.cases}
                className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-white/55 transition-colors hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400"
              >
                <Icon name="arrowRight" className="size-3.5 rotate-180" />
                {t("allLiveCases")}
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <StatusPill tone="lime">{tStatus(record.status)}</StatusPill>
                <StatusPill tone="light">
                  <Icon name="verified" className="size-3.5" />
                  {t("verified")}
                </StatusPill>
                <span className="text-[0.75rem] font-semibold tracking-[0.06em] text-white/50 uppercase">
                  {record.category}
                </span>
              </div>

              <h1 className="mt-4 max-w-3xl text-[1.75rem] leading-[1.1] font-extrabold sm:text-[2.25rem] lg:text-[2.75rem]">
                {record.title}
              </h1>

              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                <Fact icon="mapPin" label={t("location")} value={record.location} />
                <Fact icon="building" label={t("routedTo")} value={record.routedTo} />
                <Fact icon="fileText" label={t("raisedOn")} value={record.raisedOn} />
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>

      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.75fr)] lg:gap-14">
          {/* The account, then the trail */}
          <div>
            <Reveal>
              <section>
                <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
                  {t("whatIsHappening")}
                </h2>
                <div className="mt-3 space-y-3.5">
                  {record.background.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-[0.875rem] leading-[1.75] text-muted lg:text-[0.9375rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="mt-10 border-t border-hairline pt-9">
                <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
                  {t("whatWouldMove")}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {record.needs.map((need) => (
                    <li key={need} className="flex gap-3">
                      <span className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-lime-500" />
                      <span className="text-[0.875rem] leading-[1.7] text-muted lg:text-[0.9375rem]">
                        {need}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <section className="mt-10 border-t border-hairline pt-9">
              <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
                {t("resolutionTrail")}
              </h2>
              <p className="mt-2 max-w-xl text-[0.875rem] leading-[1.7] text-muted">
                {t("resolutionTrailNote")}
              </p>
              <CaseTimeline
                events={record.timeline}
                doneLabel={t("completed")}
                pendingLabel={t("pendingStep")}
              />
            </section>
          </div>

          {/* Status rail */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-6 lg:p-7">
                <h2 className="text-[0.6875rem] font-bold tracking-[0.1em] text-muted uppercase">
                  {t("caseStatusHeading")}
                </h2>

                <p className="mt-4 text-[2rem] leading-none font-extrabold tabular-nums text-ink">
                  {record.progress}%
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-muted">{t("towardResolution")}</p>

                <ProgressBar
                  className="mt-4"
                  value={record.progress}
                  label={`${record.title} — ${record.progress}%`}
                />

                <dl className="mt-6 space-y-3.5 border-t border-hairline pt-5">
                  <Stat
                    label={t("membersSupporting")}
                    value={record.supporters.toLocaleString("en-IN")}
                  />
                  <Stat label={t("daysOpen")} value={String(record.daysOpen)} />
                  <Stat label={t("handlingDesk")} value={record.routedTo} />
                </dl>

                <div className="mt-6 flex flex-col gap-2.5">
                  <Button href={routes.volunteer} className="w-full">
                    {t("helpWithCase")}
                  </Button>
                  <Button href={routes.raiseConcern} variant="subtle" className="w-full">
                    {t("raiseSimilar")}
                  </Button>
                </div>

                <p className="mt-5 text-[0.75rem] leading-[1.6] text-muted">{t("moneyNote")}</p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>
    </>
  );
}

/** One fact in the banner's inline list. */
function Fact({
  icon,
  label,
  value,
}: {
  icon: "mapPin" | "building" | "fileText";
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-[0.6875rem] font-bold tracking-[0.1em] text-white/40 uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 flex items-center gap-2 text-[0.875rem] font-semibold text-white/85">
        <Icon name={icon} className="size-4 shrink-0 text-lime-400" />
        {value}
      </dd>
    </div>
  );
}

/** One row in the status rail. */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[0.8125rem] text-muted">{label}</dt>
      <dd className="text-right text-[0.8125rem] font-semibold text-ink">{value}</dd>
    </div>
  );
}

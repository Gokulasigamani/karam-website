import Image from "next/image";
import { cases, casesIntro, type CaseRecord } from "@/content/cases";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusPill } from "@/components/ui/brand";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

/**
 * A plain responsive grid — one column on phones, two on tablets, three from
 * `lg`. No horizontal rail: overflow scrollers are where small-screen layouts
 * usually break, and a stacked card reads better on a phone anyway.
 */
export function Cases() {
  return (
    <Section id="cases" className="pt-0 sm:pt-0 lg:pt-0">
      <SectionHeading title={casesIntro.title} description={casesIntro.description} />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
        {cases.map((record, index) => (
          <Reveal as="li" key={record.id} delay={index * 80} className="h-full">
            <CaseCard record={record} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function CaseCard({ record }: { record: CaseRecord }) {
  return (
    <article className="card-pattern flex h-full flex-col rounded-[1.375rem] bg-surface p-3 transition-colors duration-300 hover:bg-surface-strong">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem]">
        <Image
          src={record.imageUrl}
          alt={record.imageAlt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
          className="object-cover"
        />
        <span className="absolute top-3 left-3">
          <StatusPill tone="light">{record.status}</StatusPill>
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pt-5 pb-1.5 sm:px-2.5">
        <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.06em] text-muted uppercase">
          {record.category}
          <Icon name="verified" className="size-3.5 shrink-0 text-lime-500" />
          <span className="sr-only">Verified by community volunteers</span>
        </p>

        <h3 className="mt-2.5 text-[1.0625rem] leading-[1.35] font-bold text-ink">
          {record.title}
        </h3>

        <p className="mt-2 text-[0.8125rem] leading-[1.6] text-muted">{record.summary}</p>

        <dl className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-[0.8125rem] text-muted">
            <Icon name="mapPin" className="size-3.5 shrink-0 text-ink/40" />
            <dt className="sr-only">Location</dt>
            <dd className="truncate">{record.location}</dd>
          </div>
          <div className="flex items-center gap-2 text-[0.8125rem] text-muted">
            <Icon name="building" className="size-3.5 shrink-0 text-ink/40" />
            <dt className="sr-only">Routed to</dt>
            <dd className="truncate">{record.routedTo}</dd>
          </div>
        </dl>

        {/* Pinned to the bottom so progress lines up across cards of any height */}
        <div className="mt-auto pt-6">
          <ProgressBar
            value={record.progress}
            label={`${record.title} — ${record.progress}% toward resolution`}
          />
          <div className="mt-3 flex items-center justify-between gap-3 text-[0.8125rem]">
            <span className="font-semibold text-ink">{record.supporters} supporting</span>
            <span className="text-muted">{record.daysOpen} days open</span>
          </div>
        </div>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { type CaseRecord } from "@/content/cases";
import { caseRoute } from "@/constants/routes";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusPill } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icons";

/**
 * Shared by the landing-page teaser and the `/cases` listing, so a case reads
 * identically wherever it appears.
 *
 * The whole card is one link. A card with a "read more" link inside it gives a
 * keyboard user a small target and a screen reader a second, redundant stop.
 */
export async function CaseCard({ record }: { record: CaseRecord }) {
  const t = await getTranslations();

  return (
    <article className="card-pattern h-full rounded-[1.375rem] bg-surface transition-colors duration-300 hover:bg-surface-strong focus-within:bg-surface-strong">
      <Link
        href={caseRoute(record.id)}
        className="flex h-full flex-col rounded-[1.375rem] p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem]">
          {record.imageUrl ? (
            <Image
              src={record.imageUrl}
              alt={record.imageAlt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
              className="object-cover"
            />
          ) : (
            // Concern-raised cases have no photo yet — a branded block, not a
            // broken image.
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-lime-soft to-surface-strong">
              <Icon name="handHeart" className="size-9 text-lime-600/70" />
            </div>
          )}
          <span className="absolute top-3 left-3">
            <StatusPill tone="light">{t(`caseStatus.${record.status}`)}</StatusPill>
          </span>
        </div>

        <div className="flex flex-1 flex-col px-2 pt-5 pb-1.5 sm:px-2.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.06em] text-muted uppercase">
            {record.category}
            <Icon name="verified" className="size-3.5 shrink-0 text-lime-500" />
            <span className="sr-only">{t("caseCard.verifiedSr")}</span>
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
              <span className="font-semibold text-ink">
                {t("caseCard.supporting", { count: record.supporters })}
              </span>
              <span className="text-muted">{t("caseCard.daysOpen", { days: record.daysOpen })}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

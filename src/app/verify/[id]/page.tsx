import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { findCardHolderById } from "@/features/auth/server/users.repo";
import { PremiumCard } from "@/features/membership-card/components/premium-card";
import { memberQrDataUrl } from "@/features/membership-card/server/qr";
import { holderSince, membershipNumber } from "@/features/membership-card/lib/card-fields";
import { membershipCardImageRoute, routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import type { Role } from "@/features/auth/types";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

/**
 * `noindex` on top of the robots.txt disallow. A card is meant to be checked by
 * the person holding it, not to be a searchable roster of members.
 */
export const metadata: Metadata = {
  title: "Verify a member",
  robots: { index: false, follow: false },
};

/** Never cached: a revoked or renamed account must not verify from a stale copy. */
export const dynamic = "force-dynamic";

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;

  const holder = await findCardHolderById(id);
  if (!holder) notFound();

  const [t, locale, qrDataUrl] = await Promise.all([
    getTranslations(),
    getLocale(),
    memberQrDataUrl(holder.id),
  ]);

  const since = holderSince(holder.joinedAt, locale);
  const roleLabel: Record<Role, string> = {
    member: t("auth.roleMember"),
    volunteer: t("auth.roleVolunteer"),
    admin: t("auth.roleAdmin"),
  };

  /* Also rendered as plain text below the card: the card itself is a fixed-scale
     graphic, so this is the copy that reflows, zooms and reads out loud. */
  const details = [
    { label: t("card.holderLabel"), value: holder.name },
    { label: t("card.roleLabel"), value: roleLabel[holder.role] },
    ...(holder.district
      ? [{ label: t("card.districtLabel"), value: holder.district }]
      : []),
    ...(holder.ward ? [{ label: t("card.wardLabel"), value: holder.ward }] : []),
    { label: t("card.numberLabel"), value: membershipNumber(holder.id) },
    ...(since ? [{ label: t("card.sinceLabel"), value: since }] : []),
  ];

  return (
    <Container className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-1.5 text-[0.75rem] font-bold tracking-[0.08em] text-shade uppercase">
            <Icon name="verified" className="size-4" />
            {t("card.verifiedBadge")}
          </span>
          <h1 className="mt-5 text-[1.75rem] leading-tight font-extrabold text-ink lg:text-[2.25rem]">
            {t("card.verifyTitle", { name: holder.name })}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-muted">
            {t("card.verifyBlurb")}
          </p>
        </div>

        <div className="mt-10">
          <PremiumCard holder={holder} qrDataUrl={qrDataUrl} since={since} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={membershipCardImageRoute(holder.id)} download>
            <Icon name="download" className="size-4" />
            {t("card.download")}
          </Button>
          <Button href={routes.home} variant="subtle">
            {t("card.aboutKaram")}
          </Button>
        </div>

        <dl className="card-pattern mt-10 grid gap-x-8 gap-y-5 rounded-[var(--radius-card)] bg-surface p-6 sm:grid-cols-2 lg:p-7">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-[0.75rem] font-semibold tracking-[0.1em] text-muted uppercase">
                {detail.label}
              </dt>
              <dd className="mt-1 text-[0.9375rem] font-bold text-ink">{detail.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-center text-[0.8125rem] leading-[1.7] text-muted">
          {t("card.verifyFooter")}
        </p>
      </div>
    </Container>
  );
}

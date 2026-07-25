import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { requireRole } from "@/features/auth";
import { getPendingCases, getPendingCasesInDistrict } from "@/features/cases/server/cases.repo";
import { verifyCase } from "@/features/cases/server/cases.actions";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = { title: "Verify Cases" };

export default async function VerifyQueuePage() {
  const user = await requireRole(["volunteer", "admin"], routes.verifyQueue);
  const t = await getTranslations("verify");
  const pending =
    user.role === "admin"
      ? await getPendingCases()
      : await getPendingCasesInDistrict(user.district ?? "");

  return (
    <Container className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href={routes.account}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-muted hover:text-ink"
        >
          <Icon name="arrowRight" className="size-3.5 rotate-180" />
          {t("backToAccount")}
        </Link>

        <h1 className="mt-4 text-[1.75rem] font-extrabold text-ink lg:text-[2rem]">{t("title")}</h1>
        <p className="mt-2 text-[0.9375rem] leading-[1.7] text-muted">
          {user.role === "admin"
            ? t("subtitleAdmin")
            : t("subtitleVolunteer", { district: user.district ?? t("yourDistrict") })}
        </p>

        {pending.length === 0 ? (
          <p className="mt-10 rounded-[var(--radius-card)] bg-surface p-8 text-center text-[0.875rem] text-muted">
            {t("empty")}
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {pending.map((record) => {
              const count = record.verifications?.length ?? 0;
              const alreadyVerified = record.verifications?.some((v) => v.userId === user.id);
              const isRaiser = record.raisedByUserId === user.id;

              return (
                <li
                  key={record.id}
                  className="card-pattern rounded-[var(--radius-block)] bg-surface p-6 lg:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.6875rem] font-bold tracking-[0.06em] text-muted uppercase">
                      {record.category}
                    </span>
                    <span className="text-[0.75rem] font-semibold text-muted">
                      {t("verifiedCount", { count })}
                    </span>
                  </div>

                  <h2 className="mt-2 text-[1.0625rem] font-bold text-ink">{record.title}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-[0.8125rem] text-muted">
                    <Icon name="mapPin" className="size-3.5 text-ink/40" />
                    {record.location}
                  </p>
                  <p className="mt-3 text-[0.875rem] leading-[1.7] text-muted">
                    {record.background[0]}
                  </p>

                  <div className="mt-5">
                    {isRaiser ? (
                      <p className="text-[0.8125rem] font-medium text-muted">{t("youRaised")}</p>
                    ) : alreadyVerified ? (
                      <p className="text-[0.8125rem] font-semibold text-success">
                        <Icon name="check" className="mr-1 inline size-3.5" strokeWidth={2.5} />
                        {t("youVerified")}
                      </p>
                    ) : (
                      <form action={verifyCase}>
                        <input type="hidden" name="caseId" value={record.id} />
                        <Button size="sm">{t("confirm")}</Button>
                      </form>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Container>
  );
}

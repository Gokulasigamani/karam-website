import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { requireUser, ChangePasswordForm, LogoutButton } from "@/features/auth";
import { getCasesRaisedBy } from "@/features/cases/server/cases.repo";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = { title: "Your Account" };

export default async function AccountPage() {
  const user = await requireUser(routes.account);
  const raised = await getCasesRaisedBy(user.id);
  const t = await getTranslations();
  const roleLabel: Record<string, string> = {
    member: t("auth.roleMember"),
    volunteer: t("auth.roleVolunteer"),
    admin: t("auth.roleAdmin"),
  };

  return (
    <Container className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-3 py-1 text-[0.6875rem] font-bold tracking-[0.06em] text-shade uppercase">
              {roleLabel[user.role] ?? user.role}
            </span>
            <h1 className="mt-4 text-[1.75rem] font-extrabold text-ink lg:text-[2rem]">
              {user.name}
            </h1>
            <p className="mt-1 text-[0.9375rem] text-muted">{user.email}</p>
          </div>
          <LogoutButton />
        </div>

        {/* Role-specific quick actions */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Button href={routes.raiseConcern}>
            {t("common.raiseConcern")}
            <Icon name="arrowRight" className="size-4" />
          </Button>
          {user.role === "volunteer" && (
            <Button href={routes.verifyQueue} variant="subtle">
              {t("auth.verifyCasesNearYou")}
            </Button>
          )}
          {user.role === "admin" && (
            <Button href={routes.admin} variant="dark">
              {t("auth.adminConsole")}
            </Button>
          )}
          {user.role === "member" && (
            <Button href={routes.volunteer} variant="subtle">
              {t("auth.applyToVolunteer")}
            </Button>
          )}
        </div>

        {/* Cases raised */}
        <section className="mt-12 border-t border-hairline pt-10">
          <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
            {t("auth.concernsRaised")}
          </h2>

          {raised.length === 0 ? (
            <p className="mt-3 text-[0.875rem] leading-[1.7] text-muted">{t("auth.nothingRaised")}</p>
          ) : (
            <ul className="mt-5 space-y-2.5">
              {raised.map((record) => {
                const pending = record.status === "Pending";
                return (
                  <li
                    key={record.id}
                    className="card-pattern flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] bg-surface px-5 py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[0.9375rem] font-bold text-ink">{record.title}</p>
                      <p className="mt-0.5 text-[0.75rem] text-muted">
                        {record.location} · {t(`caseStatus.${record.status}`)}
                      </p>
                    </div>
                    {pending ? (
                      <span className="text-[0.75rem] font-semibold text-muted">
                        {t("auth.awaitingVerification")}
                      </span>
                    ) : (
                      <Link
                        href={`${routes.cases}/${record.id}`}
                        className="text-[0.8125rem] font-semibold text-ink hover:opacity-60"
                      >
                        {t("auth.viewCase")}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Change password */}
        <section className="mt-12 border-t border-hairline pt-10">
          <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
            {t("auth.changePasswordTitle")}
          </h2>
          <div className="mt-5 max-w-md">
            <ChangePasswordForm />
          </div>
        </section>
      </div>
    </Container>
  );
}

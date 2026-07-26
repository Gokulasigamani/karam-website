"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { CaseRecord } from "@/content/cases";
import type { Role, SessionUser, Teammate } from "@/features/auth/types";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { logout } from "@/features/auth/server/auth.actions";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Icon } from "@/components/ui/icons";
import { ProfileEditor } from "./profile-editor";

function Card({
  title,
  icon,
  children,
  className,
}: {
  title?: string;
  icon?: Parameters<typeof Icon>[0]["name"];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`card-pattern rounded-[var(--radius-card)] bg-surface p-6 lg:p-7 ${className ?? ""}`}>
      {title && (
        <div className="mb-5 flex items-center gap-2">
          {icon && <Icon name={icon} className="size-4 text-muted" />}
          <h2 className="text-[1.0625rem] font-extrabold text-ink lg:text-[1.125rem]">{title}</h2>
        </div>
      )}
      {children}
    </section>
  );
}

export function AccountContent({
  user,
  raised,
  verifiedCount,
  teammates,
}: {
  user: SessionUser;
  raised: CaseRecord[];
  verifiedCount: number;
  teammates: Teammate[];
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [editing, setEditing] = useState(false);

  const roleLabel: Record<Role, string> = {
    member: t("auth.roleMember"),
    volunteer: t("auth.roleVolunteer"),
    admin: t("auth.roleAdmin"),
  };
  const roleBlurb: Record<Role, string> = {
    member: t("account.aboutRoleMember"),
    volunteer: t("account.aboutRoleVolunteer"),
    admin: t("account.aboutRoleAdmin"),
  };
  const isHelper = user.role === "volunteer" || user.role === "admin";
  const locationLine = user.district
    ? [user.district, user.ward].filter(Boolean).join(" · ")
    : null;

  let since: string | null = null;
  if (user.joinedAt) {
    const date = new Date(user.joinedAt);
    if (!Number.isNaN(date.getTime())) {
      since = new Intl.DateTimeFormat(locale === "ta" ? "ta-IN" : "en-IN", {
        month: "long",
        year: "numeric",
      }).format(date);
    }
  }

  const checks = [
    { done: Boolean(user.photo), label: t("account.completePhoto") },
    { done: Boolean(user.bio), label: t("account.completeBio") },
    { done: Boolean(user.district && user.location), label: t("account.completeLocation") },
  ];
  const doneCount = checks.filter((c) => c.done).length;
  const strength = Math.round((doneCount / checks.length) * 100);

  if (editing) {
    return (
      <Container className="py-14 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="mb-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-muted hover:text-ink"
          >
            <Icon name="arrowRight" className="size-4 rotate-180" />
            {t("account.backToProfile")}
          </button>
          <h1 className="text-[1.5rem] font-extrabold text-ink lg:text-[1.75rem]">
            {t("account.editTitle")}
          </h1>
          <p className="mt-1 mb-8 text-[0.9375rem] text-muted">{t("account.editSubtitle")}</p>
          <ProfileEditor user={user} onDone={() => setEditing(false)} />
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Header block — same dark treatment as the site's page banners */}
      <Container className="pt-2 pb-6">
        <div className="relative isolate overflow-hidden rounded-[var(--radius-block)] bg-shade px-6 py-9 text-paper sm:px-10 sm:py-11 lg:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 -z-10 size-80 rounded-full bg-lime-400/12 blur-3xl"
          />
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <Avatar
                name={user.name}
                photo={user.photo}
                className="size-20 ring-2 ring-white/15 sm:size-24"
                textClassName="text-2xl"
              />
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-3 py-1 text-[0.625rem] font-bold tracking-[0.08em] text-shade uppercase">
                  {roleLabel[user.role]}
                </span>
                <h1 className="mt-2.5 text-[1.625rem] leading-tight font-extrabold sm:text-[2rem]">
                  {user.name}
                </h1>
                <p className="mt-1 text-[0.875rem] text-white/55">{user.email}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem] text-white/55">
                  {locationLine && (
                    <span className="inline-flex items-center gap-1">
                      <Icon name="mapPin" className="size-3.5 text-lime-400" />
                      {locationLine}
                    </span>
                  )}
                  {since && (
                    <span>{t("account.memberSince", { date: since })}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 gap-2.5">
              <Button variant="primary" onClick={() => setEditing(true)}>
                {t("account.editProfile")}
              </Button>
              <form action={logout}>
                <Button variant="onDark" type="submit">
                  {t("common.logOut")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>

      {/* Stats strip */}
      <Container className="pb-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <StatTile value={raised.length} label={t("account.statConcerns")} />
          {isHelper && <StatTile value={verifiedCount} label={t("account.statVerified")} />}
          {user.district && <StatTile value={teammates.length} label={t("account.statTeam")} />}
          <StatTile value={`${strength}%`} label={t("account.profileStrength")} />
        </dl>
      </Container>

      {/* Dashboard grid */}
      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-5 lg:col-span-2">
            {/* Profile strength */}
            {strength < 100 ? (
              <Card title={t("account.completeTitle")} icon="verified">
                <p className="-mt-2 mb-4 text-[0.8125rem] leading-[1.6] text-muted">
                  {t("account.completeHint")}
                </p>
                <ProgressBar value={strength} label={t("account.profileStrength")} />
                <ul className="mt-5 space-y-2.5">
                  {checks.map((check) => (
                    <li key={check.label} className="flex items-center gap-2.5 text-[0.875rem]">
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full ${
                          check.done ? "bg-lime-400 text-shade" : "bg-track text-muted"
                        }`}
                      >
                        {check.done ? (
                          <Icon name="check" className="size-3" strokeWidth={3} />
                        ) : (
                          <span className="size-1.5 rounded-full bg-current" />
                        )}
                      </span>
                      <span className={check.done ? "text-muted line-through" : "text-ink"}>
                        {check.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button variant="subtle" size="sm" className="mt-5" onClick={() => setEditing(true)}>
                  {t("account.editProfile")}
                </Button>
              </Card>
            ) : (
              <Card>
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime-400 text-shade">
                    <Icon name="check" className="size-5" strokeWidth={2.5} />
                  </span>
                  <p className="text-[0.9375rem] font-semibold text-ink">
                    {t("account.completeDone")}
                  </p>
                </div>
              </Card>
            )}

            {/* Ward team */}
            <Card title={t("account.teamTitle")} icon="users">
              {!user.district ? (
                <div className="rounded-[var(--radius-card)] bg-paper px-5 py-6 text-center">
                  <p className="text-[0.875rem] leading-[1.7] text-muted">
                    {t("account.teamNoLocation")}
                  </p>
                  <Button
                    variant="subtle"
                    size="sm"
                    className="mt-4"
                    onClick={() => setEditing(true)}
                  >
                    {t("account.setLocation")}
                  </Button>
                </div>
              ) : teammates.length === 0 ? (
                <p className="text-[0.875rem] leading-[1.7] text-muted">
                  {t("account.teamEmpty", { district: user.district })}
                </p>
              ) : (
                <>
                  <p className="-mt-3 mb-4 text-[0.8125rem] text-muted">
                    {t("account.teamSubtitle", { district: user.district })}
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {teammates.map((mate) => (
                      <li
                        key={mate.id}
                        className="flex items-center gap-3 rounded-[var(--radius-card)] bg-paper px-4 py-3"
                      >
                        <Avatar
                          name={mate.name}
                          photo={mate.photo}
                          className="size-10"
                          textClassName="text-[0.8125rem]"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-[0.875rem] font-bold text-ink">{mate.name}</p>
                          <p className="truncate text-[0.75rem] text-muted">
                            {[mate.ward, mate.locality].filter(Boolean).join(" · ") ||
                              t("auth.roleVolunteer")}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>

            {/* Concerns raised */}
            <Card title={t("auth.concernsRaised")} icon="megaphone">
              {raised.length === 0 ? (
                <div className="rounded-[var(--radius-card)] bg-paper px-5 py-8 text-center">
                  <p className="text-[0.875rem] leading-[1.7] text-muted">
                    {t("auth.nothingRaised")}
                  </p>
                  <Button href={routes.raiseConcern} size="sm" className="mt-4">
                    {t("common.raiseConcern")}
                  </Button>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {raised.map((record) => {
                    const pending = record.status === "Pending";
                    return (
                      <li
                        key={record.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] bg-paper px-5 py-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[0.9375rem] font-bold text-ink">
                            {record.title}
                          </p>
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
            </Card>
          </div>

          {/* Side column */}
          <div className="space-y-5">
            {/* Quick actions */}
            <Card title={t("account.quickActions")}>
              <div className="grid gap-2.5">
                <Button href={routes.raiseConcern} className="w-full">
                  {t("common.raiseConcern")}
                  <Icon name="arrowRight" className="size-4" />
                </Button>
                {user.role === "volunteer" && (
                  <Button href={routes.verifyQueue} variant="subtle" className="w-full">
                    {t("auth.verifyCasesNearYou")}
                  </Button>
                )}
                {user.role === "admin" && (
                  <Button href={routes.admin} variant="dark" className="w-full">
                    {t("auth.adminConsole")}
                  </Button>
                )}
                {user.role === "member" && (
                  <Button href={routes.volunteer} variant="subtle" className="w-full">
                    {t("auth.applyToVolunteer")}
                  </Button>
                )}
              </div>
            </Card>

            {/* About your role */}
            <Card title={t("account.aboutRoleTitle")}>
              <p className="-mt-2 text-[0.875rem] leading-[1.7] text-muted">
                {roleBlurb[user.role]}
              </p>
            </Card>

            {/* Security */}
            <Card title={t("account.securityTitle")}>
              <div className="-mt-1">
                <ChangePasswordForm />
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

function StatTile({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="card-pattern rounded-[var(--radius-card)] bg-surface px-5 py-4">
      <dd className="text-[1.75rem] leading-none font-extrabold text-ink tabular-nums lg:text-[2rem]">
        {value}
      </dd>
      <dt className="mt-1.5 text-[0.75rem] leading-snug text-muted">{label}</dt>
    </div>
  );
}

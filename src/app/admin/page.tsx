import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { requireRole } from "@/features/auth";
import { getPendingApplications } from "@/features/volunteer/server/applications.repo";
import {
  approveApplication,
  rejectApplication,
} from "@/features/volunteer/server/volunteer.admin.actions";
import { getAllCases } from "@/features/cases/server/cases.repo";
import {
  addUpdateAction,
  resolveCaseAction,
  routeCaseAction,
} from "@/features/cases/server/cases.actions";
import { departments } from "@/content/government";
import { routes } from "@/constants/routes";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/field";
import { StatusPill } from "@/components/ui/brand";

export const metadata: Metadata = { title: "Admin Console" };

export default async function AdminPage() {
  await requireRole("admin", routes.admin);
  const [applications, cases, t, tStatus] = await Promise.all([
    getPendingApplications(),
    getAllCases(),
    getTranslations("admin"),
    getTranslations("caseStatus"),
  ]);

  return (
    <Container className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-[1.75rem] font-extrabold text-ink lg:text-[2rem]">{t("title")}</h1>
        <p className="mt-2 text-[0.9375rem] text-muted">{t("subtitle")}</p>

        {/* Volunteer applications */}
        <section className="mt-12">
          <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
            {t("applications")}
            <span className="ml-2 text-[0.875rem] font-semibold text-muted">
              {applications.length}
            </span>
          </h2>

          {applications.length === 0 ? (
            <p className="mt-4 text-[0.875rem] text-muted">{t("noApplications")}</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {applications.map((app) => (
                <li
                  key={app.id}
                  className="card-pattern flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] bg-surface px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-[0.9375rem] font-bold text-ink">{app.name}</p>
                    <p className="mt-0.5 text-[0.75rem] text-muted">
                      {app.email} · {app.locality}, {app.district} · {app.availability}
                    </p>
                    <p className="mt-1 text-[0.75rem] text-muted">{app.interests.join(", ")}</p>
                  </div>
                  <div className="flex gap-2">
                    <form action={approveApplication}>
                      <input type="hidden" name="applicationId" value={app.id} />
                      <Button size="sm">{t("approve")}</Button>
                    </form>
                    <form action={rejectApplication}>
                      <input type="hidden" name="applicationId" value={app.id} />
                      <Button size="sm" variant="subtle">
                        {t("reject")}
                      </Button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Cases */}
        <section className="mt-14">
          <h2 className="text-[1.125rem] font-extrabold text-ink lg:text-[1.25rem]">
            {t("cases")}
            <span className="ml-2 text-[0.875rem] font-semibold text-muted">{cases.length}</span>
          </h2>

          {cases.length === 0 ? (
            <p className="mt-4 text-[0.875rem] text-muted">{t("noCases")}</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {cases.map((record) => {
                const verified = record.verifications?.length ?? 0;
                return (
                  <li
                    key={record.id}
                    className="card-pattern rounded-[var(--radius-card)] bg-surface p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[0.9375rem] font-bold text-ink">{record.title}</p>
                        <p className="mt-0.5 text-[0.75rem] text-muted">{record.location}</p>
                      </div>
                      <StatusPill tone={record.status === "Resolved" ? "dark" : "lime"}>
                        {tStatus(record.status)}
                      </StatusPill>
                    </div>

                    {/* Controls by status */}
                    {record.status === "Pending" && (
                      <p className="mt-4 text-[0.8125rem] text-muted">
                        {t("awaitingVerification", { verified })}
                      </p>
                    )}

                    {record.status === "Verified" && (
                      <form
                        action={routeCaseAction}
                        className="mt-4 flex flex-wrap items-end gap-2.5"
                      >
                        <input type="hidden" name="caseId" value={record.id} />
                        <div className="min-w-[16rem] flex-1">
                          <label
                            htmlFor={`dept-${record.id}`}
                            className="mb-1.5 block text-[0.75rem] font-semibold text-ink"
                          >
                            {t("routeToDepartment")}
                          </label>
                          <Select id={`dept-${record.id}`} name="department" defaultValue="">
                            <option value="" disabled>
                              {t("chooseDepartment")}
                            </option>
                            {departments.map((dept) => (
                              <option key={dept.name} value={dept.name}>
                                {dept.name}
                              </option>
                            ))}
                          </Select>
                        </div>
                        <Button size="sm">{t("escalate")}</Button>
                      </form>
                    )}

                    {record.status === "Escalated" && (
                      <div className="mt-4 space-y-3">
                        <p className="text-[0.8125rem] text-muted">
                          {t("routedTo", { department: record.routedTo })}
                        </p>
                        <form action={addUpdateAction} className="flex flex-wrap items-end gap-2.5">
                          <input type="hidden" name="caseId" value={record.id} />
                          <div className="min-w-[16rem] flex-1">
                            <label
                              htmlFor={`update-${record.id}`}
                              className="mb-1.5 block text-[0.75rem] font-semibold text-ink"
                            >
                              {t("postUpdate")}
                            </label>
                            <Input
                              id={`update-${record.id}`}
                              name="detail"
                              placeholder={t("updatePlaceholder")}
                            />
                          </div>
                          <Button size="sm" variant="subtle">
                            {t("add")}
                          </Button>
                        </form>
                        <form action={resolveCaseAction}>
                          <input type="hidden" name="caseId" value={record.id} />
                          <Button size="sm" variant="dark">
                            {t("markResolved")}
                          </Button>
                        </form>
                      </div>
                    )}

                    {record.status === "Resolved" && (
                      <p className="mt-4 text-[0.8125rem] font-semibold text-success">
                        {t("closed")}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </Container>
  );
}

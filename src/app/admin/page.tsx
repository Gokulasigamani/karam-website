import type { Metadata } from "next";
import { requireRole } from "@/features/auth";
import { getPendingApplications } from "@/features/volunteer/server/applications.repo";
import { getAllCases } from "@/features/cases/server/cases.repo";
import { routes } from "@/constants/routes";
import { AdminContent } from "./_components/admin-content";

export const metadata: Metadata = { title: "Admin Console" };

export default async function AdminPage() {
  await requireRole("admin", routes.admin);
  const [applications, cases] = await Promise.all([getPendingApplications(), getAllCases()]);

  return <AdminContent applications={applications} cases={cases} />;
}

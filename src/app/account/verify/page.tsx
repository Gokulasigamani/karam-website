import type { Metadata } from "next";
import { requireRole } from "@/features/auth";
import { getPendingCases, getPendingCasesInDistrict } from "@/features/cases/server/cases.repo";
import { routes } from "@/constants/routes";
import { VerifyContent } from "./_components/verify-content";

export const metadata: Metadata = { title: "Verify Cases" };

export default async function VerifyQueuePage() {
  const user = await requireRole(["volunteer", "admin"], routes.verifyQueue);
  const pending =
    user.role === "admin"
      ? await getPendingCases()
      : await getPendingCasesInDistrict(user.district ?? "");

  return (
    <VerifyContent
      pending={pending}
      userId={user.id}
      district={user.district ?? null}
      isAdmin={user.role === "admin"}
    />
  );
}

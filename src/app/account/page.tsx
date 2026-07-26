import type { Metadata } from "next";
import { requireUser } from "@/features/auth";
import { getCasesRaisedBy } from "@/features/cases/server/cases.repo";
import { routes } from "@/constants/routes";
import { AccountContent } from "./_components/account-content";

export const metadata: Metadata = { title: "Your Account" };

export default async function AccountPage() {
  const user = await requireUser(routes.account);
  const raised = await getCasesRaisedBy(user.id);

  return (
    <AccountContent
      user={{ name: user.name, email: user.email, role: user.role }}
      raised={raised}
    />
  );
}

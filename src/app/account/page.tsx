import type { Metadata } from "next";
import { requireUser } from "@/features/auth";
import { countCasesVerifiedBy, getCasesRaisedBy } from "@/features/cases/server/cases.repo";
import { getVolunteersInDistrict } from "@/features/auth/server/users.repo";
import { memberQrDataUrl } from "@/features/membership-card/server/qr";
import { routes } from "@/constants/routes";
import { AccountContent } from "./_components/account-content";

export const metadata: Metadata = { title: "Your Account" };

export default async function AccountPage() {
  const user = await requireUser(routes.account);

  const [raised, verifiedCount, teammates, cardQr] = await Promise.all([
    getCasesRaisedBy(user.id),
    user.role === "member" ? Promise.resolve(0) : countCasesVerifiedBy(user.id),
    user.district ? getVolunteersInDistrict(user.district, user.id) : Promise.resolve([]),
    // Generated here rather than in the client: the QR encoder is server-only.
    memberQrDataUrl(user.id),
  ]);

  return (
    <AccountContent
      user={user}
      raised={raised}
      verifiedCount={verifiedCount}
      teammates={teammates}
      cardQr={cardQr}
    />
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { AuthShell, SignupForm, getCurrentUser } from "@/features/auth";
import { routes } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Karam account to raise concerns, follow cases, and volunteer.",
};

function safeNext(value?: string): string | undefined {
  if (!value) return undefined;
  return value.startsWith("/") && !value.startsWith("//") ? value : undefined;
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safe = safeNext(next);

  if (await getCurrentUser()) redirect(safe ?? routes.account);

  const t = await getTranslations("auth");
  const loginHref = safe ? `${routes.login}?next=${encodeURIComponent(safe)}` : routes.login;

  return (
    <AuthShell
      title={t("signupTitle")}
      subtitle={t("signupSubtitle")}
      footer={
        <>
          {t("haveAccount")}{" "}
          <Link href={loginHref} className="font-semibold text-ink hover:opacity-60">
            {t("logInLink")}
          </Link>
        </>
      }
    >
      <SignupForm next={safe} />
    </AuthShell>
  );
}

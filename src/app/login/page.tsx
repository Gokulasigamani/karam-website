import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { AuthShell, LoginForm, getCurrentUser } from "@/features/auth";
import { routes } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to raise a concern, follow your cases, or verify cases as a volunteer.",
};

function safeNext(value?: string): string | undefined {
  if (!value) return undefined;
  return value.startsWith("/") && !value.startsWith("//") ? value : undefined;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safe = safeNext(next);

  if (await getCurrentUser()) redirect(safe ?? routes.account);

  const t = await getTranslations("auth");
  const signupHref = safe ? `${routes.signup}?next=${encodeURIComponent(safe)}` : routes.signup;

  return (
    <AuthShell
      title={t("loginTitle")}
      subtitle={t("loginSubtitle")}
      footer={
        <>
          {t("newToKaram")}{" "}
          <Link href={signupHref} className="font-semibold text-ink hover:opacity-60">
            {t("createOne")}
          </Link>
        </>
      }
    >
      <LoginForm next={safe} />
    </AuthShell>
  );
}

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { routes } from "@/constants/routes";
import { AuthShell } from "./auth-shell";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

/**
 * Login / signup body. A client component so the copy switches language
 * instantly; the server page handles the "already logged in" redirect.
 */
export function AuthPanel({ mode, next }: { mode: "login" | "signup"; next?: string }) {
  const t = useTranslations("auth");
  const withNext = (path: string) =>
    next ? `${path}?next=${encodeURIComponent(next)}` : path;

  if (mode === "login") {
    return (
      <AuthShell
        title={t("loginTitle")}
        subtitle={t("loginSubtitle")}
        footer={
          <>
            {t("newToKaram")}{" "}
            <Link href={withNext(routes.signup)} className="font-semibold text-ink hover:opacity-60">
              {t("createOne")}
            </Link>
          </>
        }
      >
        <LoginForm next={next} />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("signupTitle")}
      subtitle={t("signupSubtitle")}
      footer={
        <>
          {t("haveAccount")}{" "}
          <Link href={withNext(routes.login)} className="font-semibold text-ink hover:opacity-60">
            {t("logInLink")}
          </Link>
        </>
      }
    >
      <SignupForm next={next} />
    </AuthShell>
  );
}

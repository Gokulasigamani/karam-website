import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthPanel, getCurrentUser } from "@/features/auth";
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

  return <AuthPanel mode="login" next={safe} />;
}

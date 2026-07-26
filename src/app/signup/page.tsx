import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthPanel, getCurrentUser } from "@/features/auth";
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

  return <AuthPanel mode="signup" next={safe} />;
}

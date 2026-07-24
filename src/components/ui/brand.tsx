import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { Logo } from "./icons";

/** Wordmark + mark. Used by the header and the footer so they never drift apart. */
export function Brand({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <Link
      href={routes.home}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg text-[1.375rem] font-extrabold tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        className,
      )}
    >
      <Logo className={cn("size-6", markClassName)} />
      <span>{siteConfig.name}</span>
    </Link>
  );
}

/** Small status pill used on case cards. */
export function StatusPill({
  children,
  tone = "lime",
  className,
}: {
  children: ReactNode;
  tone?: "lime" | "dark" | "light";
  className?: string;
}) {
  const tones = {
    lime: "bg-lime-400 text-ink",
    dark: "bg-ink text-white",
    light: "bg-white text-ink",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

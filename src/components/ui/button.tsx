import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { SmoothLink } from "./smooth-link";

/**
 * Design-system primitive: knows nothing about the domain and imports nothing
 * from `@/features`. Renders an `<a>` when given `href`, a `<button>` otherwise.
 *
 * Hover changes colour only — never position or size. Elements that move under
 * the cursor are what makes a page feel unsettled.
 */

type Variant = "primary" | "dark" | "subtle" | "onDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // `text-shade`, not `text-ink` — lime stays light, so its partner must stay dark
  primary: "bg-lime-400 text-shade hover:bg-lime-300",
  dark: "bg-contrast text-paper hover:bg-contrast/85",
  subtle: "bg-surface text-ink hover:bg-surface-strong",
  onDark: "bg-white/10 text-paper hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        keyof CommonProps | "href"
      >)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>)
  );

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href !== undefined) {
    // Anchor targets scroll smoothly; route changes go through the router
    const LinkComponent = href.includes("#") ? SmoothLink : Link;

    return (
      <LinkComponent
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </LinkComponent>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

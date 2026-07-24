import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Consistent page gutter and max width. Every section wraps its content in this,
 * so changing the site's width is a one-line change here.
 *
 * The gutter is the site's boundary: anything floating over the page — the
 * mobile menu, the privacy notice, the scroll button — lines up with `px-5`
 * on phones so nothing sits at a different distance from the edge.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[92rem] px-5 sm:px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}

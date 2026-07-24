import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Consistent page gutter and max width. Every section wraps its content in this,
 * so changing the site's width is a one-line change here.
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
    <Tag className={cn("mx-auto w-full max-w-[92rem] px-4 sm:px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}

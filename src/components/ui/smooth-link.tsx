"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { scrollToId } from "@/lib/utils/scroll";

/**
 * Anchor links that actually glide.
 *
 * Next.js jumps instantly to a hash on soft navigation, which ignores the
 * `scroll-behavior: smooth` set in CSS. When the target is on the page we are
 * already on, this takes over and scrolls it manually; otherwise it behaves like
 * a normal `Link` and `HashScroll` finishes the job once the new route paints.
 */
export function SmoothLink({
  href,
  onClick,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const pathname = usePathname();

  const [path, hash] = href.split("#");
  const targetPath = path === "" ? "/" : path;
  const isOnTargetPage = Boolean(hash) && pathname === targetPath;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!isOnTargetPage || event.defaultPrevented) return;

    // Let the browser handle modified clicks (new tab, download, etc.)
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    if (!scrollToId(hash)) return;

    event.preventDefault();
    // Keep the URL in step without triggering another scroll
    window.history.replaceState(null, "", `#${hash}`);
  };

  return (
    <Link href={href} onClick={handleClick} scroll={!isOnTargetPage} {...rest}>
      {children}
    </Link>
  );
}

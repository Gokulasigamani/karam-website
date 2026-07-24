"use client";

import { useEffect, useState } from "react";
import { mainNav } from "@/config/navigation";
import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { SmoothLink } from "@/components/ui/smooth-link";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * Only the toggle is client-side; the header itself stays a Server Component.
 * The panel closes on link click and on Escape.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="grid size-9 cursor-pointer place-items-center rounded-full bg-surface text-ink transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:size-11"
      >
        <Icon name={open ? "close" : "menu"} className="size-5" />
      </button>

      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 bg-canvas/95 px-4 pb-6 backdrop-blur-xl transition-opacity duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.label} className="border-b border-hairline">
                <SmoothLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-base font-medium text-ink transition-opacity hover:opacity-55"
                >
                  {item.label}
                </SmoothLink>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          href={routes.raiseConcern}
          size="lg"
          className="mt-6 w-full"
          onClick={() => setOpen(false)}
        >
          Raise A Concern
        </Button>
      </div>
    </div>
  );
}

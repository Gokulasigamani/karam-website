"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { joinInvite } from "@/content/pages";
import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { HelpingHands } from "@/components/ui/helping-hands";
import { Icon } from "@/components/ui/icons";

const STORAGE_KEY = "karam:join-invite";
const DELAY_MS = 20_000;

/** If the privacy notice is still up, wait for it rather than stacking. */
const RETRY_MS = 2_000;
const MAX_RETRIES = 5;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function alreadyInvited(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === joinInvite.version;
  } catch {
    return false;
  }
}

/**
 * A one-time invitation, twenty seconds in.
 *
 * Shown once ever — the flag is written the moment it appears, not when it is
 * accepted, so nobody is asked twice. It waits for the privacy notice to clear
 * before opening, so the visitor is never handed two cards at once.
 *
 * This is a real modal: focus moves into it, stays inside while it is open, and
 * returns to wherever it came from on close.
 */
export function JoinInvite() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (alreadyInvited()) return;

    let retries = 0;
    let timer: ReturnType<typeof setTimeout>;

    const reveal = () => {
      // Politely queue behind the privacy notice, but not forever
      if (document.body.classList.contains("policy-open") && retries < MAX_RETRIES) {
        retries += 1;
        timer = setTimeout(reveal, RETRY_MS);
        return;
      }

      try {
        window.localStorage.setItem(STORAGE_KEY, joinInvite.version);
      } catch {
        // Storage unavailable — the invitation may appear again next visit
      }

      setOpen(true);
    };

    timer = setTimeout(reveal, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Scroll lock, Escape to close, and focus containment
  useEffect(() => {
    if (!open) return;

    returnFocusTo.current = document.activeElement as HTMLElement | null;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const frame = requestAnimationFrame(() => dialogRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      returnFocusTo.current?.focus?.();
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="join-invite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-shade/55 p-4 backdrop-blur-sm"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-invite-title"
            tabIndex={-1}
            // Clicks inside must not reach the backdrop's close handler
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[var(--radius-block)] bg-elevated shadow-[var(--shadow-pop)] outline-none"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid size-8 cursor-pointer place-items-center rounded-full bg-paper/80 text-shade backdrop-blur-sm transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shade"
            >
              <Icon name="close" className="size-4" />
            </button>

            <HelpingHands className="aspect-[16/6]" />

            <div className="p-6 sm:p-8">
              <span className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                {joinInvite.eyebrow}
              </span>

              <h2
                id="join-invite-title"
                className="mt-3 text-[1.375rem] leading-[1.15] font-extrabold text-ink sm:text-[1.625rem]"
              >
                {joinInvite.title}
              </h2>

              <p className="mt-3 text-[0.875rem] leading-[1.7] text-muted">
                {joinInvite.body}
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-hairline py-4">
                {joinInvite.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-[1.0625rem] font-extrabold text-ink tabular-nums">
                        {stat.value}
                      </span>
                      <span className="mt-0.5 block text-[0.6875rem] text-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Button href={routes.raiseConcern} size="lg" onClick={close} className="flex-1">
                  {joinInvite.primaryLabel}
                </Button>
                <Button
                  href={routes.volunteer}
                  variant="subtle"
                  size="lg"
                  onClick={close}
                  className="flex-1"
                >
                  {joinInvite.secondaryLabel}
                </Button>
              </div>

              <p className="mt-4 text-center text-[0.6875rem] text-muted">
                {joinInvite.footnote}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

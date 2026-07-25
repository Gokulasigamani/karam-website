"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { policyNotice } from "@/content/pages";
import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Icon, Logo } from "@/components/ui/icons";

const STORAGE_KEY = "karam:policy-accepted";
const EASE = [0.16, 1, 0.3, 1] as const;

/** Splash runs for ~2.4s; wait for it to clear before sliding in. */
const APPEAR_AFTER_MS = 2700;

/**
 * Reads the stored acceptance. Wrapped because storage throws outright in some
 * privacy modes, and a consent notice failing closed is worse than showing twice.
 */
function alreadyAccepted(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === policyNotice.version;
  } catch {
    return false;
  }
}

/**
 * Privacy notice that rises from the bottom once the splash has cleared.
 *
 * Acceptance is stored against a version string, so bumping
 * `policyNotice.version` asks everyone again. Dismissing without accepting
 * stores nothing — the notice returns on the next visit rather than being
 * treated as consent.
 */
export function PolicyNotice() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("policyNotice");

  useEffect(() => {
    if (alreadyAccepted()) return;

    const timer = setTimeout(() => setVisible(true), APPEAR_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  // Lets the scroll-to-top button move out of the way on narrow screens
  useEffect(() => {
    document.body.classList.toggle("policy-open", visible);
    return () => document.body.classList.remove("policy-open");
  }, [visible]);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, policyNotice.version);
    } catch {
      // Storage unavailable — the notice will simply appear again next visit
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="policy-notice"
          role="region"
          aria-label="Privacy notice"
          initial={{ y: "130%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "130%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
          className="fixed inset-x-5 bottom-5 z-50 sm:inset-x-auto sm:bottom-7 sm:left-7 sm:max-w-sm"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
            }}
            className="relative rounded-[var(--radius-block)] bg-elevated p-5 shadow-[var(--shadow-pop)] sm:p-6"
          >
            <motion.button
              type="button"
              onClick={() => setVisible(false)}
              aria-label={t("dismiss")}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.3 } },
              }}
              className="absolute top-4 right-4 grid size-7 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Icon name="close" className="size-4" />
            </motion.button>

            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.7 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
              }}
              className="grid size-10 place-items-center rounded-xl bg-lime-400"
            >
              <Logo className="size-5 text-shade" />
            </motion.span>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
              }}
              className="mt-4 pr-8 text-[1.0625rem] font-extrabold text-ink"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
              }}
              className="mt-2 text-[0.8125rem] leading-[1.65] text-muted"
            >
              {t("body")}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
              }}
              className="mt-5 flex flex-wrap items-center gap-2.5"
            >
              <Button size="sm" onClick={accept}>
                {t("accept")}
              </Button>
              <Button href={routes.privacy} variant="subtle" size="sm">
                {t("read")}
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

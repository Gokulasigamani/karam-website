"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { mainNav } from "@/config/navigation";
import { routes } from "@/constants/routes";
import { Brand } from "@/components/ui/brand";
import { SmoothLink } from "@/components/ui/smooth-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";

/** `loggedIn` is resolved once in the server layout (cookie only, no DB) and
 *  passed in, so the header stays a fast client component that switches language
 *  instantly. */
export function Header({ loggedIn }: { loggedIn: boolean }) {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3 lg:h-[72px] lg:gap-4">
        {/* min-w-0 lets this group shrink instead of forcing page overflow when
            labels are long (e.g. in Tamil) */}
        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
          <Brand className="shrink-0 text-ink" markClassName="text-lime-400" />

          {/* Hairline divider between mark and nav, as in the reference */}
          <span aria-hidden="true" className="hidden h-5 w-px shrink-0 bg-hairline lg:block" />

          <nav aria-label={t("nav.ariaMain")} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => (
                <li key={item.key}>
                  <SmoothLink
                    href={item.href}
                    className="block rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-ink transition-opacity hover:opacity-55"
                  >
                    {t(`nav.${item.key}`)}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:gap-2.5">
          {/* Below `lg` these live inside the menu instead, so the bar stays
              to a mark and one control */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <LanguageSwitcher />
            <Link
              href={loggedIn ? routes.account : routes.login}
              className="rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap text-ink transition-opacity hover:opacity-55"
            >
              {loggedIn ? t("common.account") : t("common.logIn")}
            </Link>
            <ThemeToggle />
            <Button href={routes.raiseConcern}>{t("common.raiseConcernShort")}</Button>
          </div>
          <MobileNav loggedIn={loggedIn} />
        </div>
      </Container>
    </header>
  );
}

import { mainNav } from "@/config/navigation";
import { routes } from "@/constants/routes";
import { Brand } from "@/components/ui/brand";
import { SmoothLink } from "@/components/ui/smooth-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px] lg:gap-6">
        <div className="flex items-center gap-5">
          <Brand className="text-ink" markClassName="text-lime-400" />

          {/* Hairline divider between mark and nav, as in the reference */}
          <span aria-hidden="true" className="hidden h-5 w-px bg-hairline lg:block" />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <SmoothLink
                    href={item.href}
                    className="rounded-full px-3.5 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-55"
                  >
                    {item.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <ThemeToggle />
          {/* Compact on phones, full size from `lg` where there is room */}
          <Button href={routes.raiseConcern} size="sm" className="lg:h-11 lg:px-5 lg:text-sm">
            Raise A Concern
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { SmoothLink } from "@/components/ui/smooth-link";
import { SocialLinks } from "@/components/ui/social-links";
import { Logo } from "@/components/ui/icons";

export function Footer() {
  return (
    <Container as="footer" className="pb-5">
      <div className="card-pattern-invert rounded-[var(--radius-block)] bg-contrast px-6 py-12 text-paper sm:px-10 sm:py-14 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 text-[1.375rem] font-extrabold tracking-[-0.04em]">
              <Logo className="size-6 text-lime-400" />
              <span>{siteConfig.name}</span>
            </div>
            <p className="mt-4 max-w-[16rem] text-sm leading-[1.7] text-white/55">
              {siteConfig.tagline}. Karam does not collect or handle donations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-white">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <SmoothLink
                        href={item.href}
                        className="text-sm text-white/55 transition-colors hover:text-lime-400"
                      >
                        {item.label}
                      </SmoothLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm leading-relaxed text-white/55">
            &copy; {new Date().getFullYear()} {siteConfig.name}.
            <br />
            All rights reserved.
          </p>
          <SocialLinks
            itemClassName="bg-white/5 text-white hover:bg-white/12"
            showLabels
          />
        </div>
      </div>
    </Container>
  );
}

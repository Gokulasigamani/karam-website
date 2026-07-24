import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { Icon, type IconName } from "./icons";

const socials: { name: IconName; label: string; href: string }[] = [
  { name: "instagram", label: "Instagram", href: siteConfig.links.instagram },
  { name: "facebook", label: "Facebook", href: siteConfig.links.facebook },
  { name: "twitter", label: "Twitter", href: siteConfig.links.twitter },
  { name: "linkedin", label: "LinkedIn", href: siteConfig.links.linkedin },
];

export function SocialLinks({
  className,
  itemClassName,
  showLabels = false,
}: {
  className?: string;
  itemClassName?: string;
  showLabels?: boolean;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2 sm:gap-3", className)}>
      {socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={showLabels ? undefined : social.label}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200",
              // Labels only from `sm` — four labelled pills overflow a phone
              showLabels ? "size-10 sm:h-10 sm:w-auto sm:px-4" : "size-10",
              itemClassName,
            )}
          >
            <Icon name={social.name} className="size-[1.0625rem] shrink-0" />
            {showLabels && <span className="hidden sm:inline">{social.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

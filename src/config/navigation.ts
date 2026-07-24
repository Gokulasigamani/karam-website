import { routes } from "@/constants/routes";

export interface NavItem {
  label: string;
  href: string;
  /** Opens in a new tab and gets `rel="noreferrer"`. */
  external?: boolean;
}

/** Header navigation. */
export const mainNav: NavItem[] = [
  { label: "How It Works", href: routes.howItWorks },
  { label: "Live Cases", href: routes.cases },
  { label: "Volunteer", href: routes.volunteer },
  { label: "About Us", href: routes.about },
];

/** Footer link groups. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Take Action",
    items: [
      { label: "Raise A Concern", href: routes.raiseConcern },
      { label: "Volunteers Near You", href: routes.volunteer },
      { label: "Live Cases", href: routes.cases },
      { label: "What We Work On", href: routes.causes },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "How It Works", href: routes.howItWorks },
      { label: "FAQ", href: routes.faq },
      { label: "Contact Us", href: routes.contact },
      { label: "Official Channels", href: routes.officials },
    ],
  },
  {
    title: "Karam",
    items: [
      { label: "About Us", href: routes.about },
      { label: "Our Founders", href: `${routes.about}#founders` },
      { label: "Privacy Policy", href: routes.privacy },
      { label: "Accessibility", href: routes.privacy },
    ],
  },
];

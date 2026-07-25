import { routes } from "@/constants/routes";

export interface NavItem {
  /** Key under the `nav` message namespace — the label is translated at render. */
  key: string;
  href: string;
  /** Opens in a new tab and gets `rel="noreferrer"`. */
  external?: boolean;
}

/** Header navigation. */
export const mainNav: NavItem[] = [
  { key: "howItWorks", href: routes.howItWorks },
  { key: "liveCases", href: routes.cases },
  { key: "volunteer", href: routes.volunteer },
  { key: "aboutUs", href: routes.about },
];

/** Footer link groups. `titleKey` and each item `key` live under `nav`. */
export const footerNav: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: "groupTakeAction",
    items: [
      { key: "raiseConcern", href: routes.raiseConcern },
      { key: "volunteersNearYou", href: routes.volunteer },
      { key: "liveCases", href: routes.cases },
      { key: "whatWeWorkOn", href: routes.causes },
    ],
  },
  {
    titleKey: "groupSupport",
    items: [
      { key: "howItWorks", href: routes.howItWorks },
      { key: "faq", href: routes.faq },
      { key: "contactUs", href: routes.contact },
      { key: "officialChannels", href: routes.officials },
    ],
  },
  {
    titleKey: "groupKaram",
    items: [
      { key: "aboutUs", href: routes.about },
      { key: "ourFounders", href: `${routes.about}#founders` },
      { key: "privacy", href: routes.privacy },
      { key: "terms", href: routes.terms },
      { key: "accessibility", href: routes.accessibility },
    ],
  },
];

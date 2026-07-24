import type { IconName } from "@/components/ui/icons";

export interface Cause {
  icon: IconName;
  title: string;
  description: string;
}

export const causesIntro = {
  eyebrow: "What We Work On",
  title: "The Everyday Things People Get Stuck On",
  description:
    "Most people don't need charity — they need someone to notice, and someone with authority to answer. These are the concerns Karam members take up most often.",
};

export const causes: Cause[] = [
  {
    icon: "home",
    title: "Food & Shelter",
    description:
      "Ration support, temporary shelter and relief for families displaced by eviction, fire or flood.",
  },
  {
    icon: "stethoscope",
    title: "Medical Access",
    description:
      "Getting patients admitted, arranging blood, and unblocking treatment held up by paperwork.",
  },
  {
    icon: "fileText",
    title: "Documents & Entitlements",
    description:
      "Ration cards, pensions, disability certificates and scheme benefits that were applied for but never arrived.",
  },
  {
    icon: "bookOpen",
    title: "Education Support",
    description:
      "School readmission, fee waivers and supplies for children pulled out of class by circumstance.",
  },
  {
    icon: "scale",
    title: "Complaints & Grievances",
    description:
      "Unanswered petitions, denied services and civic failures escalated to the officer responsible.",
  },
  {
    icon: "lifeBuoy",
    title: "Emergency Response",
    description:
      "Rapid coordination during floods, fire and accidents — the nearest volunteers mobilised first.",
  },
];

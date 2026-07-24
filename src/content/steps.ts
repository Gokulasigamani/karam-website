import type { IconName } from "@/components/ui/icons";

export interface Step {
  number: string;
  icon: IconName;
  title: string;
  description: string;
}

export const stepsIntro = {
  eyebrow: "How Karam Works",
  title: "From One Voice To Real Help",
  description:
    "Anyone can raise a concern. The community verifies it, volunteers nearby respond, and when it needs official action we route it to the right government desk — with the whole trail visible to everyone involved.",
};

export const steps: Step[] = [
  {
    number: "01",
    icon: "megaphone",
    title: "Raise A Concern",
    description:
      "Report a family in need, a broken public service, or a complaint that has gone unanswered. Add a location, a photo and a few lines — that is enough to start.",
  },
  {
    number: "02",
    icon: "users",
    title: "The Community Responds",
    description:
      "Volunteers in the same ward see it first. They visit, confirm the situation on the ground, and add what they find so nobody acts on a rumour.",
  },
  {
    number: "03",
    icon: "building",
    title: "Reach The Right Desk",
    description:
      "Verified cases are forwarded to the department that can actually act — revenue, health, welfare, police — with a named officer attached, not a general inbox.",
  },
  {
    number: "04",
    icon: "shieldCheck",
    title: "Follow It To Closure",
    description:
      "Every reply, visit and order is logged against the case. It stays open, and publicly visible, until the person who raised it confirms it is resolved.",
  },
];

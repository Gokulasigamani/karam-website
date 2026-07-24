import type { IconName } from "@/components/ui/icons";

export const aboutHero = {
  eyebrow: "About Karam",
  title: "Built By Sunajo, For Tamil Nadu.",
  description:
    "Karam is a civic platform made by Sunajo — a small team who kept watching the same thing happen: someone genuinely needed help, someone nearby was willing to give it, and an office in between was where it stopped. Karam exists to close that gap.",
};

export const story = {
  title: "It Started With One Ration Card",
  paragraphs: [
    "A family in our neighbourhood had been to the taluk office four times over three months about a ration card that never arrived. Every visit ended the same way — come back next week. They were not being refused. Nobody was against them. The request simply had nowhere to sit and nobody whose job it was to carry it forward.",
    "Two people from the same street went with them on the fifth visit. Not officials, not activists — just two more people who could confirm the story was real. It was settled in an afternoon. Nothing about the case had changed, only the number of people standing behind it.",
    "That is the whole idea behind Karam. Most people in need are not asking for money. They are asking to be believed, and for someone with the authority to act to actually hear it. A community can supply the first. A working channel to the right desk supplies the second.",
  ],
  pullQuote:
    "Nothing about the case had changed — only the number of people standing behind it.",
  imageUrl: "https://picsum.photos/seed/karam-story/900/1100",
  imageAlt: "Two neighbours accompanying a family to a government office",
};

export interface StatePoint {
  icon: IconName;
  title: string;
  description: string;
}

export const tamilNaduIntro = {
  eyebrow: "Across The State",
  title: "How Karam Works Across Tamil Nadu",
  image: {
    url: "https://picsum.photos/seed/karam-banner-tn/1920/700",
    alt: "A street in a Tamil Nadu town at dusk",
  },
  description:
    "The state already has a structure for this — districts, taluks, wards and a named officer for almost every kind of request. What it lacks is a way for ordinary people to reach the right one. Karam maps itself onto that structure instead of working around it.",
  /** Cycled one at a time in the banner. Keep them short — long names reflow. */
  districts: [
    "Chennai",
    "Vellore",
    "Cuddalore",
    "Madurai",
    "Coimbatore",
    "Tiruvallur",
    "Salem",
    "Thanjavur",
  ],
};

export const statePoints: StatePoint[] = [
  {
    icon: "mapPin",
    title: "Organised By Ward And Taluk",
    description:
      "Members register the ward they actually live in. A concern raised in Vellore taluk is seen first by people from that taluk — not by a state-wide feed where it disappears.",
  },
  {
    icon: "users",
    title: "Verified By Neighbours",
    description:
      "Two independent members from the same area confirm what they see on the ground before anything moves. Local knowledge is the fastest verification there is.",
  },
  {
    icon: "building",
    title: "Routed To The Correct Office",
    description:
      "Each category maps to the department that holds authority over it — revenue, health, social welfare, school education, municipal administration or police.",
  },
  {
    icon: "shieldCheck",
    title: "Escalated, Never Dropped",
    description:
      "If a case gets no reply by its stated date, it moves up the hierarchy automatically — taluk to division to district. The trail stays public the whole way.",
  },
];

export interface Founder {
  name: string;
  role: string;
  focus: string;
  imageUrl: string;
  imageAlt: string;
}

export const foundersIntro = {
  title: "The People Behind Karam",
  description:
    "Sunajo was started by three people who wanted to build something their own neighbourhoods could use. They still read the cases.",
};

export const founders: Founder[] = [
  {
    name: "Gokulasigamani",
    role: "Co-Founder · Platform",
    focus:
      "Designs the case-routing system — how a concern travels from a phone in a village to a named officer, and how that trail stays honest.",
    imageUrl: "https://picsum.photos/seed/karam-founder-gokul/700/800",
    imageAlt: "Portrait of Gokulasigamani",
  },
  {
    name: "Harini",
    role: "Co-Founder · Community",
    focus:
      "Builds the volunteer network ward by ward, and runs the verification standards that decide when a case is ready to be escalated.",
    imageUrl: "https://picsum.photos/seed/karam-founder-harini/700/800",
    imageAlt: "Portrait of Harini",
  },
  {
    name: "Hemavardhini",
    role: "Co-Founder · Government Relations",
    focus:
      "Works with departments across the state so cases arrive in a form officials can act on, and keeps response commitments on the record.",
    imageUrl: "https://picsum.photos/seed/karam-founder-hema/700/800",
    imageAlt: "Portrait of Hemavardhini",
  },
];

export const principles = [
  {
    title: "No money changes hands",
    description:
      "Karam holds no funds and accepts no donations. Help is arranged directly between the people involved.",
  },
  {
    title: "Nothing moves unverified",
    description:
      "A case reaches an official only after members on the ground have confirmed it. Claims are not forwarded.",
  },
  {
    title: "The trail stays public",
    description:
      "Every reply, visit and order is logged against the case so anyone can see where it stands.",
  },
];

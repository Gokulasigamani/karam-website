import type { IconName } from "@/components/ui/icons";

/* -------------------------------------------------------------- Raise a concern */

export const concernPage = {
  eyebrow: "Raise A Concern",
  title: "Tell Us Who Needs Help.",
  image: {
    url: "https://picsum.photos/seed/karam-banner-concern/1920/700",
    alt: "A volunteer listening to a family outside their home",
  },
  rotating: {
    prefix: "Start with",
    items: [
      "a ration card that never came",
      "a pension stuck at the taluk office",
      "a child out of school since the flood",
      "a complaint nobody answered",
      "a family with nowhere to sleep",
    ],
  },
  description:
    "It takes about three minutes. Once submitted, volunteers registered in the same ward are notified, and the case only reaches an official after two of them confirm it on the ground.",
  steps: [
    "You describe the situation and where it is",
    "Two local volunteers verify it in person",
    "It is routed to the department that can act",
    "You are notified at every reply until it closes",
  ],
  reassurance: {
    title: "Before you start",
    points: [
      "Karam never asks for money and never handles funds.",
      "You can keep your name private. Only verifying volunteers and the handling officer will see it.",
      "You can raise a concern on behalf of someone else.",
      "If someone is in immediate danger, call the emergency services first, then raise it here.",
    ],
  },
};

/* ------------------------------------------------------------------- Volunteers */

export const volunteerPage = {
  eyebrow: "Volunteers Near You",
  title: "An Hour From You Closes Someone's Case.",
  image: {
    url: "https://picsum.photos/seed/karam-banner-volunteer/1920/700",
    alt: "Volunteers walking through a neighbourhood together",
  },
  rotating: {
    prefix: "This week you could",
    items: [
      "verify a case on your street",
      "sit with someone through an application",
      "be first to reach an emergency",
      "translate a form that stalled",
      "walk a family into the right office",
    ],
  },
  description:
    "Volunteers are the reason Karam works. You confirm what is happening on your own street, and that confirmation is what turns a claim into something an official will act on.",
};

export interface VolunteerStep {
  icon: IconName;
  title: string;
  description: string;
}

export const volunteerSteps: VolunteerStep[] = [
  {
    icon: "mapPin",
    title: "You only see cases near you",
    description:
      "Register your ward and you are notified about concerns raised within reach, not a state-wide feed you have to filter.",
  },
  {
    icon: "users",
    title: "Verification takes about an hour",
    description:
      "Visit, see the situation, add what you find. Two independent confirmations are enough to move a case forward.",
  },
  {
    icon: "shieldCheck",
    title: "You are never asked for money",
    description:
      "Volunteers do not collect, hold or hand over funds. If anyone asks you to, report it and we remove them.",
  },
  {
    icon: "building",
    title: "Your name goes on the record",
    description:
      "Verifications are attributed, which is exactly why officials treat them as evidence rather than hearsay.",
  },
];

export const volunteerStats = [
  { value: "4,120", label: "Active volunteers" },
  { value: "38", label: "Districts covered" },
  { value: "8,240", label: "Cases closed together" },
];

/* ---------------------------------------------------------------------- Contact */

export const contactPage = {
  eyebrow: "Contact Us",
  title: "Talk To A Person.",
  image: {
    url: "https://picsum.photos/seed/karam-banner-contact/1920/700",
    alt: "A Karam coordinator on a call at a desk",
  },
  rotating: {
    prefix: "Write to us about",
    items: [
      "a case you already raised",
      "volunteering in your ward",
      "working with us as a department",
      "press and media",
      "something broken on this site",
    ],
  },
  description:
    "Questions about a case, volunteering, or working with us as a department. This reaches the team directly. For anything urgent about an open case, use the case thread instead so the history stays in one place.",
};

export interface ContactMethod {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  note: string;
}

export const contactMethods: ContactMethod[] = [
  {
    icon: "megaphone",
    label: "Helpline",
    value: "1800 000 0000",
    href: "tel:18000000000",
    note: "Mon to Sat, 9am to 7pm IST",
  },
  {
    icon: "fileText",
    label: "Email",
    value: "hello@karam.org",
    href: "mailto:hello@karam.org",
    note: "We reply within two working days",
  },
  {
    icon: "building",
    label: "Office",
    value: "Sunajo, Chennai, Tamil Nadu",
    note: "Visits by appointment only",
  },
];

/* --------------------------------------------------------------- Policy notice */

export const policyNotice = {
  /** Bump this when the policy changes materially, to ask everyone again. */
  version: "2026-07-24",
  title: "Before you continue",
  body: "Karam keeps only what a case needs in order to move, never sells it, and runs no advertising or tracking. Cookies here do one job: keep you signed in and remember your ward.",
  acceptLabel: "I Accept",
  readLabel: "Read The Policy",
  dismissLabel: "Not now",
};

/* ----------------------------------------------------------------- Join invite */

export const joinInvite = {
  /** Bump to invite everyone again after a campaign change. */
  version: "v1",
  eyebrow: "Join Karam",
  title: "Someone near you is waiting to be believed.",
  body: "Most people in need are not asking for money. They are asking for someone to confirm what is happening, and for the right desk to hear it. That is the whole job, and it takes about an hour.",
  stats: [
    { value: "1,24,860+", label: "Members" },
    { value: "38", label: "Districts" },
    { value: "8,240", label: "Cases closed" },
  ],
  primaryLabel: "Raise A Concern",
  secondaryLabel: "Volunteer Near You",
  footnote: "Karam never asks for money and never handles funds.",
};

/* ---------------------------------------------------------------------- Privacy */

export const privacyPage = {
  eyebrow: "Privacy Policy",
  title: "What We Collect, And Why.",
  image: {
    url: "https://picsum.photos/seed/karam-banner-privacy/1920/700",
    alt: "Case files and paperwork on a desk",
  },
  rotating: {
    prefix: "Our promise:",
    items: [
      "we never sell your data",
      "we never handle money",
      "you choose what stays private",
      "you can have it all deleted",
      "no advertising, no tracking",
    ],
  },
  description:
    "Karam handles details about people at their most vulnerable. This page is written plainly on purpose. If anything here is unclear, ask us and we will fix the wording.",
  lastUpdated: "24 July 2026",
};

export interface PrivacySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export const privacySections: PrivacySection[] = [
  {
    heading: "What we collect",
    paragraphs: [
      "We only collect what a case needs in order to move. Nothing here is sold, rented or shared for advertising. Karam runs no advertising of any kind.",
    ],
    bullets: [
      "Your name, mobile number and, if you give one, email address.",
      "The district and locality you register or raise a concern in.",
      "The contents of concerns you raise, and any updates you add to them.",
      "Basic technical information such as browser type and approximate region, used to keep the service working.",
    ],
  },
  {
    heading: "Who can see your details",
    paragraphs: [
      "When you raise a concern you choose whether your name appears publicly on the case. If you choose to keep it private, it is visible only to the volunteers verifying the case and the officer handling it, never to other members or the public.",
      "The description of a case is public by default, because visibility is what keeps it moving. Remove anything from it you would not want read by a stranger.",
    ],
  },
  {
    heading: "Sharing with government departments",
    paragraphs: [
      "Verified cases are forwarded to the department with authority to resolve them. That forwarding includes the case description, its location, the verification trail and a contact number so the officer can reach the person affected.",
      "We share the minimum needed for an officer to act. We do not hand over bulk member data to any department, agency or third party.",
    ],
  },
  {
    heading: "We never handle money",
    paragraphs: [
      "Karam does not accept donations, hold funds or process payments. We therefore do not collect or store bank details, card numbers or payment information of any kind. Anyone asking you for money in Karam's name is not acting for us. Report it and we will remove them.",
    ],
  },
  {
    heading: "How long we keep things",
    paragraphs: [
      "Case records are kept while the case is open and for two years after it closes, so that a pattern of unresolved requests can still be shown to a department later. Volunteer and member accounts are kept until you ask us to close them.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You can ask us for a copy of your data, correct anything wrong, withdraw your name from a public case, or delete your account entirely. Write to hello@karam.org and we will action it within thirty days.",
      "Deleting your account does not automatically erase a case you raised if others are still working on it. Tell us and we will anonymise your details instead.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use only what is needed to keep you signed in and to remember your ward. There are no advertising or cross-site tracking cookies on this site.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If we change how data is handled in any way that affects you, we will say so on this page and notify registered members before it takes effect.",
    ],
  },
];

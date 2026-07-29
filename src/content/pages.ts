import type { IconName } from "@/components/ui/icons";

/* -------------------------------------------------------------- Raise a concern */

export const concernPage = {
  eyebrow: "Raise A Concern",
  title: "Tell Us Who Needs Help.",
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

/* ---------------------------------------------------------------- Accessibility */

export const accessibilityPage = {
  eyebrow: "Accessibility",
  title: "Usable By Everyone, Or It Does Not Work.",
  rotating: {
    prefix: "Built to work",
    items: [
      "with a screen reader",
      "at 200% zoom",
      "without a mouse",
      "on a five-year-old phone",
      "on a weak connection",
    ],
  },
  description:
    "The people who most need Karam are often the least well served by the web. Older phones, small data packs, poor eyesight, no reading confidence. This page says what we hold ourselves to, and where we currently fall short.",
  lastUpdated: "24 July 2026",
};

export const accessibilitySections: PrivacySection[] = [
  {
    heading: "The standard we hold to",
    paragraphs: [
      "Karam targets WCAG 2.2 Level AA. That is the level most public bodies in India are held to, and we see no reason to ask less of ourselves than we ask of the departments we escalate cases to.",
      "AA is a floor, not a finish line. Where meeting it still leaves someone stuck, we treat that as a fault to fix rather than a box already ticked.",
    ],
  },
  {
    heading: "What that means in practice",
    paragraphs: [
      "These are the things we check before anything ships, not afterwards.",
    ],
    bullets: [
      "Every page works end to end with a keyboard alone, and the focused element is always visible.",
      "Text meets AA contrast in both the light and dark themes, and the theme choice is remembered.",
      "Text can be zoomed to 200% without content being cut off or overlapping.",
      "Images that carry meaning have alt text; images that are decoration are hidden from screen readers.",
      "Forms use real labels, describe their errors in words, and never rely on colour alone to signal a problem.",
      "Motion is decorative only, and is reduced automatically when the device asks for reduced motion.",
      "Content that reveals on scroll stays visible when JavaScript does not load.",
    ],
  },
  {
    heading: "Where we currently fall short",
    paragraphs: [
      "Naming these is more useful than claiming they do not exist.",
    ],
    bullets: [
      "The site is currently English-only. Tamil is the first language of most people we serve, and a Tamil version is the single largest accessibility gap we have.",
      "Case descriptions are written by members and volunteers, so reading difficulty varies. We are not yet editing them for plain language.",
      "We have tested with NVDA and VoiceOver, but not yet with TalkBack on low-end Android, which is what most of our members actually use.",
      "Photographs on case pages are supplied by volunteers and their alt text is not always as descriptive as it should be.",
    ],
  },
  {
    heading: "If something here blocks you",
    paragraphs: [
      "Tell us and we will fix it. Describe what you were trying to do, what device or assistive technology you were using, and where it stopped working. An accessibility fault is treated as a live defect, not a feature request.",
      "If the website itself is the barrier, you do not have to use it. A volunteer can raise a concern on your behalf — that route exists precisely because a form on a screen is not reachable for everyone.",
    ],
  },
  {
    heading: "Reviewing this page",
    paragraphs: [
      "We review this statement whenever a significant part of the site changes, and at minimum once a year. The date above is the last time it was checked against the live site rather than the last time the wording was edited.",
    ],
  },
];

/* ------------------------------------------------------------------------ Terms */

export const termsPage = {
  eyebrow: "Terms Of Use",
  title: "What You Can Expect, And What We Ask.",
  rotating: {
    prefix: "In short:",
    items: [
      "we never handle money",
      "we are not a government body",
      "raise things in good faith",
      "verification comes before escalation",
      "you can leave at any time",
    ],
  },
  description:
    "These terms cover using the Karam website and taking part as a member or volunteer. They are written to be read, not to be survived. If a clause here does not make sense to you, that is our failure and we will rewrite it.",
  lastUpdated: "24 July 2026",
};

export const termsSections: PrivacySection[] = [
  {
    heading: "What Karam is",
    paragraphs: [
      "Karam is a community platform. Members raise concerns, volunteers verify them in person, and verified cases are routed to the government department with the authority to resolve them.",
      "Karam is not a government body and has no statutory power. We cannot compel any department to act, guarantee an outcome, or promise a timeframe. What we can do is make sure a case reaches the right desk with evidence attached, and stays visible until it is answered.",
    ],
  },
  {
    heading: "We never handle money",
    paragraphs: [
      "Karam does not accept donations, collect fees, hold funds or process payments of any kind, from anyone, ever. There is no circumstance in which a genuine Karam volunteer or staff member will ask you for money.",
      "If someone asks you to pay for a case to be raised, verified, escalated or resolved, they are not acting for Karam. Report it to us and we will remove them and, where appropriate, refer it onward.",
    ],
  },
  {
    heading: "Raising a concern in good faith",
    paragraphs: [
      "When you raise a concern you are asking neighbours to spend their time on it and asking an official to act on it. Both are real costs, so what you submit must be true as far as you know it.",
    ],
    bullets: [
      "Describe the situation accurately, including anything that weakens it.",
      "Raise a concern on someone else's behalf only with their knowledge and agreement.",
      "Do not submit a concern to harass, defame or pressure a private individual.",
      "Do not raise the same concern repeatedly to inflate its apparent support.",
      "Do not include another person's private details without their consent.",
    ],
  },
  {
    heading: "If you volunteer",
    paragraphs: [
      "Verification is the part of Karam that everything else rests on. A case that reaches a department carries your confirmation with it.",
    ],
    bullets: [
      "Verify only what you have seen yourself. Do not confirm a case on someone's word.",
      "Never ask for or accept money, goods or favours in connection with a case.",
      "Treat what you learn in someone's home as private, including after the case closes.",
      "Do not represent yourself as an official, or as speaking for any department.",
      "In an emergency, contact the emergency services first. Karam is not an emergency service.",
    ],
  },
  {
    heading: "Cases and content you post",
    paragraphs: [
      "You keep ownership of what you write and the photographs you upload. By posting them you give Karam permission to display them on the case, include them in the file sent to the handling department, and keep them in the case record.",
      "We may edit a case for clarity, remove details that expose someone unnecessarily, or take a case down entirely if it breaches these terms. Where we take something down we will say why.",
    ],
  },
  {
    heading: "Accounts",
    paragraphs: [
      "You are responsible for what happens under your account, so keep your login to yourself. One person, one account — duplicate accounts distort how much support a case appears to have.",
      "You can close your account at any time. We may suspend an account that breaches these terms, and we will tell you why when we do.",
    ],
  },
  {
    heading: "Limits of our responsibility",
    paragraphs: [
      "Karam is provided as it is. We work to keep case information accurate, but much of it comes from members and volunteers and we cannot guarantee that every detail is correct or current.",
      "We are not responsible for the decisions or conduct of any government department, officer or third party, nor for the outcome of any case. We are not liable for indirect or consequential loss arising from use of the platform. Nothing here limits liability that cannot be limited under Indian law.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India, and the courts of Tamil Nadu have jurisdiction over any dispute arising from them.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "If we change these terms in a way that affects you, we will say so on this page and notify registered members before the change takes effect. Continuing to use Karam after that means the updated terms apply.",
    ],
  },
];

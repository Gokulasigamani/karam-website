export type CaseStatus = "Pending" | "Open" | "Verified" | "Escalated" | "Resolved";

/** A volunteer's on-the-ground confirmation of a pending case. */
export interface CaseVerification {
  userId: string;
  at: string;
}

/**
 * One step on a case's resolution trail. `done` entries have happened; the
 * first entry that is not done is what the case is currently waiting on.
 */
export interface CaseEvent {
  date: string;
  title: string;
  detail: string;
  done: boolean;
}

export interface CaseRecord {
  id: string;
  category: string;
  title: string;
  summary: string;
  location: string;
  status: CaseStatus;
  /** Department or officer the case was routed to. */
  routedTo: string;
  supporters: number;
  daysOpen: number;
  /** 0–100 — how far along the resolution trail the case is. */
  progress: number;
  imageUrl: string;
  imageAlt: string;

  /* ---- Detail page only. The card never reads past this line. ---- */

  /** Human-readable date the concern was first raised. */
  raisedOn: string;
  /** The fuller account, as paragraphs. */
  background: string[];
  /** What would move the case forward right now. */
  needs: string[];
  timeline: CaseEvent[];

  /* ---- Lifecycle. Absent on the hand-authored seed cases. ---- */

  /** The member who raised the concern this case came from. */
  raisedByUserId?: string;
  /** Volunteer confirmations; two distinct ones move a case out of Pending. */
  verifications?: CaseVerification[];
  /** District, used to match a case to nearby volunteers. Absent on seed cases. */
  district?: string;
  /** ISO timestamp, set when a case is created from a concern. Sort key. */
  createdAt?: string;
}

export const casesIntro = {
  eyebrow: "Live Cases",
  title: "Happening Right Now In The State",
  description:
    "Every case here was raised by a member and verified on the ground. Follow one to get updates, or step in if it is near you.",
  /** Sends the landing-page teaser to the full list. */
  ctaLabel: "See All Cases",
};

/** Banner copy for the `/cases` listing. */
export const casesPage = {
  eyebrow: "Live Cases",
  title: "Every Case On The Board Right Now.",
  image: {
    url: "https://picsum.photos/seed/karam-banner-cases/1920/700",
    alt: "Volunteers reviewing case paperwork together on a doorstep",
  },
  rotating: {
    prefix: "Each one is",
    items: [
      "raised by a neighbour",
      "verified in person",
      "routed to a named desk",
      "followed until it closes",
      "open for you to join",
    ],
  },
  description:
    "Nothing reaches this page until two volunteers have confirmed it on the ground. Open a case to read the full account, see which desk it sits on, and follow what happens next.",
};

/**
 * Seed data. The app reads cases from MongoDB via `features/cases/server`;
 * this array is the source the seed script loads into the `cases` collection.
 * Keep it in sync with the collection, or re-run `npm run seed:cases`.
 */
export const cases: CaseRecord[] = [
  {
    id: "ration-ward-14",
    category: "Food & Shelter",
    title: "Ration Support For 26 Displaced Families",
    summary:
      "Families relocated after the canal-bank clearance have been without ration cards for eleven weeks.",
    location: "Ward 14, Tiruvallur",
    status: "Escalated",
    routedTo: "District Supply Officer",
    supporters: 148,
    daysOpen: 9,
    progress: 72,
    imageUrl: "https://picsum.photos/seed/karam-case-ration/800/600",
    imageAlt: "Volunteers sorting relief supplies into sacks",
    raisedOn: "15 July 2026",
    background: [
      "Twenty-six families were moved off the canal bank in April when the clearance work began. The relocation itself was orderly. What followed was not: the families were rehoused across three different streets, and the address on every one of their ration cards became invalid overnight.",
      "Eleven weeks later none of the cards have been reissued. Applications were submitted at the taluk office in the first week of May. Six families have acknowledgement slips; the rest were told to come back later and have no paper at all. Without a card, none of them can draw the monthly rice, sugar or kerosene entitlement.",
      "Two volunteers walked all twenty-six households in a single afternoon and photographed every slip that exists. That evidence went to the District Supply Officer with the case.",
    ],
    needs: [
      "A written reissue date from the District Supply Officer for all 26 households.",
      "Interim tokens so families can draw this month's ration while cards are pending.",
      "Two more volunteers in Ward 14 to sit with the families who have no acknowledgement slip and refile.",
    ],
    timeline: [
      {
        date: "15 July 2026",
        title: "Concern raised",
        detail:
          "Raised by a member living on the relocated street, on behalf of all twenty-six households.",
        done: true,
      },
      {
        date: "16 July 2026",
        title: "Verified on the ground",
        detail:
          "Two Ward 14 volunteers visited every household, confirmed the count and collected the six acknowledgement slips that exist.",
        done: true,
      },
      {
        date: "18 July 2026",
        title: "Routed to the District Supply Officer",
        detail:
          "Case file forwarded with the verification trail and photographs of the submitted applications.",
        done: true,
      },
      {
        date: "22 July 2026",
        title: "Escalated to the Collectorate",
        detail:
          "No response inside the four-day window, so the case was raised to the next desk with the original thread attached.",
        done: true,
      },
      {
        date: "Pending",
        title: "Cards reissued",
        detail: "The case stays open until all twenty-six families can draw a ration.",
        done: false,
      },
    ],
  },
  {
    id: "pension-delay",
    category: "Documents & Entitlements",
    title: "Widow Pension Stalled For 40+ Applicants",
    summary:
      "Applications cleared at the taluk office in March have not reached disbursement. Members are collecting acknowledgement slips.",
    location: "Vellore Taluk",
    status: "Verified",
    routedTo: "Revenue Divisional Office",
    supporters: 92,
    daysOpen: 17,
    progress: 48,
    imageUrl: "https://picsum.photos/seed/karam-case-pension/800/600",
    imageAlt: "An elderly woman holding application documents",
    raisedOn: "7 July 2026",
    background: [
      "Forty-three widow pension applications were cleared at the taluk office in March. Clearance is the hard part, and it was done — the applicants have the stamped intimation to prove it. What has not happened is disbursement. Not one of the forty-three has received a rupee in the four months since.",
      "The applicants are mostly women over sixty living alone. Several have been travelling to the taluk office every fortnight at their own cost to ask, and being sent home without an answer each time.",
      "Volunteers have now collected acknowledgement slips from thirty-one of the forty-three. The remaining twelve either lost theirs or were never given one, and those are being refiled from the taluk register.",
    ],
    needs: [
      "A disbursement date from the Revenue Divisional Office for the cleared applications.",
      "Copies of the taluk register entries for the twelve applicants with no slip.",
      "A volunteer with Tamil typing to help refile those twelve.",
    ],
    timeline: [
      {
        date: "7 July 2026",
        title: "Concern raised",
        detail:
          "Raised by a volunteer after four separate applicants reported the same stall in one week.",
        done: true,
      },
      {
        date: "9 July 2026",
        title: "Verified on the ground",
        detail:
          "Two volunteers confirmed the clearance stamps on nine applications and established that the pattern was taluk-wide, not individual.",
        done: true,
      },
      {
        date: "12 July 2026",
        title: "Routed to the Revenue Divisional Office",
        detail:
          "Filed as a single grouped case rather than forty-three separate ones, so it cannot be closed one applicant at a time.",
        done: true,
      },
      {
        date: "In progress",
        title: "Collecting the remaining slips",
        detail: "Thirty-one of forty-three collected. Twelve are being rebuilt from the register.",
        done: false,
      },
      {
        date: "Pending",
        title: "First disbursement",
        detail: "The case closes when the arrears reach all forty-three applicants.",
        done: false,
      },
    ],
  },
  {
    id: "school-readmission",
    category: "Education Support",
    title: "Readmission For 31 Children After Flood",
    summary:
      "Children out of school since the October flood. Transfer certificates were lost; the community is rebuilding the records.",
    location: "Cuddalore Block 3",
    status: "Open",
    routedTo: "Block Education Officer",
    supporters: 61,
    daysOpen: 4,
    progress: 25,
    imageUrl: "https://picsum.photos/seed/karam-case-school/800/600",
    imageAlt: "Schoolchildren sitting together in a classroom",
    raisedOn: "20 July 2026",
    background: [
      "Thirty-one children in Block 3 have not been inside a classroom since the October flood. Their schools reopened; the children did not return. In almost every case the reason is the same — the transfer certificate went into the water with everything else, and the receiving school will not admit a child without one.",
      "Nine months out of school is enough for a child to be quietly written off as a dropout. Several of the older children have started day labour. The families are not refusing school; they are stuck at a counter.",
      "The community is rebuilding the records from what survives: attendance registers at the original schools, immunisation cards, and in four cases a photograph of the certificate on a relative's phone.",
    ],
    needs: [
      "A blanket instruction from the Block Education Officer allowing provisional admission while certificates are reconstructed.",
      "Attendance-register extracts from the four original schools.",
      "Volunteers to sit with the eleven families who have no surviving document of any kind.",
    ],
    timeline: [
      {
        date: "20 July 2026",
        title: "Concern raised",
        detail:
          "Raised by a teacher who noticed the same eleven names missing from her register nine months on.",
        done: true,
      },
      {
        date: "22 July 2026",
        title: "Verified on the ground",
        detail:
          "Two volunteers visited the families and confirmed thirty-one children out of school, with the missing certificate as the blocking reason in twenty-eight of them.",
        done: true,
      },
      {
        date: "In progress",
        title: "Rebuilding the records",
        detail:
          "Twenty of thirty-one children now have at least one document that establishes their last class.",
        done: false,
      },
      {
        date: "Pending",
        title: "Routing to the Block Education Officer",
        detail: "Filed once the record set is complete enough to ask for provisional admission.",
        done: false,
      },
      {
        date: "Pending",
        title: "Children back in class",
        detail: "The case closes when all thirty-one are admitted and attending.",
        done: false,
      },
    ],
  },
];

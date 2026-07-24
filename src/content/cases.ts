export type CaseStatus = "Open" | "Verified" | "Escalated" | "Resolved";

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
}

export const casesIntro = {
  eyebrow: "Live Cases",
  title: "Happening Right Now In The State",
  description:
    "Every case here was raised by a member and verified on the ground. Follow one to get updates, or step in if it is near you.",
};

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
  },
];

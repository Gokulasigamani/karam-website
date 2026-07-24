export const governmentIntro = {
  eyebrow: "Official Channel",
  title: "A Direct Line To The Desk That Decides",
  description:
    "A complaint dropped into a general helpline goes nowhere. Karam maps every verified case to the department and officer with the authority to close it, then keeps the thread open until they respond.",
};

export interface Department {
  name: string;
  scope: string;
  /** Median first-response time, shown so expectations stay honest. */
  responseTime: string;
}

export const departments: Department[] = [
  { name: "Revenue & Disaster Management", scope: "Relief, land, certificates", responseTime: "3 days" },
  { name: "Health & Family Welfare", scope: "Admissions, medical aid", responseTime: "2 days" },
  { name: "Social Welfare", scope: "Pensions, scheme benefits", responseTime: "5 days" },
  { name: "School Education", scope: "Admissions, fee relief", responseTime: "4 days" },
  { name: "Municipal Administration", scope: "Water, sanitation, roads", responseTime: "6 days" },
  { name: "Police & Public Safety", scope: "Grievances, protection", responseTime: "1 day" },
];

export const governmentPoints: string[] = [
  "Cases carry a verification trail, so officials receive evidence rather than allegations.",
  "Every escalation names a responsible officer and a date — nothing sits in a shared inbox.",
  "Replies, site visits and orders are logged publicly against the case.",
  "Unanswered cases are automatically raised to the next level in the hierarchy.",
];

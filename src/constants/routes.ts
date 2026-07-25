/**
 * Every internal URL in one place, so renaming a route segment is a
 * single-file change instead of a project-wide string hunt.
 *
 * Anchors point at sections on the landing page. When a section becomes its own
 * page, change the value here and the whole site follows.
 */
export const routes = {
  home: "/",
  about: "/about",
  raiseConcern: "/raise-a-concern",
  volunteer: "/volunteers-near-you",
  cases: "/cases",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  accessibility: "/accessibility",

  // Accounts
  login: "/login",
  signup: "/signup",
  account: "/account",
  verifyQueue: "/account/verify",
  admin: "/admin",

  // Landing-page sections
  howItWorks: "/#how-it-works",
  causes: "/#causes",
  /** The three-card teaser on the landing page. The full list is `cases`. */
  casesSection: "/#cases",
  officials: "/#officials",
  join: "/#join",
  faq: "/#faq",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

/**
 * Kept out of `routes` so `AppRoute` stays a union of strings. Case ids come
 * from the content layer today and from the API later; the shape is the same.
 */
export function caseRoute(id: string): string {
  return `${routes.cases}/${id}`;
}

/** Districts used by the location fields on the concern and volunteer forms. */
export const districts = [
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dindigul",
  "Erode",
  "Kanchipuram",
  "Madurai",
  "Nagapattinam",
  "Salem",
  "Thanjavur",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tiruppur",
  "Tiruvallur",
  "Vellore",
  "Villupuram",
] as const;

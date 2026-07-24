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
  contact: "/contact",
  privacy: "/privacy",

  // Landing-page sections
  howItWorks: "/#how-it-works",
  causes: "/#causes",
  cases: "/#cases",
  officials: "/#officials",
  join: "/#join",
  faq: "/#faq",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

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

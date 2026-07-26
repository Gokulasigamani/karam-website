import type { Metadata } from "next";
import { casesPage } from "@/content/cases";
import { getCases } from "@/features/cases/server/cases.repo";
import { CasesContent } from "./_components/cases-content";

export const metadata: Metadata = {
  title: "Live Cases",
  description:
    "Every case currently open on Karam — raised by a member, verified on the ground, and routed to the department that can close it.",
};

/** Cases are live data — cache the page but refresh it on a short interval. */
export const revalidate = 60;

export default async function CasesPage() {
  const cases = await getCases();
  return <CasesContent cases={cases} image={casesPage.image} />;
}

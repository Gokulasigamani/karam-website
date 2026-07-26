import type { Metadata } from "next";
import { concernPage } from "@/content/pages";
import { hasSession } from "@/features/auth";
import { ConcernContent } from "./_components/concern-content";

export const metadata: Metadata = {
  title: "Raise A Concern",
  description:
    "Report someone in need or a complaint that has gone unanswered. Local volunteers verify it, then Karam routes it to the department that can act.",
};

export default async function RaiseConcernPage() {
  const loggedIn = await hasSession();
  return <ConcernContent loggedIn={loggedIn} image={concernPage.image} />;
}

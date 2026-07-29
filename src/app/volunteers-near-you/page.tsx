import type { Metadata } from "next";
import { getCurrentUser } from "@/features/auth";
import { VolunteerContent } from "./_components/volunteer-content";

export const metadata: Metadata = {
  title: "Volunteers Near You",
  description:
    "Join the volunteers verifying cases across Tamil Nadu. Register your ward and help turn a neighbour's request into something an official will act on.",
};

export default async function VolunteerPage() {
  const current = await getCurrentUser();
  const user = current ? { role: current.role, name: current.name } : null;
  return <VolunteerContent user={user} />;
}

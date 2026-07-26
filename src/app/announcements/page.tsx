import type { Metadata } from "next";
import { AnnouncementsContent } from "./_components/announcements-content";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Campaigns, milestones and calls to action from wards across Tamil Nadu — the drives you can join today and the wins worth telling.",
};

export default function AnnouncementsPage() {
  return <AnnouncementsContent />;
}

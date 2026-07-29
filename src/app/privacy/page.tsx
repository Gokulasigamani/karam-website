import type { Metadata } from "next";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Karam collects, who can see it, what is shared with government departments, and how to have it removed.",
};

export default function PrivacyPage() {
  return <LegalContent ns="privacy" asideIcon="fileText" />;
}

import type { Metadata } from "next";
import { termsPage } from "@/content/pages";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata: Metadata = {
  title: "Terms Of Use",
  description:
    "What Karam is and is not, what we ask of members and volunteers, and the limits of our responsibility.",
};

export default function TermsPage() {
  return <LegalContent ns="terms" image={termsPage.image} asideIcon="scale" />;
}

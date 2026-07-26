import type { Metadata } from "next";
import { accessibilityPage } from "@/content/pages";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "The standard Karam holds itself to, what that means in practice, where we currently fall short, and how to tell us something is blocking you.",
};

export default function AccessibilityPage() {
  return <LegalContent ns="accessibility" image={accessibilityPage.image} asideIcon="fileText" reviewed />;
}

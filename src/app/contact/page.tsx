import type { Metadata } from "next";
import { contactPage } from "@/content/pages";
import { ContactContent } from "./_components/contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach the Karam team about a case, volunteering, department partnerships or press. We reply to everything within two working days.",
};

export default function ContactPage() {
  return <ContactContent image={contactPage.image} />;
}

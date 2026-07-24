import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Causes } from "@/components/sections/causes";
import { Cases } from "@/components/sections/cases";
import { Officials } from "@/components/sections/officials";
import { Community } from "@/components/sections/community";
import { Faq } from "@/components/sections/faq";

/**
 * The page reads as an outline. Every block is a Server Component; only the
 * accordion and the mobile menu ship JavaScript.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Causes />
      <Cases />
      <Officials />
      <Community />
      <Faq />
    </>
  );
}

import { getCases } from "@/features/cases/server/cases.repo";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Causes } from "@/components/sections/causes";
import { Cases } from "@/components/sections/cases";
import { Officials } from "@/components/sections/officials";
import { Community } from "@/components/sections/community";
import { Faq } from "@/components/sections/faq";
import { SectionConnector } from "@/components/ui/section-connector";

/**
 * The page reads as an outline. It fetches the case data on the server and hands
 * it to the (client) section components, which render text via the client locale
 * so a language switch is instant.
 */
export const revalidate = 60;

export default async function HomePage() {
  const cases = await getCases();

  return (
    <>
      <Hero />
      <SectionConnector />
      <HowItWorks />
      <Causes />
      <Cases cases={cases} />
      <Officials />
      <SectionConnector />
      <Community />
      <Faq />
    </>
  );
}

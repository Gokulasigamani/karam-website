import type { Metadata } from "next";
import { AboutHero } from "./_components/about-hero";
import { Story } from "./_components/story";
import { TamilNadu } from "./_components/tamil-nadu";
import { Founders } from "./_components/founders";
import { Principles } from "./_components/principles";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Karam is built by Sunajo — founded by Gokulasigamani, Harini and Hemavardhini — to connect neighbours, volunteers and government officials across Tamil Nadu.",
};

/**
 * Sections here are used by this route only, so they live beside it in
 * `_components` (a private folder — Next.js never routes to it) rather than in
 * the shared `components/sections` folder.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <TamilNadu />
      <Founders />
      <Principles />
    </>
  );
}

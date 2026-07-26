import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCases, getPublicCaseById } from "@/features/cases/server/cases.repo";
import { CaseDetail } from "./_components/case-detail";

interface CasePageProps {
  params: Promise<{ id: string }>;
}

/** Prerender the cases that exist at build time. */
export async function generateStaticParams() {
  const cases = await getCases();
  return cases.map((record) => ({ id: record.id }));
}

/**
 * Cases are live data now, so a valid id can appear after the build. `true`
 * lets a case added between builds render on demand; a genuinely unknown id
 * still hits `notFound()` below and returns a real 404.
 */
export const dynamicParams = true;

/** Cache each case page, refreshing it on the same interval as the listing. */
export const revalidate = 60;

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { id } = await params;
  const record = await getPublicCaseById(id);

  if (!record) return { title: "Case not found" };

  return {
    title: record.title,
    description: record.summary,
    openGraph: {
      title: record.title,
      description: record.summary,
      ...(record.imageUrl ? { images: [{ url: record.imageUrl, alt: record.imageAlt }] } : {}),
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { id } = await params;
  const record = await getPublicCaseById(id);

  if (!record) notFound();

  return <CaseDetail record={record} />;
}

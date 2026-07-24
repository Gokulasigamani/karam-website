import type { Metadata } from "next";
import { concernPage } from "@/content/pages";
import { ConcernForm } from "@/features/concern";
import { Container } from "@/components/ui/container";
import { PageBanner, BannerSteps } from "@/components/ui/page-banner";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Raise A Concern",
  description:
    "Report someone in need or a complaint that has gone unanswered. Local volunteers verify it, then Karam routes it to the department that can act.",
};

export default function RaiseConcernPage() {
  return (
    <>
      <PageBanner
        eyebrow={concernPage.eyebrow}
        title={concernPage.title}
        rotating={concernPage.rotating}
        description={concernPage.description}
        image={concernPage.image}
        aside={<BannerSteps steps={concernPage.steps} />}
      />

      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.85fr)] lg:gap-14">
          <Reveal>
            <ConcernForm />
          </Reveal>

          <Reveal delay={120}>
            <aside className="card-pattern-invert rounded-[var(--radius-block)] bg-contrast p-7 text-paper lg:sticky lg:top-24 lg:p-8">
              <h2 className="text-[1.0625rem] font-bold">{concernPage.reassurance.title}</h2>

              <ul className="mt-5 space-y-4">
                {concernPage.reassurance.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-lime-400 text-shade">
                      <Icon name="check" className="size-2.5" strokeWidth={3} />
                    </span>
                    <span className="text-[0.8125rem] leading-[1.65] text-white/60">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </Container>
    </>
  );
}

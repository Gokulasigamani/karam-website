import type { Metadata } from "next";
import { volunteerPage, volunteerStats, volunteerSteps } from "@/content/pages";
import { VolunteerForm } from "@/features/volunteer";
import { Container } from "@/components/ui/container";
import { PageBanner, BannerStats } from "@/components/ui/page-banner";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Volunteers Near You",
  description:
    "Join the volunteers verifying cases across Tamil Nadu. Register your ward and help turn a neighbour's request into something an official will act on.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageBanner
        eyebrow={volunteerPage.eyebrow}
        title={volunteerPage.title}
        rotating={volunteerPage.rotating}
        description={volunteerPage.description}
        image={volunteerPage.image}
        aside={<BannerStats stats={volunteerStats} />}
      />

      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {volunteerSteps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 80}>
                  <div className="card-pattern rounded-[var(--radius-card)] bg-surface p-5 transition-colors duration-300 hover:bg-surface-strong">
                    <span className="grid size-9 place-items-center rounded-lg bg-lime-400 text-shade">
                      <Icon name={step.icon} className="size-4" />
                    </span>
                    <h2 className="mt-4 text-[0.9375rem] font-bold text-ink">{step.title}</h2>
                    <p className="mt-1.5 text-[0.8125rem] leading-[1.6] text-muted">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={100}>
            <h2 className="text-[1.375rem] font-extrabold text-ink lg:text-[1.625rem]">
              Register your ward
            </h2>
            <p className="mt-2 text-[0.875rem] leading-[1.7] text-muted">
              Your coordinator will call to confirm before you see any case details.
            </p>

            <div className="mt-7">
              <VolunteerForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}

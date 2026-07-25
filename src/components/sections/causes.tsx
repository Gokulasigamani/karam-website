import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon, type IconName } from "@/components/ui/icons";

/** Structure stays in code; cause text comes from the message catalog. */
const CAUSE_ICONS: IconName[] = [
  "home",
  "stethoscope",
  "fileText",
  "bookOpen",
  "scale",
  "lifeBuoy",
];

/**
 * Editorial rows rather than a card grid — full-width lines separated by
 * hairlines, the way a printed index reads. A lime wash wipes in from the left
 * on hover, so the row responds without anything shifting position.
 */
export async function Causes() {
  const t = await getTranslations("causes");
  const causes = t.raw("items") as { title: string; description: string }[];

  return (
    <Section id="causes" className="pt-0 sm:pt-0 lg:pt-0">
      <SectionHeading title={t("title")} description={t("description")} />

      <ul className="mt-10">
        {causes.map((cause, index) => (
          <Reveal as="li" key={cause.title} delay={index * 70}>
            <div className="group relative isolate border-t border-hairline last:border-b">
              {/* Hover wash — wipes from the left, sits behind the content */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 inset-y-0 -z-10 origin-left scale-x-0 rounded-lg bg-lime-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />

              <div className="flex items-start gap-4 px-2 py-7 sm:gap-7 sm:px-4 lg:items-center lg:py-8">
                <span className="w-8 shrink-0 pt-1 text-sm font-bold tabular-nums text-muted/50 transition-colors duration-300 group-hover:text-ink lg:pt-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-10">
                  <h3 className="text-[1.125rem] font-bold text-ink lg:text-[1.375rem]">
                    {cause.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-[1.65] text-muted lg:mt-0">
                    {cause.description}
                  </p>
                </div>

                <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-surface text-ink transition-colors duration-300 group-hover:bg-lime-400 group-hover:text-shade">
                  <Icon
                    name={CAUSE_ICONS[index]}
                    className="size-[1.125rem] transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Icon
                    name="arrowRight"
                    className="absolute size-[1.125rem] -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

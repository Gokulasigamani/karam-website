import { faqs } from "@/content/faqs";
import { routes } from "@/constants/routes";
import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

export function Faq() {
  return (
    <Section id="faq" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <h2 className="max-w-md text-[1.75rem] leading-[1.15] font-extrabold text-ink sm:text-[2rem] lg:text-[2.5rem]">
          Frequently Asked Questions.
        </h2>
        <Button href={routes.contact} variant="subtle" className="self-start sm:self-end">
          Ask Something Else
          <Icon name="arrowRight" className="size-4" />
        </Button>
      </div>

      <div className="mt-8">
        <Accordion items={faqs} />
      </div>
    </Section>
  );
}

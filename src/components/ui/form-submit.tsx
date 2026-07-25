"use client";

import { useTranslations } from "next-intl";
import { Button } from "./button";

/**
 * Submit control shared by every form: the button is disabled while the form is
 * incomplete or in flight, and a short note explains the disabled state so it is
 * never a silent dead-end.
 */
export function FormSubmit({
  label,
  pendingLabel,
  pending,
  incomplete,
}: {
  label: string;
  pendingLabel: string;
  pending: boolean;
  /** True while the form does not yet pass validation. */
  incomplete: boolean;
}) {
  const t = useTranslations("forms");

  return (
    <div className="mt-8">
      <Button size="lg" disabled={pending || incomplete} className="w-full sm:w-auto">
        {pending ? pendingLabel : label}
      </Button>

      {incomplete && !pending && (
        <p className="mt-3 text-[0.75rem] text-muted" aria-live="polite">
          {t("completeToContinue")}
        </p>
      )}
    </div>
  );
}

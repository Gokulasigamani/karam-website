"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { initialFormState } from "@/types/form";
import { useFormValidation } from "@/hooks/use-form-validation";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { FormSubmit } from "@/components/ui/form-submit";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { Icon } from "@/components/ui/icons";
import { submitContact } from "../server/contact.actions";
import { contactSchema, contactTopics } from "../schemas/contact.schema";

const initialValues = { fullName: "", email: "", topic: "", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialFormState);
  const form = useFormValidation(contactSchema, initialValues, state.fieldErrors);
  const t = useTranslations();
  /** Validation errors are message keys; resolve them to text. */
  const err = (field: string) => {
    const key = form.error(field);
    return key ? t(key) : undefined;
  };

  if (state.status === "success") {
    return (
      <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-8 text-center lg:p-10">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-lime-400 text-shade">
          <Icon name="check" className="size-6" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-[1.375rem] font-extrabold text-ink">
          {t("forms.contact.successTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.875rem] leading-[1.7] text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <FormMessage state={state} className="mb-6" />
      <HoneypotField />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("forms.yourName")} htmlFor="fullName" required error={err("fullName")}>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            invalid={Boolean(form.error("fullName"))}
            {...form.field("fullName")}
          />
        </Field>

        <Field label={t("forms.email")} htmlFor="email" required error={err("email")}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            invalid={Boolean(form.error("email"))}
            {...form.field("email")}
          />
        </Field>

        <Field
          label={t("forms.contact.topic")}
          htmlFor="topic"
          required
          error={err("topic")}
          className="sm:col-span-2"
        >
          <Select
            id="topic"
            name="topic"
            invalid={Boolean(form.error("topic"))}
            {...form.field("topic")}
          >
            <option value="" disabled>
              {t("forms.contact.chooseTopic")}
            </option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {t(`topics.${topic}`)}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label={t("forms.contact.message")}
          htmlFor="message"
          required
          error={err("message")}
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            name="message"
            rows={6}
            placeholder={t("forms.contact.messagePlaceholder")}
            invalid={Boolean(form.error("message"))}
            {...form.field("message")}
          />
        </Field>
      </div>

      <FormSubmit
        label={t("forms.contact.submit")}
        pendingLabel={t("forms.contact.submitting")}
        pending={pending}
        incomplete={!form.isValid}
      />
    </form>
  );
}

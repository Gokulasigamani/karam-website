"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { districts } from "@/constants/routes";
import { initialFormState } from "@/types/form";
import { useFormValidation } from "@/hooks/use-form-validation";
import { Choice, Field, Input, Select } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { FormSubmit } from "@/components/ui/form-submit";
import { Icon } from "@/components/ui/icons";
import { submitVolunteer } from "../server/volunteer.actions";
import {
  availabilityOptions,
  volunteerInterests,
  volunteerSchema,
} from "../schemas/volunteer.schema";

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  district: "",
  locality: "",
  availability: availabilityOptions[0],
  interests: [] as string[],
  consent: "",
};

export function VolunteerForm() {
  const [state, formAction, pending] = useActionState(submitVolunteer, initialFormState);
  const form = useFormValidation(volunteerSchema, initialValues, state.fieldErrors);
  const t = useTranslations();
  const err = (field: string) => {
    const key = form.error(field);
    return key ? t(key) : undefined;
  };

  if (state.status === "success") {
    return (
      <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-8 text-center lg:p-12">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-lime-400 text-shade">
          <Icon name="check" className="size-6" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-[1.375rem] font-extrabold text-ink">
          {t("forms.volunteer.successTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.875rem] leading-[1.7] text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <FormMessage state={state} className="mb-6" />

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

        <Field label={t("forms.mobile")} htmlFor="phone" required error={err("phone")}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t("forms.mobilePlaceholder")}
            invalid={Boolean(form.error("phone"))}
            {...form.field("phone")}
          />
        </Field>

        <Field label={t("forms.email")} htmlFor="email" error={err("email")}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            invalid={Boolean(form.error("email"))}
            {...form.field("email")}
          />
        </Field>

        <Field label={t("forms.district")} htmlFor="district" required error={err("district")}>
          <Select
            id="district"
            name="district"
            invalid={Boolean(form.error("district"))}
            {...form.field("district")}
          >
            <option value="" disabled>
              {t("forms.chooseDistrict")}
            </option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label={t("forms.volunteer.localityLabel")}
          htmlFor="locality"
          required
          error={err("locality")}
          className="sm:col-span-2"
          hint={t("forms.volunteer.localityHint")}
        >
          <Input
            id="locality"
            name="locality"
            placeholder={t("forms.volunteer.localityPlaceholder")}
            invalid={Boolean(form.error("locality"))}
            aria-describedby={form.error("locality") ? "locality-error" : "locality-hint"}
            {...form.field("locality")}
          />
        </Field>
      </div>

      <fieldset className="mt-7">
        <legend className="text-[0.8125rem] font-semibold text-ink">
          {t("forms.volunteer.availabilityLegend")}
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
          {availabilityOptions.map((option) => (
            <Choice
              key={option}
              type="radio"
              name="availability"
              value={option}
              label={t(`availability.${option}`)}
              {...form.radio("availability", option)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-[0.8125rem] font-semibold text-ink">
          {t("forms.volunteer.interestsLegend")}
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          {volunteerInterests.map((interest) => (
            <Choice
              key={interest}
              type="checkbox"
              name="interests"
              value={interest}
              label={t(`interests.${interest}`)}
              {...form.check("interests", interest)}
            />
          ))}
        </div>
        {err("interests") && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {err("interests")}
          </p>
        )}
      </fieldset>

      <div className="mt-7">
        <Choice
          type="checkbox"
          name="consent"
          value="on"
          label={t("forms.volunteer.consentLabel")}
          description={t("forms.volunteer.consentDescription")}
          {...form.consent("consent")}
        />
        {err("consent") && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {err("consent")}
          </p>
        )}
      </div>

      <FormSubmit
        label={t("forms.volunteer.submit")}
        pendingLabel={t("forms.volunteer.submitting")}
        pending={pending}
        incomplete={!form.isValid}
      />
    </form>
  );
}

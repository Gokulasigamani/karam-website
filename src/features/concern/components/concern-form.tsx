"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { districts } from "@/constants/routes";
import { initialFormState } from "@/types/form";
import { useFormValidation } from "@/hooks/use-form-validation";
import { Choice, Field, Input, Select, Textarea } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { FormSubmit } from "@/components/ui/form-submit";
import { Icon } from "@/components/ui/icons";
import { submitConcern } from "../server/concern.actions";
import {
  concernCategories,
  concernSchema,
  urgencyLevels,
  visibilityOptions,
} from "../schemas/concern.schema";

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  category: "",
  district: "",
  locality: "",
  title: "",
  description: "",
  urgency: urgencyLevels[1],
  visibility: visibilityOptions[0].value,
  consent: "",
};

export function ConcernForm() {
  const [state, formAction, pending] = useActionState(submitConcern, initialFormState);
  const form = useFormValidation(concernSchema, initialValues, state.fieldErrors);
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
          {t("forms.concern.successTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.875rem] leading-[1.7] text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="rounded-[var(--radius-block)]">
      <FormMessage state={state} className="mb-6" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("forms.yourName")} htmlFor="fullName" required error={err("fullName")}>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder={t("forms.concern.namePlaceholder")}
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
            placeholder={t("forms.concern.emailPlaceholder")}
            invalid={Boolean(form.error("email"))}
            {...form.field("email")}
          />
        </Field>

        <Field label={t("forms.concern.category")} htmlFor="category" required error={err("category")}>
          <Select
            id="category"
            name="category"
            invalid={Boolean(form.error("category"))}
            {...form.field("category")}
          >
            <option value="" disabled>
              {t("forms.concern.chooseCategory")}
            </option>
            {concernCategories.map((category) => (
              <option key={category} value={category}>
                {t(`categories.${category}`)}
              </option>
            ))}
          </Select>
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
          label={t("forms.concern.locality")}
          htmlFor="locality"
          required
          error={err("locality")}
        >
          <Input
            id="locality"
            name="locality"
            placeholder={t("forms.concern.localityPlaceholder")}
            invalid={Boolean(form.error("locality"))}
            {...form.field("locality")}
          />
        </Field>

        <Field
          label={t("forms.concern.title")}
          htmlFor="title"
          required
          error={err("title")}
          className="sm:col-span-2"
          hint={t("forms.concern.titleHint")}
        >
          <Input
            id="title"
            name="title"
            placeholder={t("forms.concern.titlePlaceholder")}
            invalid={Boolean(form.error("title"))}
            aria-describedby={form.error("title") ? "title-error" : "title-hint"}
            {...form.field("title")}
          />
        </Field>

        <Field
          label={t("forms.concern.description")}
          htmlFor="description"
          required
          error={err("description")}
          className="sm:col-span-2"
          hint={t("forms.concern.descriptionHint")}
        >
          <Textarea
            id="description"
            name="description"
            rows={6}
            invalid={Boolean(form.error("description"))}
            aria-describedby={form.error("description") ? "description-error" : "description-hint"}
            {...form.field("description")}
          />
        </Field>
      </div>

      <fieldset className="mt-7">
        <legend className="text-[0.8125rem] font-semibold text-ink">
          {t("forms.concern.urgencyLegend")}
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
          {urgencyLevels.map((level) => (
            <Choice
              key={level}
              type="radio"
              name="urgency"
              value={level}
              label={t(`urgency.${level}`)}
              {...form.radio("urgency", level)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-[0.8125rem] font-semibold text-ink">
          {t("forms.concern.visibilityLegend")}
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          {visibilityOptions.map((option) => (
            <Choice
              key={option.value}
              type="radio"
              name="visibility"
              value={option.value}
              label={t(`visibility.${option.value}`)}
              {...form.radio("visibility", option.value)}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-7">
        <Choice
          type="checkbox"
          name="consent"
          value="on"
          label={t("forms.concern.consentLabel")}
          description={t("forms.concern.consentDescription")}
          {...form.consent("consent")}
        />
        {err("consent") && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {err("consent")}
          </p>
        )}
      </div>

      <FormSubmit
        label={t("forms.concern.submit")}
        pendingLabel={t("forms.concern.submitting")}
        pending={pending}
        incomplete={!form.isValid}
      />
    </form>
  );
}

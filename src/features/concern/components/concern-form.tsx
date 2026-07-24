"use client";

import { useActionState } from "react";
import { districts } from "@/constants/routes";
import { initialFormState } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Choice, Field, Input, Select, Textarea } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { Icon } from "@/components/ui/icons";
import { submitConcern } from "../server/concern.actions";
import {
  concernCategories,
  urgencyLevels,
  visibilityOptions,
} from "../schemas/concern.schema";

export function ConcernForm() {
  const [state, formAction, pending] = useActionState(submitConcern, initialFormState);

  if (state.status === "success") {
    return (
      <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-8 text-center lg:p-12">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-lime-400 text-shade">
          <Icon name="check" className="size-6" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-[1.375rem] font-extrabold text-ink">Concern received.</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.875rem] leading-[1.7] text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="rounded-[var(--radius-block)]">
      <FormMessage state={state} className="mb-6" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="fullName" required error={errors.fullName}>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="As it should appear on the case"
            invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
        </Field>

        <Field label="Mobile number" htmlFor="phone" required error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile"
            invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="For case updates by email"
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>

        <Field label="Category" htmlFor="category" required error={errors.category}>
          <Select
            id="category"
            name="category"
            defaultValue=""
            invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            <option value="" disabled>
              Choose a category
            </option>
            {concernCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="District" htmlFor="district" required error={errors.district}>
          <Select
            id="district"
            name="district"
            defaultValue=""
            invalid={Boolean(errors.district)}
            aria-describedby={errors.district ? "district-error" : undefined}
          >
            <option value="" disabled>
              Choose a district
            </option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Ward, village or street"
          htmlFor="locality"
          required
          error={errors.locality}
        >
          <Input
            id="locality"
            name="locality"
            placeholder="e.g. Ward 14, Kosapet"
            invalid={Boolean(errors.locality)}
            aria-describedby={errors.locality ? "locality-error" : undefined}
          />
        </Field>

        <Field
          label="Title"
          htmlFor="title"
          required
          error={errors.title}
          className="sm:col-span-2"
          hint="One line describing what is needed."
        >
          <Input
            id="title"
            name="title"
            placeholder="e.g. Ration cards pending for 12 families"
            invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : "title-hint"}
          />
        </Field>

        <Field
          label="What is happening?"
          htmlFor="description"
          required
          error={errors.description}
          className="sm:col-span-2"
          hint="Who is affected, since when, and what has already been tried. The more specific this is, the faster a volunteer can verify it."
        >
          <Textarea
            id="description"
            name="description"
            rows={6}
            invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "description-error" : "description-hint"}
          />
        </Field>
      </div>

      <fieldset className="mt-7">
        <legend className="text-[0.8125rem] font-semibold text-ink">
          How urgent is this?
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
          {urgencyLevels.map((level, index) => (
            <Choice
              key={level}
              type="radio"
              name="urgency"
              value={level}
              label={level}
              defaultChecked={index === 1}
            />
          ))}
        </div>
        {errors.urgency && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {errors.urgency[0]}
          </p>
        )}
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-[0.8125rem] font-semibold text-ink">
          Your name on this case
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          {visibilityOptions.map((option, index) => (
            <Choice
              key={option.value}
              type="radio"
              name="visibility"
              value={option.value}
              label={option.label}
              defaultChecked={index === 0}
            />
          ))}
        </div>
        {errors.visibility && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {errors.visibility[0]}
          </p>
        )}
      </fieldset>

      <div className="mt-7">
        <Choice
          type="checkbox"
          name="consent"
          label="These details are accurate to the best of my knowledge"
          description="Verified volunteers may contact me and visit the location before this reaches an official."
        />
        {errors.consent && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {errors.consent[0]}
          </p>
        )}
      </div>

      <Button size="lg" disabled={pending} className="mt-8 w-full sm:w-auto">
        {pending ? "Submitting…" : "Submit Concern"}
      </Button>
    </form>
  );
}

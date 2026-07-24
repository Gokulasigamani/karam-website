"use client";

import { useActionState } from "react";
import { districts } from "@/constants/routes";
import { initialFormState } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Choice, Field, Input, Select } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { Icon } from "@/components/ui/icons";
import { submitVolunteer } from "../server/volunteer.actions";
import { availabilityOptions, volunteerInterests } from "../schemas/volunteer.schema";

export function VolunteerForm() {
  const [state, formAction, pending] = useActionState(submitVolunteer, initialFormState);

  if (state.status === "success") {
    return (
      <div className="rounded-[var(--radius-block)] bg-surface p-8 text-center lg:p-12">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-lime-400 text-ink">
          <Icon name="check" className="size-6" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-[1.375rem] font-extrabold text-ink">Welcome to Karam.</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.875rem] leading-[1.7] text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction}>
      <FormMessage state={state} className="mb-6" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="fullName" required error={errors.fullName}>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
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
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
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
          label="Ward, village or street you can cover"
          htmlFor="locality"
          required
          error={errors.locality}
          className="sm:col-span-2"
          hint="Volunteers are matched to cases raised near them, so keep this close to where you actually are."
        >
          <Input
            id="locality"
            name="locality"
            placeholder="e.g. Ward 14, Kosapet"
            invalid={Boolean(errors.locality)}
            aria-describedby={errors.locality ? "locality-error" : "locality-hint"}
          />
        </Field>
      </div>

      <fieldset className="mt-7">
        <legend className="text-[0.8125rem] font-semibold text-ink">
          How much time can you give?
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
          {availabilityOptions.map((option, index) => (
            <Choice
              key={option}
              type="radio"
              name="availability"
              value={option}
              label={option}
              defaultChecked={index === 0}
            />
          ))}
        </div>
        {errors.availability && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {errors.availability[0]}
          </p>
        )}
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-[0.8125rem] font-semibold text-ink">
          Where can you help?
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
              label={interest}
            />
          ))}
        </div>
        {errors.interests && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {errors.interests[0]}
          </p>
        )}
      </fieldset>

      <div className="mt-7">
        <Choice
          type="checkbox"
          name="consent"
          label="I agree to the volunteer conduct terms"
          description="Verify honestly, never ask anyone for money, and keep case details private."
        />
        {errors.consent && (
          <p role="alert" className="mt-2 text-[0.75rem] font-medium text-danger">
            {errors.consent[0]}
          </p>
        )}
      </div>

      <Button size="lg" disabled={pending} className="mt-8 w-full sm:w-auto">
        {pending ? "Signing you up…" : "Join As A Volunteer"}
      </Button>
    </form>
  );
}

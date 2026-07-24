"use client";

import { useActionState } from "react";
import { initialFormState } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { Icon } from "@/components/ui/icons";
import { submitContact } from "../server/contact.actions";
import { contactTopics } from "../schemas/contact.schema";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialFormState);

  if (state.status === "success") {
    return (
      <div className="card-pattern rounded-[var(--radius-block)] bg-surface p-8 text-center lg:p-10">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-lime-400 text-shade">
          <Icon name="check" className="size-6" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-[1.375rem] font-extrabold text-ink">Message sent.</h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.875rem] leading-[1.7] text-muted">
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

        <Field label="Email" htmlFor="email" required error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>

        <Field
          label="What is this about?"
          htmlFor="topic"
          required
          error={errors.topic}
          className="sm:col-span-2"
        >
          <Select
            id="topic"
            name="topic"
            defaultValue=""
            invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? "topic-error" : undefined}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Message"
          htmlFor="message"
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us what you need. If it relates to a case, include the reference number."
            invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
        </Field>
      </div>

      <Button size="lg" disabled={pending} className="mt-7 w-full sm:w-auto">
        {pending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}

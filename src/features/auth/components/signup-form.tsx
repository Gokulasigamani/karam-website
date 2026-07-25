"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { initialFormState } from "@/types/form";
import { useFormValidation } from "@/hooks/use-form-validation";
import { Field, Input } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { FormSubmit } from "@/components/ui/form-submit";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { signup } from "../server/auth.actions";
import { signupSchema } from "../schemas/auth.schema";

const initialValues = { name: "", email: "", password: "" };

export function SignupForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(signup, initialFormState);
  const form = useFormValidation(signupSchema, initialValues, state.fieldErrors);
  const t = useTranslations();
  const err = (field: string) => {
    const key = form.error(field);
    return key ? t(key) : undefined;
  };

  return (
    <form action={formAction} noValidate>
      <FormMessage state={state} className="mb-6" />
      <HoneypotField />
      {next && <input type="hidden" name="next" value={next} />}

      <div className="grid gap-5">
        <Field label={t("forms.yourName")} htmlFor="name" required error={err("name")}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            invalid={Boolean(form.error("name"))}
            {...form.field("name")}
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
          label={t("auth.password")}
          htmlFor="password"
          required
          error={err("password")}
          hint={t("auth.passwordHint")}
        >
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            invalid={Boolean(form.error("password"))}
            aria-describedby={form.error("password") ? "password-error" : "password-hint"}
            {...form.field("password")}
          />
        </Field>
      </div>

      <FormSubmit
        label={t("auth.signupSubmit")}
        pendingLabel={t("auth.creatingAccount")}
        pending={pending}
        incomplete={!form.isValid}
      />
    </form>
  );
}

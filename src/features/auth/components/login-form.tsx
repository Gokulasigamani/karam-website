"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { initialFormState } from "@/types/form";
import { useFormValidation } from "@/hooks/use-form-validation";
import { Field, Input } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { FormSubmit } from "@/components/ui/form-submit";
import { login } from "../server/auth.actions";
import { loginSchema } from "../schemas/auth.schema";

const initialValues = { email: "", password: "" };

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(login, initialFormState);
  const form = useFormValidation(loginSchema, initialValues, state.fieldErrors);
  const t = useTranslations();
  const err = (field: string) => {
    const key = form.error(field);
    return key ? t(key) : undefined;
  };

  return (
    <form action={formAction} noValidate>
      <FormMessage state={state} className="mb-6" />
      {next && <input type="hidden" name="next" value={next} />}

      <div className="grid gap-5">
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

        <Field label={t("auth.password")} htmlFor="password" required error={err("password")}>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            invalid={Boolean(form.error("password"))}
            {...form.field("password")}
          />
        </Field>
      </div>

      <FormSubmit
        label={t("auth.loginSubmit")}
        pendingLabel={t("auth.loggingIn")}
        pending={pending}
        incomplete={!form.isValid}
      />
    </form>
  );
}

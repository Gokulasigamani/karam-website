"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { initialFormState } from "@/types/form";
import { useFormValidation } from "@/hooks/use-form-validation";
import { Field, Input } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { FormSubmit } from "@/components/ui/form-submit";
import { changePassword } from "../server/auth.actions";
import { changePasswordSchema } from "../schemas/auth.schema";

const initialValues = { currentPassword: "", newPassword: "" };

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, initialFormState);
  const form = useFormValidation(changePasswordSchema, initialValues, state.fieldErrors);
  const t = useTranslations();
  const err = (field: string) => {
    const key = form.error(field);
    return key ? t(key) : undefined;
  };

  return (
    <form action={formAction} noValidate>
      <FormMessage state={state} className="mb-6" />

      <div className="grid gap-5">
        <Field
          label={t("auth.currentPassword")}
          htmlFor="currentPassword"
          required
          error={err("currentPassword")}
        >
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            invalid={Boolean(form.error("currentPassword"))}
            {...form.field("currentPassword")}
          />
        </Field>

        <Field
          label={t("auth.newPassword")}
          htmlFor="newPassword"
          required
          error={err("newPassword")}
          hint={t("auth.passwordHint")}
        >
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            invalid={Boolean(form.error("newPassword"))}
            aria-describedby={form.error("newPassword") ? "newPassword-error" : "newPassword-hint"}
            {...form.field("newPassword")}
          />
        </Field>
      </div>

      <FormSubmit
        label={t("auth.updatePassword")}
        pendingLabel={t("auth.updating")}
        pending={pending}
        incomplete={!form.isValid}
      />
    </form>
  );
}

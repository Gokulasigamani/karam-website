"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

/**
 * Form primitives in the site's borderless idiom: inputs sit on the soft grey
 * surface and lift to white with a lime ring on focus. Errors are announced to
 * assistive technology and wired to their input via `aria-describedby`.
 */

const control = cn(
  "w-full rounded-xl bg-surface px-4 py-3 text-[0.9375rem] text-ink",
  "placeholder:text-muted/70 outline-none",
  "transition-[background-color,box-shadow] duration-200",
  "focus:bg-elevated focus:ring-2 focus:ring-lime-400",
  "disabled:opacity-50",
);

const controlError = "ring-2 ring-danger focus:ring-danger";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  /** A single message or a list; only the first is shown. */
  error?: string | string[];
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const t = useTranslations("forms");
  const messages = Array.isArray(error) ? error : error ? [error] : [];
  const hasError = messages.length > 0;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[0.8125rem] font-semibold text-ink">
        {label}
        {required && (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {!required && <span className="font-normal text-muted"> {t("optionalSuffix")}</span>}
      </label>

      {hint && (
        <p id={`${htmlFor}-hint`} className="text-[0.75rem] leading-relaxed text-muted">
          {hint}
        </p>
      )}

      {children}

      {hasError && (
        <p id={`${htmlFor}-error`} role="alert" className="text-[0.75rem] font-medium text-danger">
          {messages[0]}
        </p>
      )}
    </div>
  );
}

export function Input({
  invalid,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return <input className={cn(control, invalid && controlError, className)} {...props} />;
}

export function Textarea({
  invalid,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(control, "min-h-32 resize-y leading-relaxed", invalid && controlError, className)}
      {...props}
    />
  );
}

export function Select({
  invalid,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select
      className={cn(control, "cursor-pointer appearance-none pr-10", invalid && controlError, className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.875rem center",
        backgroundSize: "1.125rem",
      }}
      {...props}
    >
      {children}
    </select>
  );
}

/** Checkbox and radio share a row layout, so they share a wrapper. */
export function Choice({
  label,
  description,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; description?: string }) {
  return (
    <label
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-xl bg-surface px-4 py-3 transition-colors duration-200 hover:bg-surface-strong has-checked:bg-lime-400",
        className,
      )}
    >
      <input
        className="mt-0.5 size-4 shrink-0 accent-shade outline-none focus-visible:ring-2 focus-visible:ring-ink"
        {...props}
      />
      {/* Once checked the row turns lime, so its text switches to the fixed dark */}
      <span className="group-has-checked:text-shade">
        <span className="block text-[0.8125rem] font-semibold text-ink group-has-checked:text-shade">
          {label}
        </span>
        {description && (
          <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-muted group-has-checked:text-shade/70">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { z } from "zod";

/**
 * Live client-side validation built on the same Zod schema the server action
 * uses, so the rules never drift between the two.
 *
 * The flow it drives: a field shows no error until it is blurred (touched);
 * after that it re-checks on every change, so the message clears the moment the
 * value becomes valid. `isValid` reflects the whole form, which is what gates
 * the submit button. Server-returned field errors are surfaced too, and clear
 * as soon as the user edits that field.
 */

export type FieldValue = string | string[];
export type FormValues = Record<string, FieldValue>;

type ControlEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

export function useFormValidation(
  schema: z.ZodType,
  initialValues: FormValues,
  serverErrors?: Record<string, string[]>,
) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Server field errors are shown until the user edits that field. Rather than
  // copy them into state via an effect, we track which fields have been edited
  // and reset that set — during render — whenever a fresh batch of server
  // errors arrives. This is React's "adjust state during render" pattern.
  const [prevServerErrors, setPrevServerErrors] = useState(serverErrors);
  const [clearedServerFields, setClearedServerFields] = useState<Set<string>>(() => new Set());
  if (serverErrors !== prevServerErrors) {
    setPrevServerErrors(serverErrors);
    setClearedServerFields(new Set());
  }

  const result = useMemo(() => schema.safeParse(values), [schema, values]);
  const isValid = result.success;

  const clientErrors = useMemo(() => {
    if (result.success) return {} as Record<string, string[]>;
    const map: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "form");
      (map[key] ??= []).push(issue.message);
    }
    return map;
  }, [result]);

  const setValue = useCallback((name: string, value: FieldValue) => {
    setValues((current) => ({ ...current, [name]: value }));
    setClearedServerFields((current) => {
      if (current.has(name)) return current;
      const next = new Set(current);
      next.add(name);
      return next;
    });
  }, []);

  const toggleInArray = useCallback((name: string, value: string) => {
    setValues((current) => {
      const list = Array.isArray(current[name]) ? (current[name] as string[]) : [];
      const next = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...current, [name]: next };
    });
  }, []);

  const markTouched = useCallback((name: string) => {
    setTouched((current) => (current[name] ? current : { ...current, [name]: true }));
  }, []);

  /** First error to display for a field, or undefined when there is none yet. */
  const error = useCallback(
    (name: string): string | undefined => {
      if (touched[name] && clientErrors[name]?.length) return clientErrors[name][0];
      const server = serverErrors?.[name];
      if (server?.length && !clearedServerFields.has(name)) return server[0];
      return undefined;
    },
    [touched, clientErrors, serverErrors, clearedServerFields],
  );

  /* ---- Binders: spread onto a control to wire value + validation ---- */

  const field = useCallback(
    (name: string) => ({
      value: (values[name] as string) ?? "",
      onChange: (event: ControlEvent) => setValue(name, event.target.value),
      onBlur: () => markTouched(name),
    }),
    [values, setValue, markTouched],
  );

  const radio = useCallback(
    (name: string, value: string) => ({
      checked: values[name] === value,
      onChange: () => {
        setValue(name, value);
        markTouched(name);
      },
    }),
    [values, setValue, markTouched],
  );

  const check = useCallback(
    (name: string, value: string) => ({
      checked: Array.isArray(values[name]) && (values[name] as string[]).includes(value),
      onChange: () => {
        toggleInArray(name, value);
        markTouched(name);
      },
    }),
    [values, toggleInArray, markTouched],
  );

  const consent = useCallback(
    (name: string) => ({
      checked: values[name] === "on",
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(name, event.target.checked ? "on" : "");
        markTouched(name);
      },
    }),
    [values, setValue, markTouched],
  );

  return { values, isValid, error, setValue, markTouched, field, radio, check, consent };
}

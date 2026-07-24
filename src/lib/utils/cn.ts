type ClassValue = string | number | null | false | undefined | ClassValue[];

/**
 * Joins conditional class names.
 *
 * If you start hitting Tailwind conflicts (`px-2` vs `px-4` on the same
 * element), install `clsx` + `tailwind-merge` and swap the body for
 * `twMerge(clsx(inputs))` — the call sites stay identical.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else {
      classes.push(String(input));
    }
  }

  return classes.join(" ");
}

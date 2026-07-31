/**
 * The card's palette and geometry as plain values.
 *
 * Duplicated from the `--color-foil-*` tokens in globals.css on purpose: the PNG
 * generator renders through Satori, which resolves neither CSS variables nor
 * Tailwind classes. Changing a foil colour means changing both places — the
 * comment in globals.css says the same thing from the other side.
 */
export const foil = {
  /** Highlight — the lightest point of the foil sweep. */
  100: "#f7ecc9",
  /** Body text on the card that should read as gold rather than white. */
  300: "#e9d08a",
  /** The signature gold. Borders, rules, the mark. */
  500: "#d4af37",
  /** Shadow end of the sweep, and hairlines that should recede. */
  700: "#9a7420",
} as const;

export const cardInk = {
  /** Card base. Slightly warmer than `--color-shade` so the gold sits on it. */
  base: "#0b0a09",
  /** Top of the background gradient. */
  raised: "#1b1917",
  /** Primary text. */
  bright: "#faf9f7",
  /** Secondary text. */
  dim: "#a8a29a",
} as const;

/**
 * 1.585:1 — the ISO/IEC 7810 ID-1 ratio a physical card uses, so a printed
 * download matches a real card and the on-screen version matches the download.
 */
export const cardAspect = 1.585;

/** PNG output size. Wide enough to stay sharp when printed or zoomed. */
export const cardPixelSize = { width: 1400, height: 883 } as const;

/** Headline numbers. Strings, so formatting is never at the mercy of a locale. */
export const communityStat = {
  lead: "Be Part Of A Network Of More Than",
  value: "1,24,860+",
  trail: "Neighbours, Volunteers And Officials Working Together",
  ctaLabel: "Join Karam",
  secondaryCtaLabel: "Raise A Concern",
};

export interface StatPhoto {
  src: string;
  alt: string;
}

/**
 * Four photos: the first two flank the stat on the left, the last two on the
 * right. Order matters — the layout splits this array down the middle.
 */
export const statPhotos: StatPhoto[] = [
  {
    src: "https://picsum.photos/seed/karam-people-1/300/400?grayscale",
    alt: "Volunteers distributing supplies in a village",
  },
  {
    src: "https://picsum.photos/seed/karam-people-2/300/400?grayscale",
    alt: "A community meeting under a tree",
  },
  {
    src: "https://picsum.photos/seed/karam-people-3/300/400?grayscale",
    alt: "A health worker speaking with a family",
  },
  {
    src: "https://picsum.photos/seed/karam-people-4/300/400?grayscale",
    alt: "Members filing a petition at a government office",
  },
];

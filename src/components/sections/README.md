# Sections

Full-width page blocks a route composes top to bottom: `hero.tsx`,
`services.tsx`, `testimonials.tsx`, `cta.tsx`.

A page should read like an outline:

```tsx
export default function Page() {
  return (
    <>
      <Hero />
      <Services />
      <Cta />
    </>
  );
}
```

Rules:

- Sections are **Server Components by default**. Add `"use client"` only to the
  small interactive piece (a carousel, an accordion), not to the whole section.
- Sections take their copy as props or read it from `@/content` — don't hardcode
  text that marketing will want to change.
- A section used by exactly one route can live beside it as
  `app/<route>/_components/` instead. Promote it here when a second route needs it.

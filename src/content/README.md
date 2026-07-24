# Content

Static copy and data that drives the pages — separated from the components that
render it, so wording changes never touch JSX.

```
content/
├─ services.ts      # export const services: Service[] = [...]
├─ faq.ts
└─ testimonials.ts
```

Each file exports typed, plain data. Types live next to the data or in
`@/types` when more than one place needs them.

If the copy later moves to a CMS, only these files change — the components
already consume typed data and don't care where it came from.

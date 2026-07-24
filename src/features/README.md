# Features

Self-contained pieces of behaviour that are more than presentation — a contact
form, a newsletter signup, a blog, search. Static marketing blocks belong in
`components/sections`, not here.

Create a folder only when the feature actually exists. Empty scaffolding is noise.

## Anatomy

```
features/contact/
├─ components/contact-form.tsx   # UI ("use client" where it needs state)
├─ schemas/contact.schema.ts     # input validation + inferred types
├─ server/contact.actions.ts     # "use server" — validate → send → revalidate
├─ api/contact.api.ts            # transport; the only place that calls `http`
├─ types.ts
└─ index.ts                      # public surface — the only import path outsiders use
```

## Rules

1. **Import a feature only through its `index.ts`.** `@/features/contact` is fine;
   `@/features/contact/server/contact.actions` from outside the slice is not.
2. **Features don't import each other.** Share through `@/lib` or `@/components`,
   or let the route pass data down.
3. **Features never import from `app/`.** Dependencies point one way:
   `app` → `features` → `lib`.
4. **`server/` is server-only.** Never import it into a Client Component; actions
   are passed to forms as `action={...}`.

## The two flows

**Read** — `app/…/page.tsx` (Server Component) calls the feature's query → the
query calls `api/` → `api/` calls `http` → the feature's components render it.
No client fetching, no loading state to hand-manage.

**Write** — a Client Component form calls a Server Action → the action validates
input, calls `api/`, then `revalidatePath`/`revalidateTag` → affected Server
Components re-render with fresh data.

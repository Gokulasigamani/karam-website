# Architecture

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4.

## The one rule

Dependencies point in a single direction. Nothing ever points back up.

```
app/          routing + composition   — thin, no business logic
  ↓
features/     behaviour (forms, blog, search)
  ↓
components/   presentation (ui, layout, sections)
  ↓
lib/          infrastructure (http, config, utils)
```

- `lib/` imports nothing from `features/`, `components/` or `app/`.
- `components/ui` imports nothing from `features/`. That's what keeps it reusable.
- `features/` never imports from `app/`, and features never import each other.
- `app/` composes everything but owns nothing.

If you need an arrow pointing the wrong way, the shared thing belongs one layer
down.

## Layout

```
karam-frontend/
├─ public/                     # static assets served at /
├─ src/
│  ├─ app/                     # ROUTES ONLY — one folder per URL segment
│  │  ├─ layout.tsx            # root layout: html/body, fonts, header, footer, providers
│  │  ├─ page.tsx              # /
│  │  ├─ loading.tsx           # streamed fallback
│  │  ├─ error.tsx             # error boundary (Client Component)
│  │  ├─ not-found.tsx         # 404
│  │  └─ globals.css           # Tailwind entry + design tokens
│  │
│  ├─ components/
│  │  ├─ ui/                   # primitives: button, container, input — no domain knowledge
│  │  ├─ layout/               # header, footer, nav
│  │  └─ sections/             # page blocks: hero, services, cta
│  │
│  ├─ features/                # self-contained behaviour — see features/README.md
│  ├─ content/                 # typed static copy — see content/README.md
│  │
│  ├─ config/
│  │  ├─ site.ts               # name, description, url, social links
│  │  └─ navigation.ts         # header + footer link structure
│  │
│  ├─ constants/routes.ts      # every internal URL, in one object
│  │
│  ├─ lib/
│  │  ├─ api/http.ts           # the only fetch wrapper
│  │  ├─ api/errors.ts         # ApiError + helpers
│  │  ├─ config/env.ts         # validated env — the only reader of process.env
│  │  ├─ providers/            # client provider tree (theme, query client…)
│  │  └─ utils/cn.ts           # class name helper
│  │
│  ├─ hooks/                   # cross-cutting hooks only
│  └─ types/                   # types shared across layers
│
├─ .env.example                # copy to .env.local
├─ ARCHITECTURE.md
└─ tsconfig.json               # "@/*" → "./src/*"
```

## Adding a page

1. Add the path to `src/constants/routes.ts`.
2. Add it to `mainNav` / `footerNav` in `src/config/navigation.ts` if it's linked.
3. Create `src/app/<segment>/page.tsx` and export `metadata` from it.
4. Compose the page from `components/sections`; put copy in `src/content`.

A page should stay short enough to read at a glance:

```tsx
// src/app/services/page.tsx
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <Services />
    </>
  );
}
```

## Server and Client Components

Everything is a Server Component unless it needs state, effects, or browser
APIs. Push `"use client"` to the leaf that actually needs it — a whole section
shouldn't ship to the browser because one button toggles.

Data is fetched on the server, inside the component that renders it. There is no
global store and no client-side fetching layer by default; add one only when a
real requirement appears.

## Naming

| Thing | Convention | Example |
| --- | --- | --- |
| Folders and files | kebab-case | `site-header.tsx` |
| Components | PascalCase | `export function SiteHeader()` |
| Hooks | `use-` prefix | `use-debounced-value.ts` |
| Constants | camelCase object, `as const` | `routes`, `siteConfig` |
| Route folders | lowercase URL segment | `app/about-us/page.tsx` |

Prefer named exports everywhere except `app/` files, where Next.js requires a
default export.

## Not set up yet (add when needed)

- **`src/proxy.ts`** — Next 16 renamed `middleware.ts` to `proxy.ts`. Only needed
  for redirects, locale routing or gated pages.
- **`app/api/`** — route handlers. Prefer Server Actions for form submissions;
  reach for a handler when an external caller needs a URL (webhooks).
- **`zod`** — recommended for `features/*/schemas` and for hardening
  `lib/config/env.ts`.
- **`clsx` + `tailwind-merge`** — swap into `lib/utils/cn.ts` once Tailwind class
  conflicts start appearing.
- **Testing** — Vitest + Testing Library, or Playwright for e2e.

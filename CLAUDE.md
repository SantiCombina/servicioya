# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start development server
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm generate:types   # Regenerate payload-types.ts after collection changes
```

## Architecture

### Stack

Next.js 15 (App Router) · TypeScript (strict) · Payload CMS v3 · PostgreSQL (Neon) · Tailwind CSS v4 · shadcn/ui · next-safe-action · React Hook Form · Zod · Lucide Icons · UploadThing

### Route Groups

- `src/app/(frontend)/` — user-facing pages (login, signup, services, profile)
- `src/app/(payload)/` — Payload CMS admin panel and API (auto-managed by `withPayload()`)
- `src/app/page.tsx` — landing page (outside both groups)

### Data Layer

All business logic lives in `src/app/services/` (one file per entity: `user.ts`, `service.ts`, `booking.ts`, etc.). These files use the **Payload Local API** — direct DB access, no HTTP. Never call Payload's REST API from server-side code.

```ts
// Always use the singleton from src/lib/payload.ts
import { getPayloadClient } from '@/lib/payload'
const payload = await getPayloadClient()
```

### Collections

Payload collection schemas are in `src/collections/`. After modifying any collection, run `pnpm generate:types` to update `src/payload-types.ts`. **Always import collection types from `@/payload-types`**, never define them manually.

### Server Actions Pattern

- `actions.ts` files are co-located with their feature components (e.g., `src/components/login/actions.ts`)
- All actions use `actionClient` from `src/lib/safe-action-client.ts`
- Standard shape: `.schema(zodSchema).action(async ({ parsedInput }) => { ... })`
- In components, always destructure `executeAsync` and `isExecuting` from `useAction`

### Client/Server Boundary

- `src/app/client-layout-shell.tsx` is the single top-level `"use client"` wrapper (Navbar, Footer, ThemeProvider, Toaster)
- Pages fetch data server-side via service functions and pass it as props to client components
- Filtering/sorting happens client-side using hooks in `src/lib/hooks/`

### Authentication

- Payload's built-in auth on the `Users` collection (JWT stored in `payload-token` HTTP-only cookie)
- `getCurrentUser(token)` uses `payload.auth({ headers })` with `Authorization: JWT <token>`
- Users have a `role` field: `admin` | `user`

### Key Files

| File | Purpose |
|---|---|
| `src/payload.config.ts` | Payload config — collections, DB adapter, plugins, i18n |
| `src/lib/safe-action-client.ts` | Exports `actionClient` for all server actions |
| `src/lib/payload.ts` | Singleton `getPayloadClient()` wrapped in React `cache()` |
| `src/payload-types.ts` | Auto-generated — never edit manually |

### Conventions (from global CLAUDE.md)

- Strict TypeScript — no `any`, avoid `as` casts
- Server Components by default; `"use client"` only when necessary
- Files in kebab-case
- No barrel files (the `src/collections/index.ts` is an exception required by Payload)
- `cn()` from `@/lib/utils` for conditional Tailwind classes
- Conventional Commits: `type(scope): description`

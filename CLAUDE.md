# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

OpenToWork (OTW) marketing/showcase site — no backend app, no user accounts. Presents 5 services (Développement Web, Applications mobile, Infrastructure & Cloud, Développement de logiciels métiers, Conseils & Transformation digitale) to prospective clients.

## Stack

- **vinext** (https://vinext.io) — a Vite plugin that reimplements the Next.js App Router API surface (RSC, file-based routing, metadata, route handlers). Code is written in standard Next.js App Router format (`app/`, `page.tsx`, `layout.tsx`, `route.ts`), but the dev server, bundler, and build pipeline are Vite, not Next.js.
- **React** via `react-server-dom-webpack` for the RSC runtime.
- **Cloudflare Workers** is the deployment target, wired through `@vinext/cloudflare` and `@cloudflare/vite-plugin`. `wrangler.jsonc` configures the Worker (static assets binding, images binding, CDN cache).
- **Tailwind CSS v4** via `@tailwindcss/postcss`, imported in `app/globals.css`.
- **TypeScript**, package manager **pnpm** (`packageManager` pinned in `package.json`; `pnpm-workspace.yaml` pre-approves native build scripts for `esbuild`/`workerd` so `pnpm install` doesn't abort under pnpm 11+'s `ERR_PNPM_IGNORED_BUILDS`).

## Commands

```bash
pnpm install         # install deps
pnpm run dev          # vinext dev server (Vite + HMR)
pnpm run build         # vinext build → dist/client (static assets) + dist/server (Worker)
pnpm run start          # run the built Worker locally via `wrangler dev --config dist/server/wrangler.json`
pnpm run deploy          # `vinext-cloudflare deploy` — ships the built Worker to Cloudflare
```

There is no test suite or linter configured in this project yet.

## Architecture

- `vite.config.ts` is the actual build entrypoint: it registers the `vinext()` plugin (with a CDN cache adapter and an images optimizer from `@vinext/cloudflare`) and the `cloudflare()` Vite plugin (which targets the `rsc` Vite environment with `ssr` as a child environment — this is what makes RSC + Cloudflare Workers deployment work together).
- `next.config.ts` exists for Next.js-ecosystem compatibility (some tooling/libraries look for it) but is otherwise unused by vinext's own config.
- Routing is file-system based under `app/`, same conventions as Next.js App Router:
  - `app/layout.tsx` — root layout (`<html>`/`<body>` shell, metadata export).
  - `app/page.tsx` — route segment page.
  - `app/api/<name>/route.ts` — route handlers (e.g. `GET`/`POST` exports), same as Next.js Route Handlers.
  - `app/globals.css` — global stylesheet, imported from the root layout; this is where Tailwind is pulled in (`@import "tailwindcss";`).
- `tsconfig.json` maps `@/*` → project root, targets ES2017, and restricts `include` to `.ts`/`.tsx` (`allowJs: false`) — all app code is TypeScript.
- Cloudflare Worker output shape is defined by `wrangler.jsonc`: static assets served from `dist/client` (binding `ASSETS`, `not_found_handling: "none"`), the Worker entry is vinext's own `vinext/server/fetch-handler`, and there's an `IMAGES` binding for the images optimizer.

## Conventions

- **Never hardcode a color or font.** Once design tokens are defined in `app/globals.css` (from the Claude Design export), all colors/typography must reference those tokens (CSS custom properties / Tailwind theme values) — not literal hex codes or font names in component code.

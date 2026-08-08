# Deploy to Cloudflare Pages + D1

Stack: Next.js 14 (App Router) → built with `@cloudflare/next-on-pages` → served on Cloudflare Pages.
Data is read at request time from a D1 database (binding `DB`). Locally the app falls back to `data/tools.ts`.

## Status (as of 2026-08-08)
- ✅ `next build` passes — all data pages render as `ƒ (Dynamic)` (server-rendered on demand, reading D1).
- ✅ D1 schema (`migrations/0001_init.sql`) + seed (`scripts/seed.ts` → `scripts/seed.sql`) validated locally with `node:sqlite` (9 categories / 57 tools / 4 reviews / 5 comparisons).
- ⚠️ **Windows local build limitation**: `@cloudflare/next-on-pages` shells out to `npx vercel build`, which fails on native Windows (`spawn npx ENOENT` — a known next-on-pages Windows bug; the CLI even warns about it). **Do not run `npm run deploy` on native Windows.** Deploy via Cloudflare Pages Git integration (Linux build) or on WSL/macOS/Linux.

> ⚠️ **Adapter deprecation**: `@cloudflare/next-on-pages` is deprecated (no longer maintained). It is pinned to `1.12.0` here because that version still supports Next.js 14.2 and has no `next` peer constraint. For a future-proof setup, migrate to the OpenNext Cloudflare adapter (`@opennextjs/cloudflare`) — it does not depend on `vercel build`, works on Windows, and is the officially recommended path.

## Recommended: deploy via Cloudflare Pages (Git integration)
1. Push this folder to a Git repo (GitHub/GitLab).
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Framework preset: **Next.js**.
4. Build command: `npm run build && npm run pages:build`
   Output directory: `.vercel/output/static`
5. Add the D1 binding: Settings → Variables / D1 → bind an existing D1 database named `ai-tools-directory` as `DB`. (Or set it in `wrangler.jsonc` and run the CLI steps below.)
6. Trigger a deploy. Cloudflare builds on Linux where `npx vercel build` works.

## One-time D1 setup (CLI)
```bash
npx wrangler login                       # or set CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
npx wrangler d1 create ai-tools-directory   # copy the database_id into wrangler.jsonc
npx wrangler d1 migrations apply ai-tools-directory --remote
npx tsx scripts/seed.ts
npx wrangler d1 execute ai-tools-directory --remote --file=scripts/seed.sql
```

## Local dev with the real D1 (optional)
```bash
npm run db:migrate:local   # creates local sqlite + applies schema
npm run db:seed:local      # generates + loads seed.sql into local D1
npx wrangler pages dev .vercel/output/static   # serves with the real D1 binding
```
Plain `npm run dev` / `npm run start` also works — it just uses the static fallback in `data/tools.ts`.

## Re-seed after editing `data/tools.ts`
```bash
npx tsx scripts/seed.ts
npx wrangler d1 execute ai-tools-directory --remote --file=scripts/seed.sql
```

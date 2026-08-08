# Deploy — Self-Service Cloudflare Pages + D1 (Git integration)

Everything in this folder is already committed to a local **git** repo on branch `main`
(39 tracked files; `node_modules`/`.next`/`.vercel` are ignored). You just need to push it
and click through the Cloudflare Dashboard. No keys are shared with anyone.

> **Why this path?** `@cloudflare/next-on-pages` shells out to `npx vercel build`, which
> fails on **native Windows** (`spawn npx ENOENT`). Cloudflare builds on **Linux**, so the
> Git integration bypasses that bug entirely. (Adapter note: next-on-pages is deprecated;
> future-proof by migrating to `@opennextjs/cloudflare` — works on Windows, no `vercel build`.)

---

## Part A — Push to GitHub
```bash
# from inside ai-tools-directory/
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
(Repo is on branch `main`. If GitHub created a default `main` already and rejects push,
use `git push -u origin main --force` only on a fresh empty repo.)

## Part B — Create the D1 database and copy its id
**Easiest (Dashboard):** Cloudflare → **Workers & Pages → D1 → Create database** →
name it exactly `ai-tools-directory`. After creation, copy the **database_id**.

Then open `wrangler.jsonc` and replace the placeholder:
```jsonc
"database_id": "REPLACE_WITH_YOUR_D1_DATABASE_ID"   →   "database_id": "<paste-real-id>"
```
Commit & push that one-line change:
```bash
git add wrangler.jsonc && git commit -m "chore: set D1 database_id" && git push
```

## Part C — Load schema + seed into D1
Pick ONE:

**Option 1 — wrangler CLI** (needs `wrangler login` or `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`):
```bash
npx tsx scripts/seed.ts                                  # (re)generate scripts/seed.sql
npx wrangler d1 migrations apply ai-tools-directory --remote
npx wrangler d1 execute   ai-tools-directory --remote --file=scripts/seed.sql
```

**Option 2 — Dashboard paste** (no CLI at all):
Cloudflare → D1 → `ai-tools-directory` → **Console** → paste the contents of
`scripts/setup-d1.sql` (schema + seed in one file) and run. That creates the 4 tables
and inserts 9 categories / 57 tools / 4 reviews / 5 comparisons.

## Part D — Connect Cloudflare Pages
Cloudflare Dashboard → **Workers & Pages → Create → Pages → connect your Git repo**.

- **Build command:** `npm run build && npm run pages:build`
- **Build output directory:** `.vercel/output/static`
- **Environment variable (build):** `NODE_VERSION = 20`
- **D1 binding:** Settings → **Variables / D1** → add binding
  - Variable name: `DB`  (must match `wrangler.jsonc` + the code's `getRequestContext().env.DB`)
  - Database: `ai-tools-directory`
- Do **not** rely on the "Next.js" framework preset's own build step — the custom build
  command above is what wires up `next-on-pages` output.

## Part E — Deploy & verify
1. Save → Cloudflare runs the Linux build. Watch the build log; it should finish with
   `✓ Successfully created a Pages project` and upload `.vercel/output/static`.
2. Open the assigned `*.pages.dev` URL. Spot-check:
   - Home `/` lists tools (reads D1 `DB` at request time).
   - `/tools/<slug>` renders a tool page with JSON-LD.
   - `/api/search?q=seo` returns JSON.
3. (Optional) Add a custom domain under **Custom domains**.

---

## Local dev (optional)
Plain `npm run dev` / `npm run start` works using the static fallback in `data/tools.ts`.
For the real local D1:
```bash
npm run db:migrate:local
npm run db:seed:local
npx wrangler pages dev .vercel/output/static
```

## Re-deploy after editing `data/tools.ts`
1. `npx tsx scripts/seed.ts`
2. Push to Git (Pages rebuilds automatically), **and** reload D1:
   `npx wrangler d1 execute ai-tools-directory --remote --file=scripts/seed.sql`
   (or re-paste `scripts/setup-d1.sql` in the D1 console).

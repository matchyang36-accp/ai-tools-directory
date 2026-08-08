// Local validation of the D1 schema + seed using Node's built-in sqlite.
// Run AFTER scripts/seed.ts has generated scripts/seed.sql:
//   node scripts/validate-sqlite.mjs
import { DatabaseSync } from "node:sqlite";
import { readFileSync, existsSync } from "node:fs";

const db = new DatabaseSync(":memory:");
db.exec(readFileSync(new URL("../migrations/0001_init.sql", import.meta.url), "utf8"));

const seedPath = new URL("./seed.sql", import.meta.url);
if (!existsSync(seedPath)) {
  console.error("seed.sql missing — run: npx tsx scripts/seed.ts");
  process.exit(1);
}
db.exec(readFileSync(seedPath, "utf8"));

const counts = {
  categories: db.prepare("SELECT COUNT(*) c FROM categories").get().c,
  tools: db.prepare("SELECT COUNT(*) c FROM tools").get().c,
  reviews: db.prepare("SELECT COUNT(*) c FROM reviews").get().c,
  comparisons: db.prepare("SELECT COUNT(*) c FROM comparisons").get().c,
};
console.log("row counts:", counts);

const t = db.prepare("SELECT pros, cons FROM tools WHERE slug='jasper'").get();
console.log("jasper pros parsed:", JSON.parse(t.pros).length, "cons parsed:", JSON.parse(t.cons).length);

const like = db
  .prepare("SELECT COUNT(*) c FROM tools WHERE lower(name) LIKE ?")
  .get("%surf%").c;
console.log("LIKE 'surf' matches:", like);

console.log("VALIDATION OK");

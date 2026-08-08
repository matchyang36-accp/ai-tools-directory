// Generates scripts/seed.sql (INSERT statements) from the static seed module.
// Run: npx tsx scripts/seed.ts
import { tools, categories, reviews, comparisons } from "../data/tools";
import { writeFileSync } from "node:fs";

function s(v: string): string {
  return "'" + String(v).replace(/'/g, "''") + "'";
}

const lines: string[] = [];
lines.push("-- Seed data generated from data/tools.ts. Do not edit by hand.");
lines.push("DELETE FROM comparisons;");
lines.push("DELETE FROM reviews;");
lines.push("DELETE FROM tools;");
lines.push("DELETE FROM categories;");
lines.push("");

for (const c of categories) {
  lines.push(
    `INSERT INTO categories (slug,name,tagline,description) VALUES (${s(c.slug)},${s(c.name)},${s(c.tagline)},${s(c.description)});`
  );
}
for (const t of tools) {
  lines.push(
    `INSERT INTO tools (slug,name,category,tagline,description,pricing,rating,pros,cons,website,featured,bestFor) VALUES (` +
      `${s(t.slug)},${s(t.name)},${s(t.category)},${s(t.tagline)},${s(t.description)},${s(t.pricing)},${t.rating},` +
      `${s(JSON.stringify(t.pros))},${s(JSON.stringify(t.cons))},${s(t.website)},${t.featured ? 1 : 0},${s(t.bestFor)});`
  );
}
for (const r of reviews) {
  const tool = r.toolSlug ? s(r.toolSlug) : "NULL";
  lines.push(
    `INSERT INTO reviews (slug,title,excerpt,readMins,toolSlug,date) VALUES (${s(r.slug)},${s(r.title)},${s(r.excerpt)},${r.readMins},${tool},${s(r.date)});`
  );
}
for (const c of comparisons) {
  lines.push(
    `INSERT INTO comparisons (slug,title,a,b) VALUES (${s(c.slug)},${s(c.title)},${s(c.a)},${s(c.b)});`
  );
}

writeFileSync(new URL("./seed.sql", import.meta.url), lines.join("\n") + "\n");
console.log(
  `seed.sql written: ${categories.length} categories, ${tools.length} tools, ${reviews.length} reviews, ${comparisons.length} comparisons`
);

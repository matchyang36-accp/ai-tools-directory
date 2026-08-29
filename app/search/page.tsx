"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getTools } from "@/data/tools";

// Pure client-side search — no API route needed for a static export.
// The full tool list is tiny, so we filter it in the browser.
const ALL_TOOLS = getTools().map((t) => ({
  slug: t.slug,
  name: t.name,
  tagline: t.tagline,
}));

export default function SearchPage() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];
    return ALL_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.tagline.toLowerCase().includes(query)
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-3xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Search</h1>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search current tools and established alternatives"
        className="mt-4 w-full h-[42px] px-4 rounded-lg border border-black/15 text-[14px] outline-none focus:border-brand-400"
      />

      {query.length > 0 && (
        <p className="text-[13px] text-ink-400 mt-3">
          {results.length === 0
            ? `No results for “${q}”`
            : `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”`}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        {results.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="bg-white rounded-lg border border-black/10 p-4 flex items-center gap-3 hover:border-brand-400"
          >
            <span className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 font-medium">
              {t.name.charAt(0)}
            </span>
            <div>
              <p className="text-[14px] font-medium text-ink-900">{t.name}</p>
              <p className="text-[12px] text-ink-600">{t.tagline}</p>
            </div>
          </Link>
        ))}
      </div>

      {query.length > 0 && results.length === 0 && (
        <p className="text-[13px] text-ink-600 mt-4">
          No match. Try a broader keyword or{" "}
          <Link href="/submit" className="text-brand-600 hover:underline">
            submit a tool
          </Link>
          .
        </p>
      )}
    </div>
  );
}

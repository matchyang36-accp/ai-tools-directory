"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Tool = {
  slug: string;
  name: string;
  tagline: string;
};

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = q.trim();
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data: Tool[]) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => ctrl.abort();
  }, [q]);

  const query = q.trim();

  return (
    <div className="mx-auto max-w-3xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Search</h1>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search AI tools (e.g. seo, video, jasper)"
        className="mt-4 w-full h-[42px] px-4 rounded-lg border border-black/15 text-[14px] outline-none focus:border-brand-400"
      />

      {query.length > 0 && (
        <p className="text-[13px] text-ink-400 mt-3">
          {loading
            ? "Searching…"
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

      {query.length > 0 && results.length === 0 && !loading && (
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

import type { D1Database } from "../_lib/d1-types";

interface PagesContext {
  request: Request;
  env: { DB?: D1Database };
}

function response(status = 204): Response {
  return new Response(null, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function validSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9-]{1,80}$/.test(value);
}

function validPath(value: unknown): value is string {
  return typeof value === "string"
    && value.startsWith("/")
    && value.length <= 300
    && !value.startsWith("/admin")
    && !value.includes("\\");
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  // This endpoint stores only daily aggregates. It intentionally has no IP,
  // cookie, visitor ID, user-agent, or third-party destination fields.
  if (!context.env.DB) {
    console.error("Outbound click tracking skipped: DB binding is missing");
    return response();
  }

  const requestUrl = new URL(context.request.url);
  const origin = context.request.headers.get("origin");
  if (origin && origin !== requestUrl.origin) return response(403);

  const referer = context.request.headers.get("referer");
  if (!origin) {
    try {
      if (!referer || new URL(referer).origin !== requestUrl.origin) return response(403);
    } catch {
      return response(403);
    }
  }

  let payload: { toolSlug?: unknown; sourcePath?: unknown };
  try {
    payload = await context.request.json();
  } catch {
    return response(400);
  }

  if (!validSlug(payload.toolSlug) || !validPath(payload.sourcePath)) return response(400);

  try {
    const knownTool = await context.env.DB.prepare(
      "SELECT 1 FROM tools WHERE slug = ? LIMIT 1",
    ).bind(payload.toolSlug).all();
    if (!knownTool.results?.length) return response(400);

    const now = new Date().toISOString();
    await context.env.DB.prepare(`
      INSERT INTO outbound_click_daily (day, tool_slug, source_path, clicks, last_clicked_at)
      VALUES (?, ?, ?, 1, ?)
      ON CONFLICT(day, tool_slug, source_path) DO UPDATE SET
        clicks = outbound_click_daily.clicks + 1,
        last_clicked_at = excluded.last_clicked_at
    `).bind(now.slice(0, 10), payload.toolSlug, payload.sourcePath, now).run();
  } catch (error) {
    console.error("Outbound click tracking write failed", error);
  }

  return response();
}

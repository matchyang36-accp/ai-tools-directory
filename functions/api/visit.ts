import type { D1Database } from "../_lib/d1-types";

interface RequestCf {
  country?: string;
  region?: string;
  city?: string;
}

interface PagesContext {
  request: Request & { cf?: RequestCf };
  env: { DB?: D1Database; VISITOR_HASH_SECRET?: string };
}

const encoder = new TextEncoder();

function response(status = 204, headers: HeadersInit = {}): Response {
  return new Response(null, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      ...headers,
    },
  });
}

function maskIp(ip: string): string {
  if (ip.includes(".")) {
    const parts = ip.split(".");
    return parts.length === 4 ? `${parts[0]}.${parts[1]}.xxx.xxx` : "Unknown";
  }
  if (ip.includes(":")) {
    const parts = ip.split(":").filter(Boolean);
    return parts.length ? `${parts.slice(0, 2).join(":")}::/32` : "Unknown";
  }
  return "Unknown";
}

async function anonymousVisitorId(ip: string, userAgent: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(`${ip}\n${userAgent}`)));
  return Array.from(signature, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function deviceType(userAgent: string): string {
  if (/bot|crawler|spider|slurp|headless/i.test(userAgent)) return "Bot";
  if (/ipad|tablet/i.test(userAgent)) return "Tablet";
  if (/mobile|iphone|android/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function safeReferrer(value: string | null, requestUrl: URL): string {
  if (!value) return "Direct";
  try {
    const host = new URL(value).hostname;
    return host === requestUrl.hostname ? "Internal" : host.slice(0, 120);
  } catch {
    return "Unknown";
  }
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  if (!context.env.DB || !context.env.VISITOR_HASH_SECRET || context.env.VISITOR_HASH_SECRET.length < 32) {
    console.error("Visitor tracking skipped: DB binding or hash secret is missing");
    return response(503);
  }

  const userAgent = context.request.headers.get("user-agent") || "";
  if (deviceType(userAgent) === "Bot") return response();

  let body: { path?: unknown };
  try {
    body = await context.request.json();
  } catch {
    return response(400);
  }

  const firstPath = typeof body.path === "string" && body.path.startsWith("/") && body.path.length <= 300
    ? body.path.split("?")[0]
    : null;
  if (!firstPath || firstPath.startsWith("/admin")) return response(400);

  const connectingIp = context.request.headers.get("cf-connecting-ip") || "";
  const visitorId = await anonymousVisitorId(connectingIp, userAgent, context.env.VISITOR_HASH_SECRET);
  const now = new Date().toISOString();
  const requestUrl = new URL(context.request.url);
  const cf = context.request.cf || {};

  try {
    const upsert = context.env.DB.prepare(`
      INSERT INTO visitor_sessions (
        visitor_id, ip_masked, country, region, city, first_path,
        referrer_host, device_type, first_seen, last_seen, page_views
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      ON CONFLICT(visitor_id) DO UPDATE SET
        last_seen = excluded.last_seen,
        page_views = visitor_sessions.page_views + 1
    `).bind(
      visitorId,
      maskIp(connectingIp),
      (cf.country || "Unknown").slice(0, 8),
      (cf.region || "").slice(0, 80),
      (cf.city || "").slice(0, 80),
      firstPath,
      safeReferrer(context.request.headers.get("referer"), requestUrl),
      deviceType(userAgent),
      now,
      now,
    );
    const cleanup = context.env.DB.prepare("DELETE FROM visitor_sessions WHERE datetime(last_seen) < datetime('now', '-90 days')");
    await context.env.DB.batch([upsert, cleanup]);
  } catch (error) {
    console.error("Visitor tracking write failed", error);
    return response(503);
  }

  return response();
}

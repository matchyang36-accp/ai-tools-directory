export interface AdminAuthEnv {
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
}

const COOKIE_NAME = "whichaiuse_admin_session";
const SESSION_TTL_SECONDS = 24 * 60 * 60;
const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array | null {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    const binary = atob(padded);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

async function hmac(value: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left[index] ^ right[index];
  return mismatch === 0;
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie") || "";
  for (const item of header.split(";")) {
    const separator = item.indexOf("=");
    if (separator < 0) continue;
    if (item.slice(0, separator).trim() === name) return item.slice(separator + 1).trim();
  }
  return null;
}

export function validateAuthConfig(env: AdminAuthEnv): string | null {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) {
    return "管理员身份验证环境变量尚未完整配置。";
  }
  if (env.ADMIN_PASSWORD.length < 20 || env.ADMIN_SESSION_SECRET.length < 32) {
    return "管理员密码或会话密钥强度不足。";
  }
  return null;
}

export async function credentialsMatch(env: AdminAuthEnv, email: string, password: string): Promise<boolean> {
  if (validateAuthConfig(env)) return false;
  const expected = encoder.encode(`${env.ADMIN_EMAIL!.trim().toLowerCase()}\n${env.ADMIN_PASSWORD!}`);
  const actual = encoder.encode(`${email.trim().toLowerCase()}\n${password}`);
  const [expectedHash, actualHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", expected),
    crypto.subtle.digest("SHA-256", actual),
  ]);
  return constantTimeEqual(new Uint8Array(expectedHash), new Uint8Array(actualHash));
}

export async function createSessionCookie(env: AdminAuthEnv): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = toBase64Url(encoder.encode(JSON.stringify({ email: env.ADMIN_EMAIL, iat: now, exp: now + SESSION_TTL_SECONDS })));
  const signature = toBase64Url(await hmac(payload, env.ADMIN_SESSION_SECRET!));
  return `${COOKIE_NAME}=${payload}.${signature}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
}

export async function hasValidAdminSession(request: Request, env: AdminAuthEnv): Promise<boolean> {
  if (validateAuthConfig(env)) return false;
  const session = readCookie(request, COOKIE_NAME);
  if (!session) return false;
  const [payload, signature, extra] = session.split(".");
  if (!payload || !signature || extra) return false;
  const providedSignature = fromBase64Url(signature);
  if (!providedSignature || !constantTimeEqual(await hmac(payload, env.ADMIN_SESSION_SECRET!), providedSignature)) return false;

  const payloadBytes = fromBase64Url(payload);
  if (!payloadBytes) return false;
  try {
    const data = JSON.parse(new TextDecoder().decode(payloadBytes)) as { email?: string; exp?: number };
    return data.email?.toLowerCase() === env.ADMIN_EMAIL!.toLowerCase() && typeof data.exp === "number" && data.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
    },
  });
}

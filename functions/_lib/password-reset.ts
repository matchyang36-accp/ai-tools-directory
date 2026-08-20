import { jsonResponse, passwordHash, validateAuthConfig, type AdminAuthEnv } from "./admin-auth";

export interface PasswordResetEnv extends AdminAuthEnv {
  RESEND_API_KEY?: string;
  ADMIN_RESET_FROM?: string;
  SITE_URL?: string;
}

const encoder = new TextEncoder();

export const RESET_TTL_SECONDS = 15 * 60;

function base64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function createResetToken(): string {
  return base64Url(crypto.getRandomValues(new Uint8Array(32)));
}

export async function resetTokenHash(token: string): Promise<string> {
  return base64Url(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(token))));
}

export function validateResetConfig(env: PasswordResetEnv): string | null {
  const authError = validateAuthConfig(env);
  if (authError) return authError;
  if (!env.DB || !env.RESEND_API_KEY || !env.ADMIN_RESET_FROM || !env.SITE_URL) {
    return "密码重置服务尚未完整配置。";
  }
  try {
    const siteUrl = new URL(env.SITE_URL);
    if (siteUrl.protocol !== "https:") return "SITE_URL 必须使用 HTTPS。";
  } catch {
    return "SITE_URL 格式无效。";
  }
  return null;
}

export async function sendResetEmail(env: PasswordResetEnv, resetUrl: string): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.ADMIN_RESET_FROM,
      to: [env.ADMIN_EMAIL],
      subject: "WhichAIUse 管理员密码重置",
      text: `有人申请重置 WhichAIUse 管理员密码。请在 15 分钟内打开以下链接：\n\n${resetUrl}\n\n如果不是你本人操作，请忽略此邮件。`,
    }),
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`Reset email provider returned ${response.status}: ${detail}`);
  }
}

export async function saveNewPassword(env: PasswordResetEnv, token: string, password: string): Promise<boolean> {
  const tokenHash = await resetTokenHash(token);
  const consumed = await env.DB!.prepare(
    "DELETE FROM admin_password_resets WHERE token_hash = ? AND expires_at > ?",
  ).bind(tokenHash, new Date().toISOString()).run();
  if (!consumed.success || consumed.meta?.changes !== 1) return false;

  const now = new Date().toISOString();
  const hash = await passwordHash(env, password);
  const updated = await env.DB!.prepare(`
    INSERT INTO admin_credentials (id, password_hash, version, updated_at)
    VALUES (1, ?, 1, ?)
    ON CONFLICT(id) DO UPDATE SET
      password_hash = excluded.password_hash,
      version = admin_credentials.version + 1,
      updated_at = excluded.updated_at
  `).bind(hash, now).run();
  if (!updated.success) throw new Error("Failed to store the administrator password");
  return true;
}

export function resetUnavailableResponse(): Response {
  return jsonResponse({ error: "RESET_UNAVAILABLE", message: "密码重置服务暂时不可用，请稍后重试。" }, 503);
}

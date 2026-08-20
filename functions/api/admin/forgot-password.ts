import {
  createResetToken,
  resetTokenHash,
  resetUnavailableResponse,
  sendResetEmail,
  validateResetConfig,
  type PasswordResetEnv,
  RESET_TTL_SECONDS,
} from "../../_lib/password-reset";
import { jsonResponse } from "../../_lib/admin-auth";

interface PagesContext {
  request: Request;
  env: PasswordResetEnv;
  waitUntil(promise: Promise<unknown>): void;
}

const GENERIC_MESSAGE = "如果该邮箱已获得管理员授权，重置邮件将在几分钟内送达。";

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const configError = validateResetConfig(context.env);
  if (configError) {
    console.error("Password reset configuration error", { message: configError });
    return resetUnavailableResponse();
  }
  if (Number(context.request.headers.get("content-length") || 0) > 4096) {
    return jsonResponse({ error: "REQUEST_TOO_LARGE", message: "请求无效。" }, 413);
  }

  let body: { email?: unknown };
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: "INVALID_JSON", message: "请求格式无效。" }, 400);
  }
  if (typeof body.email !== "string" || body.email.length > 254) {
    return jsonResponse({ ok: true, message: GENERIC_MESSAGE });
  }
  if (body.email.trim().toLowerCase() !== context.env.ADMIN_EMAIL!.trim().toLowerCase()) {
    return jsonResponse({ ok: true, message: GENERIC_MESSAGE });
  }

  try {
    const recent = await context.env.DB!.prepare(
      "SELECT created_at FROM admin_password_resets ORDER BY created_at DESC LIMIT 1",
    ).all<{ created_at: string }>();
    const lastCreatedAt = recent.results?.[0]?.created_at;
    if (lastCreatedAt && Date.now() - Date.parse(lastCreatedAt) < 60_000) {
      return jsonResponse({ ok: true, message: GENERIC_MESSAGE });
    }

    const token = createResetToken();
    const tokenHash = await resetTokenHash(token);
    const now = new Date();
    const writes = await context.env.DB!.batch([
      context.env.DB!.prepare("DELETE FROM admin_password_resets WHERE expires_at <= ?").bind(now.toISOString()),
      context.env.DB!.prepare("DELETE FROM admin_password_resets"),
      context.env.DB!.prepare(
        "INSERT INTO admin_password_resets (token_hash, expires_at, created_at) VALUES (?, ?, ?)",
      ).bind(tokenHash, new Date(now.getTime() + RESET_TTL_SECONDS * 1000).toISOString(), now.toISOString()),
    ]);
    if (writes.some((result) => !result.success)) throw new Error("Failed to persist the reset token");

    const baseUrl = context.env.SITE_URL!.replace(/\/$/, "");
    const resetUrl = `${baseUrl}/admin-reset-password?token=${encodeURIComponent(token)}`;
    context.waitUntil(sendResetEmail(context.env, resetUrl).catch(async (error) => {
      await context.env.DB!.prepare("DELETE FROM admin_password_resets WHERE token_hash = ?").bind(tokenHash).run();
      console.error("Password reset email failed", { message: error instanceof Error ? error.message : "Unknown email error" });
    }));
    return jsonResponse({ ok: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error("Password reset request failed", { message: error instanceof Error ? error.message : "Unknown reset error" });
    return resetUnavailableResponse();
  }
}

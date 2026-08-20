import { clearSessionCookie, jsonResponse } from "../../_lib/admin-auth";
import { saveNewPassword, validateResetConfig, type PasswordResetEnv } from "../../_lib/password-reset";

interface PagesContext {
  request: Request;
  env: PasswordResetEnv;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const configError = validateResetConfig(context.env);
  if (configError) {
    console.error("Password reset configuration error", { message: configError });
    return jsonResponse({ error: "RESET_UNAVAILABLE", message: "密码重置服务暂时不可用，请稍后重试。" }, 503);
  }
  if (Number(context.request.headers.get("content-length") || 0) > 8192) {
    return jsonResponse({ error: "REQUEST_TOO_LARGE", message: "请求无效。" }, 413);
  }

  let body: { token?: unknown; password?: unknown };
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: "INVALID_JSON", message: "请求格式无效。" }, 400);
  }
  if (typeof body.token !== "string" || body.token.length > 128 || typeof body.password !== "string") {
    return jsonResponse({ error: "INVALID_RESET", message: "重置链接无效或已经过期。" }, 400);
  }
  if (body.password.length < 20 || body.password.length > 256) {
    return jsonResponse({ error: "WEAK_PASSWORD", message: "新密码必须至少包含 20 个字符。" }, 400);
  }

  try {
    if (!(await saveNewPassword(context.env, body.token, body.password))) {
      return jsonResponse({ error: "INVALID_RESET", message: "重置链接无效或已经过期，请重新申请。" }, 400);
    }
    const response = jsonResponse({ ok: true, message: "密码已更新，请使用新密码登录。" });
    response.headers.append("set-cookie", clearSessionCookie());
    return response;
  } catch (error) {
    console.error("Password reset failed", { message: error instanceof Error ? error.message : "Unknown reset error" });
    return jsonResponse({ error: "RESET_FAILED", message: "密码更新失败，请重新申请重置链接。" }, 500);
  }
}

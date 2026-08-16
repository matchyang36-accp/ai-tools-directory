import { createSessionCookie, credentialsMatch, jsonResponse, validateAuthConfig, type AdminAuthEnv } from "../../_lib/admin-auth";

interface PagesContext {
  request: Request;
  env: AdminAuthEnv;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const configError = validateAuthConfig(context.env);
  if (configError) {
    console.error("Admin auth configuration error", { message: configError });
    return jsonResponse({ error: "AUTH_NOT_CONFIGURED", message: configError }, 503);
  }

  if (Number(context.request.headers.get("content-length") || 0) > 4096) {
    return jsonResponse({ error: "REQUEST_TOO_LARGE", message: "登录请求无效。" }, 413);
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: "INVALID_JSON", message: "登录请求格式无效。" }, 400);
  }

  if (typeof body.email !== "string" || typeof body.password !== "string" || body.password.length > 256) {
    return jsonResponse({ error: "INVALID_CREDENTIALS", message: "邮箱或密码错误。" }, 401);
  }

  if (!(await credentialsMatch(context.env, body.email, body.password))) {
    console.warn("Admin login rejected");
    return jsonResponse({ error: "INVALID_CREDENTIALS", message: "邮箱或密码错误。" }, 401);
  }

  const response = jsonResponse({ ok: true });
  response.headers.append("set-cookie", await createSessionCookie(context.env));
  return response;
}

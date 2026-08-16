import { hasValidAdminSession, validateAuthConfig, type AdminAuthEnv } from "../_lib/admin-auth";

interface PagesContext {
  request: Request;
  env: AdminAuthEnv;
  next(): Promise<Response>;
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const configError = validateAuthConfig(context.env);
  if (configError) {
    console.error("Admin route blocked by invalid configuration", { message: configError });
    return new Response("管理员登录尚未完成配置。", { status: 503, headers: { "cache-control": "no-store" } });
  }

  if (await hasValidAdminSession(context.request, context.env)) return context.next();

  const requestedUrl = new URL(context.request.url);
  const loginUrl = new URL("/admin-login", requestedUrl.origin);
  loginUrl.searchParams.set("next", `${requestedUrl.pathname}${requestedUrl.search}`);
  return Response.redirect(loginUrl.toString(), 302);
}

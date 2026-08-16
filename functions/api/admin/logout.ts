import { clearSessionCookie, jsonResponse } from "../../_lib/admin-auth";

export function onRequestPost(): Response {
  const response = jsonResponse({ ok: true });
  response.headers.append("set-cookie", clearSessionCookie());
  return response;
}

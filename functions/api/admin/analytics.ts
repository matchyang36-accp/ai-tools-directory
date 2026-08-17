import { hasValidAdminSession, jsonResponse, type AdminAuthEnv } from "../../_lib/admin-auth";
import type { D1Database } from "../../_lib/d1-types";

interface Env extends AdminAuthEnv {
  CF_ANALYTICS_API_TOKEN?: string;
  CF_ZONE_ID?: string;
  DB?: D1Database;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";

const QUERY = `
  query AdminAnalytics($zoneTag: string, $filter: filter) {
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        summary: httpRequestsAdaptiveGroups(limit: 1, filter: $filter) {
          count
          sum { visits }
        }
        daily: httpRequestsAdaptiveGroups(limit: 40, orderBy: [date_ASC], filter: $filter) {
          count
          sum { visits }
          dimensions { date }
        }
        topPaths: httpRequestsAdaptiveGroups(limit: 10, orderBy: [count_DESC], filter: $filter) {
          count
          dimensions { value: clientRequestPath }
        }
        topCountries: httpRequestsAdaptiveGroups(limit: 8, orderBy: [count_DESC], filter: $filter) {
          count
          dimensions { value: clientCountryName }
        }
        devices: httpRequestsAdaptiveGroups(limit: 8, orderBy: [count_DESC], filter: $filter) {
          count
          dimensions { value: clientDeviceType }
        }
      }
    }
  }
`;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, max-age=300",
      "x-content-type-options": "nosniff",
    },
  });
}

export async function onRequestGet(context: PagesContext): Promise<Response> {
  if (!(await hasValidAdminSession(context.request, context.env))) {
    return jsonResponse({ error: "ADMIN_ACCESS_REQUIRED", message: "管理员登录已失效，请重新登录。" }, 401);
  }

  const apiToken = context.env.CF_ANALYTICS_API_TOKEN;
  const zoneId = context.env.CF_ZONE_ID;
  if (!apiToken || !zoneId) {
    return json({ error: "ANALYTICS_NOT_CONFIGURED", message: "Cloudflare Analytics 环境变量尚未配置。" }, 503);
  }

  const days = 1;
  const end = new Date();
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          zoneTag: zoneId,
          filter: {
            datetime_geq: start.toISOString(),
            datetime_leq: end.toISOString(),
            requestSource: "eyeball",
          },
        },
      }),
    });

    const payload: any = await response.json();
    if (!response.ok || payload.errors?.length) {
      console.error("Cloudflare Analytics query failed", {
        status: response.status,
        errors: payload.errors,
      });
      const upstreamMessage = payload.errors?.[0]?.message;
      return json({
        error: "ANALYTICS_UPSTREAM_ERROR",
        message: typeof upstreamMessage === "string" ? `Cloudflare Analytics：${upstreamMessage}` : "Cloudflare Analytics 暂时无法返回数据。",
      }, 502);
    }

    const zone = payload.data?.viewer?.zones?.[0];
    if (!zone) {
      return json({ error: "ZONE_NOT_FOUND", message: "API Token 无法访问配置的站点区域。" }, 502);
    }

    let recentVisitors: unknown[] = [];
    let visitorTrackingAvailable = Boolean(context.env.DB);
    if (context.env.DB) {
      try {
        const visitorResult = await context.env.DB.prepare(`
          SELECT visitor_id AS visitorId, ip_masked AS ipMasked, country, region, city,
                 first_path AS firstPath, referrer_host AS referrerHost,
                 device_type AS deviceType, first_seen AS firstSeen,
                 last_seen AS lastSeen, page_views AS pageViews
          FROM visitor_sessions
          ORDER BY last_seen DESC
          LIMIT 50
        `).all();
        recentVisitors = visitorResult.results || [];
      } catch (error) {
        visitorTrackingAvailable = false;
        console.error("Recent visitor query failed", error);
      }
    }

    return json({
      rangeDays: days,
      generatedAt: end.toISOString(),
      summary: zone.summary?.[0] || { count: 0, sum: { visits: 0 } },
      daily: zone.daily || [],
      topPaths: zone.topPaths || [],
      // The Free zone plan does not expose clientRefererHost through this dataset.
      // Keep the stable response shape so the UI can degrade without failing.
      topReferrers: [],
      topCountries: zone.topCountries || [],
      devices: zone.devices || [],
      recentVisitors,
      visitorTrackingAvailable,
    });
  } catch (error) {
    console.error("Cloudflare Analytics request crashed", error);
    return json({ error: "ANALYTICS_REQUEST_FAILED", message: "访问分析服务连接失败，请稍后重试。" }, 502);
  }
}

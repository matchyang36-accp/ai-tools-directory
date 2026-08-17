"use client";

import { useEffect, useState } from "react";

type Group = { count: number; sum?: { visits?: number }; dimensions?: { date?: string; value?: string } };
type AnalyticsData = {
  rangeDays: number;
  generatedAt: string;
  summary: Group;
  daily: Group[];
  topPaths: Group[];
  topReferrers: Group[];
  topCountries: Group[];
  devices: Group[];
  recentVisitors: RecentVisitor[];
  visitorTrackingAvailable: boolean;
};

type RecentVisitor = {
  visitorId: string;
  ipMasked: string;
  country: string;
  region: string;
  city: string;
  firstPath: string;
  referrerHost: string;
  deviceType: string;
  firstSeen: string;
  lastSeen: string;
  pageViews: number;
};

function formatNumber(value = 0) {
  return new Intl.NumberFormat("zh-CN", { notation: value > 9999 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value);
}

function Ranking({ rows, emptyLabel }: { rows: Group[]; emptyLabel: string }) {
  const max = Math.max(...rows.map((row) => row.count), 1);
  if (!rows.length) return <p className="py-8 text-center text-sm text-ink-400">{emptyLabel}</p>;
  return (
    <div className="space-y-4">
      {rows.map((row, index) => (
        <div key={`${row.dimensions?.value || "unknown"}-${index}`}>
          <div className="mb-1 flex items-center justify-between gap-4 text-sm">
            <span className="truncate text-ink-600">{row.dimensions?.value || "直接访问 / 未知"}</span>
            <span className="shrink-0 font-medium text-ink-900">{formatNumber(row.count)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/5"><div className="h-full rounded-full bg-brand-400" style={{ width: `${Math.max(3, (row.count / max) * 100)}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function locationLabel(visitor: RecentVisitor): string {
  return [visitor.country, visitor.region, visitor.city].filter(Boolean).join(" · ") || "未知地区";
}

export default function AnalyticsDashboard() {
  const [days, setDays] = useState(1);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetch(`/api/admin/analytics?days=${days}`, { credentials: "same-origin", signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json();
        if (response.status === 401) {
          window.location.assign(`/admin-login?next=${encodeURIComponent("/admin/analytics")}`);
          throw new Error("管理员登录已失效，正在跳转登录页。");
        }
        if (!response.ok) throw new Error(payload.message || "访问数据加载失败。");
        return payload as AnalyticsData;
      })
      .then(setData)
      .catch((reason) => {
        if (reason.name !== "AbortError") setError(reason.message || "访问数据加载失败。");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [days]);

  const maxDaily = Math.max(...(data?.daily || []).map((item) => item.count), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl border border-black/10 bg-white p-1">
          {[1].map((value) => (
            <button key={value} type="button" onClick={() => setDays(value)} className={`rounded-lg px-4 py-2 text-sm transition ${days === value ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-black/[0.03]"}`}>
              今天
            </button>
          ))}
        </div>
        <div className="text-right">
          {data && <p className="text-xs text-ink-400">更新于 {new Date(data.generatedAt).toLocaleString("zh-CN")}</p>}
          <p className="mt-1 text-xs text-ink-400">Cloudflare 免费套餐当前提供最近 24 小时查询</p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">访问分析暂不可用</p><p className="mt-1">{error}</p>
          <a href="https://dash.cloudflare.com/" target="_blank" rel="noreferrer" className="mt-3 inline-block font-medium text-brand-600 hover:underline">打开 Cloudflare 控制台 →</a>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["HTTP 请求", data?.summary.count, "包含页面与静态资源"],
          ["访问次数", data?.summary.sum?.visits, "Cloudflare visits 指标"],
          ["热门页面", data?.topPaths.length, "有访问记录的前十路径"],
          ["数据范围", data?.rangeDays, "天"],
        ].map(([label, value, note]) => (
          <div key={String(label)} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <p className="text-sm text-ink-600">{label}</p><p className="mt-2 text-3xl font-semibold text-ink-900">{loading ? "…" : formatNumber(Number(value || 0))}</p><p className="mt-2 text-xs text-ink-400">{note}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-ink-900">访问趋势</h3>
        <div className="mt-5 flex h-44 items-end gap-2" aria-label="每日 HTTP 请求趋势">
          {(data?.daily || []).map((item) => (
            <div key={item.dimensions?.date} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
              <span className="hidden text-[10px] text-ink-400 group-hover:block">{formatNumber(item.count)}</span>
              <div className="w-full max-w-10 rounded-t-md bg-brand-400" style={{ height: `${Math.max(4, (item.count / maxDaily) * 130)}px` }} />
              <span className="max-w-full truncate text-[10px] text-ink-400">{item.dimensions?.date?.slice(5)}</span>
            </div>
          ))}
          {!loading && !data?.daily.length && <p className="m-auto text-sm text-ink-400">当前范围暂无数据</p>}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 px-5 py-4">
          <div>
            <h3 className="font-semibold text-ink-900">最近访客</h3>
            <p className="mt-1 text-xs text-ink-400">最多显示最近 50 个匿名访客；IP 已脱敏，不保存完整地址</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">首次进入页面</span>
        </div>
        {!loading && data && !data.visitorTrackingAvailable && (
          <p className="m-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">访客明细存储暂不可用，Cloudflare 汇总统计仍正常。</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full text-left text-sm">
            <thead className="bg-black/[0.025] text-xs text-ink-600">
              <tr>
                <th className="px-5 py-3 font-medium">最近访问</th>
                <th className="px-5 py-3 font-medium">脱敏 IP</th>
                <th className="px-5 py-3 font-medium">IP 地区</th>
                <th className="px-5 py-3 font-medium">首次进入页面</th>
                <th className="px-5 py-3 font-medium">来源</th>
                <th className="px-5 py-3 font-medium">设备 / 浏览量</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {(data?.recentVisitors || []).map((visitor) => (
                <tr key={visitor.visitorId} className="align-top hover:bg-black/[0.015]">
                  <td className="whitespace-nowrap px-5 py-4 text-ink-600" title={`首次：${new Date(visitor.firstSeen).toLocaleString("zh-CN")}`}>
                    {new Date(visitor.lastSeen).toLocaleString("zh-CN")}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-ink-600">{visitor.ipMasked}</td>
                  <td className="max-w-52 px-5 py-4 text-ink-600">{locationLabel(visitor)}</td>
                  <td className="max-w-64 px-5 py-4"><a href={visitor.firstPath} target="_blank" rel="noreferrer" className="break-all font-medium text-brand-600 hover:underline">{visitor.firstPath}</a></td>
                  <td className="max-w-44 px-5 py-4 text-ink-600">{visitor.referrerHost || "Direct"}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-ink-600">{visitor.deviceType} · {visitor.pageViews}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && data?.visitorTrackingAvailable && !data.recentVisitors.length && (
            <p className="px-5 py-10 text-center text-sm text-ink-400">采集刚刚启用，出现新访客后会显示在这里。</p>
          )}
          {loading && <p className="px-5 py-10 text-center text-sm text-ink-400">正在加载最近访客…</p>}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        {[
          ["热门页面", data?.topPaths || [], "暂无页面访问数据"],
          ["流量来源", data?.topReferrers || [], "暂无来源数据"],
          ["国家 / 地区", data?.topCountries || [], "暂无地区数据"],
          ["设备类型", data?.devices || [], "暂无设备数据"],
        ].map(([title, rows, empty]) => (
          <section key={String(title)} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"><h3 className="mb-5 font-semibold text-ink-900">{String(title)}</h3><Ranking rows={rows as Group[]} emptyLabel={String(empty)} /></section>
        ))}
      </div>
    </div>
  );
}

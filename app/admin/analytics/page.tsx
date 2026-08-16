import { EmptyState, PageHeader, Panel, StatusBadge } from "@/components/admin/AdminUI";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="📊 数据分析" description="查看流量、热门内容、搜索表现和转化数据。" />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Cloudflare Web Analytics" action={<StatusBadge tone="success">网站已安装</StatusBadge>}>
          <EmptyState title="数据保留在 Cloudflare" description="为避免在前端暴露 API 凭据，MVP 不直接读取账户数据。请从 Cloudflare 控制台查看访问量、来源和性能。" />
        </Panel>
        <Panel title="Google Search Console" action={<StatusBadge tone="success">站点已验证</StatusBadge>}>
          <EmptyState title="搜索数据保留在 Google" description="后续可通过安全的服务端任务同步点击、展现、关键词和索引状态。" />
        </Panel>
      </div>
    </>
  );
}

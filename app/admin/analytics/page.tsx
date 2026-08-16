import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { PageHeader } from "@/components/admin/AdminUI";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="📊 用户访问分析" description="查看 Cloudflare 统计的请求、访问趋势、热门页面、来源、地区和设备。" />
      <AnalyticsDashboard />
    </>
  );
}

import { categories, reviews, tools } from "@/data/tools";
import { PageHeader, Panel, StatCard, StatusBadge } from "@/components/admin/AdminUI";

export default function AdminDashboard() {
  const featured = tools.filter((tool) => tool.featured).length;
  return (
    <>
      <PageHeader title="🏠 仪表盘" description="查看网站内容规模、系统状态和待办事项。" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI 工具" value={tools.length} note={`${featured} 个精选工具`} href="/admin/content" />
        <StatCard label="博客文章" value={reviews.length} note="包括已发布与基础文章" href="/admin/content" />
        <StatCard label="内容分类" value={categories.length} note="当前导航分类" href="/admin/content" />
        <StatCard label="注册用户" value="—" note="等待连接用户数据库" href="/admin/users" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="系统状态">
          <ul className="space-y-4 text-sm">
            <li className="flex items-center justify-between"><span>静态内容与 SEO 页面</span><StatusBadge tone="success">运行正常</StatusBadge></li>
            <li className="flex items-center justify-between"><span>Google ads.txt</span><StatusBadge tone="success">已部署</StatusBadge></li>
            <li className="flex items-center justify-between"><span>管理员身份保护</span><StatusBadge tone="warning">需配置 Access</StatusBadge></li>
            <li className="flex items-center justify-between"><span>数据库写入功能</span><StatusBadge>尚未连接</StatusBadge></li>
          </ul>
        </Panel>
        <Panel title="下一步待办">
          <ol className="space-y-3 text-sm text-ink-600">
            <li><strong className="mr-2 text-brand-600">1.</strong>管理员页面与分析接口已使用同一套加密会话保护</li>
            <li><strong className="mr-2 text-brand-600">2.</strong>接入 Supabase Auth 与用户表</li>
            <li><strong className="mr-2 text-brand-600">3.</strong>将工具、反馈迁移到可写数据库</li>
            <li><strong className="mr-2 text-brand-600">4.</strong>接入 Cloudflare Web Analytics 数据</li>
          </ol>
        </Panel>
      </div>
    </>
  );
}

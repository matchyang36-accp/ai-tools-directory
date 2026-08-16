import { PageHeader, Panel, StatusBadge } from "@/components/admin/AdminUI";
import { SITE } from "@/lib/site";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="⚙️ 网站设置" description="查看站点基础配置和外部服务连接状态。" />
      <div className="space-y-6">
        <Panel title="基础信息">
          <dl className="grid gap-5 text-sm sm:grid-cols-2">
            <div><dt className="text-ink-400">网站名称</dt><dd className="mt-1 font-medium">{SITE.name}</dd></div>
            <div><dt className="text-ink-400">主域名</dt><dd className="mt-1 font-medium">{SITE.url}</dd></div>
            <div className="sm:col-span-2"><dt className="text-ink-400">网站描述</dt><dd className="mt-1 text-ink-600">{SITE.description}</dd></div>
          </dl>
        </Panel>
        <Panel title="服务连接">
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between"><span>Cloudflare Pages</span><StatusBadge tone="success">已部署</StatusBadge></li>
            <li className="flex justify-between"><span>Google Search Console</span><StatusBadge tone="success">已验证</StatusBadge></li>
            <li className="flex justify-between"><span>Google AdSense ads.txt</span><StatusBadge tone="success">已发布</StatusBadge></li>
            <li className="flex justify-between"><span>Supabase</span><StatusBadge>未连接</StatusBadge></li>
            <li className="flex justify-between"><span>Cloudflare Access</span><StatusBadge tone="warning">需要配置</StatusBadge></li>
          </ul>
        </Panel>
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">为防止配置泄漏，设置页当前只读。后续写入操作应通过受认证的服务端 API 完成，不能直接把密钥放进浏览器。</p>
      </div>
    </>
  );
}

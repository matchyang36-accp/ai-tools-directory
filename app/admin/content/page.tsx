import Link from "next/link";
import { categories, reviews, tools } from "@/data/tools";
import { PageHeader, Panel, StatusBadge } from "@/components/admin/AdminUI";

export default function ContentPage() {
  return (
    <>
      <PageHeader title="📦 内容 / 产品管理" description="集中查看工具、分类和博客内容；写入功能将在数据库接入后开放。" />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title={`AI 工具（${tools.length}）`} action={<StatusBadge tone="success">数据已连接</StatusBadge>}>
          <div className="max-h-[520px] space-y-3 overflow-auto pr-2">
            {tools.map((tool) => (
              <div key={tool.slug} className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-3">
                <div><p className="text-sm font-medium">{tool.name}</p><p className="text-xs text-ink-400">{tool.category} · {tool.pricing}</p></div>
                <Link href={`/tools/${tool.slug}`} className="text-xs text-brand-600 hover:underline">查看</Link>
              </div>
            ))}
          </div>
        </Panel>
        <div className="space-y-6">
          <Panel title={`博客文章（${reviews.length}）`}>
            <div className="space-y-3">
              {reviews.slice(0, 8).map((review) => (
                <div key={review.slug} className="flex items-center justify-between gap-4 border-b border-black/5 pb-3 last:border-0 last:pb-0">
                  <div><p className="line-clamp-1 text-sm font-medium">{review.title}</p><p className="text-xs text-ink-400">{review.date}</p></div>
                  <Link href={`/blog/${review.slug}`} className="shrink-0 text-xs text-brand-600 hover:underline">查看</Link>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title={`内容分类（${categories.length}）`}>
            <div className="flex flex-wrap gap-2">{categories.map((category) => <span key={category.slug} className="rounded-full bg-black/[0.03] px-3 py-1.5 text-xs text-ink-600">{category.name}</span>)}</div>
          </Panel>
        </div>
      </div>
    </>
  );
}

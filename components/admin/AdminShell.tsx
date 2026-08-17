"use client";

import Link from "next/link";
import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";

const navItems = [
  { href: "/admin", icon: "🏠", label: "仪表盘" },
  { href: "/admin/users", icon: "👥", label: "用户管理" },
  { href: "/admin/content", icon: "📦", label: "内容 / 产品管理" },
  { href: "/admin/analytics", icon: "📊", label: "数据分析" },
  { href: "/admin/feedback", icon: "💬", label: "用户反馈" },
  { href: "/admin/settings", icon: "⚙️", label: "网站设置" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      window.location.assign("/admin-login");
    }
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[250px_1fr]">
      <aside className="h-fit rounded-2xl border border-black/10 bg-white p-4 shadow-sm lg:sticky lg:top-24">
        <div className="mb-5 border-b border-black/10 px-2 pb-4">
          <div className="flex items-center gap-2">
            <BrandIcon className="h-8 w-8" priority />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">WhichAIUse</p>
          </div>
          <h1 className="mt-1 text-lg font-semibold text-ink-900">管理控制台</h1>
          <p className="mt-1 text-xs text-ink-600">应用内加密会话保护</p>
        </div>
        <nav aria-label="管理员导航" className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-600 transition hover:bg-brand-50 hover:text-brand-800"
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <Link href="/" className="mt-5 block border-t border-black/10 px-3 pt-4 text-sm text-ink-600 hover:text-brand-600">
          ← 返回网站
        </Link>
        <button type="button" onClick={logout} disabled={loggingOut} className="mt-3 w-full px-3 text-left text-sm text-ink-600 hover:text-red-600 disabled:opacity-50">
          {loggingOut ? "正在退出…" : "退出管理员登录"}
        </button>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Administrator Login",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <section className="w-full rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">WhichAIUse</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink-900">管理员登录</h1>
        <p className="mt-2 text-sm leading-6 text-ink-600">使用已授权的管理员邮箱和后台专用密码登录。会话将在 24 小时后自动失效。</p>
        <AdminLoginForm />
        <Link href="/" className="mt-5 block text-center text-sm text-ink-600 hover:text-brand-600">← 返回网站首页</Link>
      </section>
    </div>
  );
}

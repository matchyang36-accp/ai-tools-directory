import type { Metadata } from "next";
import Link from "next/link";
import AdminForgotPasswordForm from "@/components/admin/AdminForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Administrator Password",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminForgotPasswordPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <section className="w-full rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">WhichAIUse</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink-900">找回管理员密码</h1>
        <p className="mt-2 text-sm leading-6 text-ink-600">输入已授权的管理员邮箱。有效的重置链接将在 15 分钟后失效，并且只能使用一次。</p>
        <AdminForgotPasswordForm />
        <Link href="/admin-login" className="mt-5 block text-center text-sm text-ink-600 hover:text-brand-600">← 返回管理员登录</Link>
      </section>
    </div>
  );
}

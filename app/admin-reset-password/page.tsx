import type { Metadata } from "next";
import Link from "next/link";
import AdminResetPasswordForm from "@/components/admin/AdminResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Administrator Password",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminResetPasswordPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <section className="w-full rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">WhichAIUse</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink-900">设置新的管理员密码</h1>
        <p className="mt-2 text-sm leading-6 text-ink-600">请设置至少 20 个字符的后台专用密码。更新后，之前的管理员会话将全部失效。</p>
        <AdminResetPasswordForm />
        <Link href="/admin-forgot-password" className="mt-5 block text-center text-sm text-ink-600 hover:text-brand-600">重新申请重置链接</Link>
      </section>
    </div>
  );
}

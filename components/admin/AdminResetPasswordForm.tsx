"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AdminResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmation) {
      setError("两次输入的新密码不一致。");
      return;
    }
    const token = new URLSearchParams(window.location.search).get("token") || "";
    if (!token) {
      setError("重置链接缺少令牌，请重新申请。");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "密码更新失败，请重新申请重置链接。");
      setMessage(result.message || "密码已更新。");
      setPassword("");
      setConfirmation("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "密码更新失败，请重新申请重置链接。");
    } finally {
      setSubmitting(false);
    }
  }

  if (message) {
    return (
      <div className="mt-6">
        <p role="status" className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">{message}</p>
        <Link href="/admin-login" className="mt-4 block w-full rounded-xl bg-brand-600 px-4 py-3 text-center font-semibold text-white hover:bg-brand-700">
          返回管理员登录
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-ink-900">
        新密码
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={20}
          maxLength={256}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          placeholder="至少 20 个字符"
        />
      </label>
      <label className="block text-sm font-medium text-ink-900">
        再次输入新密码
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={20}
          maxLength={256}
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "正在更新…" : "更新管理员密码"}
      </button>
    </form>
  );
}

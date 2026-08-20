"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

function safeNextPath(): string {
  const value = new URLSearchParams(window.location.search).get("next");
  return value?.startsWith("/admin") && !value.startsWith("//") ? value : "/admin";
}

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "登录失败，请稍后重试。");
      window.location.assign(safeNextPath());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "登录失败，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-ink-900">
        管理员邮箱
        <input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          placeholder="name@example.com"
        />
      </label>
      <label className="block text-sm font-medium text-ink-900">
        <span className="flex items-center justify-between gap-4">
          管理员密码
          <Link href="/admin-forgot-password" className="font-normal text-brand-600 hover:text-brand-700">
            忘记密码？
          </Link>
        </span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          placeholder="输入后台专用密码"
        />
      </label>
      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "正在验证…" : "登录管理后台"}
      </button>
    </form>
  );
}

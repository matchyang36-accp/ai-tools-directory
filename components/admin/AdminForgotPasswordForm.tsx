"use client";

import { FormEvent, useState } from "react";

export default function AdminForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "暂时无法发送重置邮件，请稍后重试。");
      setMessage(result.message || "如果邮箱有效，重置邮件将在几分钟内送达。");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "暂时无法发送重置邮件，请稍后重试。");
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
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          placeholder="name@example.com"
        />
      </label>
      {message && <p role="status" className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">{message}</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting || Boolean(message)}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "正在发送…" : "发送密码重置邮件"}
      </button>
    </form>
  );
}

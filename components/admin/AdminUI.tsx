import Link from "next/link";

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-6">
      <h2 className="text-2xl font-semibold text-ink-900">{title}</h2>
      <p className="mt-1 text-sm text-ink-600">{description}</p>
    </header>
  );
}

export function StatCard({ label, value, note, href }: { label: string; value: string | number; note: string; href?: string }) {
  const body = (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:border-brand-200">
      <p className="text-sm text-ink-600">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink-900">{value}</p>
      <p className="mt-2 text-xs text-ink-400">{note}</p>
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

export function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
        <h3 className="font-semibold text-ink-900">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-black/15 bg-black/[0.02] px-5 py-10 text-center">
      <p className="font-medium text-ink-900">{title}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-ink-600">{description}</p>
    </div>
  );
}

export function StatusBadge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" }) {
  const colors = tone === "success" ? "bg-emerald-50 text-emerald-700" : tone === "warning" ? "bg-amber-50 text-amber-700" : "bg-black/5 text-ink-600";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors}`}>{children}</span>;
}

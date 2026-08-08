import Link from "next/link";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-8">
      <h1 className="text-[20px] font-medium text-ink-900">Contact</h1>
      <p className="text-[14px] text-ink-600 leading-relaxed mt-3">
        Questions, corrections or partnership ideas? Email{" "}
        <span className="text-brand-600">hello@marketai.example.com</span> or{" "}
        <Link href="/submit" className="text-brand-600 hover:underline">
          submit a tool
        </Link>
        .
      </p>
      <Link
        href="/"
        className="inline-block mt-6 text-[13px] text-brand-600 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}

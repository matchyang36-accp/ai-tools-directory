import Link from "next/link";
import type { Tool } from "@/data/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="bg-white rounded-lg border border-black/10 p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 font-medium">
          {tool.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-[14px] text-ink-900">{tool.name}</p>
          <p className="text-[12px] text-ink-600">{tool.tagline}</p>
        </div>
      </div>
      <p className="text-[12px] text-ink-400 mb-3">Rating {tool.rating} / 5</p>
      <Link
        href={`/tools/${tool.slug}`}
        className="mt-auto h-[28px] px-4 rounded-full bg-brand-600 text-white text-[12px] font-medium flex items-center justify-center hover:bg-brand-800"
      >
        Visit
      </Link>
    </div>
  );
}

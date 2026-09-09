import Link from "next/link";

const choices = [
  { name: "Jasper", href: "/tools/jasper", task: "Keep campaign assets consistent", detail: "Start here when several writers repeatedly correct brand tone and product context across emails, landing pages and social posts." },
  { name: "Copy.ai", href: "/tools/copy-ai", task: "Repeat a sales or marketing process", detail: "Start here when the same inputs pass through several drafting and review steps. Evaluate setup, handoffs and exceptions as well as the copy." },
  { name: "Writesonic", href: "/tools/writesonic", task: "Develop a sourced article", detail: "Start here for an article workflow with a named editor who can check sources, review internal links and approve the final page." },
];

export default function CopywritingGuide() {
  return (
    <section aria-labelledby="writing-selection" className="mb-10 space-y-6 text-[14px] leading-7 text-ink-700">
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
        <h2 id="writing-selection" className="text-[20px] font-medium text-ink-900">Choose AI writing tools by the work you repeat</h2>
        <p className="mt-3">Begin with one recurring job and a reusable brief. Add a specialist only when your current process leaves a measurable gap in brand consistency, workflow handoffs or article preparation. These starting points reflect editorial analysis of the official sources linked in each guide; they are not performance rankings.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {choices.map((choice) => (
          <article key={choice.href} className="rounded-xl border border-black/10 bg-white p-5">
            <h3 className="text-[16px] font-medium text-ink-900">{choice.task}</h3>
            <p className="mt-2">{choice.detail}</p>
            <Link className="mt-3 inline-block text-brand-700 underline underline-offset-4" href={choice.href}>Read the {choice.name} guide →</Link>
          </article>
        ))}
      </div>
      <section>
        <h2 className="text-[18px] font-medium text-ink-900">A small-business evaluation workflow</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Choose one real deliverable. Supply its audience, goal, approved facts, tone and exclusions.</li>
          <li>Use the same brief with your existing process and one candidate. Keep the first drafts for comparison.</li>
          <li>Check every factual claim, edit for the reader and measure the complete approval time.</li>
          <li>Confirm current plan limits and total cost. Keep the tool only if it solves a recurring problem.</li>
        </ol>
        <p className="mt-3">For example, test a product announcement email before automating a month of campaigns. Keep a human approval step and a manual fallback. More generated text is useful only when it becomes accurate, approved work.</p>
      </section>
      <nav aria-label="Writing comparisons and workflows" className="rounded-xl border border-black/10 bg-white p-5">
        <h2 className="text-[18px] font-medium text-ink-900">Compare before building your stack</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-brand-700">
          <li><Link href="/compare/jasper-vs-copy-ai" className="underline underline-offset-4">Jasper vs Copy.ai: campaign content and GTM workflows</Link></li>
          <li><Link href="/blog/ai-writing-tools-small-business-stack" className="underline underline-offset-4">Six writing tools and a lean small-business stack</Link></li>
        </ul>
      </nav>
      <section>
        <h2 className="text-[18px] font-medium text-ink-900">Common selection questions</h2>
        <h3 className="mt-3 font-medium text-ink-900">Do I need all three tools?</h3>
        <p>No. Pilot one tool against a recurring job. Add another only when it fills a separate need that remains unsolved.</p>
        <h3 className="mt-3 font-medium text-ink-900">What matters more than the starting price?</h3>
        <p>Compare seats, usage, workflow access, export and cancellation terms, plus the time needed to configure and review the work. Confirm these with the provider before paying.</p>
        <h3 className="mt-3 font-medium text-ink-900">Can I publish generated copy immediately?</h3>
        <p>Require an editor to verify facts, sources, permissions and the final offer. Brand controls and citations help structure a process; neither replaces approval.</p>
      </section>
    </section>
  );
}

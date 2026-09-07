export interface ToolGuide {
  displayTitle: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqs: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; href: string }>;
}

/**
 * Long-form tool guidance is kept outside the directory record so the short
 * tool-card contract remains stable as individual high-intent pages expand.
 */
export const toolGuides: Record<string, ToolGuide> = {
  grammarlygo: {
    displayTitle: "GrammarlyGO: current Grammarly AI and Go overview",
    metaTitle: "GrammarlyGO: current Grammarly AI and Go overview",
    metaDescription:
      "Understand the GrammarlyGO search term, Grammarly's current Go assistant and AI writing features, plus a practical checklist before choosing a plan.",
    summary:
      "People who search for GrammarlyGO are usually looking for Grammarly's AI writing help. Grammarly's current product and support pages use the names Go and Superhuman Go for its proactive assistant, alongside on-demand generative AI assistance. This page keeps the familiar search term while focusing on the current product wording and the questions that matter in a real writing workflow.",
    sections: [
      {
        heading: "What does GrammarlyGO mean today?",
        paragraphs: [
          "GrammarlyGO is a common search term, but Grammarly's current support documentation refers to Go and its AI agents, and calls the proactive assistant Superhuman Go. Its current feature pages also use the shorter name Go. That does not mean every older reference maps one-to-one to the same feature, plan or application; product names and availability can change over time.",
          "The practical takeaway is simple: treat GrammarlyGO as a route to evaluate Grammarly's current AI writing capabilities, then confirm the exact feature in the app, browser extension or plan you intend to use. Keeping this URL live helps people who use the older query reach current information instead of a dead end or a misleading price page.",
        ],
      },
      {
        heading: "What Grammarly's current AI writing workflow can help with",
        paragraphs: [
          "Grammarly documents on-demand generative AI assistance for composing, rewriting, ideating and replying. Its feature pages also describe paragraph rewrites, proofreading, clarity suggestions and tone adjustments. These are useful when you already have a draft, email or outline and want help improving how it reads before you send or publish it.",
          "Go is positioned as a context-aware assistant that can offer help across a user's workflow, while Grammarly also describes a dedicated Docs writing surface and AI agents. Availability differs by product surface, so a browser-extension workflow should be tested in the browser and applications your team actually uses rather than assumed from a general product page.",
        ],
      },
      {
        heading: "Where it is a good fit—and where human review still matters",
        paragraphs: [
          "Grammarly can be a practical fit for people who write frequent emails, proposals, support replies, internal documents or first drafts and need clearer phrasing, a more appropriate tone or a faster way to revise a paragraph. The value is strongest when it removes small communication friction inside work that already needs to be written.",
          "It should not be used as an unsupervised source of facts, policy advice, legal interpretation, medical guidance or original research. A fluent rewrite can still be inaccurate, omit an important condition or use the wrong level of confidence. Keep the final decision with the writer, verify factual claims against primary sources and follow your organization's data-handling rules before entering sensitive content.",
        ],
      },
      {
        heading: "Use this evaluation checklist before paying",
        paragraphs: [
          "Run a short trial using three real writing tasks: a customer email, a longer document and a revision of existing text. Ask the person responsible for approving the final wording to compare the result with their normal workflow. This is more useful than judging a single generated sentence in isolation.",
        ],
        bullets: [
          "Check that the relevant feature is available in the browser, desktop app, mobile app or Docs surface your team uses.",
          "Test whether rewrites preserve the intended facts, voice, audience and required terminology.",
          "Review current plan limits, prompt allowances, collaboration options and cancellation terms on Grammarly's official plans page.",
          "Read the current privacy, security and product-improvement controls before entering customer, financial or other sensitive information.",
          "Decide who gives final approval for external messages, and document when source checking is required.",
        ],
      },
      {
        heading: "A safe rollout for a small team",
        paragraphs: [
          "Start with a narrow use case, such as polishing customer-success emails or improving the clarity of internal updates. Give the team a short style guide, define what information must never be pasted into an AI tool and keep a human approval step for anything public. Measure whether revisions become faster and whether the final copy needs fewer manual corrections; do not promise a productivity percentage before you have your own evidence.",
          "If the trial is useful, expand to one additional workflow at a time. This keeps the change easy to reverse and makes it clear whether the benefit comes from the software, a better editorial process or both. Recheck current feature availability and terms before a broader rollout because these details can change.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is GrammarlyGO a separate product from Grammarly?",
        answer:
          "Use the current official wording rather than assuming it is a separate product. Grammarly's current documentation refers to Go and Superhuman Go alongside its other AI writing features. Verify the feature and plan available in the product surface you use.",
      },
      {
        question: "Can Grammarly's AI writing features fact-check my work?",
        answer:
          "No writing assistant should replace source checking. Review every factual claim, number, quote and policy statement against an authoritative source before relying on it in a customer-facing or high-stakes document.",
      },
      {
        question: "Will Go work in every app I use?",
        answer:
          "Grammarly describes Go as working across workflows, but its support documentation lists specific product surfaces for particular features. Test the browser, desktop or Docs workflow you need and confirm current availability before purchasing.",
      },
    ],
    sources: [
      {
        label: "Grammarly Support: introducing generative AI assistance",
        href: "https://support.grammarly.com/hc/en-us/articles/14528857014285-Introducing-generative-AI-assistance",
      },
      {
        label: "Grammarly product features",
        href: "https://www.grammarly.com/features",
      },
      {
        label: "Grammarly plans",
        href: "https://www.grammarly.com/plans",
      },
      {
        label: "Grammarly Trust Center",
        href: "https://www.grammarly.com/trust",
      },
    ],
  },
};

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
  relatedLinks?: Array<{ label: string; href: string }>;
}

/**
 * Long-form tool guidance is kept outside the directory record so the short
 * tool-card contract remains stable as individual high-intent pages expand.
 */
export const toolGuides: Record<string, ToolGuide> = {
  "surfer-seo": {
    displayTitle: "Surfer SEO Review: Content Editor, Audit and Workflow Guide",
    metaTitle: "Surfer SEO Review: Content Editor and Audit Guide",
    metaDescription:
      "Evaluate Surfer SEO's Content Editor, audits, internal-link workflow, plan limits and fit for a practical content team before subscribing.",
    summary:
      "Surfer SEO is a search-content workflow for researching a query, preparing or refreshing a draft, reviewing optimization guidance and monitoring selected pages. It can make an editorial process more consistent, but its scores are inputs for a human editor—not evidence that a page will rank.",
    sections: [
      {
        heading: "What Surfer SEO is designed to do",
        paragraphs: [
          "Surfer's current documentation positions Content Editor as the central writing and optimization workspace. A user starts with a target query, location and language, then reviews competitors and receives guidance on structure, terms and coverage while writing. The editor can be used manually or alongside Surfer's AI-assisted generation features. That makes it relevant to teams that want research, drafting and optimization checks in one repeatable process.",
          "The product also covers work after publication. Surfer documents page-level Audit and Content Audit workflows for finding pages that may need attention, reviewing content and internal-link opportunities, and bringing selected pages back into Content Editor. This broader workflow matters when a team has an existing content library; publishing more articles is rarely as valuable as maintaining pages that already earn impressions.",
        ],
      },
      {
        heading: "How Content Editor should fit into an editorial process",
        paragraphs: [
          "Begin with search intent and primary sources before opening an optimization tool. Write down the reader's question, the decision the page should support and the evidence required. Then create a Content Editor using the main query and the correct search location. Review the proposed competitors because a high-ranking marketplace, forum or reference site may serve a different purpose from the page you need to create.",
          "Use the terms and questions as prompts for coverage, not as a checklist to repeat mechanically. A recommendation is useful when it reveals a missing explanation, comparison factor or reader concern. Reject it when it adds a claim you cannot verify, pulls the draft away from its purpose or makes the writing unnatural. The final page still needs clear headings, original judgment, accurate examples, source links and a useful next step.",
        ],
      },
      {
        heading: "Audit, internal links and published-page maintenance",
        paragraphs: [
          "Surfer's Audit documentation explains that page analysis includes the wider page body, not only the draft inside Content Editor. This is useful because navigation, repeated template text and internal links can affect what the tool sees. It also means two scores may differ without either being a simple error. Treat the explanation behind a recommendation as more important than moving a number upward.",
          "Surfer also documents an internal-link workflow that can use Google Search Console data to find relevant pages and proposed anchor text. Review every suggestion before inserting it. Internal links should help a reader move from a broad topic to a specific tool, comparison or tutorial; adding many weak links solely to change a score can make a page less useful and harder to maintain.",
        ],
      },
      {
        heading: "Who should consider Surfer—and who may not need it",
        paragraphs: [
          "Surfer can suit an SEO consultant, publisher or content team that produces or refreshes search-focused pages regularly and wants a shared optimization process. It is easier to justify when several writers need consistent briefs, editors need a repeatable review step, or an established site has enough Search Console data to prioritize updates.",
          "A small site publishing occasionally may get more value first from Search Console, careful SERP review, primary-source research and a simple editorial checklist. Surfer does not replace technical SEO, backlinks, product expertise, user testing or distribution. If the bottleneck is weak authority or an unclear offer, another scoring tool will not solve the underlying problem by itself.",
        ],
      },
      {
        heading: "A practical seven-day evaluation",
        paragraphs: [
          "Surfer's official pricing information currently describes a seven-day Pro trial for new accounts, while plan names, prices and limits vary. Before starting, choose one underperforming page with existing impressions and one new brief. Record the current query, position range, page goal and publishing workflow so the trial has a baseline.",
          "Use the first task to refresh the existing page and the second to test a new Content Editor. Track how long research takes, how many suggestions survive editorial review, whether internal links are genuinely relevant and whether the final copy is clearer. Do not judge SEO results after a few days; evaluate workflow quality immediately, then monitor search performance separately over a longer period.",
        ],
        bullets: [
          "Confirm the current plan price, document allowance, AI usage and workspace limits on Surfer's official pricing page.",
          "Use the same country, language and target query that the real page is intended to serve.",
          "Require a source check for every product, pricing, legal, medical, financial or statistical claim.",
          "Keep a copy of the original draft so an editor can review, reject or reverse automated changes.",
          "Measure useful editorial decisions—not only a higher content score.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a high Surfer Content Score guarantee rankings?",
        answer:
          "No. The score reflects Surfer's analysis and guidance for the selected query. Rankings also depend on intent match, accuracy, authority, links, technical quality, competition and other factors outside the editor.",
      },
      {
        question: "Can Surfer SEO write the entire article?",
        answer:
          "Surfer documents both a manual Content Editor workflow and AI-assisted generation. Either route still needs a human editor to verify sources, remove unsupported claims, protect brand voice and confirm that the final page genuinely answers the query.",
      },
      {
        question: "Is Surfer SEO useful for an existing website?",
        answer:
          "It can be, especially when the site has Search Console data and pages that already receive impressions. Test its Audit or Content Audit workflow on one page before connecting a large content library or committing to a higher-volume plan.",
      },
      {
        question: "What should I compare with Clearscope?",
        answer:
          "Compare the quality of the brief, the editor your team prefers, published-page monitoring, integrations, collaboration rules, usage limits and the amount of human review required. Use the same real page in both products for a fair evaluation.",
      },
    ],
    sources: [
      {
        label: "Surfer Content Editor overview",
        href: "https://docs.surferseo.com/en/articles/5700347-content-editor-overview",
      },
      {
        label: "Surfer Content Audit guide",
        href: "https://docs.surferseo.com/en/articles/9182497-content-audit",
      },
      {
        label: "Surfer automated internal-linking guide",
        href: "https://docs.surferseo.com/en/articles/9154320-automated-internal-linking-tool",
      },
      {
        label: "Surfer plans and pricing",
        href: "https://surferseo.com/pricing/",
      },
    ],
    relatedLinks: [
      { label: "Compare Surfer SEO with Clearscope", href: "/compare/surfer-seo-vs-clearscope" },
      { label: "Read the Clearscope workflow guide", href: "/tools/clearscope" },
      { label: "Explore the AI SEO tools category", href: "/categories/seo" },
    ],
  },
  clearscope: {
    displayTitle: "Clearscope Review: Drafts, Content Inventory and Workflow Guide",
    metaTitle: "Clearscope Review: Drafts and Content Inventory Guide",
    metaDescription:
      "Evaluate Clearscope's Drafts, Content Inventory, Google Docs and WordPress workflows, current plan structure and fit for a content team.",
    summary:
      "Clearscope is a content optimization and monitoring platform built around research-led Drafts, editorial integrations and a Content Inventory for published pages. Its recommendations can help a team structure coverage, but they do not replace first-hand expertise, source checking or a clear search strategy.",
    sections: [
      {
        heading: "What Clearscope is designed to do",
        paragraphs: [
          "Clearscope's Draft workflow begins with a target topic and analyzes the current search landscape. Its guidance can surface relevant terms, questions and competing pages while a writer prepares or improves a draft. The useful outcome is a clearer editorial brief: what the reader likely needs, which concepts may be missing and where the draft needs a stronger explanation.",
          "Its Content Inventory addresses a different stage. Clearscope documents connecting Google Search Console, importing published pages and viewing performance information alongside its own content analysis. That gives a team one place to organize a library and identify pages that may deserve a refresh. It does not mean every low grade should be rewritten; business value and actual search data should determine priority.",
        ],
      },
      {
        heading: "How Drafts should be used",
        paragraphs: [
          "Start with a specific query and a one-sentence definition of intent. A comparison page, tutorial and product category may share vocabulary but need different structures. Review the search landscape that Clearscope selects, remove irrelevant competitors and collect primary sources before drafting. This prevents a writer from copying the shape of the results without understanding why people searched.",
          "During editing, use recommended terms as diagnostic clues. If a topic is missing, add a useful explanation supported by evidence. If a term is unrelated to the page's purpose, leave it out. A content grade is most helpful as a consistency check across writers; it is not a reason to add repetitive sentences, imitate a competitor or state an unsupported fact more confidently.",
        ],
      },
      {
        heading: "Google Docs, WordPress and team handoff",
        paragraphs: [
          "Clearscope's official support center documents integrations for Google Docs and WordPress. The Google Docs workflow links a shared Clearscope Draft to a document so recommendations can appear where a writer already works. The WordPress plugin similarly links a Draft to a post inside the CMS. These options can reduce copying between tools, but administrators should review sharing permissions and third-party access before rollout.",
          "For a team, the important test is the handoff: can a strategist create a useful brief, can a writer work without losing context, and can an editor see what changed? Shared access should not bypass the normal approval process. Sensitive client information, unpublished plans and credentials should stay out of a connected document unless the organization's data policy permits it.",
        ],
      },
      {
        heading: "Content Inventory is for prioritization, not automatic rewriting",
        paragraphs: [
          "When a Search Console property is connected, Clearscope says Content Inventory can display search performance alongside page grades and reevaluate imported content over time. This can help separate a page with real impressions from an old URL that has no strategic value. Start with a limited page set so the team understands the data before importing an entire domain.",
          "A useful refresh queue combines several signals: relevant impressions, declining clicks, outdated facts, weak intent alignment and a realistic business outcome. Review the page manually before editing. Sometimes the correct action is a targeted update or stronger internal link; sometimes the page should remain unchanged. Avoid changing dozens of URLs at once because that makes performance effects difficult to diagnose.",
        ],
      },
      {
        heading: "Who should consider Clearscope and how to trial it",
        paragraphs: [
          "Clearscope can fit content teams that want structured briefs, editorial integrations and ongoing library monitoring in the same system. It may be easier to justify when multiple writers and editors share a workflow, when the site already has meaningful Search Console data, or when content maintenance is a recurring responsibility.",
          "Clearscope's official pricing page currently lists a 14-day trial and paid plans with allowances for Drafts, pages and tracked prompts. Because pricing and limits can change, verify the live plan before purchase. During the trial, use one existing page and one new brief, then record the quality of recommendations, editing time, permission setup and the number of suggestions the editor actually accepts.",
        ],
        bullets: [
          "Confirm the current Draft, page, prompt and add-on allowances for the expected monthly workload.",
          "Test the Google Docs or WordPress workflow only if that is where the team genuinely publishes.",
          "Connect Search Console with the minimum access and page scope needed for the pilot.",
          "Review every recommended claim, citation and internal link before publishing.",
          "Evaluate whether the final page is more useful—not merely whether its grade increased.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Clearscope guarantee that content will rank?",
        answer:
          "No. Clearscope can organize research and editorial guidance, but rankings also depend on intent match, evidence, authority, links, technical quality and competition. A grade is not a performance guarantee.",
      },
      {
        question: "Does Clearscope work with Google Docs and WordPress?",
        answer:
          "Clearscope currently documents both a Google Docs add-on and a WordPress plugin. Verify workspace permissions, browser requirements and the current integration instructions before rolling either one out to a team.",
      },
      {
        question: "Do I need to connect Google Search Console?",
        answer:
          "Clearscope recommends a Search Console connection for the most complete Content Inventory insights. Decide whether that monitoring workflow is needed, use appropriate account permissions and begin with a limited pilot.",
      },
      {
        question: "How should I compare Clearscope with Surfer SEO?",
        answer:
          "Use the same target page and query. Compare research quality, editor fit, integrations, published-page monitoring, collaboration, usage limits and review effort rather than relying on a single content score or vendor demonstration.",
      },
    ],
    sources: [
      {
        label: "Clearscope Draft and search-landscape guide",
        href: "https://www.clearscope.io/support/getting-started-content-reports",
      },
      {
        label: "Clearscope Content Inventory guide",
        href: "https://www.clearscope.io/support/getting-started-content-inventory",
      },
      {
        label: "Clearscope Google Docs integration",
        href: "https://www.clearscope.io/support/how-do-i-use-the-google-docs-integration",
      },
      {
        label: "Clearscope plans and pricing",
        href: "https://www.clearscope.io/pricing",
      },
    ],
    relatedLinks: [
      { label: "Compare Clearscope with Surfer SEO", href: "/compare/surfer-seo-vs-clearscope" },
      { label: "Read the Surfer SEO workflow guide", href: "/tools/surfer-seo" },
      { label: "Explore the AI SEO tools category", href: "/categories/seo" },
    ],
  },
  reclaim: {
    displayTitle: "Reclaim: AI calendar planning and time protection guide",
    metaTitle: "Reclaim: AI calendar planning and time protection guide",
    metaDescription:
      "Evaluate Reclaim's AI calendar workflow, version differences, focus time, scheduling rules and a safe trial process before connecting your work calendar.",
    summary:
      "Reclaim is an AI calendar assistant for people who need to balance meetings, focus time, recurring routines and tasks that change during the week. The important question is not whether an AI calendar can fill every empty slot. It is whether its scheduling rules protect the work that matters without making your calendar harder for you and your teammates to understand.",
    sections: [
      {
        heading: "What Reclaim is designed to do",
        paragraphs: [
          "Reclaim's current documentation describes an AI calendar assistant that helps users plan, protect and adapt their time. Its workflow includes a planner, an AI assistant and background agents for focus time, habits, buffers and recurring meetings. It can also connect calendar and task tools so a busy knowledge worker can see work commitments together instead of manually rearranging a week whenever a meeting changes.",
          "The useful benefit is controlled flexibility. Instead of treating every calendar block as equally fixed, you set priorities, preferred hours and rules for flexible work. Reclaim can then suggest or make changes around those preferences. The tool cannot create more time, so the quality of the result depends on realistic working hours, clear priorities and a calendar that reflects your actual commitments.",
        ],
      },
      {
        heading: "Why the Reclaim 1.0 and 2.0 difference matters",
        paragraphs: [
          "Reclaim's official help center currently documents both 1.0 and 2.0 workflows. In 1.0, smart events such as Habits, Tasks and Smart Meetings can be scheduled and rescheduled on the calendar according to priority, availability and due-date rules. This is the behavior many older Reclaim articles and reviews describe.",
          "In 2.0, the product introduces a Planner, Preview Mode, an in-app AI assistant and background agents. Its Tasks documentation specifically says that the newer task workflow centers on AI-assisted prioritization: it recommends work that is relevant now or at risk during protected focus time, rather than creating a calendar event for every task. Confirm the version shown in your own Reclaim profile before relying on a tutorial or buying decision.",
        ],
      },
      {
        heading: "Who should consider it—and who should be cautious",
        paragraphs: [
          "Reclaim can be a practical fit for knowledge workers and teams with calendars that are constantly pulled between meetings, deep work, deadlines and recurring operational routines. It is especially worth testing when manual calendar rearranging is a genuine recurring problem, not merely an occasional inconvenience.",
          "Be cautious if your calendar contains client commitments, regulated data, complex on-call coverage or meetings that must never move without an owner's approval. Automatic scheduling can affect other people. Begin with low-risk focus blocks, buffers or personal routines; only then consider recurring team workflows after the rules and notifications are understood.",
        ],
      },
      {
        heading: "A safe one-week trial",
        paragraphs: [
          "Start with one calendar and choose a small, reversible use case: protect a few weekly focus hours, create one recurring habit or add buffers around meetings. Define working, meeting and personal hours before turning on automation. If your version offers Preview Mode, inspect suggested changes before applying them; this is like checking a draft itinerary before the calendar sends invitations or affects availability.",
          "At the end of the week, review both the calendar and the human experience. Did protected work happen? Were important events moved unexpectedly? Did coworkers understand availability? Keep only the rules that reduced manual coordination. If a rule causes confusion, pause it, adjust the time window or priority, and trial again rather than adding more automation on top of a bad setup.",
        ],
        bullets: [
          "Verify which Reclaim version, calendar connections and task integrations are available to your account.",
          "Set explicit working hours, scheduling windows, priorities and rules for events that must not move.",
          "Use a reversible test first; do not connect a shared or client-critical calendar as the initial experiment.",
          "Check permissions, privacy controls and current plan limits before adding sensitive work data or expanding to a team.",
          "Measure fewer manual reschedules and fewer unwanted moves, not a generic productivity promise.",
        ],
      },
      {
        heading: "What to verify before a team rollout",
        paragraphs: [
          "Before connecting several people, write a small calendar policy: which event types are flexible, who owns scheduling rules, what happens when a client meeting conflicts with focus time and how a person can pause automation. This creates a clear human fallback when the schedule does not match reality.",
          "Also review current integrations, time-zone behavior, notification settings, admin controls, privacy terms and the plan details for your expected team size. Feature availability and product versions can change. A successful personal trial is evidence that the workflow might fit, not proof that a team-wide rollout will work without governance.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Reclaim automatically schedule every task on my calendar?",
        answer:
          "It depends on the version and configuration. Reclaim's 1.0 documentation describes calendar scheduling for Tasks, while its 2.0 Tasks documentation describes AI-assisted prioritization during protected focus time instead of an individual calendar event for every task. Check your current app version before configuring a workflow.",
      },
      {
        question: "Can Reclaim move important meetings without my review?",
        answer:
          "Scheduling behavior depends on the priorities, locks and rules you configure. Start with flexible personal blocks, define non-movable events clearly and use preview or review controls when they are available. Do not treat automation as a substitute for calendar ownership.",
      },
      {
        question: "Which calendars and task tools can Reclaim connect to?",
        answer:
          "Reclaim's current 2.0 overview lists calendar and task integrations including Google Calendar, Outlook, Todoist, ClickUp, Jira, Asana, Linear and Slack. Confirm current availability, permissions and version support on Reclaim's official documentation before connecting your account.",
      },
    ],
    sources: [
      {
        label: "Reclaim 2.0 overview",
        href: "https://help.reclaim.ai/en/articles/14846468-reclaim-ai-2-0-overview",
      },
      {
        label: "Reclaim 2.0 Tasks overview",
        href: "https://help.reclaim.ai/en/articles/16558552-reclaim-2-0-tasks-overview",
      },
      {
        label: "Reclaim 1.0 feature overview",
        href: "https://help.reclaim.ai/en/articles/6210740-features-in-reclaim",
      },
      {
        label: "How Reclaim manages schedules automatically",
        href: "https://help.reclaim.ai/en/articles/6207587-how-reclaim-manages-your-schedule-automatically",
      },
    ],
  },
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

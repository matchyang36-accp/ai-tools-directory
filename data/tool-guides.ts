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

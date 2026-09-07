export interface ComparisonGuide {
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
 * Long-form comparison guidance lives separately from the short comparison
 * index. That keeps an expanding editorial guide from changing the routing or
 * data contract used by the rest of the directory.
 */
export const comparisonGuides: Record<string, ComparisonGuide> = {
  "surfer-seo-vs-clearscope": {
    metaTitle: "Surfer SEO vs Clearscope: workflow comparison",
    metaDescription:
      "Compare Surfer SEO and Clearscope by writing workflow, SERP research, team fit and the details to verify before choosing.",
    summary:
      "Surfer SEO and Clearscope both help teams plan and improve search-focused content. The useful question is not which one has the better score; it is which workflow gives your team clearer research, better editorial control and a repeatable way to refresh published pages.",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Both products are built around a target query. They analyze the current search landscape and give writers real-time guidance as a draft is developed. Neither score should be treated as a promise of rankings: search results depend on the usefulness of the page, the evidence it contains, technical quality and competition as well as on-page coverage.",
          "Start with the workflow your team already uses. Surfer SEO may be a practical fit when a writer wants to work from a guided Content Editor with competitor research, outlines and optimization steps in one place. Clearscope may be a practical fit when an editorial team wants topic coverage guidance alongside a familiar Google Docs, Microsoft Word or WordPress workflow. Use a trial or product demo with one real brief before committing a team to either process.",
        ],
      },
      {
        heading: "What they have in common",
        paragraphs: [
          "Each tool uses a target topic to study pages that currently rank and turns that research into recommendations for a draft. In practical terms, both can help a writer identify related concepts, likely questions to answer and a sensible way to check topical coverage before publishing.",
          "That overlap makes them useful for teams that have already chosen a topic and need a clearer editorial brief. They are not substitutes for first-hand research, product documentation, original examples or a fact-checking process. A content score can help organize a draft, but it cannot validate a claim in that draft.",
        ],
      },
      {
        heading: "Where the workflow differs",
        paragraphs: [
          "Surfer's official Content Editor documentation describes a workflow that begins with target keywords, location and language choices, then provides writing guidelines, competitor research and optimization feedback in the editor. Its workflow also includes optional templates, internal-linking work and a pre-publish review. This can suit a team that wants a more guided production path around each article.",
          "Clearscope's official documentation describes Drafts that analyze the current search landscape for a query and surface recommended terms, common questions and expected citation sources. Its product materials also emphasize drafting and optimization inside common editorial tools, plus a Content Inventory for monitoring published pages. This can suit a team that wants recommendations to travel with an established writing and review process.",
        ],
      },
      {
        heading: "Use this decision checklist",
        paragraphs: [
          "Run the same brief through both products and have the person who will actually publish the page review the output. Compare the quality of the recommendations, not only the score at the end.",
        ],
        bullets: [
          "Where does the writer prefer to work: a dedicated optimization editor or an existing document workflow?",
          "Does the team need guided research and draft production, or mainly topic coverage recommendations during editing?",
          "Can the tool support your target language, country, team permissions and publishing integrations?",
          "How will the team verify sources, add original experience and reject weak suggestions before publishing?",
          "What are the current plan limits, credits, collaboration rules and cancellation terms for the expected volume?",
        ],
      },
      {
        heading: "A sensible evaluation process",
        paragraphs: [
          "Choose one existing page that is useful but underperforming. Define its search intent, collect the primary sources the article should cite and write down the questions a reader needs answered. Then create a brief in each product using the same target query and location. This keeps the comparison focused on workflow quality rather than on marketing claims.",
          "Ask the editor to review every recommended term and outline change. Keep additions that make the answer clearer, more accurate or more complete. Reject additions that repeat a keyword, introduce claims you cannot source or make the article sound like it was written for a scoring system instead of a reader. Publish only after checking headings, internal links, metadata and the main conversion path.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Surfer SEO or Clearscope guaranteed to improve rankings?",
        answer:
          "No. Both can guide planning and editing, but a score is not a ranking guarantee. Evaluate whether the final page answers the query accurately, adds evidence and is easier for a reader to use.",
      },
      {
        question: "Can a small team use either tool?",
        answer:
          "A small team can start with one live brief and a clear review checklist. Check current plan limits, collaboration features and integrations on each official site before making a purchase decision.",
      },
      {
        question: "What should I compare during a trial?",
        answer:
          "Use the same topic, search location and existing draft in both tools. Compare the clarity of the brief, relevance of recommendations, fit with the writer's workflow and the amount of review work required before publishing.",
      },
    ],
    sources: [
      {
        label: "Surfer Content Editor overview",
        href: "https://docs.surferseo.com/en/articles/5700347-content-editor-overview",
      },
      {
        label: "Clearscope: analyzing the search landscape",
        href: "https://www.clearscope.io/support/getting-started-content-reports",
      },
      {
        label: "Clearscope content optimization platform",
        href: "https://www.clearscope.io/product/optimize",
      },
    ],
  },
};

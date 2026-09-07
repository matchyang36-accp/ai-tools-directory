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
  "midjourney-vs-leonardo": {
    metaTitle: "Leonardo AI vs Midjourney: creative workflow comparison",
    metaDescription:
      "Compare Leonardo AI and Midjourney by image-creation workflow, reference controls, editing needs and the details to verify before choosing.",
    summary:
      "Leonardo AI and Midjourney both turn prompts and reference images into visual work. The most useful comparison is not a universal image-quality score. It is whether the product gives your team the right balance of creative exploration, reference control, editing and handoff for a real project.",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Both tools can start from a text prompt and let a creator iterate on generated images. A good trial uses the same brief, aspect ratio and reference material in each product. Compare whether the final workflow helps a designer make purposeful choices, not only whether one first-generation image looks more dramatic than another.",
          "Midjourney may be a practical fit for creators who want to explore a visual direction, work with personalization or moodboards, and then refine a selected image in its web editor. Leonardo AI may be a practical fit for a workflow that needs prompt or image input, selectable models and dimensions, plus creative tools such as AI Canvas, image-to-image and Blueprints. The right choice depends on the final asset, required control and review process.",
        ],
      },
      {
        heading: "What they have in common",
        paragraphs: [
          "Both products are designed for iterative visual creation. A creator can start with an idea, generate options, retain useful directions and refine them with further instructions or image references. This makes both relevant for concepting, campaign exploration and visual prototypes.",
          "Neither tool removes the need for a creative brief, brand review or rights review. Generated output can vary from run to run, and the safest workflow is to keep approved references, document the intended use of each asset and review output before it is published or used in a customer-facing campaign.",
        ],
      },
      {
        heading: "Where the creative workflows differ",
        paragraphs: [
          "Midjourney's current web documentation describes a Create page, image and style references, Personalization profiles and moodboards. Its Editor can work with Midjourney creations and uploaded images, with tools for changing a canvas, masking an area, adding layers and submitting an edit. This is useful when the creative process moves from broad exploration into deliberate iteration on a selected visual direction.",
          "Leonardo AI's current product and help materials describe prompt or image input, the ability to choose a model, dimensions and styles, plus tools such as AI Canvas, image-to-image and Blueprints. The help center also describes using reference images and adjusting image-guidance strength. This is useful when a team wants to evaluate several creative controls inside one generation workflow.",
        ],
      },
      {
        heading: "Use this decision checklist",
        paragraphs: [
          "Use a real project brief rather than an abstract prompt. Keep the image goal, target channel, reference assets and approval criteria identical during the comparison.",
        ],
        bullets: [
          "Do you need broad visual exploration, or repeatable control over a product, character or brand element?",
          "Will the creator work mainly from text, or must they use supplied image and style references?",
          "What editing is required after the first generation: composition changes, object changes, layers, aspect ratio or export?",
          "Can the team review output for brand suitability, factual accuracy and rights before any public use?",
          "Do the current plan, privacy settings, credit limits and commercial-use terms fit the expected volume?",
        ],
      },
      {
        heading: "A fair way to trial both products",
        paragraphs: [
          "Prepare one brief with a specific audience, channel and visual outcome. For example, use one product image, a short brand direction and the exact aspect ratio needed for a campaign placement. Generate several options in both products, then save the prompts and references used so the team can reproduce the experiment later.",
          "Review the results with the person responsible for final approval. Score the workflow against practical questions: how quickly a useful direction emerged, whether the reference material stayed relevant, how much manual editing was required and whether the output can be safely used under the current product terms. Do not treat a single preferred image as proof that one tool is better for every use case.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which tool is better for visual quality?",
        answer:
          "There is no universal winner. Prompt quality, references, model settings, the target style and human review all affect the result. Test the same brief in both products before deciding for your workflow.",
      },
      {
        question: "Can I use my own images as references?",
        answer:
          "Both products describe workflows that accept image references or uploads. Review their current documentation and terms, and make sure you have the right to use any reference image before uploading it.",
      },
      {
        question: "What should a team verify before purchasing?",
        answer:
          "Check the current plan limits, privacy settings, available editing features, integrations, export options and commercial-use terms. These details can change and should be verified on each provider's official site.",
      },
    ],
    sources: [
      {
        label: "Midjourney Editor documentation",
        href: "https://docs.midjourney.com/hc/en-us/articles/32764383466893-Editor",
      },
      {
        label: "Midjourney getting started guide",
        href: "https://docs.midjourney.com/hc/en-us/articles/33329261836941-Getting-Started-Guide",
      },
      {
        label: "Leonardo AI image generator",
        href: "https://www.leonardo.ai/ai-image-generator",
      },
      {
        label: "Leonardo AI image-generation guide",
        href: "https://intercom.help/leonardo-ai/en/articles/8942360-how-to-generate-images-with-leonardo-ai",
      },
    ],
  },
};

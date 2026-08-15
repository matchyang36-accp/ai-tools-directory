import { publishedPosts } from "@/data/published-posts";

// Seed data layer. Swap this module for a D1 query layer later — the getter
// functions (getTools, getToolBySlug, etc.) are the only contract the pages use.

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
}

export interface Tool {
  slug: string;
  name: string;
  category: string; // category slug
  tagline: string;
  description: string;
  pricing: string;
  rating: number; // 0-5
  pros: string[];
  cons: string[];
  website: string; // affiliate link target — replace with your affiliate URLs
  featured?: boolean;
  bestFor: string;
}

export interface Review {
  slug: string;
  title: string;
  excerpt: string;
  readMins: number;
  toolSlug?: string;
  date: string;
  sections?: Array<{
    heading?: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
}

export interface Comparison {
  slug: string;
  title: string;
  a: string; // tool slug
  b: string; // tool slug
}

export const categories: Category[] = [
  {
    slug: "copywriting",
    name: "Copywriting",
    tagline: "AI that writes your ads, emails and blogs",
    description:
      "AI writing assistants that draft marketing copy, product descriptions, ad variants and long-form content in seconds.",
  },
  {
    slug: "seo",
    name: "SEO",
    tagline: "Rank higher with AI-guided optimization",
    description:
      "Content optimization, keyword research and on-page SEO tools powered by AI to help you outrank competitors.",
  },
  {
    slug: "ads-creative",
    name: "Ads & Creative",
    tagline: "Generate ad creatives that convert",
    description:
      "AI platforms that produce scroll-stopping ad creatives, social graphics and campaign assets at scale.",
  },
  {
    slug: "social-media",
    name: "Social Media",
    tagline: "Plan, write and schedule social posts",
    description:
      "Tools to generate captions, repurpose content and auto-schedule posts across every social channel.",
  },
  {
    slug: "email-outreach",
    name: "Email & Outreach",
    tagline: "Personalize and automate cold & warm email",
    description:
      "AI email assistants that write personalized outreach, coach deliverability and automate follow-ups.",
  },
  {
    slug: "image-design",
    name: "Image & Design",
    tagline: "Design assets without a designer",
    description:
      "AI image generators and design tools for logos, thumbnails, product shots and brand kits.",
  },
  {
    slug: "video",
    name: "Video",
    tagline: "Produce videos from text or avatars",
    description:
      "Turn scripts into branded videos with AI avatars, auto-editing and captioning — no camera needed.",
  },
  {
    slug: "chatbots",
    name: "Chatbots",
    tagline: "24/7 AI support and lead capture",
    description:
      "Conversational AI bots for website support, lead qualification and WhatsApp/Instagram automation.",
  },
  {
    slug: "productivity",
    name: "Productivity",
    tagline: "Run your business on autopilot",
    description:
      "AI meeting notes, task automation and planning tools that give small teams superpowers.",
  },
];

export const tools: Tool[] = [
  // ---- Copywriting ----
  {
    slug: "jasper",
    name: "Jasper",
    category: "copywriting",
    tagline: "AI copywriting for marketing teams",
    description:
      "Jasper is an AI writing platform built for marketing teams, with brand voice, campaign workflows and 50+ templates for ads, blogs and emails.",
    pricing: "From $39/mo",
    rating: 4.6,
    pros: ["Strong brand-voice controls", "Team collaboration", "Many templates"],
    cons: ["Pricier than solo tools", "Learning curve for workflows"],
    website: "https://www.jasper.ai",
    featured: true,
    bestFor: "Agencies and in-house marketing teams",
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    category: "copywriting",
    tagline: "Go-to-market copy in one click",
    description:
      "Copy.ai generates sales, marketing and ops copy and now ships workflow automation for repetitive content tasks.",
    pricing: "Free + from $36/mo",
    rating: 4.4,
    pros: ["Generous free tier", "Workflow automation", "Multilingual"],
    cons: ["Long-form needs editing", "UI can feel busy"],
    website: "https://www.copy.ai",
    bestFor: "Founders and SDRs",
  },
  {
    slug: "writesonic",
    name: "Writesonic",
    category: "copywriting",
    tagline: "SEO-optimized articles at scale",
    description:
      "Writesonic writes fact-checked, SEO-ready articles and landing pages, with Chatsonic for real-time search.",
    pricing: "Free + from $16/mo",
    rating: 4.3,
    pros: ["Good SEO article mode", "Affordable", "Bulk generation"],
    cons: ["Tone varies", "Credits run out fast"],
    website: "https://writesonic.com",
    bestFor: "Content marketers on a budget",
  },
  {
    slug: "rytr",
    name: "Rytr",
    category: "copywriting",
    tagline: "Affordable AI writing for everyone",
    description:
      "Rytr is a lightweight, low-cost writing assistant for short-form copy across 40+ use cases and 30+ languages.",
    pricing: "Free + from $9/mo",
    rating: 4.2,
    pros: ["Cheapest on the list", "Simple UI", "Fast"],
    cons: ["Weak long-form", "Limited depth"],
    website: "https://rytr.me",
    bestFor: "Solopreneurs and students",
  },
  {
    slug: "anyword",
    name: "Anyword",
    category: "copywriting",
    tagline: "Copy scored by predicted performance",
    description:
      "Anyword adds a predictive performance score to every variant so you pick copy that converts before you ship it.",
    pricing: "From $39/mo",
    rating: 4.1,
    pros: ["Performance predictions", "A/B variant ideas", "Good for ads"],
    cons: ["Scores are estimates", "Niche use case"],
    website: "https://anyword.com",
    bestFor: "Performance and paid-media teams",
  },
  {
    slug: "wordtune",
    name: "Wordtune",
    category: "copywriting",
    tagline: "Rewrite and refine your writing",
    description:
      "Wordtune helps you rewrite, shorten and adjust tone, with a Spices feature to add facts, examples and counterarguments.",
    pricing: "Free + from $10/mo",
    rating: 4.0,
    pros: ["Great rewriting", "Browser extension", "Tone control"],
    cons: ["Not for full drafts", "Limited languages"],
    website: "https://www.wordtune.com",
    bestFor: "Non-native English writers",
  },
  {
    slug: "grammarlygo",
    name: "GrammarlyGO",
    category: "copywriting",
    tagline: "AI writing inside your everyday apps",
    description:
      "GrammarlyGO brings contextual AI drafting and rewriting to the Grammarly you already use across docs, email and the web.",
    pricing: "Free + from $12/mo",
    rating: 4.2,
    pros: ["Ubiquitous", "Tone + clarity", "Trusted brand"],
    cons: ["Less creative", "Premium for volume"],
    website: "https://www.grammarly.com",
    bestFor: "Everyday business writing",
  },

  // ---- SEO ----
  {
    slug: "surfer-seo",
    name: "Surfer SEO",
    category: "seo",
    tagline: "On-page SEO that ranks",
    description:
      "Surfer analyzes the top-ranking pages for any keyword and gives you a data-backed content outline and real-time optimization score.",
    pricing: "From $69/mo",
    rating: 4.8,
    pros: ["Excellent content scorer", "SERP analyzer", "Clear guidance"],
    cons: ["No keyword research", "Can be formulaic"],
    website: "https://surferseo.com",
    featured: true,
    bestFor: "Content teams chasing rankings",
  },
  {
    slug: "clearscope",
    name: "Clearscope",
    category: "seo",
    tagline: "Enterprise content optimization",
    description:
      "Clearscope is the premium content-grade platform trusted by enterprises for thorough term research and reporting.",
    pricing: "From $170/mo",
    rating: 4.5,
    pros: ["Best-in-class reports", "Google Docs integration", "Trusted by SEOs"],
    cons: ["Expensive", "No free tier"],
    website: "https://www.clearscope.io",
    bestFor: "Enterprise content ops",
  },
  {
    slug: "frase",
    name: "Frase",
    category: "seo",
    tagline: "Research, write and optimize in one",
    description:
      "Frase turns a keyword into a full brief, draft and optimized article, with answering-engine features for AEO.",
    pricing: "From $15/mo",
    rating: 4.3,
    pros: ["Brief + write + optimize", "Affordable", "Answer engine"],
    cons: ["UI slower", "Support limited"],
    website: "https://www.frase.io",
    bestFor: "Freelance SEO writers",
  },
  {
    slug: "neuronwriter",
    name: "NeuronWriter",
    category: "seo",
    tagline: "Semantic SEO on a budget",
    description:
      "NeuronWriter scores content against NLP terms and competitor intent, with a generous credit model for small teams.",
    pricing: "From $19/mo",
    rating: 4.2,
    pros: ["Great value", "NLP term suggestions", "Plenty of credits"],
    cons: ["Clunky UI", "Reporting basic"],
    website: "https://neuronwriter.com",
    bestFor: "Small agencies",
  },
  {
    slug: "se-ranking",
    name: "SE Ranking",
    category: "seo",
    tagline: "All-in-one SEO toolkit",
    description:
      "SE Ranking bundles rank tracking, site audit, keyword research and a content editor with AI writing baked in.",
    pricing: "From $49/mo",
    rating: 4.4,
    pros: ["Full toolkit", "Competitive pricing", "AI writer"],
    cons: ["Jack of all trades", "Data lag"],
    website: "https://seranking.com",
    bestFor: "Agencies managing many sites",
  },
  {
    slug: "alli-ai",
    name: "Alli AI",
    category: "seo",
    tagline: "Automate technical SEO fixes",
    description:
      "Alli AI deploys sitewide SEO optimizations and isolated tests automatically, great for large catalogs and templates.",
    pricing: "From $299/mo",
    rating: 3.9,
    pros: ["Automated fixes", "Scales to big sites", "A/B testing"],
    cons: ["Pricey", "Risky auto-changes"],
    website: "https://www.alli.ai",
    bestFor: "Ecommerce and enterprise",
  },
  {
    slug: "outranking",
    name: "Outranking",
    category: "seo",
    tagline: "SEO content with strategy",
    description:
      "Outranking plans content around clusters and intent, then drafts and optimizes with a focus on ranking speed.",
    pricing: "From $29/mo",
    rating: 4.0,
    pros: ["Content strategy view", "Good optimizer", "Concepts feature"],
    cons: ["Slow generation", "Steeper learning"],
    website: "https://www.outranking.io",
    bestFor: "SEO strategists",
  },

  // ---- Ads & Creative ----
  {
    slug: "adcreative-ai",
    name: "AdCreative.ai",
    category: "ads-creative",
    tagline: "Convert-performing ad creatives",
    description:
      "AdCreative.ai generates hundreds of ad creatives and scores them by predicted conversion, with direct ad-platform push.",
    pricing: "From $29/mo",
    rating: 4.1,
    pros: ["Fast creative variants", "Performance scores", "Integrates with ads"],
    cons: ["Templates feel similar", "Credits limited"],
    website: "https://www.adcreative.ai",
    bestFor: "Paid-media buyers",
  },
  {
    slug: "predis-ai",
    name: "Predis.ai",
    category: "ads-creative",
    tagline: "Social creatives & competitor analysis",
    description:
      "Predis.ai creates social posts, carousels and videos and analyzes competitors' social performance for inspiration.",
    pricing: "Free + from $29/mo",
    rating: 4.0,
    pros: ["Carousel + video", "Competitor insights", "Easy"],
    cons: ["Video quality mixed", "Branding limits"],
    website: "https://predis.ai",
    bestFor: "Social media managers",
  },
  {
    slug: "madgicx",
    name: "Madgicx",
    category: "ads-creative",
    tagline: "AI growth for Meta & Google ads",
    description:
      "Madgicx combines creative generation, audience insights and autonomous bidding optimization for ad accounts.",
    pricing: "From $32/mo",
    rating: 4.0,
    pros: ["Full ad suite", "Autonomous optimization", "Creative insights"],
    cons: ["Overwhelming", "Best on Meta"],
    website: "https://madgicx.com",
    bestFor: "DTC brands",
  },
  {
    slug: "creatopy",
    name: "Creatopy",
    category: "ads-creative",
    tagline: "Design and animate ad sets",
    description:
      "Creatopy is a design automation tool for producing resize-ready, animated ad sets across formats and platforms.",
    pricing: "From $17/mo",
    rating: 3.9,
    pros: ["Design automation", "Animations", "Resizing"],
    cons: ["Not AI-native copy", "Credit caps"],
    website: "https://www.creatopy.com",
    bestFor: "In-house design teams",
  },
  {
    slug: "pencil",
    name: "Pencil",
    category: "ads-creative",
    tagline: "Predict which ads will win",
    description:
      "Pencil generates and predicts ad performance using your past creative data to forecast winners before spend.",
    pricing: "From $49/mo",
    rating: 3.8,
    pros: ["Predictive scoring", "Creative analytics", "Templates"],
    cons: ["Needs history", "Limited free"],
    website: "https://pencil.io",
    bestFor: "Performance creative teams",
  },

  // ---- Social Media ----
  {
    slug: "ocoya",
    name: "Ocoya",
    category: "social-media",
    tagline: "AI captions + scheduling",
    description:
      "Ocoya writes captions and creates graphics, then schedules them across all major social networks from one place.",
    pricing: "Free + from $15/mo",
    rating: 4.0,
    pros: ["Caption + design + schedule", "Many channels", "Affordable"],
    cons: ["Design depth limited", "Bulk quirks"],
    website: "https://www.ocoya.com",
    bestFor: "Solopreneurs",
  },
  {
    slug: "lately",
    name: "Lately",
    category: "social-media",
    tagline: "Turn long content into social posts",
    description:
      "Lately uses AI to atomize blogs, videos and podcasts into on-brand social posts that already perform well.",
    pricing: "From $49/mo",
    rating: 3.9,
    pros: ["Content repurposing", "Performance-based", "Brand voice"],
    cons: ["Higher price", "Learning curve"],
    website: "https://lately.ai",
    bestFor: "Content-heavy brands",
  },
  {
    slug: "buffer",
    name: "Buffer",
    category: "social-media",
    tagline: "Simple scheduling + AI assistant",
    description:
      "Buffer is the friendly scheduler now with an AI assistant for post ideas, rewrites and optimal timing.",
    pricing: "Free + from $6/mo",
    rating: 4.3,
    pros: ["Easy", "Free tier", "AI suggestions"],
    cons: ["Basic analytics", "Fewer channels on free"],
    website: "https://buffer.com",
    bestFor: "Small teams and creators",
  },
  {
    slug: "metricool",
    name: "Metricool",
    category: "social-media",
    tagline: "Analytics + scheduling + AI",
    description:
      "Metricool schedules posts and unifies analytics across social, web and ads, with AI post generation included.",
    pricing: "Free + from $18/mo",
    rating: 4.2,
    pros: ["Strong analytics", "Competitive price", "Multi-platform"],
    cons: ["UI dense", "AI basic"],
    website: "https://metricool.com",
    bestFor: "Data-driven social teams",
  },
  {
    slug: "postplanner",
    name: "Post Planner",
    category: "social-media",
    tagline: "Find & post viral content",
    description:
      "Post Planner surfaces trending content in your niche and helps you post it with AI-written commentary.",
    pricing: "From $7/mo",
    rating: 3.7,
    pros: ["Content discovery", "Cheap", "Quick"],
    cons: ["Dated UI", "Limited AI"],
    website: "https://www.postplanner.com",
    bestFor: "Local businesses",
  },

  // ---- Email & Outreach ----
  {
    slug: "smartwriter",
    name: "Smartwriter",
    category: "email-outreach",
    tagline: "Personalized cold emails at scale",
    description:
      "Smartwriter auto-researches prospects and writes hyper-personalized cold emails and LinkedIn messages in bulk.",
    pricing: "From $49/mo",
    rating: 4.0,
    pros: ["Deep personalization", "LinkedIn + email", "Bulk"],
    cons: ["Occasional misfires", "Credits cap"],
    website: "https://www.smartwriter.ai",
    bestFor: "B2B lead gen",
  },
  {
    slug: "lavender",
    name: "Lavender",
    category: "email-outreach",
    tagline: "Write emails that get replies",
    description:
      "Lavender is an AI email coach that scores your drafts for clarity and reply-likelihood right inside Gmail/Outlook.",
    pricing: "Free + from $12/mo",
    rating: 4.3,
    pros: ["Inbox integration", "Real-time coaching", "Free tier"],
    cons: ["Focused on sales", "Limit on sends"],
    website: "https://www.lavender.ai",
    bestFor: "Sales reps",
  },
  {
    slug: "reply-io",
    name: "Reply.io",
    category: "email-outreach",
    tagline: "Multichannel sales automation",
    description:
      "Reply.io automates email, LinkedIn and calls with AI-generated sequences and a meeting-booking assistant.",
    pricing: "From $60/mo",
    rating: 4.1,
    pros: ["Multichannel", "AI sequences", "Dialer"],
    cons: ["Setup time", "Pricey for solos"],
    website: "https://reply.io",
    bestFor: "Sales orgs",
  },
  {
    slug: "mailchimp",
    name: "Mailchimp",
    category: "email-outreach",
    tagline: "Email marketing with AI",
    description:
      "Mailchimp's IntelliSense writes subject lines and content, with automation and audience tools for small business.",
    pricing: "Free + from $13/mo",
    rating: 4.0,
    pros: ["Brand trust", "Automations", "Free tier"],
    cons: ["Price creeps up", "Templates dated"],
    website: "https://mailchimp.com",
    bestFor: "Small business newsletters",
  },
  {
    slug: "instantly",
    name: "Instantly",
    category: "email-outreach",
    tagline: "Cold email infrastructure",
    description:
      "Instantly runs unlimited cold email at scale with AI writing, deliverability warmup and inbox rotation.",
    pricing: "From $37/mo",
    rating: 4.2,
    pros: ["Deliverability focus", "Unlimited sending", "AI copy"],
    cons: ["Not for newsletters", "Learning curve"],
    website: "https://instantly.ai",
    bestFor: "Agencies doing cold outreach",
  },
  {
    slug: "lemlist",
    name: "Lemlist",
    category: "email-outreach",
    tagline: "Human cold outreach that lands",
    description:
      "Lemlist blends personalized email, LinkedIn and calls with AI copy and a strong deliverability reputation.",
    pricing: "From $59/mo",
    rating: 4.1,
    pros: ["Personalization", "Deliverability", "Multichannel"],
    cons: ["Premium price", "Steeper setup"],
    website: "https://www.lemlist.com",
    bestFor: "Outbound-focused teams",
  },

  // ---- Image & Design ----
  {
    slug: "canva",
    name: "Canva",
    category: "image-design",
    tagline: "Design anything, easily",
    description:
      "Canva's Magic Studio brings AI image generation, resize, edit and brand kits into the design tool millions use daily.",
    pricing: "Free + from $13/mo",
    rating: 4.6,
    pros: ["Ubiquitous", "Magic Studio AI", "Templates galore"],
    cons: ["Not pro-grade", "Storage caps"],
    website: "https://www.canva.com",
    featured: true,
    bestFor: "Everyone",
  },
  {
    slug: "designs-ai",
    name: "Designs.ai",
    category: "image-design",
    tagline: "Logos, videos & brand kits",
    description:
      "Designs.ai generates logos, graphics, videos and voiceovers from a single brand brief for quick asset production.",
    pricing: "From $29/mo",
    rating: 3.9,
    pros: ["Full brand kit", "Video + voice", "Fast"],
    cons: ["Stock feel", "Limited control"],
    website: "https://designs.ai",
    bestFor: "New brands",
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    category: "image-design",
    tagline: "Best-in-class image generation",
    description:
      "Midjourney produces the most aesthetically striking AI images, now with web editor and style references.",
    pricing: "From $10/mo",
    rating: 4.5,
    pros: ["Top image quality", "Style control", "Active community"],
    cons: ["No free tier", "Learning curve"],
    website: "https://www.midjourney.com",
    bestFor: "Creatives and agencies",
  },
  {
    slug: "leonardo-ai",
    name: "Leonardo.Ai",
    category: "image-design",
    tagline: "Game & product asset generation",
    description:
      "Leonardo.Ai generates consistent, production-ready assets with fine-tuned models and a robust editing canvas.",
    pricing: "Free + from $10/mo",
    rating: 4.3,
    pros: ["Consistent styles", "Free tier", "Editing tools"],
    cons: ["Credits reset", "GPU queues"],
    website: "https://leonardo.ai",
    bestFor: "Game and product teams",
  },
  {
    slug: "adobe-firefly",
    name: "Adobe Firefly",
    category: "image-design",
    tagline: "Commercially safe AI imaging",
    description:
      "Firefly powers generative fill and recolor inside Adobe apps, trained on licensed data for commercial use.",
    pricing: "Free + from $10/mo",
    rating: 4.2,
    pros: ["Commercially safe", "In Creative Cloud", "Generative fill"],
    cons: ["Needs Adobe sub", "Less wild"],
    website: "https://www.adobe.com/products/firefly.html",
    bestFor: "Designers on Adobe",
  },
  {
    slug: "looka",
    name: "Looka",
    category: "image-design",
    tagline: "AI logo & brand identity",
    description:
      "Looka generates a full brand identity — logo, palette, fonts and social kits — from a few style choices.",
    pricing: "From $20 one-time",
    rating: 3.9,
    pros: ["Full brand kit", "Cheap", "Fast"],
    cons: ["Generic at times", "Limited edits"],
    website: "https://looka.com",
    bestFor: "Startups needing a logo",
  },
  {
    slug: "khroma",
    name: "Khroma",
    category: "image-design",
    tagline: "AI color palette generator",
    description:
      "Khroma learns the colors you like and generates unlimited palettes and combinations for design systems.",
    pricing: "Free",
    rating: 3.7,
    pros: ["Free", "Personalized", "Useful"],
    cons: ["Narrow use", "Web only"],
    website: "https://www.khroma.co",
    bestFor: "Designers picking colors",
  },

  // ---- Video ----
  {
    slug: "heygen",
    name: "HeyGen",
    category: "video",
    tagline: "AI avatar videos from text",
    description:
      "HeyGen turns scripts into polished spokesperson videos with realistic avatars and instant translation to 40+ languages.",
    pricing: "Free + from $29/mo",
    rating: 4.7,
    pros: ["Realistic avatars", "Video translation", "Easy"],
    cons: ["Avatar limits", "Credits"],
    website: "https://www.heygen.com",
    featured: true,
    bestFor: "Marketing & L&D teams",
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    category: "video",
    tagline: "Enterprise AI video platform",
    description:
      "Synthesia is the enterprise standard for avatar videos, with 160+ avatars, templates and security compliance.",
    pricing: "From $29/mo",
    rating: 4.5,
    pros: ["Enterprise-ready", "Many avatars", "Templates"],
    cons: ["Higher tiers pricey", "Less creative freedom"],
    website: "https://www.synthesia.io",
    bestFor: "Large companies",
  },
  {
    slug: "pictory",
    name: "Pictory",
    category: "video",
    tagline: "Blog & script to video",
    description:
      "Pictory auto-summarizes long content into short branded videos with stock footage, captions and AI voices.",
    pricing: "From $19/mo",
    rating: 4.1,
    pros: ["Content repurposing", "Captions", "Stock library"],
    cons: ["Stock-heavy", "Editing limits"],
    website: "https://pictory.ai",
    bestFor: "Content marketers",
  },
  {
    slug: "descript",
    name: "Descript",
    category: "video",
    tagline: "Edit video by editing text",
    description:
      "Descript lets you edit podcasts and videos like a doc, with overdub, filler-word removal and studio sound.",
    pricing: "Free + from $12/mo",
    rating: 4.4,
    pros: ["Text-based editing", "Overdub", "Great audio tools"],
    cons: ["Render times", "Learning curve"],
    website: "https://www.descript.com",
    bestFor: "Podcasters & editors",
  },
  {
    slug: "runway",
    name: "Runway",
    category: "video",
    tagline: "Generative video & magic tools",
    description:
      "Runway offers Gen-2 video generation plus a deep suite of AI editing effects for filmmakers and creators.",
    pricing: "Free + from $12/mo",
    rating: 4.3,
    pros: ["Cutting-edge gen", "Many effects", "Creative"],
    cons: ["Credits burn", "Can be unpredictable"],
    website: "https://runwayml.com",
    bestFor: "Creative studios",
  },
  {
    slug: "veed",
    name: "VEED",
    category: "video",
    tagline: "Simple online video editor",
    description:
      "VEED is a browser editor with AI subtitles, cleanup and avatar tools aimed at quick social and training videos.",
    pricing: "Free + from $18/mo",
    rating: 4.0,
    pros: ["Easy editor", "Auto subtitles", "Avatar beta"],
    cons: ["Watermark on free", "Export limits"],
    website: "https://www.veed.io",
    bestFor: "Social video creators",
  },
  {
    slug: "luma-dream-machine",
    name: "Luma Dream Machine",
    category: "video",
    tagline: "Realistic AI video from prompts",
    description:
      "Luma's Dream Machine generates highly realistic motion and camera moves from text or images in seconds.",
    pricing: "Free + from $10/mo",
    rating: 4.2,
    pros: ["Photoreal motion", "Fast", "Image-to-video"],
    cons: ["Short clips", "Credits"],
    website: "https://lumalabs.ai/dream-machine",
    bestFor: "Filmmakers experimenting",
  },

  // ---- Chatbots ----
  {
    slug: "intercom-fin",
    name: "Intercom Fin",
    category: "chatbots",
    tagline: "AI support that resolves tickets",
    description:
      "Fin is Intercom's resolution bot that answers from your help content and resolves up to half of support volume.",
    pricing: "From $0.99/resolution",
    rating: 4.3,
    pros: ["High resolution rate", "Trusted platform", "Multilingual"],
    cons: ["Pay per resolution", "Setup needed"],
    website: "https://www.intercom.com",
    bestFor: "Support teams",
  },
  {
    slug: "tidio",
    name: "Tidio",
    category: "chatbots",
    tagline: "Live chat + AI bots for SMBs",
    description:
      "Tidio combines live chat with Lyro, an AI agent that handles common questions and captures leads on your site.",
    pricing: "Free + from $29/mo",
    rating: 4.1,
    pros: ["Easy setup", "Lyro AI", "Affordable"],
    cons: ["Fewer integrations", "Bot limits"],
    website: "https://www.tidio.com",
    bestFor: "Small business websites",
  },
  {
    slug: "chatfuel",
    name: "Chatfuel",
    category: "chatbots",
    tagline: "Messenger & Instagram bots",
    description:
      "Chatfuel builds no-code bots for Meta channels with AI replies, comment automation and lead capture.",
    pricing: "From $15/mo",
    rating: 3.9,
    pros: ["Meta-focused", "No-code", "Comment automation"],
    cons: ["Meta-centric", "Template limits"],
    website: "https://chatfuel.com",
    bestFor: "Ecommerce on social",
  },
  {
    slug: "manychat",
    name: "Manychat",
    category: "chatbots",
    tagline: "Growth tools for messaging",
    description:
      "Manychat automates Instagram, WhatsApp and Messenger with AI flows for comments, DMs and broadcasts.",
    pricing: "Free + from $15/mo",
    rating: 4.0,
    pros: ["Strong IG/WA", "Free tier", "Flow builder"],
    cons: ["Meta policy risk", "Complex flows"],
    website: "https://manychat.com",
    bestFor: "Influencers & DTC",
  },
  {
    slug: "botpress",
    name: "Botpress",
    category: "chatbots",
    tagline: "Developer-grade AI agents",
    description:
      "Botpress is an open, LLM-powered bot platform with a visual builder and deep integrations for technical teams.",
    pricing: "Free + from $0.02/message",
    rating: 4.1,
    pros: ["Powerful", "Open", "Great docs"],
    cons: ["Dev-oriented", "Cost scales"],
    website: "https://botpress.com",
    bestFor: "Engineering teams",
  },
  {
    slug: "drift",
    name: "Drift",
    category: "chatbots",
    tagline: "Conversational marketing",
    description:
      "Drift uses AI to qualify site visitors and book meetings with sales in real time, focused on B2B pipeline.",
    pricing: "Custom",
    rating: 3.8,
    pros: ["Meeting booking", "B2B focus", "Routing"],
    cons: ["Expensive", "Sales-led buying"],
    website: "https://www.drift.com",
    bestFor: "B2B revenue teams",
  },

  // ---- Productivity ----
  {
    slug: "notion-ai",
    name: "Notion AI",
    category: "productivity",
    tagline: "AI inside your workspace",
    description:
      "Notion AI writes, summarizes and answers questions across your docs and databases, all in one workspace.",
    pricing: "From $10/mo",
    rating: 4.3,
    pros: ["Context-aware", "In workspace", "Q&A over docs"],
    cons: ["Needs Notion", "Credit limits"],
    website: "https://www.notion.so/product/ai",
    bestFor: "Teams on Notion",
  },
  {
    slug: "motion",
    name: "Motion",
    category: "productivity",
    tagline: "AI calendar & task automation",
    description:
      "Motion auto-schedules your tasks and meetings into the optimal slots, defending focus time automatically.",
    pricing: "From $19/mo",
    rating: 4.0,
    pros: ["Smart scheduling", "Time blocking", "Cross-device"],
    cons: ["Pushy auto-sort", "Price"],
    website: "https://www.usemotion.com",
    bestFor: "Busy founders",
  },
  {
    slug: "reclaim",
    name: "Reclaim",
    category: "productivity",
    tagline: "Defend your time automatically",
    description:
      "Reclaim auto-schedules habits, tasks and meetings around your priorities, and adapts when plans change.",
    pricing: "Free + from $8/mo",
    rating: 4.1,
    pros: ["Adaptive", "Habits", "Google Calendar"],
    cons: ["Google-only", "Setup time"],
    website: "https://reclaim.ai",
    bestFor: "Calendar-heavy teams",
  },
  {
    slug: "taskade",
    name: "Taskade",
    category: "productivity",
    tagline: "AI agents for your projects",
    description:
      "Taskade blends docs, tasks and customizable AI agents that plan and execute work inside your workspace.",
    pricing: "Free + from $8/mo",
    rating: 4.0,
    pros: ["AI agents", "All-in-one", "Affordable"],
    cons: ["Feature sprawl", "UI busy"],
    website: "https://www.taskade.com",
    bestFor: "Small teams",
  },
  {
    slug: "fireflies",
    name: "Fireflies.ai",
    category: "productivity",
    tagline: "Meeting notes on autopilot",
    description:
      "Fireflies records, transcribes and summarizes meetings across Zoom, Meet and Teams, with searchable insights.",
    pricing: "Free + from $10/mo",
    rating: 4.2,
    pros: ["Accurate transcripts", "Search", "Integrations"],
    cons: ["Storage caps", "Bot joins calls"],
    website: "https://fireflies.ai",
    bestFor: "Meeting-heavy teams",
  },
  {
    slug: "otter",
    name: "Otter.ai",
    category: "productivity",
    tagline: "Live notes & summaries",
    description:
      "Otter provides real-time transcription and AI meeting summaries with action items pushed to your tools.",
    pricing: "Free + from $8/mo",
    rating: 4.0,
    pros: ["Live transcription", "Summaries", "Mobile"],
    cons: ["Free minute cap", "Accuracy varies"],
    website: "https://otter.ai",
    bestFor: "Individuals in meetings",
  },
  {
    slug: "mem",
    name: "Mem",
    category: "productivity",
    tagline: "Self-organizing notes",
    description:
      "Mem is an AI note app that auto-links and resurfaces related notes so knowledge stays connected without folders.",
    pricing: "Free + from $8/mo",
    rating: 3.8,
    pros: ["Auto-organized", "Fast capture", "Resurfacing"],
    cons: ["Niche", "Sync limits"],
    website: "https://mem.ai",
    bestFor: "Knowledge workers",
  },
];

const legacyReviews: Review[] = [
  {
    slug: "best-ai-seo-tools-2026",
    title: "Best AI SEO tools in 2026 (tested & ranked)",
    excerpt:
      "We put 9 AI SEO platforms through real content briefs. Here's which actually move rankings — and which just look good in demos.",
    readMins: 5,
    toolSlug: "surfer-seo",
    date: "2026-08-01",
  },
  {
    slug: "free-jasper-alternatives",
    title: "6 free Jasper alternatives worth trying",
    excerpt:
      "Jasper is great but not cheap. These six AI writers deliver real value on a free or near-free plan.",
    readMins: 6,
    toolSlug: "jasper",
    date: "2026-07-28",
  },
  {
    slug: "heygen-vs-synthesia",
    title: "HeyGen vs Synthesia: which avatar video tool wins?",
    excerpt:
      "Both turn scripts into spokesperson videos. We compare avatars, languages, pricing and ease of use head-to-head.",
    readMins: 7,
    toolSlug: "heygen",
    date: "2026-07-22",
  },
  {
    slug: "ai-tools-for-small-business",
    title: "12 AI tools every small business should pilot",
    excerpt:
      "A practical starter stack — support, content, social and admin — that a team of one can run on a shoestring.",
    readMins: 8,
    date: "2026-07-15",
  },
];

export const reviews: Review[] = [...publishedPosts, ...legacyReviews];

export const comparisons: Comparison[] = [
  { slug: "surfer-seo-vs-clearscope", title: "Surfer SEO vs Clearscope", a: "surfer-seo", b: "clearscope" },
  { slug: "jasper-vs-copy-ai", title: "Jasper vs Copy.ai", a: "jasper", b: "copy-ai" },
  { slug: "heygen-vs-synthesia", title: "HeyGen vs Synthesia", a: "heygen", b: "synthesia" },
  { slug: "midjourney-vs-leonardo", title: "Midjourney vs Leonardo.Ai", a: "midjourney", b: "leonardo-ai" },
  { slug: "instantly-vs-lemlist", title: "Instantly vs Lemlist", a: "instantly", b: "lemlist" },
];

// ---- Getter functions (the contract pages depend on) ----
export function getCategories(): Category[] {
  return categories;
}

export function getTools(): Tool[] {
  return tools;
}

export function getToolsByCategory(slug: string): Tool[] {
  return tools.filter((t) => t.category === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function getComparisons(): Comparison[] {
  return comparisons;
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getReviews(): Review[] {
  return reviews;
}

export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}

export function getCategoryCount(slug: string): number {
  return tools.filter((t) => t.category === slug).length;
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}

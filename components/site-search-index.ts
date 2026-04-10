import { CASE_STUDIES } from "@/components/case-studies-data";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";

export type SearchEntry = {
  title: string;
  href: string;
  category: string;
  description: string;
  keywords: string;
};

const STATIC_ENTRIES: SearchEntry[] = [
  {
    title: "Home",
    href: "/",
    category: "Main",
    description:
      "Rawlins Infra Consult — trusted advisory at the intersection of strategy, operations, and technology.",
    keywords:
      "home rawlins consulting strategy operations technology advisory transportation infrastructure landing",
  },
  {
    title: "Capabilities",
    href: "/capabilities",
    category: "Main",
    description:
      "Explore our practice areas: strategy, operations, and technology solutions for complex organizations.",
    keywords:
      "capabilities services strategy operations technology solutions practice areas consulting practice offerings",
  },
  {
    title: "Strategy",
    href: "/capabilities#strategy",
    category: "Capabilities",
    description:
      "Decision systems, planning, and organizational design that turn priorities into measurable results.",
    keywords:
      "strategy strategic planning decision systems organizational design governance frameworks leadership priorities roadmap",
  },
  {
    title: "Operations",
    href: "/capabilities#operations",
    category: "Capabilities",
    description:
      "People, process, culture, and workforce programs that foster accountability and high performance.",
    keywords:
      "operations people process culture workforce organizational change management performance accountability efficiency",
  },
  {
    title: "Technology",
    href: "/capabilities#technology",
    category: "Capabilities",
    description:
      "Human-centric AI integration, data governance, and analytics that advance how organizations use information.",
    keywords:
      "technology ai artificial intelligence data governance analytics automation integration digital information systems",
  },
  {
    title: "Advanced Air Mobility & UAS",
    href: "/capabilities/technology/advanced-air-mobility",
    category: "Technology",
    description:
      "Planning, implementation, and integration of advanced air mobility and uncrewed aircraft systems.",
    keywords:
      "advanced air mobility aam uas uncrewed aircraft systems drones evtol airspace multimodal transport aviation",
  },
  {
    title: "Data Governance, Automation & AI",
    href: "/capabilities/technology/automation-integration",
    category: "Technology",
    description:
      "Data governance, automation, and AI capabilities that help people work smarter and organizations thrive.",
    keywords:
      "data governance automation ai artificial intelligence workflow integration analytics digital transformation efficiency smarter",
  },
  {
    title: "About",
    href: "/#story",
    category: "Main",
    description:
      "Who we are: the story behind Rawlins and our approach to advising organizations.",
    keywords: "about who we are story company history mission values",
  },
  {
    title: "Our People",
    href: "/about/our-people",
    category: "About",
    description:
      "Meet the Rawlins team — experts in strategy, operations, and technology across sectors.",
    keywords:
      "our people team members experts meet the team leadership advisors staff profiles biography bio",
  },
  {
    title: "Areas We Serve",
    href: "/about/areas-we-serve",
    category: "About",
    description:
      "The sectors and regions where Rawlins partners with public and private organizations.",
    keywords:
      "areas we serve sectors regions global transportation infrastructure public private states coverage map",
  },
  {
    title: "Insights",
    href: "/insights",
    category: "Main",
    description:
      "Thought leadership, podcasts, and case studies from the Rawlins team.",
    keywords:
      "insights research perspectives thought leadership podcast case studies articles content library",
  },
  {
    title: "Thought Leadership",
    href: "/insights/thought-leadership",
    category: "Insights",
    description:
      "Expert perspectives and practical insights from Rawlins advisors on complex challenges.",
    keywords:
      "thought leadership articles expert perspectives practical insights research advisors writing essays",
  },
  {
    title: "The Rawlins Way — Podcast",
    href: "/insights/podcast",
    category: "Insights",
    description:
      "Candid conversations about the real challenges facing transportation agencies and complex organizations.",
    keywords:
      "podcast rawlins way conversations transportation agencies leaders interviews audio listen episodes listen in learn more lead better",
  },
  {
    title: "Case Studies",
    href: "/insights/case-studies",
    category: "Insights",
    description:
      "Detailed accounts of how we've helped agencies modernize and deliver measurable results.",
    keywords:
      "case studies projects engagements results impact examples portfolio client work proven",
  },
  {
    title: "Careers",
    href: "/careers",
    category: "Main",
    description:
      "Join Rawlins. We connect with thoughtful, driven professionals who create meaningful impact.",
    keywords:
      "careers jobs hiring employment open positions work opportunities join us",
  },
  {
    title: "Contact",
    href: "/contact",
    category: "Main",
    description:
      "Get in touch with the Rawlins team to start a conversation.",
    keywords:
      "contact get in touch email phone address message form reach out conversation",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    category: "Legal",
    description: "How Rawlins handles personal information and site data.",
    keywords: "privacy policy personal data information legal",
  },
  {
    title: "Terms of Service",
    href: "/terms-of-service",
    category: "Legal",
    description: "Terms governing use of the Rawlins website and services.",
    keywords: "terms of service conditions legal agreement website",
  },
  {
    title: "Accessibility",
    href: "/accessibility",
    category: "Legal",
    description: "Our commitment to accessibility and inclusive design.",
    keywords: "accessibility wcag inclusive design a11y compliance",
  },
];

const CASE_STUDY_ENTRIES: SearchEntry[] = CASE_STUDIES.map((cs) => {
  const projectTitles = cs.projects?.map((p) => p.title).join(" ") || "";
  const descriptions = cs.projects?.map((p) => p.description || "").join(" ") || "";
  return {
    title: cs.title,
    href: `/insights/case-studies/${cs.slug}`,
    category: "Case Study",
    description: cs.description || cs.subtitle || "Case study from the Rawlins team.",
    keywords: `case study ${cs.title} ${cs.subtitle || ""} ${projectTitles} ${descriptions} ${cs.clientInfo?.services || ""} ${cs.clientInfo?.location || ""}`.toLowerCase(),
  };
});

const TL_ENTRIES: SearchEntry[] = THOUGHT_LEADERSHIP.map((a) => {
  const contentText = a.content
    ?.map((b) => b.text || (b.items ? b.items.join(" ") : ""))
    .filter(Boolean)
    .join(" ") || "";
  return {
    title: a.title,
    href: `/insights/thought-leadership/${a.slug}`,
    category: "Article",
    description: a.subtitle || a.excerpt || "Thought leadership article.",
    keywords: `article ${a.title} ${a.subtitle || ""} ${a.category || ""} ${a.author || ""} ${a.authorRole || ""} ${a.excerpt || ""} ${contentText}`.toLowerCase().slice(0, 2000),
  };
});

export const SEARCH_INDEX: SearchEntry[] = [
  ...STATIC_ENTRIES,
  ...CASE_STUDY_ENTRIES,
  ...TL_ENTRIES,
];

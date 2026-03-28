import type { Metadata } from "next";
import ThoughtLeadershipArticlePage from "@/components/thought-leadership-article";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";

const article = THOUGHT_LEADERSHIP.find(
  (a) => a.slug === "minimizing-data-governance-fatigue-2"
)!;

export const metadata: Metadata = {
  title: `${article.title} — Thought Leadership — Rawlins`,
  description: article.excerpt,
};

export default function Page() {
  return <ThoughtLeadershipArticlePage article={article} />;
}

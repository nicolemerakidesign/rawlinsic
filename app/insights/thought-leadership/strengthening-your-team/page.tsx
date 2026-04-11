import type { Metadata } from "next";
import ThoughtLeadershipArticlePage from "@/components/thought-leadership-article";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";

const article = THOUGHT_LEADERSHIP.find(
  (a) => a.slug === "strengthening-your-team"
)!;

export const metadata: Metadata = {
  title: `${article.title} — Thought Leadership`,
  description: article.excerpt,
};

export default function Page() {
  return <ThoughtLeadershipArticlePage article={article} />;
}

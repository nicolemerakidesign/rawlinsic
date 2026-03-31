import type { Metadata } from "next";
import ThoughtLeadershipOverview from "@/components/thought-leadership-overview";

export const metadata: Metadata = {
  title: "Thought Leadership",
  description:
    "Expert perspectives and practical insights from the Rawlins team on transportation strategy, technology, data governance, and organizational transformation.",
};

export default function Page() {
  return <ThoughtLeadershipOverview />;
}

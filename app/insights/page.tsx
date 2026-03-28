import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "Insights — Rawlins",
  description:
    "Original research, practitioner perspectives, and real-world case studies from the Rawlins team on organizational transformation, technology, and strategy.",
};

export default function InsightsRoute() {
  return <InsightsPage />;
}

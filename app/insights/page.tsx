import type { Metadata } from "next";
import InsightsPage from "@/components/insights-page";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Ideas, experiences, and stories shaping better decisions from the Rawlins team.",
};

export default function InsightsRoute() {
  return <InsightsPage />;
}

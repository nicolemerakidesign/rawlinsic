import type { Metadata } from "next";
import CaseStudiesOverview from "@/components/case-studies-overview";

export const metadata: Metadata = {
  title: "Case Studies — Rawlins",
  description:
    "Discover how Rawlins has helped transportation agencies across the country implement strategic, high-impact solutions tailored to their unique operational goals.",
};

export default function Page() {
  return <CaseStudiesOverview />;
}

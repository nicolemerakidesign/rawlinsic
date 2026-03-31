import type { Metadata } from "next";
import CaseStudyDetail from "@/components/case-study-detail";
import { CASE_STUDIES } from "@/components/case-studies-data";

const study = CASE_STUDIES.find((s) => s.slug === "north-carolina")!;

export const metadata: Metadata = {
  title: `${study.title} — Case Studies`,
  description: study.description,
};

export default function Page() {
  return <CaseStudyDetail study={study} />;
}

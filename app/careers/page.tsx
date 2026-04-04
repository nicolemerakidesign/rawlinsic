import type { Metadata } from "next";
import CareersPage from "@/components/careers-page";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Rawlins. We are advisors, builders, and problem-solvers working at the intersection of strategy, operations, and technology.",
};

export default function Page() {
  return <CareersPage />;
}

import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "Rawlins — Where Strategy Meets Execution",
  description:
    "Rawlins is a global consultancy at the intersection of strategy, operations, and technology — helping organizations translate ambitious priorities into measurable results.",
};

export default function Page() {
  return <HomePage />;
}

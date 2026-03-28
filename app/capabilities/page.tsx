import type { Metadata } from "next";
import CapabilitiesPage from "@/components/capabilities-page";

export const metadata: Metadata = {
  title: "Capabilities | Rawlins",
  description:
    "Explore our integrated advisory services spanning strategy, operations, and technology—designed for complex organizations navigating transformation.",
};

export default function CapabilitiesRoute() {
  return <CapabilitiesPage />;
}

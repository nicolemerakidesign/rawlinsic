import type { Metadata } from "next";
import AreaWeServeGlobe from "@/components/area-we-serve-globe";

export const metadata: Metadata = {
  title: "Areas We Serve — Rawlins",
  description:
    "Global reach across 28 U.S. states and expanding internationally. Discover where Rawlins is delivering strategy, operations, and technology solutions.",
};

export default function Page() {
  return <AreaWeServeGlobe />;
}

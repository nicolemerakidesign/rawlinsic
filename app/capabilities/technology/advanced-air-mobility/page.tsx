import type { Metadata } from "next";
import siteMetadata from "@/app/metadata.json";
import AAMPage from "@/components/aam-page";

export const metadata: Metadata =
  (siteMetadata as Record<string, Metadata>)["/capabilities/technology/advanced-air-mobility"] ?? {};

export default function AdvancedAirMobilityPage() {
  return <AAMPage />;
}

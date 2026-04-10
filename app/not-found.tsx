import type { Metadata } from "next";
import NotFoundPage from "@/components/not-found-page";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for isn't here. Head back to the Rawlins homepage or explore our capabilities, insights, and team.",
};

export default function NotFound() {
  return <NotFoundPage />;
}

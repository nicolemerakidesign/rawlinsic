import type { Metadata } from "next";
import ContactPage from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact | Rawlins — Trusted Advisor at the Intersection of Strategy, Operations & Technology",
  description:
    "Get in touch with Rawlins. Whether you're ready to engage or simply exploring what's possible, our team is here to listen, advise, and partner with you.",
};

export default function Page() {
  return <ContactPage />;
}

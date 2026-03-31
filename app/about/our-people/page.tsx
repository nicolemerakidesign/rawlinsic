import type { Metadata } from "next";
import TeamPage from "@/components/team-page";

export const metadata: Metadata = {
  title: "Our People",
  description:
    "Meet the 51 accomplished professionals at Rawlins — a global management consulting firm at the intersection of strategy, operations, and technology.",
  openGraph: {
    title: "Our People",
    description:
      "Meet the team driving strategic, operational, and technology transformation across the transportation industry.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/c4zcddt61rtnmmmh8sqtv1fn/dkeher82cub0yp82vsjcz9t9/cfZ06kEF6A_pOkuifk_rD.webp",
    ],
  },
};

export default function OurPeoplePage() {
  return <TeamPage />;
}

import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "OTW — Logiciels et services numériques",
};

export default function Page() {
  return <HomeView />;
}

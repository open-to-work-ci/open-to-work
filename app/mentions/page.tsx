import type { Metadata } from "next";
import { LegalView } from "@/components/pages/LegalView";

export const metadata: Metadata = {
  title: "Mentions légales — OTW",
};

export default function Page() {
  return <LegalView />;
}

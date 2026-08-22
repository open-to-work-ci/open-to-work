import type { Metadata } from "next";
import { LegalView } from "@/components/pages/LegalView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Mentions légales — OTW",
  description: "Mentions légales du site OTW : éditeur, hébergement, propriété intellectuelle et données personnelles.",
  alternates: { canonical: "/mentions" },
};

export default function Page() {
  return <LegalView />;
}

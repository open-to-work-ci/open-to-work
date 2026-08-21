import type { Metadata } from "next";
import { ErrorView } from "@/components/pages/ErrorView";

export const metadata: Metadata = {
  title: "Page introuvable — OTW",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <ErrorView code="404" />;
}

import type { Metadata } from "next";
import { ErrorView } from "@/components/pages/ErrorView";

export const metadata: Metadata = {
  title: "Maintenance en cours — OTW",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return <ErrorView code="maintenance" />;
}

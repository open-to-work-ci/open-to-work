import type { Metadata } from "next";
import { AgencyView } from "@/components/pages/AgencyView";

export const metadata: Metadata = {
  title: "L'agence — OTW",
};

export default function Page() {
  return <AgencyView />;
}

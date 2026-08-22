import type { Metadata } from "next";
import { AgencyView } from "@/components/pages/AgencyView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "L'agence — OTW",
  description:
    "OTW est un studio logiciel. Nous construisons, hébergeons et faisons vivre les outils dont les entreprises ont besoin pour travailler — et nous restons après la mise en service.",
  alternates: { canonical: "/agence" },
};

export default function Page() {
  return <AgencyView />;
}

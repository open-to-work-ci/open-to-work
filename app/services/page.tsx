import type { Metadata } from "next";
import { ServicesView } from "@/components/pages/ServicesView";

export const metadata: Metadata = {
  title: "Services — OTW",
};

export default function Page() {
  return <ServicesView />;
}

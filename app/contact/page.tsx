import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Contact — OTW",
};

export default function Page() {
  return <ContactView />;
}

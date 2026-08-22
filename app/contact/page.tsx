import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact — OTW",
  description: "Un membre de l'équipe technique vous répond sous 24 heures ouvrées. Votre message ne part pas à un service commercial.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactView />;
}

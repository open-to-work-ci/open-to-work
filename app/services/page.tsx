import type { Metadata } from "next";
import { ServicesView } from "@/components/pages/ServicesView";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICES } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services — OTW",
  description:
    "Nous couvrons tout ce qui touche à votre logiciel : le construire, l'héberger, le faire évoluer. Vous n'avez qu'un interlocuteur, et il connaît votre dossier.",
  alternates: { canonical: "/services" },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.short,
      url: absoluteUrl(`/service/${s.slug}`),
    },
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <ServicesView />
    </>
  );
}

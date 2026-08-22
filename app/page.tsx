import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "OTW — Logiciels et services numériques",
  description:
    "Sites web, applications mobile, hébergement et logiciels de gestion. Une seule équipe, du premier atelier jusqu'au fonctionnement quotidien.",
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <HomeView />
    </>
  );
}

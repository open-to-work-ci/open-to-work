import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/pages/ServiceDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICES } from "@/lib/data";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service — OTW" };
  return {
    title: `${service.title} — OTW`,
    description: service.lead,
    alternates: { canonical: `/service/${service.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.lead,
    url: absoluteUrl(`/service/${service.slug}`),
    provider: { "@type": "Organization", name: SITE_NAME },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(`/service/${service.slug}`) },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ServiceDetailView service={service} others={others} />
    </>
  );
}

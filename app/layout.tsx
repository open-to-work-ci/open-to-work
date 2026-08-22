import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppChrome } from "@/components/site/AppChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";
import "./globals.css";

const DEFAULT_DESCRIPTION =
  "OTW est un studio logiciel : sites et plateformes web, applications mobile, hébergement et infrastructure, logiciels de gestion, conseil et cadrage.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OTW — Logiciels et services numériques",
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: "OTW — Logiciels et services numériques",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/assets/logo-otw.png"),
  email: CONTACT_EMAIL,
  // TODO(otw-contact): ajouter telephone / address une fois les vraies coordonnées connues.
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <JsonLd data={organizationSchema} />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}

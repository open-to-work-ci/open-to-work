import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppChrome } from "@/components/site/AppChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "OTW — Logiciels et services numériques",
  description:
    "OTW est un studio logiciel : sites et plateformes web, applications mobile, hébergement et infrastructure, logiciels de gestion, conseil et cadrage.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}

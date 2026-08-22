/* Constantes SEO partagées — layout, sitemap, robots.txt, JSON-LD et
   Open Graph par défaut s'y réfèrent tous, pour ne garder le domaine
   qu'à un seul endroit. */

export const SITE_URL = "https://www.otw.ci";
export const SITE_NAME = "OTW";
export const CONTACT_EMAIL = "contact@otw.ci";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

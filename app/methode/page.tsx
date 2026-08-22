import type { Metadata } from "next";
import { MethodView } from "@/components/pages/MethodView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Notre méthode — OTW",
  description:
    "Quatre phases, un livrable écrit à chaque fois, et une version utilisable toutes les deux semaines. Vous décidez de continuer, ou non, à la fin de chacune.",
  alternates: { canonical: "/methode" },
};

export default function Page() {
  return <MethodView />;
}

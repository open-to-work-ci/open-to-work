import type { Metadata } from "next";
import { MethodView } from "@/components/pages/MethodView";

export const metadata: Metadata = {
  title: "Notre méthode — OTW",
};

export default function Page() {
  return <MethodView />;
}

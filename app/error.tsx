"use client";

import { useEffect } from "react";
import { ErrorView } from "@/components/pages/ErrorView";

/**
 * Limite de segment App Router pour les erreurs de rendu (équivalent de la
 * page 500 statique du design source). `reset` retente le rendu du segment
 * sans recharger toute la page — branché sur le bouton "Réessayer" à la place
 * du window.location.reload() de la source.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorView code="500" retry={reset} />;
}

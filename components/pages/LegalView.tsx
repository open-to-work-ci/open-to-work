"use client";

import { Button } from "@/components/ds";
import { K, Sec } from "@/components/site/ui";

const BLOCKS = [
  {
    t: "Éditeur du site",
    // TODO(otw-contact): remplacer par la vraie valeur avant mise en production
    c: "OTW — Open To Work. Forme juridique, capital, numéro d'immatriculation et siège social à compléter. Responsable de la publication : à compléter.",
  },
  {
    t: "Hébergement",
    // TODO(otw-contact): remplacer par la vraie valeur avant mise en production
    c: "Nom, adresse et coordonnées de l'hébergeur à compléter. Les services que nous exploitons pour nos clients font l'objet de contrats distincts, précisant la localisation des données.",
  },
  {
    t: "Propriété intellectuelle",
    c: "Les logiciels développés pour nos clients leur appartiennent : code source, accès et documentation sont transférés dès le premier jour de la mission. Le contenu de ce site, en revanche, reste la propriété d'OTW.",
  },
  {
    t: "Données personnelles",
    c: "Les informations transmises par le formulaire de contact servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni transmises à des tiers. Vous pouvez demander leur suppression à tout moment à l'adresse de contact indiquée sur ce site.",
  },
  {
    t: "Mesure d'audience",
    c: "Ce site ne dépose aucun traceur publicitaire. La mesure d'audience, si elle est activée, se limite à des statistiques agrégées sans identification individuelle.",
  },
  {
    t: "Illustrations",
    c: "Les visuels de ce site sont des schémas explicatifs, produits par nos soins : ils décrivent notre façon de travailler et l'architecture de nos livraisons. Aucune capture de logiciel client n'y figure. Ce site ne présente pas de références : les missions en cours sont couvertes par des accords de confidentialité.",
  },
];

export function LegalView() {
  return (
    <div>
      <Sec style={{ paddingTop: "calc(var(--nav-h) + clamp(56px,8vw,120px))" }} tight>
        <div className="stack-lg">
          <div data-hero-i>
            <K>Informations légales</K>
          </div>
          <h1 className="h-1" data-split="hero" style={{ maxWidth: "14ch" }}>
            Mentions légales.
          </h1>
          {/* TODO(otw-contact): remplacer par la vraie valeur avant mise en production */}
          <p className="lead" data-hero-i>
            Page à compléter avec les informations d&apos;immatriculation définitives avant mise en production.
          </p>
        </div>
      </Sec>
      <Sec tight style={{ paddingTop: 0 }}>
        <div style={{ display: "grid" }} data-rv>
          {BLOCKS.map((b) => (
            <div key={b.t} data-rvi className="split" style={{ gap: "clamp(24px,4vw,80px)", padding: "clamp(24px,3vw,40px) 0", borderTop: "1px solid var(--border-hairline)" }}>
              <h2 className="h-3" style={{ maxWidth: "18ch" }}>
                {b.t}
              </h2>
              <p className="body">{b.c}</p>
            </div>
          ))}
        </div>
        <div className="row" style={{ marginTop: "var(--space-10)" }}>
          <Button variant="outline" iconRight="arrow-right" href="/contact">
            Nous contacter
          </Button>
        </div>
      </Sec>
    </div>
  );
}

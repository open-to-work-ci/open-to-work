"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { Badge, Button, Checkbox, Icon, Input, Rule, Select, Textarea } from "@/components/ds";
import { K, Sec } from "@/components/site/ui";
import { SERVICES } from "@/lib/data";

export function ContactView() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <Sec style={{ paddingTop: "calc(var(--nav-h) + clamp(56px,8vw,120px))" }} tight>
        <div className="stack-lg">
          <div data-hero-i>
            <K>Contact</K>
          </div>
          <h1 className="h-hero" data-split="hero" style={{ maxWidth: "12ch" }}>
            Parlons de votre projet.
          </h1>
          <p className="lead" data-hero-i>
            Un membre de l&apos;équipe technique vous répond sous 24 heures ouvrées. Votre message ne part pas à un service commercial.
          </p>
        </div>
      </Sec>
      <Sec tight style={{ paddingTop: 0 }}>
        <div
          className="split"
          style={{ "--split-cols": "minmax(0,1.15fr) minmax(0,.85fr)", gap: "clamp(40px,5vw,96px)", alignItems: "start" } as CSSProperties}
        >
          {sent ? (
            <div
              className="stack"
              style={{
                gap: "var(--space-6)",
                padding: "var(--pad-card)",
                background: "var(--surface-brand-subtle)",
                border: "1px solid var(--border-brand)",
                borderRadius: "var(--radius-card)",
                justifyItems: "start",
              }}
            >
              <Icon name="check-check" size={26} style={{ background: "var(--text-brand)" }} />
              <h2 className="h-3">Message reçu.</h2>
              <p className="body">Nous revenons vers vous sous 24 heures ouvrées. Vous pouvez répondre directement à l&apos;accusé de réception envoyé par courriel.</p>
              <Button variant="outline" onClick={() => setSent(false)}>
                Envoyer un autre message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "var(--space-7)" }}>
              <div className="grid-2" style={{ gap: "var(--space-6)" }}>
                <Input label="Votre nom" name="name" placeholder="Prénom et nom" required />
                <Input label="Adresse électronique" name="email" type="email" icon="mail" placeholder="vous@entreprise.com" required />
                <Input label="Entreprise" name="company" placeholder="Nom de votre entreprise" />
                <Input label="Téléphone" name="phone" icon="phone" placeholder="Indicatif et numéro" />
                <Select label="Ce dont vous avez besoin" name="need" options={SERVICES.map((s) => s.title).concat(["Je ne sais pas encore"])} />
                <Select label="Budget envisagé" name="budget" options={["Moins de 30 000 €", "30 000 – 80 000 €", "80 000 – 150 000 €", "Plus de 150 000 €", "À définir ensemble"]} />
              </div>
              <Textarea
                label="Votre projet"
                name="project"
                rows={5}
                placeholder="Que voulez-vous améliorer ? Qu'est-ce qui ne fonctionne pas aujourd'hui ?"
                hint="Quelques lignes suffisent. Plus le contexte est précis, plus notre réponse est utile."
              />
              <Checkbox
                label="J'accepte d'être recontacté par l'équipe OTW"
                description="Vos informations restent chez nous et ne sont transmises à personne."
                defaultChecked
              />
              <Button size="lg" iconRight="arrow-right" style={{ justifySelf: "start" }} type="submit">
                Envoyer le message
              </Button>
            </form>
          )}
          <div className="stack-lg">
            <div
              data-theme="dark"
              className="stack"
              style={{ gap: "var(--space-7)", padding: "var(--pad-card)", background: "var(--gradient-brand)", borderRadius: "var(--radius-card)" }}
            >
              <Badge tone="accent" dot>
                Réponse sous 24 h
              </Badge>
              {(
                [
                  ["mail", "contact@otw.ci"],
                  // TODO(otw-contact): remplacer par la vraie valeur avant mise en production
                  ["phone", "Numéro à compléter"],
                  // TODO(otw-contact): remplacer par la vraie valeur avant mise en production
                  ["map-pin", "Adresse à compléter"],
                ] as [string, string][]
              ).map(([ic, v]) => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                  <Icon name={ic} size={18} style={{ background: "var(--otw-green-200)" }} />
                  <span style={{ font: "var(--fw-medium) var(--text-md)/1.4 var(--font-sans)", color: "#fff" }}>{v}</span>
                </div>
              ))}
              <Rule />
              <span style={{ font: "var(--fw-regular) var(--text-base)/1.6 var(--font-sans)", color: "color-mix(in oklab,#fff 74%,transparent)" }}>
                Vous préférez un appel ? Réservez trente minutes avec un membre de l&apos;équipe technique. Aucun commercial dans la boucle.
              </span>
            </div>
            <div style={{ border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
              <div style={{ padding: "var(--space-6) var(--space-7)", borderBottom: "1px solid var(--border-hairline)" }}>
                <K>Nos délais</K>
              </div>
              {(
                [
                  ["Réponse moyenne", "6 h"],
                  ["Premier échange", "30 min"],
                  ["Devis chiffré", "5 jours"],
                ] as [string, string][]
              ).map(([k, v], i) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "var(--space-6)",
                    padding: "var(--space-6) var(--space-7)",
                    borderTop: i ? "1px solid var(--border-hairline)" : "none",
                  }}
                >
                  <span style={{ font: "var(--fw-regular) var(--text-base)/1.4 var(--font-sans)", color: "var(--text-body)" }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-lg)", letterSpacing: "var(--tracking-display-sm)", color: "var(--text-strong)" }}>
                    {v}
                  </span>
                </div>
              ))}
              <div style={{ padding: "var(--space-5) var(--space-7)", background: "var(--surface-sunken)", borderTop: "1px solid var(--border-hairline)" }}>
                <span style={{ font: "var(--fw-regular) var(--text-sm)/1.55 var(--font-sans)", color: "var(--text-muted)" }}>
                  Accord de confidentialité signé sur demande avant tout échange technique.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Sec>
    </div>
  );
}

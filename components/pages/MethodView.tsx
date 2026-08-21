"use client";

import { Button, Rule } from "@/components/ds";
import { Schema } from "@/components/site/dia";
import { CtaBand, Head, K, Sec, Steps, Wrap } from "@/components/site/ui";
import { PROCESS } from "@/lib/data";

export function MethodView() {
  return (
    <div>
      <Sec style={{ paddingTop: "calc(var(--nav-h) + clamp(60px,9vw,130px))" }} tight>
        <div className="stack-lg">
          <div data-hero-i>
            <K>Notre méthode</K>
          </div>
          <h1 className="h-hero" data-split="hero" style={{ maxWidth: "14ch" }}>
            Comment un projet se déroule.
          </h1>
          <div className="split" style={{ alignItems: "end", gap: "clamp(32px,5vw,90px)" }}>
            <p className="lead" data-hero-i>
              Quatre phases, un livrable écrit à chaque fois, et une version utilisable toutes les deux semaines. Vous décidez de continuer — ou non — à la fin de chacune.
            </p>
            <div className="row" data-hero-i>
              <Button size="lg" iconRight="arrow-right" data-magnetic href="/contact">
                Parlons de votre projet
              </Button>
            </div>
          </div>
        </div>
      </Sec>

      <Wrap wide>
        <Schema kind="flow" note="Schéma — du premier atelier au fonctionnement quotidien" />
      </Wrap>

      <Sec>
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ alignContent: "start" }}>
            <K>Le principe</K>
          </div>
          <p className="mf" data-manifest="jamais|voyez|deux|semaines.">
            Vous ne découvrez jamais le logiciel à la fin. Vous le voyez fonctionner toutes les deux semaines. Ce qui ne va pas se corrige tant que cela coûte encore peu.
          </p>
        </div>
      </Sec>

      <div className="sec-sub" style={{ paddingTop: "var(--sec-y-tight)" }}>
        <Steps items={PROCESS} />
      </div>

      <Sec tight>
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ alignContent: "start" }}>
            <K>Qui vous répond</K>
            <h2 className="h-2" data-split style={{ maxWidth: "14ch" }}>
              Personne ne traduit votre demande.
            </h2>
          </div>
          <div className="stack-lg">
            <p className="body">
              La personne qui prend votre appel est celle qui écrira le logiciel, ou celle qui l&apos;exploitera. Il n&apos;y a pas de commercial à convaincre, pas de compte-rendu à faire remonter, et rien ne se perd entre ce que vous demandez et ce qui est construit.
            </p>
            <Schema kind="relais" note="Schéma — la chaîne d'interlocuteurs" />
          </div>
        </div>
      </Sec>

      <Sec tone="sub" tight>
        <Head
          kicker="Avant de développer"
          title="La bonne réponse n'est pas toujours un développement."
          size="h-2"
          max="26ch"
          lead="Le cadrage sert d'abord à vérifier qu'un logiciel est nécessaire. Le document produit est à vous, que vous continuiez avec nous ou non."
        />
        <div style={{ marginTop: "clamp(40px,5vw,80px)" }}>
          <Schema kind="decision" note="Schéma — les issues d'un audit" />
        </div>
      </Sec>

      <Sec tight>
        <Rule label="Ce que vous recevez à la fin" />
        <div style={{ marginTop: "clamp(32px,4vw,56px)" }}>
          <Schema kind="livrables" note="Schéma — à votre nom dès le premier jour" />
        </div>
      </Sec>

      <CtaBand
        title="Commençons par regarder votre situation."
        lead="Décrivez-nous ce qui vous ralentit aujourd'hui. Nous vous disons franchement si nous sommes la bonne équipe, et ce que cela représente."
        cta={{ label: "Nous écrire", href: "/contact" }}
      />
    </div>
  );
}

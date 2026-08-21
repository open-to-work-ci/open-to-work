"use client";

import { Badge, Button, Icon } from "@/components/ds";
import { Schema } from "@/components/site/dia";
import { CtaBand, K, Marquee, Sec, Wrap } from "@/components/site/ui";
import { SERVICES } from "@/lib/data";

export function ServicesView() {
  return (
    <div>
      <Sec style={{ paddingTop: "calc(var(--nav-h) + clamp(60px,9vw,130px))" }}>
        <div className="stack-lg">
          <div data-hero-i>
            <K>Nos services</K>
          </div>
          <h1 className="h-hero" data-split="hero" style={{ maxWidth: "14ch" }}>
            Cinq métiers, une seule équipe.
          </h1>
          <div className="split" style={{ alignItems: "end", gap: "clamp(32px,5vw,90px)" }}>
            <p className="lead" data-hero-i>
              Nous couvrons tout ce qui touche à votre logiciel : le construire, l&apos;héberger, le faire évoluer. Vous n&apos;avez qu&apos;un interlocuteur, et il connaît votre dossier.
            </p>
            <div className="row" data-hero-i>
              <Button size="lg" iconRight="arrow-right" data-magnetic href="/contact">
                Demander un devis
              </Button>
            </div>
          </div>
        </div>
      </Sec>
      <Marquee items={SERVICES.map((s) => s.title)} />
      {SERVICES.map((s, i) => (
        <Sec key={s.slug} tone={i % 2 ? "sub" : undefined} tight>
          <div className="split split-even" style={{ gap: "clamp(36px,5vw,96px)", alignItems: "center", direction: i % 2 ? "rtl" : "ltr" }}>
            <div className="stack-lg" style={{ direction: "ltr" }} data-rv>
              <div className="stack" style={{ gap: "var(--space-5)" }} data-rvi>
                <span className="mono">
                  {s.index} — {s.tags.join(" · ")}
                </span>
                <h2 className="h-2" data-split>
                  {s.title}
                </h2>
              </div>
              <p className="body" data-rvi>
                {s.lead}
              </p>
              <div style={{ display: "grid" }} data-rvi>
                {s.bullets.map((b) => (
                  <span
                    key={b}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      padding: "14px 0",
                      borderTop: "1px solid var(--border-hairline)",
                      font: "var(--fw-regular) var(--text-base)/1.55 var(--font-sans)",
                      color: "var(--text-body)",
                    }}
                  >
                    <Icon name="check" size={15} style={{ background: "var(--text-brand)", marginTop: 5, flex: "0 0 auto" }} />
                    {b}
                  </span>
                ))}
              </div>
              <div className="row" data-rvi style={{ justifyContent: "space-between" }}>
                <div className="row" style={{ gap: 8 }}>
                  {s.stack.map((t) => (
                    <Badge key={t} tone="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" iconRight="arrow-right" data-magnetic href={"/service/" + s.slug}>
                  Détail du service
                </Button>
              </div>
            </div>
            <div style={{ direction: "ltr" }}>
              <Schema kind={s.dia} note={"Schéma — " + s.title.toLowerCase()} />
            </div>
          </div>
        </Sec>
      ))}
      <CtaBand
        title="Dites-nous ce qui ne fonctionne pas aujourd'hui."
        lead="Un membre de l'équipe technique vous répond sous 24 heures ouvrées. Pas de service commercial dans la boucle."
        cta={{ label: "Parlons de votre projet", href: "/contact" }}
        maxWidth="18ch"
      />
    </div>
  );
}

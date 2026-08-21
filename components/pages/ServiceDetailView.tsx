"use client";

import { Badge, Button, Icon, Rule } from "@/components/ds";
import { NavLink } from "@/components/site/NavLink";
import { Schema } from "@/components/site/dia";
import { Head, K, Sec, Wrap } from "@/components/site/ui";
import { PROCESS, type Service } from "@/lib/data";

export function ServiceDetailView({ service, others }: { service: Service; others: Service[] }) {
  const s = service;
  return (
    <div>
      <Sec style={{ paddingTop: "calc(var(--nav-h) + clamp(48px,7vw,110px))" }} tight>
        <div className="stack-lg">
          <div data-hero-i style={{ display: "flex", gap: "var(--space-6)", alignItems: "center", flexWrap: "wrap" }}>
            <NavLink href="/services" className="mono" style={{ background: "none", border: 0, padding: 0 }} data-cursor="link">
              ← Tous les services
            </NavLink>
            <span className="mono">{s.index} / 05</span>
          </div>
          <h1 className="h-hero" data-split="hero" style={{ maxWidth: "13ch" }}>
            {s.title}
          </h1>
          <div className="split" style={{ alignItems: "end", gap: "clamp(32px,5vw,90px)" }}>
            <p className="lead" data-hero-i>
              {s.lead}
            </p>
            <div className="row" data-hero-i>
              {s.tags.map((t) => (
                <Badge key={t} tone="brand">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Sec>
      <Wrap wide>
        <Schema kind={s.dia} note={"Schéma — " + s.title.toLowerCase()} />
      </Wrap>
      <Sec>
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ alignContent: "start" }}>
            <K>Ce que vous obtenez</K>
          </div>
          <div className="stack-lg">
            <div className="grid-2" style={{ gap: "var(--space-8)" }} data-rv>
              {s.bullets.map((b) => (
                <div className="stack" key={b} data-rvi style={{ gap: "var(--space-4)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-hairline)" }}>
                  <Icon name="check" size={17} style={{ background: "var(--text-brand)" }} />
                  <span style={{ font: "var(--fw-regular) var(--text-md)/1.55 var(--font-sans)", color: "var(--text-body)" }}>{b}</span>
                </div>
              ))}
            </div>
            <p className="h-3" data-split style={{ paddingTop: "var(--space-8)", borderTop: "1px solid var(--border-hairline)", maxWidth: "26ch" }}>
              {s.outcome}
            </p>
            <div className="row" style={{ gap: 8 }} data-rv>
              <span className="mono" style={{ marginRight: 8 }}>
                Outils employés
              </span>
              {s.stack.map((t) => (
                <Badge key={t} tone="neutral">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Sec>
      <Sec tone="sub" tight>
        <Head
          kicker="Comment on avance"
          title="Quatre phases, aucune surprise."
          size="h-2"
          action={
            <Button variant="outline" iconRight="arrow-right" data-magnetic href="/methode">
              La méthode en détail
            </Button>
          }
        />
        <div className="grid-4" style={{ marginTop: "clamp(36px,4vw,64px)" }} data-rv>
          {PROCESS.map((p) => (
            <div className="stack" key={p.n} data-rvi style={{ gap: "var(--space-5)", paddingTop: "var(--space-7)", borderTop: "1px solid var(--border-default)" }}>
              <span className="mono">
                Étape {p.n} — {p.when}
              </span>
              <h3 className="h-3">{p.t}</h3>
              <p style={{ font: "var(--type-body)", color: "var(--text-muted)" }}>{p.d}</p>
            </div>
          ))}
        </div>
      </Sec>
      <Sec tight>
        <Rule label="Les autres services" />
        <div style={{ marginTop: "var(--space-9)" }}>
          {others.map((o, i) => (
            <NavLink
              key={o.slug}
              href={"/service/" + o.slug}
              data-cursor="link"
              data-rv
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "var(--space-8)",
                padding: "clamp(20px,2.4vw,32px) 0",
                background: "none",
                border: 0,
                borderTop: "1px solid var(--border-hairline)",
                borderBottom: i === others.length - 1 ? "1px solid var(--border-hairline)" : "none",
                textAlign: "left",
              }}
            >
              <span style={{ display: "flex", gap: "var(--space-7)", alignItems: "baseline" }}>
                <span className="mono">{o.index}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(21px,2.2vw,34px)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>
                  {o.title}
                </span>
              </span>
              <Icon name="arrow-right" size={18} style={{ background: "var(--text-faint)" }} />
            </NavLink>
          ))}
        </div>
      </Sec>
      <Sec tone="deep" tight>
        <div className="split" style={{ alignItems: "end" }}>
          <div className="stack-lg">
            <K sig>Prochaine étape</K>
            <h2 className="h-1" data-split style={{ color: "#fff", maxWidth: "16ch" }}>
              Un premier échange de trente minutes.
            </h2>
          </div>
          <div className="stack" style={{ gap: "var(--space-8)", justifyItems: "start" }}>
            <p className="lead" style={{ color: "var(--text-muted)" }}>
              Vous repartez avec un avis franc, un ordre de grandeur de budget et les prochaines étapes.
            </p>
            <Button size="lg" iconRight="arrow-right" data-magnetic href="/contact">
              Parlons de votre projet
            </Button>
          </div>
        </div>
      </Sec>
    </div>
  );
}

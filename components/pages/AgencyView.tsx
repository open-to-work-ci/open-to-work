"use client";

import { Button, Icon, Rule } from "@/components/ds";
import { Schema } from "@/components/site/dia";
import { Head, K, Marquee, Sec, Wrap } from "@/components/site/ui";
import { ENGAGEMENTS, PILIERS, TEAM } from "@/lib/data";

export function AgencyView() {
  return (
    <div>
      <Sec style={{ paddingTop: "calc(var(--nav-h) + clamp(60px,9vw,130px))" }} tight>
        <div className="stack-lg">
          <div data-hero-i>
            <K>L&apos;agence</K>
          </div>
          <h1 className="h-hero" data-split="hero" style={{ maxWidth: "13ch" }}>
            Une équipe, pas un intermédiaire.
          </h1>
          <div className="split" style={{ alignItems: "end", gap: "clamp(32px,5vw,90px)" }}>
            <p className="lead" data-hero-i>
              OTW est un studio logiciel. Nous construisons, hébergeons et faisons vivre les outils dont les entreprises ont besoin pour travailler — et nous restons après la mise en service.
            </p>
            <div className="row" data-hero-i>
              <Button size="lg" iconRight="arrow-right" data-magnetic href="/contact">
                Travailler avec nous
              </Button>
            </div>
          </div>
        </div>
      </Sec>
      <Wrap wide>
        <Schema kind="scope" note="Schéma — notre périmètre" />
      </Wrap>
      <Sec>
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ alignContent: "start" }}>
            <K>Nos principes</K>
          </div>
          <p className="mf" data-manifest="non|vous.|honnête">
            Nous préférons une mission refusée à un client mal servi. Quand un logiciel du marché suffit, nous le disons. Le reste du temps, nous construisons.
          </p>
        </div>
      </Sec>
      <Sec tone="sub" tight>
        <div className="grid-2" style={{ gap: "clamp(32px,4vw,72px)" }} data-rv>
          {PILIERS.map((p, i) => (
            <div className="stack" key={p.t} data-rvi style={{ gap: "var(--space-5)", paddingTop: "var(--space-7)", borderTop: "1px solid var(--border-default)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Icon name={p.icon} size={20} style={{ background: "var(--text-brand)" }} />
                <span className="mono">0{i + 1}</span>
              </div>
              <h3 className="h-3" style={{ maxWidth: "22ch" }}>
                {p.t}
              </h3>
              <p style={{ font: "var(--type-body)", color: "var(--text-muted)", maxWidth: "48ch" }}>{p.d}</p>
            </div>
          ))}
        </div>
      </Sec>
      <Sec>
        <Head
          kicker="L'équipe"
          title="Trois personnes, aucun relais commercial."
          size="h-2"
          lead="Les personnes qui cadrent votre projet sont celles qui l'écrivent et celles qui l'exploitent. Noms et photos à compléter avec l'accord de chacun."
        />
        <div className="grid-3" style={{ marginTop: "clamp(36px,4vw,64px)", gap: "clamp(24px,3vw,48px)" }} data-rv>
          {TEAM.map((t, i) => (
            <div className="stack" key={t.r} data-rvi style={{ gap: "var(--space-5)" }}>
              <div
                style={{
                  aspectRatio: "4 / 5",
                  display: "grid",
                  placeItems: "center",
                  background: "var(--surface-sunken)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                <span className="mono">Photo à fournir</span>
              </div>
              <div className="stack" style={{ gap: 6 }}>
                <span className="mono">0{i + 1}</span>
                <span style={{ font: "var(--fw-semibold) var(--text-base)/1.3 var(--font-sans)", color: "var(--text-strong)" }}>{t.r}</span>
                <span style={{ font: "var(--fw-regular) var(--text-sm)/1.5 var(--font-sans)", color: "var(--text-muted)" }}>{t.d}</span>
              </div>
            </div>
          ))}
        </div>
      </Sec>
      <Marquee tone="deep" dir="rev" items={["Cadrage", "Développement", "Mise en service", "Exploitation", "Formation"]} />
      <Sec tight>
        <Rule label="Ce que nous garantissons par écrit" />
        <div className="grid-4" style={{ marginTop: "clamp(36px,4vw,64px)" }} data-rv>
          {ENGAGEMENTS.map((e) => (
            <div className="stack" key={e.k} data-rvi style={{ gap: "var(--space-5)" }}>
              <span className="num" style={{ fontSize: "var(--text-4xl)" }}>
                <span data-count={e.v}>0</span>
                {e.suf}
              </span>
              <span style={{ font: "var(--fw-semibold) var(--text-base)/1.3 var(--font-sans)", color: "var(--text-strong)" }}>{e.k}</span>
              <span style={{ font: "var(--fw-regular) var(--text-sm)/1.6 var(--font-sans)", color: "var(--text-muted)" }}>{e.d}</span>
            </div>
          ))}
        </div>
      </Sec>
      <Sec tone="deep" tight>
        <div className="split" style={{ alignItems: "end" }}>
          <div className="stack-lg">
            <K sig>Prochaine étape</K>
            <h2 className="h-1" data-split style={{ color: "#fff", maxWidth: "16ch" }}>
              Parlons de ce qui vous ralentit.
            </h2>
          </div>
          <div className="stack" style={{ gap: "var(--space-8)", justifyItems: "start" }}>
            <p className="lead" style={{ color: "var(--text-muted)" }}>
              Trente minutes, un avis franc, aucun engagement.
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

"use client";

import { Button, Rule } from "@/components/ds";
import { Schema } from "@/components/site/dia";
import { CtaBand, EngagementStat, Head, K, Marquee, PillarCard, Sec, Wrap } from "@/components/site/ui";
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
            <PillarCard key={p.t} icon={p.icon} index={i + 1} title={p.t} description={p.d} maxWidth="22ch" />
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
            <EngagementStat key={e.k} value={e.v} suffix={e.suf} label={e.k} description={e.d} />
          ))}
        </div>
      </Sec>
      <CtaBand
        title="Parlons de ce qui vous ralentit."
        lead="Trente minutes, un avis franc, aucun engagement."
        cta={{ label: "Parlons de votre projet", href: "/contact" }}
      />
    </div>
  );
}

"use client";

import { Accordion, Button, Icon, Rule, ServiceRow } from "@/components/ds";
import { Phase, Schema } from "@/components/site/dia";
import { CtaBand, EngagementStat, Head, K, Marquee, PillarCard, Sec, Wrap } from "@/components/site/ui";
import { ENGAGEMENTS, FAQ, PILIERS, PROCESS, SERVICES } from "@/lib/data";

export function HomeView() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "flex-end",
          paddingTop: "calc(var(--nav-h) + clamp(60px,10vh,140px))",
          paddingBottom: "clamp(40px,6vh,80px)",
          overflow: "hidden",
        }}
      >
        <canvas id="field" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
        <Wrap wide style={{ position: "relative" }}>
          <div className="stack-lg">
            <div data-hero-i>
              <K>Studio logiciel · Disponible pour de nouveaux projets</K>
            </div>
            <h1 className="h-hero" data-split="hero" style={{ maxWidth: "13ch" }}>
              Le logiciel qui fait tourner votre entreprise.
            </h1>
            <div className="split" style={{ gap: "clamp(32px,5vw,90px)", alignItems: "end", marginTop: "clamp(12px,2vw,28px)" }}>
              <p className="lead" data-hero-i>
                Sites web, applications mobile, hébergement et logiciels de gestion. Une seule équipe, du premier atelier jusqu&apos;au fonctionnement quotidien.
              </p>
              <div className="stack" style={{ gap: "var(--space-8)" }}>
                <div className="row" data-hero-i>
                  <Button size="lg" iconRight="arrow-right" data-magnetic href="/contact">
                    Parlons de votre projet
                  </Button>
                  <Button size="lg" variant="outline" data-magnetic href="/methode">
                    Comment nous travaillons
                  </Button>
                </div>
                <div data-hero-i style={{ display: "grid", gap: 0, maxWidth: 460 }}>
                  {["Le code, les accès et la documentation sont à vous", "Un prix annoncé avant, pas après", "Vous parlez à ceux qui écrivent le logiciel"].map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        padding: "11px 0",
                        borderTop: "1px solid var(--rule-soft)",
                        font: "var(--fw-regular) var(--text-sm)/1.5 var(--font-sans)",
                        color: "var(--text-body)",
                      }}
                    >
                      <Icon name="check" size={14} style={{ background: "var(--text-brand)", marginTop: 4, flex: "0 0 auto" }} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ── SCHÉMA PLEIN CADRE ───────────────────────────────── */}
      <section style={{ paddingBottom: "var(--sec-y-tight)" }}>
        <Wrap wide>
          <Schema kind="archi" note="Schéma — ce que nous livrons" />
        </Wrap>
      </section>

      <Marquee tone="deep" items={["Sites web", "Applications mobile", "Hébergement", "Logiciels de gestion", "Conseil"]} />

      {/* ── MANIFESTE ────────────────────────────────────────── */}
      <Sec>
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ alignContent: "start" }}>
            <K>Ce que nous faisons</K>
          </div>
          <p className="mf" data-manifest="équipe|vous.|construit|exploite">
            Une seule équipe cadre votre projet, l&apos;écrit, le met en service et l&apos;exploite. Le code, les accès et la documentation sont à vous. Sans intermédiaire, sans dépendance.
          </p>
        </div>
      </Sec>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <Sec id="services" tone="sub">
        <Head
          kicker="Nos services"
          title="Cinq métiers, une seule équipe."
          size="h-1"
          action={
            <Button variant="outline" iconRight="arrow-right" data-magnetic href="/services">
              Tous les services
            </Button>
          }
        />
        <div style={{ marginTop: "clamp(40px,5vw,80px)" }}>
          {SERVICES.map((s, i) => (
            <div key={s.slug} data-peek={i} data-rv>
              <ServiceRow index={s.index} title={s.title} description={s.short} tags={s.tags} last={i === SERVICES.length - 1} href={"/service/" + s.slug} />
            </div>
          ))}
        </div>
      </Sec>

      {/* ── ENGAGEMENTS CHIFFRÉS ─────────────────────────────── */}
      <Sec tight>
        <Rule label="Ce que nous garantissons par écrit" />
        <div className="grid-4" style={{ marginTop: "clamp(36px,4vw,64px)" }} data-rv>
          {ENGAGEMENTS.map((e) => (
            <EngagementStat key={e.k} value={e.v} suffix={e.suf} label={e.k} description={e.d} />
          ))}
        </div>
      </Sec>

      {/* ── QUATRE RÈGLES + SCHÉMA DES LIVRABLES ─────────────── */}
      <Sec tone="sub">
        <Head
          kicker="Nos règles"
          title="Quatre règles, écrites dans le contrat."
          size="h-1"
          max="24ch"
          lead="Elles ne dépendent ni du projet, ni du client, ni de la période. Vous pouvez nous les opposer."
        />
        <div className="grid-2" style={{ marginTop: "clamp(40px,5vw,80px)", gap: "clamp(32px,4vw,72px)" }} data-rv>
          {PILIERS.map((p, i) => (
            <PillarCard key={p.t} icon={p.icon} index={i + 1} title={p.t} description={p.d} />
          ))}
        </div>
        <div style={{ marginTop: "clamp(48px,6vw,96px)" }}>
          <Schema kind="livrables" note="Schéma — remis dès le premier jour" />
        </div>
      </Sec>

      {/* ── SÉQUENCE HORIZONTALE : LE DÉROULÉ D'UN PROJET ────── */}
      <Sec tight flush style={{ paddingBottom: 0 }}>
        <Wrap wide>
          <Head
            kicker="Notre méthode"
            title="Quatre phases, un livrable à chaque fois."
            size="h-2"
            action={
              <Button variant="outline" iconRight="arrow-right" data-magnetic href="/methode">
                La méthode en détail
              </Button>
            }
          />
        </Wrap>
      </Sec>
      <div data-hs className="hs" style={{ marginTop: "clamp(40px,5vw,72px)" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div className="hs-track">
            {PROCESS.map((p) => (
              <div className="hs-item" key={p.n}>
                <Phase p={p} />
              </div>
            ))}
            <div className="hs-item" style={{ flex: "0 0 clamp(280px,26vw,380px)", display: "grid", alignContent: "center", gap: "var(--space-7)" }}>
              <h3 className="h-3" style={{ maxWidth: "16ch" }}>
                Tout commence par un cadrage.
              </h3>
              <Button size="lg" iconRight="arrow-right" data-magnetic href="/contact">
                Nous en parler
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Wrap wide>
        <p className="mono" style={{ padding: "var(--space-7) 0" }}>
          Chaque phase se termine par un document écrit ou une version utilisable — vous décidez de la suite à chaque étape.
        </p>
      </Wrap>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <Sec>
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ alignContent: "start" }}>
            <K>Questions fréquentes</K>
            <h2 className="h-3" data-split>
              Ce qu&apos;on nous demande avant de signer.
            </h2>
          </div>
          <div data-rv>
            <Accordion items={FAQ} />
          </div>
        </div>
      </Sec>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <CtaBand
        title="Trente minutes pour savoir si nous sommes la bonne équipe."
        lead="Vous repartez avec un avis franc sur votre projet, un ordre de grandeur de budget et les prochaines étapes. Sans engagement."
        cta={{ label: "Nous contacter", href: "/contact" }}
        secondaryCta={{ label: "Voir les services", href: "/services" }}
      />
    </div>
  );
}

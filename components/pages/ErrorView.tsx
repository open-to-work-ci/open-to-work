"use client";

import { usePathname } from "next/navigation";
import { Button, ServiceRow } from "@/components/ds";
import { Head, K, Sec } from "@/components/site/ui";
import { ERRORS, type ErrorCode } from "@/lib/errors";
import { SERVICES } from "@/lib/data";

/** Shared body for the 404, 500, and maintenance pages. */
export function ErrorView({ code, retry }: { code: ErrorCode; retry?: () => void }) {
  const pathname = usePathname();
  const e = ERRORS[code];
  const path = pathname && pathname.length > 44 ? pathname.slice(0, 44) + "…" : pathname || "/";

  return (
    <div>
      <Sec style={{ paddingTop: "calc(var(--nav-h) + clamp(48px,6vw,104px))" }} tight>
        <div className="split" style={{ gridTemplateColumns: "minmax(0,1.1fr) minmax(0,.9fr)", gap: "clamp(40px,6vw,110px)", alignItems: "start" }}>
          <div className="stack-lg">
            <div data-hero-i>
              <K>{e.kicker}</K>
            </div>
            <h1 className="h-1" data-split="hero" style={{ maxWidth: "20ch" }}>
              {e.title}
            </h1>
            <p className="lead" data-hero-i>
              {e.lead}
            </p>
            <div className="row" data-hero-i>
              {e.actions.map((a) =>
                a.reload ? (
                  <Button key={a.label} size="lg" variant={a.variant} iconRight="rotate-ccw" data-magnetic onClick={() => (retry ? retry() : window.location.reload())}>
                    {a.label}
                  </Button>
                ) : (
                  <Button key={a.label} size="lg" variant={a.variant} iconRight="arrow-right" data-magnetic href={a.href}>
                    {a.label}
                  </Button>
                ),
              )}
            </div>
          </div>
          <div data-hero-i>
            <div className="err-code" aria-hidden="true">
              {e.code}
            </div>
            <div className="err-rows">
              {e.rows.map((r) => (
                <div className="err-r" key={r.label}>
                  <b>{r.label}</b>
                  <span className={r.ok ? "ok" : undefined}>{r.value === null ? path : r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sec>

      {e.block === "services" ? (
        <Sec tone="sub" tight>
          <Head
            kicker="Cinq services"
            title="Vous cherchiez sans doute l'un de ces cinq services."
            size="h-2"
            lead="Une seule équipe du cadrage au fonctionnement quotidien. Le code et les accès sont à votre nom dès le premier jour."
          />
          <div style={{ marginTop: "clamp(32px,4vw,64px)" }}>
            {SERVICES.map((s, i) => (
              <div key={s.slug} data-rv>
                <ServiceRow index={s.index} title={s.title} description={s.short} tags={s.tags} last={i === SERVICES.length - 1} href={"/service/" + s.slug} />
              </div>
            ))}
          </div>
          <div className="row" style={{ marginTop: "var(--space-10)" }} data-rv>
            {e.secondaryLinks?.map((l) => (
              <Button key={l.label} variant="ghost" iconRight="arrow-up-right" href={l.href}>
                {l.label}
              </Button>
            ))}
          </div>
        </Sec>
      ) : (
        <Sec tone="sub" tight>
          <Head kicker={e.proofKicker} title="Ce que nous mettons en place pour que cela n'arrive pas chez vous." size="h-2" />
          <div className="grid-3" style={{ marginTop: "clamp(32px,4vw,64px)" }} data-rv>
            {e.proof?.map((p, i) => (
              <div key={p.title} data-rvi className="stack" style={{ gap: "var(--space-5)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-default)" }}>
                <span className="mono">{"0" + (i + 1)}</span>
                <h3 className="h-3" style={{ maxWidth: "20ch" }}>
                  {p.title}
                </h3>
                <p className="body">{p.description}</p>
              </div>
            ))}
          </div>
        </Sec>
      )}

      <Sec tone="deep" tight>
        <div className="split" style={{ alignItems: "end" }}>
          <div className="stack-lg">
            <K sig>{e.cta.kicker}</K>
            <h2 className="h-2" data-split style={{ color: "#fff", maxWidth: "18ch" }}>
              {e.cta.title}
            </h2>
          </div>
          <div className="stack" style={{ gap: "var(--space-8)", justifyItems: "start" }}>
            <p className="lead" style={{ color: "var(--text-muted)" }}>
              {e.cta.description}
            </p>
            <div className="row">
              <Button size="lg" iconRight="arrow-right" data-magnetic href={e.cta.primary.href}>
                {e.cta.primary.label}
              </Button>
              <Button
                size="lg"
                variant="outline"
                style={{ color: "#fff", borderColor: "color-mix(in oklab,#fff 28%,transparent)" }}
                data-magnetic
                href={e.cta.secondary.href}
              >
                {e.cta.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Sec>
    </div>
  );
}

import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/ds";
import type { ProcessStep } from "@/lib/data";

export function Wrap({
  children,
  wide,
  style,
  className,
}: {
  children?: ReactNode;
  wide?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return <div className={"wrap" + (wide ? " wrap-wide" : "") + (className ? " " + className : "")} style={style}>{children}</div>;
}

export function Sec({
  children,
  tone,
  tight,
  id,
  wide,
  style,
  flush,
}: {
  children?: ReactNode;
  tone?: "sub" | "deep";
  tight?: boolean;
  id?: string;
  wide?: boolean;
  style?: CSSProperties;
  flush?: boolean;
}) {
  return (
    <section
      id={id}
      data-theme={tone === "deep" ? "dark" : undefined}
      className={"sec" + (tight ? " sec-tight" : "") + (tone === "sub" ? " sec-sub" : tone === "deep" ? " sec-deep" : "")}
      style={style}
    >
      {flush ? children : <Wrap wide={wide}>{children}</Wrap>}
    </section>
  );
}

export function K({ children, sig }: { children?: ReactNode; sig?: boolean }) {
  return <span className={"k" + (sig ? " k-sig" : "")}>{children}</span>;
}

export function Head({
  kicker,
  title,
  lead,
  action,
  size = "h-1",
  align = "end",
  max,
}: {
  kicker?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  size?: string;
  align?: "end" | "start";
  max?: string;
}) {
  return (
    <div className="stack-lg" data-rv>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-9)",
          alignItems: align === "end" ? "flex-end" : "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div className="stack" style={{ maxWidth: max || "20ch" }}>
          {kicker ? <K>{kicker}</K> : null}
          <h2 className={size} data-split>
            {title}
          </h2>
        </div>
        {action || null}
      </div>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}

export function Marquee({ items, dir, tone }: { items: string[]; dir?: "rev"; tone?: "deep" }) {
  const run = (k: number) => (
    <span key={k}>
      {items.map((t, i) => (
        <span key={t + i}>
          {t}
          <em>◦</em>
        </span>
      ))}
    </span>
  );
  return (
    <div
      className="mq"
      data-mq={dir === "rev" ? "rev" : "fwd"}
      data-theme={tone === "deep" ? "dark" : undefined}
      style={tone === "deep" ? { background: "var(--otw-green-900)" } : undefined}
    >
      <div className="mq-t">
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}

export function Steps({ items }: { items: ProcessStep[] }) {
  return (
    <div data-steps style={{ position: "relative" }}>
      <div style={{ position: "sticky", top: "var(--nav-h)", height: "calc(100vh - var(--nav-h))", display: "flex", alignItems: "center" }}>
        <Wrap>
          <div className="split" style={{ alignItems: "center", gap: "clamp(32px,5vw,90px)" }}>
            <div className="stack">
              <K>Comment nous travaillons</K>
              <span className="stp-n">01</span>
              <div className="stp-bar" style={{ height: 2, background: "var(--rule-soft)", width: "min(100%,320px)", overflow: "hidden" }}>
                <i style={{ display: "block", height: "100%", background: "var(--otw-green-500)", transform: "scaleX(0)", transformOrigin: "0 50%" }} />
              </div>
            </div>
            <div className="stp" style={{ position: "relative", minHeight: "clamp(300px,38vh,420px)" }}>
              {items.map((s, i) => (
                <div className="stp-p" key={s.n} data-on={i === 0 ? "1" : "0"} style={{ display: "grid", gap: "var(--space-7)", alignContent: "center" }}>
                  <div className="stack" style={{ gap: "var(--space-5)" }}>
                    <span className="mono">
                      Étape {s.n} — {s.when}
                    </span>
                    <h3 className="h-2">{s.t}</h3>
                  </div>
                  <p className="body">{s.d}</p>
                  <div style={{ display: "grid", gap: 0 }}>
                    {s.out.map((o) => (
                      <span
                        key={o}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "center",
                          padding: "12px 0",
                          borderTop: "1px solid var(--border-hairline)",
                          font: "var(--fw-medium) var(--text-base)/1.4 var(--font-sans)",
                          color: "var(--text-body)",
                        }}
                      >
                        <Icon name="check" size={15} style={{ background: "var(--text-brand)" }} />
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </div>
    </div>
  );
}

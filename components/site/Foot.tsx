import { Button } from "@/components/ds";
import { SERVICES } from "@/lib/data";
import { NavLink } from "./NavLink";
import { K, Wrap } from "./ui";

export function Foot() {
  const columns: [string, { label: string; href: string }[]][] = [
    ["Services", SERVICES.map((s) => ({ label: s.title, href: "/service/" + s.slug }))],
    [
      "Explorer",
      [
        { label: "Notre méthode", href: "/methode" },
        { label: "L'agence", href: "/agence" },
        { label: "Contact", href: "/contact" },
        { label: "Mentions légales", href: "/mentions" },
      ],
    ],
    [
      "Contact",
      [
        { label: "contact@otw.example", href: "/contact" },
        { label: "Téléphone à compléter", href: "/contact" },
        { label: "Adresse à compléter", href: "/contact" },
      ],
    ],
  ];

  return (
    <footer data-theme="dark" style={{ background: "var(--gradient-deep)", paddingTop: "var(--sec-y-tight)", overflow: "hidden" }}>
      <Wrap wide>
        <div className="split split-even" style={{ gap: "clamp(40px,6vw,110px)", alignItems: "start" }}>
          <div className="stack-lg">
            <img src="/assets/logo-otw-white.png" alt="OTW" style={{ height: 34 }} />
            <p className="lead" style={{ color: "var(--text-muted)", maxWidth: "34ch" }}>
              Sites web, applications mobile, hébergement et logiciels de gestion. Une seule équipe, du premier atelier au fonctionnement quotidien.
            </p>
            <div className="row">
              <Button variant="primary" iconRight="arrow-right" data-magnetic href="/contact">
                Nous écrire
              </Button>
              <Button variant="outline" style={{ color: "#fff", borderColor: "color-mix(in oklab,#fff 28%,transparent)" }} href="/agence">
                L&apos;agence
              </Button>
            </div>
          </div>
          <div className="grid-3" style={{ gap: "var(--space-8)" }}>
            {columns.map(([t, links]) => (
              <div className="stack" key={t} style={{ gap: "var(--space-4)", alignContent: "start" }}>
                <K sig>{t}</K>
                {links.map((l) => (
                  <NavLink key={l.label} href={l.href} className="foot-link">
                    {l.label}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="ft-mark" style={{ marginTop: "clamp(40px,6vw,90px)" }}>
          OTW
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-6)",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--space-7) 0",
            borderTop: "1px solid var(--border-hairline)",
          }}
        >
          <span className="mono">© 2026 OTW — Open To Work</span>
          <div className="row" style={{ gap: "var(--space-7)" }}>
            <NavLink href="/mentions" className="mono" style={{ background: "none", border: 0, padding: 0 }}>
              Mentions légales
            </NavLink>
            <NavLink href="/mentions" className="mono" style={{ background: "none", border: 0, padding: 0 }}>
              Données personnelles
            </NavLink>
          </div>
        </div>
      </Wrap>
    </footer>
  );
}

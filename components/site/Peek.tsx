import { Icon } from "@/components/ds";
import { SERVICES } from "@/lib/data";

/* Aperçu qui suit le curseur sur la liste de services : une fiche compacte,
   pas une fausse capture d'écran. */
export function Peek() {
  return (
    <div id="peek">
      {SERVICES.map((s) => (
        <div key={s.slug} className="pk" style={{ display: "none" }}>
          <div className="pk-h">
            <span className="mono">{s.index} / 05</span>
            <Icon name={s.icon} size={18} style={{ background: "var(--text-brand)" }} />
          </div>
          <span className="pk-t">{s.title}</span>
          <div className="d-list">
            {s.bullets.slice(0, 3).map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

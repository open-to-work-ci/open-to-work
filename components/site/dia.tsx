/* Schémas OTW — remplacent les captures produit tant qu'il n'y a rien de réel à montrer.
   Tout est en HTML/CSS : aucun dessin SVG, uniquement filets, cadres et nœuds carrés. */
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/ds";
import { PROCESS, SERVICES, type DiaKind } from "@/lib/data";

export function DBox({ t, s, on, dash }: { t: ReactNode; s?: ReactNode; on?: boolean; dash?: boolean }) {
  return (
    <div className={"d-box" + (on ? " on" : "") + (dash ? " dash" : "")}>
      <span className="d-box-t">{t}</span>
      {s ? <span className="d-box-s">{s}</span> : null}
    </div>
  );
}
export function DLab({ children }: { children?: ReactNode }) {
  return <span className="d-lab">{children}</span>;
}
export function DConn() {
  return (
    <div className="d-conn">
      <i />
      <b />
      <i />
    </div>
  );
}
export function DArw({ label }: { label?: string }) {
  return <span className={"d-arw" + (label ? " lab" : "")}>{label ? <em>{label}</em> : null}</span>;
}
export function DList({ items }: { items: string[] }) {
  return (
    <div className="d-list">
      {items.map((o) => (
        <span key={o}>{o}</span>
      ))}
    </div>
  );
}
export function DNote({ children }: { children?: ReactNode }) {
  return <p className="d-note">{children}</p>;
}

const DIA: Record<DiaKind, { t: string; m: string }> = {
  flow: { t: "Le déroulé d'un projet", m: "4 phases" },
  archi: { t: "L'architecture d'une livraison", m: "3 niveaux" },
  relais: { t: "Qui vous répond", m: "Chaîne d'interlocuteurs" },
  livrables: { t: "Ce qui vous est remis", m: "Jour 1" },
  pages: { t: "Ce que contient une plateforme web", m: "Un seul domaine" },
  offline: { t: "Ce qui se passe quand le réseau tombe", m: "Mode hors ligne" },
  donnees: { t: "Où vivent vos données", m: "Avant / après" },
  decision: { t: "Les trois réponses possibles d'un audit", m: "Cadrage" },
  scope: { t: "Ce que nous faisons, ce que nous ne faisons pas", m: "Périmètre" },
};

export function Dia({ kind = "flow", title }: { kind?: DiaKind; title?: string }) {
  const meta = DIA[kind] || DIA.flow;
  let body: ReactNode = null;

  if (kind === "flow")
    body = (
      <>
        <div className="d-flow">
          {PROCESS.map((p) => (
            <div className="d-step" key={p.n}>
              <span className="mono">
                {p.n} — {p.when}
              </span>
              <span className="d-step-t">{p.t}</span>
              <DList items={p.out} />
            </div>
          ))}
        </div>
        <DNote>Chaque phase se termine par un document ou une version utilisable. Vous décidez de la suite à chaque fois.</DNote>
      </>
    );

  if (kind === "archi")
    body = (
      <>
        <DLab>Vos utilisateurs</DLab>
        <div className="d-band">
          <DBox t="Navigateur" s="Bureau" />
          <DBox t="Téléphone" s="iOS · Android" />
          <DBox t="Équipe sur le terrain" s="Hors ligne" />
        </div>
        <DConn />
        <DLab>Votre application</DLab>
        <div className="d-band">
          <DBox t="Ce que vos clients voient" on />
          <DBox t="Vos règles de gestion" on />
          <DBox t="Vos données" on />
        </div>
        <DConn />
        <DLab>Ce qui la maintient en service</DLab>
        <div className="d-band">
          <DBox t="Sauvegardes quotidiennes" s="Restauration testée" />
          <DBox t="Surveillance" s="Alerte immédiate" />
          <DBox t="Mises à jour de sécurité" s="En continu" />
        </div>
        <DNote>Serveurs, noms de domaine et accès sont enregistrés à votre nom, pas au nôtre.</DNote>
      </>
    );

  if (kind === "relais")
    body = (
      <>
        <DLab>Le circuit habituel</DLab>
        <div className="d-chain">
          <DBox t="Vous" dash />
          <DArw />
          <DBox t="Commercial" dash />
          <DArw />
          <DBox t="Chef de projet" dash />
          <DArw />
          <DBox t="Développeur" dash />
        </div>
        <div style={{ height: "clamp(20px,2.4vw,36px)" }} />
        <DLab>Chez OTW</DLab>
        <div className="d-chain">
          <DBox t="Vous" on />
          <DArw />
          <DBox t="L'équipe qui écrit votre logiciel" s="Les mêmes personnes, du premier atelier au run" on />
        </div>
        <DNote>Deux à trois personnes sur votre dossier, joignables directement. Rien ne se perd en route.</DNote>
      </>
    );

  if (kind === "livrables")
    body = (
      <>
        <div className="d-grid">
          {["Code source complet", "Accès aux serveurs", "Noms de domaine", "Documentation d'exploitation", "Comptes et mots de passe", "Formation de vos équipes"].map((t) => (
            <span className="d-cell" key={t}>
              <Icon name="check" size={15} style={{ background: "var(--text-brand)" }} />
              {t}
            </span>
          ))}
        </div>
        <DNote>Remis à votre nom dès le premier jour de la mission, pas à la fin. C'est ce qui rend un départ possible.</DNote>
      </>
    );

  if (kind === "pages")
    body = (
      <>
        <div className="d-band">
          {(
            [
              ["Site public", ["Pages et offres", "Articles", "Formulaires de contact"]],
              ["Espace client", ["Comptes et documents", "Suivi de commande", "Paiement en ligne"]],
              ["Administration", ["Contenus et tarifs", "Utilisateurs et droits", "Statistiques de visite"]],
            ] as [string, string[]][]
          ).map(([t, items]) => (
            <div className="d-col" key={t}>
              <DBox t={t} on />
              <DConn />
              <DList items={items} />
            </div>
          ))}
        </div>
        <DNote>Un seul nom de domaine, une seule administration, une seule facture d'hébergement.</DNote>
      </>
    );

  if (kind === "offline")
    body = (
      <>
        <div className="d-chain">
          <DBox t="Saisie sur le téléphone" s="Sans réseau" on />
          <DArw label="réseau coupé" />
          <DBox t="File d'attente locale" s="Sur l'appareil" dash />
          <DArw label="réseau revenu" />
          <DBox t="Serveur" s="Synchronisation" on />
          <DArw />
          <DBox t="Confirmation" s="Sur le téléphone" />
        </div>
        <DNote>Aucune saisie perdue, aucune double saisie le soir. L'utilisateur ne s'occupe pas du réseau.</DNote>
      </>
    );

  if (kind === "donnees")
    body = (
      <>
        <div className="d-fun">
          <div className="d-col">
            <DLab>Aujourd'hui</DLab>
            {["Classeurs Excel", "Carnets papier", "Ancien logiciel", "Boîte mail"].map((t) => (
              <DBox key={t} t={t} dash />
            ))}
          </div>
          <div className="d-mid">
            <DBox t="Un seul outil" s="Une seule saisie" on />
          </div>
          <div className="d-col">
            <DLab>Ce que vous en tirez</DLab>
            {["Tableau de bord à jour", "Exports comptables", "Historique conservé", "Droits par équipe"].map((t) => (
              <DBox key={t} t={t} />
            ))}
          </div>
        </div>
        <DNote>La reprise des fichiers existants fait partie de la mise en service. Rien n'est ressaisi à la main.</DNote>
      </>
    );

  if (kind === "decision")
    body = (
      <>
        <div style={{ maxWidth: 420 }}>
          <DBox t="Audit de l'existant" s="2 semaines" on />
        </div>
        <DConn />
        <div className="d-band">
          <div className="d-col">
            <DBox t="Réparer" />
            <DList items={["La base est saine", "Le coût reste maîtrisé"]} />
          </div>
          <div className="d-col">
            <DBox t="Remplacer" />
            <DList items={["L'entretien coûte plus cher", "Les données restent reprises"]} />
          </div>
          <div className="d-col">
            <DBox t="Attendre" />
            <DList items={["Le problème n'est pas technique", "Un logiciel du marché suffit"]} />
          </div>
        </div>
        <DNote>Les trois réponses sont possibles, y compris celles qui ne nous rapportent rien.</DNote>
      </>
    );

  if (kind === "scope")
    body = (
      <>
        <div className="d-two">
          <div className="d-col">
            <DLab>Nous faisons</DLab>
            {SERVICES.map((s) => (
              <span className="d-cell" key={s.slug}>
                <Icon name="check" size={15} style={{ background: "var(--text-brand)" }} />
                {s.title}
              </span>
            ))}
          </div>
          <div className="d-col">
            <DLab>Nous ne faisons pas</DLab>
            {["Publicité en ligne", "Référencement payant", "Identité de marque", "Revente de licences", "Régie au forfait horaire"].map((t) => (
              <span className="d-cell off" key={t}>
                <i />
                {t}
              </span>
            ))}
          </div>
        </div>
        <DNote>Quand ce n'est pas notre métier, nous le disons et nous vous orientons.</DNote>
      </>
    );

  return (
    <div className="dia">
      <div className="dia-h">
        <span className="dia-t">{title || meta.t}</span>
        <span className="mono">{meta.m}</span>
      </div>
      {body}
    </div>
  );
}

export function Schema({ kind = "flow", title, note, style }: { kind?: DiaKind; title?: string; note?: string; style?: CSSProperties }) {
  return (
    <div style={style}>
      <div className="rv">
        <Dia kind={kind} title={title} />
      </div>
      <div className="dia-cap">
        <span>{(DIA[kind] || DIA.flow).t}</span>
        <span>{note || "Schéma"}</span>
      </div>
    </div>
  );
}

export function Phase({ p }: { p: (typeof PROCESS)[number] }) {
  return (
    <div className="ph">
      <span className="ph-n">{p.n}</span>
      <div className="stack" style={{ gap: "var(--space-5)", alignContent: "start" }}>
        <span className="mono">{p.when}</span>
        <h3 className="h-3">{p.t}</h3>
        <p style={{ font: "var(--type-body)", color: "var(--text-muted)" }}>{p.d}</p>
      </div>
      <DList items={p.out} />
    </div>
  );
}

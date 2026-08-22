/* Contenu des pages d'état (404, 500, maintenance).
   Port de site/pages-error.jsx — les deux liens qui pointaient vers /realisations
   (page "études de cas" absente de cette variante du site, qui a /methode à la
   place) ont été redirigés vers /methode, avec un intitulé qui correspond à la
   destination réelle plutôt que le texte d'origine. */

export type ErrorCode = "404" | "500" | "maintenance";

export interface ErrorAction {
  label: string;
  href?: string;
  reload?: boolean;
  variant?: "outline";
}

export interface ErrorRow {
  label: string;
  /** null → remplacé à l'affichage par le chemin actuellement demandé. */
  value: string | null;
  ok?: boolean;
}

export interface ErrorLink {
  label: string;
  href: string;
}

export interface ErrorContent {
  code: string;
  kicker: string;
  title: string;
  lead: string;
  rows: ErrorRow[];
  actions: ErrorAction[];
  block: "services" | "proof";
  secondaryLinks?: ErrorLink[];
  proofKicker?: string;
  proof?: { title: string; description: string }[];
  cta: {
    kicker: string;
    title: string;
    description: string;
    primary: ErrorLink;
    secondary: ErrorLink;
  };
}

export const ERRORS: Record<ErrorCode, ErrorContent> = {
  "404": {
    code: "404",
    kicker: "Erreur 404",
    title: "Cette page n'existe pas. Le reste du site, oui.",
    lead: "Un lien cassé, une adresse mal recopiée, ou une page que nous avons retirée. C'est notre erreur, pas la vôtre — et voici, très probablement, ce que vous cherchiez.",
    rows: [
      { label: "Adresse demandée", value: null },
      { label: "Réponse du serveur", value: "404 — introuvable" },
      { label: "Cause la plus fréquente", value: "Lien obsolète depuis la refonte" },
      { label: "Reste du site", value: "En service", ok: true },
    ],
    actions: [
      { label: "Retour à l'accueil", href: "/" },
      { label: "Parlons de votre projet", href: "/contact", variant: "outline" },
    ],
    block: "services",
    secondaryLinks: [
      { label: "Notre méthode", href: "/methode" },
      { label: "Qui nous sommes", href: "/agence" },
    ],
    cta: {
      kicker: "Prochaine étape",
      title: "Un lien cassé ne devrait pas vous coûter une visite.",
      description: "Dites-nous en deux lignes ce que vous cherchiez. Un membre de l'équipe technique vous répond sous 24 heures ouvrées, sans intermédiaire commercial.",
      primary: { label: "Nous contacter", href: "/contact" },
      secondary: { label: "Voir la méthode", href: "/methode" },
    },
  },
  "500": {
    code: "500",
    kicker: "Erreur 500",
    title: "La panne est chez nous. Pas chez vous.",
    lead: "Notre serveur n'a pas réussi à afficher cette page. L'alerte est partie à la détection, sans attendre que quelqu'un s'en plaigne. C'est exactement ce que nous installons chez nos clients.",
    rows: [
      { label: "Adresse demandée", value: null },
      { label: "Réponse du serveur", value: "500 — erreur interne" },
      { label: "Alerte équipe", value: "Envoyée automatiquement", ok: true },
      { label: "Vos données", value: "Intactes", ok: true },
    ],
    actions: [
      { label: "Réessayer", reload: true },
      { label: "Nous signaler la panne", href: "/contact", variant: "outline" },
    ],
    block: "proof",
    proofKicker: "Ce qui devrait se passer chez vous",
    proof: [
      { title: "La panne est détectée, pas signalée", description: "Une alerte part dès que le service répond mal. Vous arrêtez de découvrir les incidents par vos clients." },
      { title: "La restauration est testée, pas promise", description: "Sauvegardes quotidiennes et restauration vérifiée chaque mois, procédure écrite remise à vos équipes." },
      { title: "Le délai d'intervention est écrit", description: "Il figure au contrat, jour et nuit selon le niveau retenu. Pas une intention, un engagement." },
    ],
    cta: {
      kicker: "Hébergement et infrastructure",
      title: "Une panne chez nous vous coûte une minute. Chez vous, elle coûte des commandes.",
      description: "Nous reprenons les hébergements à la dérive : audit de l'existant, sauvegardes réellement testées, surveillance et alerte immédiate.",
      primary: { label: "Voir ce service", href: "/service/cloud" },
      secondary: { label: "Nous contacter", href: "/contact" },
    },
  },
  maintenance: {
    code: "503",
    kicker: "Maintenance planifiée",
    title: "Mise à jour en cours. Le site revient dans quelques minutes.",
    lead: "Nous déployons une nouvelle version. Rien n'est perdu, rien n'est cassé, et les services que nous exploitons pour nos clients ne sont pas concernés.",
    rows: [
      // TODO(otw-contact): remplacer par la vraie valeur avant mise en production
      { label: "Début de l'intervention", value: "À compléter" },
      // TODO(otw-contact): remplacer par la vraie valeur avant mise en production
      { label: "Retour prévu", value: "À compléter" },
      { label: "Services clients", value: "Non concernés", ok: true },
      { label: "Contact pendant l'intervention", value: "contact@otw.ci" },
    ],
    actions: [
      { label: "Réessayer", reload: true },
      { label: "Nous écrire", href: "/contact", variant: "outline" },
    ],
    block: "proof",
    proofKicker: "Comment nous intervenons",
    proof: [
      { title: "Annoncé avant, pas découvert après", description: "Toute intervention planifiée est annoncée à vos équipes, avec sa fenêtre et sa durée estimée." },
      { title: "En dehors de vos heures d'activité", description: "La fenêtre est choisie avec vous, sur vos heures creuses réelles et non sur les nôtres." },
      { title: "Retour arrière possible à tout moment", description: "Chaque mise en production peut être annulée en quelques minutes, sans perte de données." },
    ],
    cta: {
      kicker: "Prochaine étape",
      title: "Une mise à jour ne devrait jamais arrêter votre activité.",
      description: "Nous exploitons les services de nos clients avec des fenêtres annoncées, des sauvegardes testées et un retour arrière possible.",
      primary: { label: "Nous contacter", href: "/contact" },
      secondary: { label: "Voir les services", href: "/services" },
    },
  },
};

/* Contenu OTW — version sans références. Aucun client, aucun chiffre de mission,
   aucun témoignage : tant qu'il n'y a rien de publiable, on ne publie rien.
   Les visuels sont des schémas (voir components/site/dia.tsx), pas de fausses captures produit. */

export type DiaKind =
  | "flow"
  | "archi"
  | "relais"
  | "livrables"
  | "pages"
  | "offline"
  | "donnees"
  | "decision"
  | "scope";

export interface Service {
  index: string;
  slug: string;
  icon: string;
  title: string;
  short: string;
  lead: string;
  tags: string[];
  stack: string[];
  bullets: string[];
  outcome: string;
  dia: DiaKind;
}

export const SERVICES: Service[] = [
  {
    index: "01",
    slug: "web",
    icon: "code-xml",
    title: "Sites et plateformes web",
    short: "Votre vitrine, votre boutique ou votre outil interne, accessibles depuis n'importe quel navigateur.",
    lead: "Votre vitrine, votre boutique en ligne ou votre espace client — sur téléphone comme sur ordinateur, avec un back-office que vos équipes savent utiliser.",
    tags: ["Sites vitrines", "Boutiques en ligne", "Espaces clients"],
    stack: ["React", "Next.js", "Node"],
    bullets: [
      "Un site rapide, même sur une connexion lente",
      "Une administration prise en main sans formation longue",
      "Paiement en ligne et mobile money quand l'activité le demande",
      "Visible sur les moteurs de recherche dès la mise en ligne",
    ],
    outcome: "Vos clients vous trouvent, comprennent votre offre et achètent sans appeler.",
    dia: "pages",
  },
  {
    index: "02",
    slug: "mobile",
    icon: "smartphone",
    title: "Applications mobile",
    short: "Une application que vos clients gardent, et qui fonctionne même quand le réseau faiblit.",
    lead: "Une application que vos clients gardent sur leur téléphone, et qui continue de fonctionner quand la connexion disparaît.",
    tags: ["iOS et Android", "Mode hors ligne", "Notifications"],
    stack: ["Swift", "Kotlin", "Flutter"],
    bullets: [
      "Une seule application publiée sur iOS et Android",
      "Fonctionne hors ligne, puis se synchronise au retour du réseau",
      "Légère à télécharger, économe en données",
      "Publication sur les stores et suivi des pannes assurés par nous",
    ],
    outcome: "Vos équipes terrain travaillent sans dépendre d'une bonne connexion.",
    dia: "offline",
  },
  {
    index: "03",
    slug: "cloud",
    icon: "cloud",
    title: "Hébergement et infrastructure",
    short: "Des services en ligne qui ne tombent pas, avec des coûts que vous maîtrisez.",
    lead: "Des services disponibles quand vos clients en ont besoin, sauvegardés chaque jour, avec une facture que vous comprenez.",
    tags: ["Hébergement", "Sauvegardes", "Surveillance"],
    stack: ["AWS", "Terraform", "Kubernetes"],
    bullets: [
      "Sauvegardes quotidiennes et restauration testée, pas seulement promise",
      "Alerte immédiate en cas de panne, jour et nuit selon le contrat",
      "Mises à jour de sécurité appliquées en continu",
      "Facture d'hébergement expliquée et révisée chaque trimestre",
    ],
    outcome: "Vous arrêtez de découvrir les pannes par vos clients.",
    dia: "archi",
  },
  {
    index: "04",
    slug: "gestion",
    icon: "boxes",
    title: "Logiciels de gestion",
    short: "Un outil calé sur vos processus réels : stocks, facturation, production, terrain.",
    lead: "Un logiciel construit autour de votre façon de travailler, plutôt qu'un progiciel dans lequel il faut vous plier.",
    tags: ["Gestion et facturation", "Stocks et production", "Suivi terrain"],
    stack: [".NET", "Python", "PostgreSQL"],
    bullets: [
      "Reprise de vos fichiers Excel et de vos anciens outils sans perte",
      "Rôles et permissions par équipe, par site ou par agence",
      "Exports comptables au format attendu par votre cabinet",
      "Formation de vos équipes incluse dans la mise en service",
    ],
    outcome: "Une seule source d'information, au lieu de dix fichiers qui se contredisent.",
    dia: "donnees",
  },
  {
    index: "05",
    slug: "conseil",
    icon: "compass",
    title: "Conseil et cadrage",
    short: "Savoir quoi faire, et ce que cela coûte, avant d'engager un budget.",
    lead: "Un état des lieux honnête de votre situation technique, un plan chiffré, et la formation de vos équipes pour tenir la suite.",
    tags: ["Audit technique", "Cadrage et budget", "Formation"],
    stack: ["Audit", "Cadrage", "Formation"],
    bullets: [
      "Audit de l'existant : ce qui tient, ce qui doit être remplacé, ce qui peut attendre",
      "Un budget et un calendrier chiffrés, que vous continuiez avec nous ou non",
      "Choix des outils argumenté, y compris quand la réponse est un logiciel du marché",
      "Montée en compétence de vos équipes internes",
    ],
    outcome: "Vous décidez avec des chiffres, pas avec une intuition.",
    dia: "decision",
  },
];

export interface Engagement {
  v: number;
  suf: string;
  k: string;
  d: string;
}

export const ENGAGEMENTS: Engagement[] = [
  { v: 24, suf: " h", k: "Première réponse", d: "Un interlocuteur technique vous répond dans la journée ouvrée." },
  { v: 5, suf: " jours", k: "Fourchette écrite", d: "Périmètre, calendrier et budget estimés, après un premier échange." },
  { v: 2, suf: " semaines", k: "Rythme de livraison", d: "Vous voyez le logiciel fonctionner, pas un rapport d'avancement." },
  { v: 100, suf: " %", k: "Propriété du code", d: "Code, accès et documentation à votre nom dès le premier jour." },
];

export interface Pilier {
  icon: string;
  t: string;
  d: string;
}

/* Les quatre piliers retenus : ce sur quoi la confiance repose, à la place de références. */
export const PILIERS: Pilier[] = [
  {
    icon: "shield-check",
    t: "Le code et les accès sont à vous",
    d: "Code source, serveurs, noms de domaine et documentation sont à votre nom dès le premier jour. Vous pouvez changer de prestataire sans rien perdre — et sans nous demander l'autorisation.",
  },
  {
    icon: "file-text",
    t: "Un prix annoncé avant, pas après",
    d: "Le montant est fixé au cadrage, écrit dans le contrat, et ne bouge pas sans une décision de votre part. Un changement de périmètre est chiffré avant d'être engagé.",
  },
  {
    icon: "activity",
    t: "Vous voyez l'avancement en continu",
    d: "Une version utilisable toutes les deux semaines, un point hebdomadaire, et l'accès permanent au suivi des tâches. Vous n'attendez pas six mois pour découvrir le résultat.",
  },
  {
    icon: "users",
    t: "Pas d'intermédiaire commercial",
    d: "Vous parlez aux personnes qui écrivent votre logiciel, du premier échange au fonctionnement quotidien. Aucun relais entre votre besoin et l'équipe technique.",
  },
];

export interface ProcessStep {
  n: string;
  t: string;
  when: string;
  d: string;
  out: string[];
}

export const PROCESS: ProcessStep[] = [
  {
    n: "01",
    t: "On cadre",
    when: "2 semaines",
    d: "Nous passons du temps dans votre activité, puis nous vous remettons un plan et un budget chiffrés. Ce document est à vous, même si vous ne continuez pas avec nous.",
    out: ["Périmètre écrit", "Budget et calendrier", "Choix des outils argumenté"],
  },
  {
    n: "02",
    t: "On construit",
    when: "par étapes de 2 semaines",
    d: "Vous voyez le logiciel fonctionner toutes les deux semaines, pas au bout de six mois. Vous corrigez le cap en cours de route, quand cela coûte encore peu.",
    out: ["Version utilisable à chaque étape", "Un point hebdomadaire", "Aucune facture surprise"],
  },
  {
    n: "03",
    t: "On met en service",
    when: "1 à 2 semaines",
    d: "Reprise de vos données, bascule progressive, formation de vos équipes sur leur poste de travail. L'ancien outil reste disponible le temps nécessaire.",
    out: ["Reprise des données existantes", "Formation sur site ou à distance", "Bascule sans interruption d'activité"],
  },
  {
    n: "04",
    t: "On exploite",
    when: "dans la durée",
    d: "Surveillance, sauvegardes, corrections et évolutions. Vos équipes sont formées pour reprendre la main le jour où elles le souhaitent.",
    out: ["Délais d'intervention écrits", "Sauvegardes vérifiées chaque mois", "Sortie possible sans blocage"],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "Peut-on voir des projets déjà réalisés ?",
    answer:
      "Nos missions en cours sont couvertes par des accords de confidentialité, et nous ne publions rien qui ne nous appartient pas. Ce que nous pouvons montrer dès maintenant : notre méthode dans le détail, nos engagements écrits, et une revue technique avec les personnes qui travailleraient sur votre projet.",
  },
  {
    question: "Combien coûte un projet ?",
    answer:
      "Cela dépend du périmètre, et nous refusons de donner un chiffre au hasard. Après un premier échange, vous recevez une fourchette écrite sous cinq jours ouvrés. Après le cadrage, un montant ferme. Aucun développement ne démarre avant que ce montant soit accepté.",
  },
  {
    question: "À qui appartient le logiciel une fois livré ?",
    answer:
      "À vous, entièrement. Le code, les accès, les noms de domaine et la documentation sont à votre nom dès le premier jour. Vous pouvez changer de prestataire sans rien perdre.",
  },
  {
    question: "Et si nous avons déjà un logiciel qui fonctionne mal ?",
    answer:
      "Nous commençons par un audit : ce qui peut être réparé, ce qui doit être remplacé, ce qui peut attendre. Souvent, il n'est pas nécessaire de tout refaire, et nous le disons.",
  },
  {
    question: "Que se passe-t-il après la mise en service ?",
    answer:
      "Nous restons. Surveillance, sauvegardes, corrections et évolutions font l'objet d'un contrat clair, avec des délais d'intervention écrits. Vos équipes sont formées pour être autonomes au quotidien.",
  },
  {
    question: "Travaillez-vous à distance ?",
    answer:
      "Oui, avec des points réguliers en visioconférence. Nous nous déplaçons pour les ateliers de cadrage et pour les mises en service, là où la présence change le résultat.",
  },
];

export interface TeamRole {
  r: string;
  d: string;
}

export const TEAM: TeamRole[] = [
  { r: "Direction technique et cadrage", d: "Ateliers, architecture, chiffrage." },
  { r: "Développement web et mobile", d: "Interfaces, applications, intégrations." },
  { r: "Hébergement et exploitation", d: "Mise en service, surveillance, sauvegardes." },
];

export interface NavItem {
  label: string;
  href: string;
}

/* Pas d'entrée « Contact » : le bouton « Parlons de votre projet » mène à la même page. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Notre méthode", href: "/methode" },
  { label: "L'agence", href: "/agence" },
];

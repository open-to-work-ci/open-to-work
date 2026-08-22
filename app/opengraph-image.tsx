import { ImageResponse } from "next/og";

export const alt = "OTW — Logiciels et services numériques";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Image par défaut, partagée par toutes les pages (pas une par page — hors
   de proportion pour un site de 7 pages). Dégradé aligné sur --gradient-deep
   (--otw-green-900 → --otw-green-950) de app/globals.css ; valeurs dupliquées
   en dur car ImageResponse s'exécute hors du cascade CSS de l'app. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(180deg, #04140B 0%, #02100A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#7ACB1A", fontSize: 22, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase" }}>
          Studio logiciel
        </div>
        <div style={{ display: "flex", color: "#FFFFFF", fontSize: 84, fontWeight: 700, marginTop: 20, letterSpacing: -2 }}>OTW</div>
        <div style={{ display: "flex", color: "#C3E6D2", fontSize: 30, marginTop: 24, maxWidth: 820 }}>
          Sites et plateformes web, applications mobile, hébergement, logiciels de gestion.
        </div>
      </div>
    ),
    { ...size },
  );
}

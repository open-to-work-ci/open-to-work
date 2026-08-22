import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Même monogramme que app/icon.tsx, en plus grand — iOS applique son propre
   masque d'arrondi, pas de borderRadius ici. Couleurs dupliquées en dur pour
   la même raison (voir app/icon.tsx). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#04140B" }}>
        <div style={{ display: "flex", color: "#7ACB1A", fontSize: 96, fontWeight: 700, fontFamily: "sans-serif" }}>O</div>
      </div>
    ),
    { ...size },
  );
}

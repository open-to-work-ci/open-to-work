import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/* Les logos fournis (public/assets/logo-otw*.png) sont un wordmark 1600×660,
   pas une marque carrée — inutilisable tel quel comme favicon. Ce monogramme
   généré reprend --otw-green-900 et --otw-lime-400 de app/globals.css ; les
   valeurs sont dupliquées en dur ici car ImageResponse s'exécute hors du
   cascade CSS de l'app et ne voit pas les custom properties. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04140B",
          borderRadius: 6,
        }}
      >
        <div style={{ display: "flex", color: "#7ACB1A", fontSize: 20, fontWeight: 700, fontFamily: "sans-serif" }}>O</div>
      </div>
    ),
    { ...size },
  );
}

import type { CSSProperties } from "react";

/** Shared uppercase label chrome for Input/Select/Textarea. */
export const fieldLabelStyle: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-xs)",
  fontWeight: "var(--fw-semibold)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--text-body)",
};

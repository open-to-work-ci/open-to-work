/** Section rule: a hairline with optional label and small green marks. */
export interface RuleProps extends React.HTMLAttributes<HTMLDivElement> {
  marks?: number;
  label?: string;
  dashed?: boolean;
}

export function Rule({ marks = 0, label, dashed = false, style, ...rest }: RuleProps) {
  const line: React.CSSProperties = {
    flex: 1,
    height: 1,
    background: dashed ? "repeating-linear-gradient(to right, var(--rule-soft) 0 4px, transparent 4px 9px)" : "var(--border-hairline)",
    backgroundSize: dashed ? "9px 1px" : undefined,
  };
  const parts: React.ReactNode[] = [];
  for (let i = 0; i < marks; i++) {
    parts.push(<span key={`l${i}`} style={line} />);
    parts.push(<span key={`m${i}`} style={{ width: 3, height: 3, flex: "0 0 auto", background: "var(--accent-mark)" }} />);
  }
  parts.push(<span key="l-end" style={line} />);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", width: "100%", ...style }} {...rest}>
      {label ? (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--fw-semibold)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--text-faint)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      ) : null}
      {parts}
    </div>
  );
}

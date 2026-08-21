"use client";

import type { CSSProperties, TextareaHTMLAttributes } from "react";
import { useId, useState } from "react";
import { fieldLabelStyle } from "./fieldLabelStyle";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  label?: string;
  hint?: string;
  error?: string;
  style?: CSSProperties;
}

export function Textarea({ label, hint, error, rows = 5, id, style, ...rest }: TextareaProps) {
  const [focus, setFocus] = useState(false);
  const uid = id || useId();
  return (
    <label htmlFor={uid} style={{ display: "grid", gap: "var(--space-2)", ...style }}>
      {label ? <span style={fieldLabelStyle}>{label}</span> : null}
      <textarea
        id={uid}
        rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          padding: "var(--space-3) var(--space-4)",
          background: "var(--surface-card)",
          color: "var(--text-strong)",
          border: `var(--border-width-hairline) solid ${error ? "var(--otw-danger)" : focus ? "var(--border-brand)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-control)",
          boxShadow: focus ? "0 0 0 3px color-mix(in oklab, var(--otw-green-500) 16%, transparent)" : "none",
          font: "var(--fw-regular) var(--text-base)/1.55 var(--font-sans)",
          outline: "none",
          resize: "vertical",
          transition: "var(--transition-control)",
        }}
        {...rest}
      />
      {error || hint ? (
        <span style={{ font: "var(--type-caption)", color: error ? "var(--otw-danger)" : "var(--text-faint)" }}>{error || hint}</span>
      ) : null}
    </label>
  );
}

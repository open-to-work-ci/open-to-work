"use client";

import type { CSSProperties, InputHTMLAttributes } from "react";
import { useId, useState } from "react";
import { fieldLabelStyle } from "./fieldLabelStyle";
import { Icon } from "./Icon";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: string;
  style?: CSSProperties;
}

export function Input({ label, hint, error, icon, type = "text", id, style, ...rest }: InputProps) {
  const [focus, setFocus] = useState(false);
  const uid = id || useId();
  return (
    <label htmlFor={uid} style={{ display: "grid", gap: "var(--space-2)", ...style }}>
      {label ? <span style={fieldLabelStyle}>{label}</span> : null}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          height: 46,
          padding: "0 var(--space-4)",
          background: "var(--surface-card)",
          border: `var(--border-width-hairline) solid ${error ? "var(--otw-danger)" : focus ? "var(--border-brand)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-control)",
          boxShadow: focus ? "0 0 0 3px color-mix(in oklab, var(--otw-green-500) 16%, transparent)" : "none",
          transition: "var(--transition-control)",
        }}
      >
        {icon ? <Icon name={icon} size={16} style={{ background: "var(--text-faint)" }} /> : null}
        <input
          id={uid}
          type={type}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "var(--fw-regular) var(--text-base)/1.4 var(--font-sans)",
            color: "var(--text-strong)",
          }}
          {...rest}
        />
      </span>
      {error || hint ? (
        <span style={{ font: "var(--type-caption)", color: error ? "var(--otw-danger)" : "var(--text-faint)" }}>{error || hint}</span>
      ) : null}
    </label>
  );
}

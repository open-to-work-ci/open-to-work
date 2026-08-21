"use client";

import type { CSSProperties, SelectHTMLAttributes } from "react";
import { useId, useState } from "react";
import { Icon } from "./Icon";

export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "style"> {
  label?: string;
  hint?: string;
  options?: SelectOption[];
  style?: CSSProperties;
}

export function Select({ label, hint, options = [], id, style, ...rest }: SelectProps) {
  const [focus, setFocus] = useState(false);
  const uid = id || useId();
  return (
    <label htmlFor={uid} style={{ display: "grid", gap: "var(--space-2)", ...style }}>
      {label ? (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--fw-semibold)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--text-body)",
          }}
        >
          {label}
        </span>
      ) : null}
      <span style={{ position: "relative", display: "block" }}>
        <select
          id={uid}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            height: 46,
            padding: "0 42px 0 var(--space-4)",
            appearance: "none",
            background: "var(--surface-card)",
            color: "var(--text-strong)",
            border: `var(--border-width-hairline) solid ${focus ? "var(--border-brand)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-control)",
            boxShadow: focus ? "0 0 0 3px color-mix(in oklab, var(--otw-green-500) 16%, transparent)" : "none",
            font: "var(--fw-regular) var(--text-base)/1 var(--font-sans)",
            outline: "none",
            transition: "var(--transition-control)",
          }}
          {...rest}
        >
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const text = typeof o === "string" ? o : o.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <Icon
          name="chevron-down"
          size={16}
          style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "var(--text-muted)", pointerEvents: "none" }}
        />
      </span>
      {hint ? <span style={{ font: "var(--type-caption)", color: "var(--text-faint)" }}>{hint}</span> : null}
    </label>
  );
}

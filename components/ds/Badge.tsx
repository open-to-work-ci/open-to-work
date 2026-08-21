"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";

const TONES = {
  brand: {
    bg: "var(--surface-brand-subtle)",
    fg: "var(--text-brand)",
    bd: "color-mix(in oklab, var(--otw-green-500) 26%, transparent)",
  },
  accent: {
    bg: "var(--surface-accent-subtle)",
    fg: "var(--text-accent)",
    bd: "color-mix(in oklab, var(--otw-green-500) 32%, transparent)",
  },
  neutral: {
    bg: "var(--surface-sunken)",
    fg: "var(--text-muted)",
    bd: "var(--border-hairline)",
  },
  solid: {
    bg: "var(--surface-brand)",
    fg: "var(--text-on-brand)",
    bd: "transparent",
  },
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  tone?: keyof typeof TONES;
  icon?: string;
  dot?: boolean;
  style?: CSSProperties;
}

export function Badge({ children, tone = "neutral", icon, dot = false, style, ...rest }: BadgeProps) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        height: 26,
        padding: "0 10px",
        background: t.bg,
        color: t.fg,
        border: `var(--border-width-hairline) solid ${t.bd}`,
        borderRadius: "var(--radius-xs)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--fw-medium)",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {dot ? (
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent-mark)" }} />
      ) : null}
      {icon ? <Icon name={icon} size={13} /> : null}
      {children}
    </span>
  );
}

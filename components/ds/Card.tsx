"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useState } from "react";

const VARIANTS = {
  default: {
    background: "var(--surface-card)",
    border: "var(--border-width-hairline) solid var(--border-hairline)",
  },
  raised: {
    background: "var(--surface-raised)",
    border: "var(--border-width-hairline) solid var(--border-hairline)",
    boxShadow: "var(--shadow-md)",
  },
  sunken: {
    background: "var(--surface-sunken)",
    border: "var(--border-width-hairline) solid transparent",
  },
  brand: {
    background: "var(--gradient-brand)",
    border: "var(--border-width-hairline) solid transparent",
    color: "var(--text-on-brand)",
  },
  outline: {
    background: "transparent",
    border: "var(--border-width-hairline) solid var(--border-default)",
  },
} as const;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: keyof typeof VARIANTS;
  interactive?: boolean;
  padding?: string;
  style?: CSSProperties;
}

export function Card({
  children,
  variant = "default",
  interactive = false,
  padding = "var(--pad-card)",
  style,
  ...rest
}: CardProps) {
  const [hover, setHover] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.default;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        padding,
        borderRadius: "var(--radius-card)",
        transition: "box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
        ...v,
        ...(interactive && hover ? { borderColor: "var(--border-brand)", boxShadow: "var(--shadow-md)" } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

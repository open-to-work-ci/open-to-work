"use client";

import Link from "next/link";
import type { CSSProperties, HTMLAttributes, MouseEvent } from "react";
import { useState } from "react";
import { Icon } from "./Icon";
import { useCurtainNav } from "@/lib/useCurtainNav";

export interface ServiceRowProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "style"> {
  index?: string;
  title?: string;
  description?: string;
  tags?: string[];
  icon?: string;
  href?: string;
  onClick?: () => void;
  last?: boolean;
  style?: CSSProperties;
}

/** Large numbered service row — the airy, editorial alternative to a card grid. */
export function ServiceRow({
  index,
  title,
  description,
  tags = [],
  href,
  onClick,
  last = false,
  style,
  ...rest
}: ServiceRowProps) {
  const [hover, setHover] = useState(false);
  const { internal, navigate } = useCurtainNav(href);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (internal) {
      e.preventDefault();
      navigate();
      return;
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const css: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto minmax(0,1fr) minmax(0,0.85fr) auto",
    alignItems: "start",
    gap: "var(--space-9)",
    padding: "var(--space-9) 0",
    borderTop: "var(--border-width-hairline) solid var(--border-hairline)",
    borderBottom: last ? "var(--border-width-hairline) solid var(--border-hairline)" : "none",
    textDecoration: "none",
    background: hover ? "var(--bg-subtle)" : "transparent",
    transition: "background var(--dur-base) var(--ease-standard)",
    ...style,
  };

  return (
    <Link
      href={href || "#"}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-row="service"
      style={css}
      {...rest}
    >
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)", paddingTop: 10 }}>
        {index}
      </span>
      <span style={{ display: "grid", gap: "var(--space-4)" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-bold)",
            fontSize: "var(--display-3)",
            lineHeight: 1.02,
            letterSpacing: "var(--tracking-display)",
            color: "var(--text-strong)",
          }}
        >
          {title}
        </span>
        {tags.length ? (
          <span style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
            {tags.map((t) => (
              <span key={t} style={{ font: "var(--fw-regular) var(--text-sm)/1 var(--font-sans)", color: "var(--text-faint)" }}>
                {t}
              </span>
            ))}
          </span>
        ) : null}
      </span>
      <span style={{ font: "var(--fw-regular) var(--text-md)/1.65 var(--font-sans)", color: "var(--text-muted)", paddingTop: 4 }}>{description}</span>
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 48,
          height: 48,
          borderRadius: "var(--radius-pill)",
          border: `var(--border-width-hairline) solid ${hover ? "var(--border-brand)" : "var(--border-hairline)"}`,
          background: hover ? "var(--surface-brand)" : "transparent",
          transition: "var(--transition-control)",
        }}
      >
        <Icon name="arrow-right" size={18} style={{ background: hover ? "var(--otw-white)" : "var(--text-strong)" }} />
      </span>
    </Link>
  );
}

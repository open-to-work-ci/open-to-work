"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { useState } from "react";
import { Icon } from "./Icon";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items?: AccordionItem[];
  defaultOpen?: number;
  style?: CSSProperties;
}

export function Accordion({ items = [], defaultOpen = 0, style, ...rest }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ display: "grid", ...style }} {...rest}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={it.question}
            style={{
              borderTop: "var(--border-width-hairline) solid var(--border-hairline)",
              borderBottom: i === items.length - 1 ? "var(--border-width-hairline) solid var(--border-hairline)" : "none",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-5)",
                width: "100%",
                padding: "var(--space-7) 0",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: isOpen ? "var(--text-strong)" : "var(--text-body)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--fw-semibold)",
                  letterSpacing: "var(--tracking-label)",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                  width: 28,
                  flex: "0 0 auto",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  flex: 1,
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--fw-semibold)",
                  fontSize: "var(--text-xl)",
                  lineHeight: 1.2,
                  letterSpacing: "var(--tracking-display-sm)",
                }}
              >
                {it.question}
              </span>
              <Icon name={isOpen ? "minus" : "plus"} size={18} style={{ background: isOpen ? "var(--text-brand)" : "var(--text-muted)" }} />
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? 340 : 0,
                opacity: isOpen ? 1 : 0,
                transition: "max-height var(--dur-slow) var(--ease-out-expo), opacity var(--dur-base) var(--ease-standard)",
              }}
            >
              <p
                style={{
                  padding: "0 var(--space-11) var(--space-7) 48px",
                  font: "var(--fw-regular) var(--text-md)/1.7 var(--font-sans)",
                  color: "var(--text-muted)",
                  maxWidth: "70ch",
                }}
              >
                {it.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

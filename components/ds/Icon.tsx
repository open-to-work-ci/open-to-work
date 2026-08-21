import * as LucideIcons from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import type { CSSProperties } from "react";

export interface IconProps extends Omit<LucideProps, "color"> {
  name?: string;
  color?: string;
  label?: string;
}

/** "code-xml" -> "CodeXml". Generic kebab-case -> PascalCase, no hardcoded table. */
function kebabToPascal(name: string): string {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function resolveIcon(name: string): LucideIcon {
  const pascal = kebabToPascal(name);
  const found = (LucideIcons as unknown as Record<string, LucideIcon | undefined>)[pascal];
  return found ?? LucideIcons.Circle;
}

/**
 * Ported from the design system's CSS-mask icon (where `background` was the
 * fill color) to real lucide-react glyphs. Every call site inherited from the
 * source design still colors icons via `style={{ background: "var(--token)" }}`
 * — honor that as the glyph color when no explicit `color` prop is given, so
 * the swap to lucide-react didn't require touching every one of those call sites.
 */
export function Icon({ name = "circle", size = 20, color, label, style, ...rest }: IconProps) {
  const Glyph = resolveIcon(name);
  const { background, backgroundColor, ...restStyle } = (style ?? {}) as CSSProperties & {
    background?: string;
    backgroundColor?: string;
  };
  const resolvedColor = color || backgroundColor || background || "currentColor";
  return (
    <Glyph
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      size={size}
      color={resolvedColor}
      style={{ display: "inline-block", flexShrink: 0, ...restStyle }}
      {...rest}
    />
  );
}

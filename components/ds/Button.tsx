"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from "react";
import { useState } from "react";
import { Icon } from "./Icon";
import { M } from "@/lib/motion";

const SIZES = {
  sm: { height: 38, padding: "0 16px", fontSize: "var(--text-sm)", icon: 15 },
  md: { height: 46, padding: "0 22px", fontSize: "var(--text-base)", icon: 16 },
  lg: { height: 56, padding: "0 30px", fontSize: "var(--text-md)", icon: 18 },
} as const;

type Variant = "primary" | "accent" | "outline" | "ghost";

function variantStyle(variant: Variant, hover: boolean): CSSProperties {
  switch (variant) {
    case "accent":
      return {
        background: hover ? "var(--otw-lime-900)" : "var(--surface-accent)",
        color: "var(--text-on-accent)",
        borderColor: "transparent",
      };
    case "outline":
      return {
        background: hover ? "var(--surface-brand-subtle)" : "transparent",
        color: "var(--text-strong)",
        borderColor: hover ? "var(--border-brand)" : "var(--border-default)",
      };
    case "ghost":
      return {
        background: hover ? "var(--surface-brand-subtle)" : "transparent",
        color: hover ? "var(--text-strong)" : "var(--text-body)",
        borderColor: "transparent",
      };
    case "primary":
    default:
      return {
        background: hover ? "var(--otw-green-600)" : "var(--surface-brand)",
        color: "var(--text-on-brand)",
        borderColor: "transparent",
      };
  }
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>, "style"> {
  children?: ReactNode;
  variant?: Variant;
  size?: keyof typeof SIZES;
  iconLeft?: string;
  iconRight?: string;
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
}

function isInternal(href?: string) {
  return !!href && href.startsWith("/");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  href,
  disabled = false,
  fullWidth = false,
  onClick,
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const router = useRouter();
  const s = SIZES[size] || SIZES.md;
  const internal = isInternal(href);

  const css: CSSProperties = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    height: s.height,
    padding: s.padding,
    fontFamily: "var(--font-sans)",
    fontSize: s.fontSize,
    fontWeight: "var(--fw-medium)",
    letterSpacing: "0",
    textDecoration: "none",
    border: "var(--border-width-hairline) solid transparent",
    borderRadius: "var(--radius-control)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transform: active && !disabled ? "translateY(1px)" : "translateY(0)",
    transition: "var(--transition-control)",
    whiteSpace: "nowrap",
    ...variantStyle(variant, hover && !disabled),
    ...style,
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;
    if (internal) {
      e.preventDefault();
      M.curtain(() => router.push(href!));
    }
    (onClick as (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void | undefined)?.(e);
  };

  const shared = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: css,
  };

  if (href) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        {...shared}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {iconLeft ? <Icon name={iconLeft} size={s.icon} /> : null}
        {children}
        {iconRight ? <Icon name={iconRight} size={s.icon} /> : null}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      {...shared}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {iconLeft ? <Icon name={iconLeft} size={s.icon} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={s.icon} /> : null}
    </button>
  );
}

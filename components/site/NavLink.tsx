"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { M } from "@/lib/motion";

export interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children?: ReactNode;
  /** Runs before the curtain plays — e.g. closing the mobile drawer. */
  onNavigate?: () => void;
}

/**
 * Internal navigation link that plays the curtain transition, then does a
 * real App Router push — the mechanism required in place of the source
 * design's hash router `go()`. Used anywhere the source rendered a
 * navigational element as a plain `<button onClick={() => go(href)}>`
 * (nav items, drawer items, footer links, breadcrumbs): rendering a real
 * `<a>` here keeps those crawlable, which a plain button would not be.
 */
export function NavLink({ href, onClick, onNavigate, children, ...rest }: NavLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        onNavigate?.();
        M.curtain(() => router.push(href));
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

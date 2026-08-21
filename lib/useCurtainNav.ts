"use client";

import { useRouter } from "next/navigation";
import { M } from "@/lib/motion";

/** True for in-app paths — the only hrefs the curtain transition should intercept. */
export function isInternalHref(href?: string): boolean {
  return !!href && href.startsWith("/");
}

/**
 * Shared "internal link that plays the curtain transition, then does a real
 * App Router push" behavior — the mechanism required in place of the source
 * design's hash router `go()`. `NavLink`, `Button`, and `ServiceRow` each
 * render their own markup around a click, so this hook (rather than a
 * wrapping component) is what keeps the internal/external check and the
 * transition logic in exactly one place.
 */
export function useCurtainNav(href: string | undefined) {
  const router = useRouter();
  const internal = isInternalHref(href);
  return {
    internal,
    navigate() {
      if (internal) M.curtain(() => router.push(href!));
    },
  };
}

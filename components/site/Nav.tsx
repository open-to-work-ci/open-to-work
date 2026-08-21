"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "@/components/ds";
import { NAV_ITEMS } from "@/lib/data";
import { M } from "@/lib/motion";
import { K, Wrap } from "./ui";
import { NavLink } from "./NavLink";

export function Nav() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const burger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() || "/";

  // Un aria-hidden ne doit jamais recouvrir l'élément qui a le focus — sinon
  // la navigation au clavier/lecteur d'écran se retrouve bloquée dans un
  // sous-arbre invisible. Si le focus est resté dans le tiroir en se
  // fermant, on le ramène sur le bouton qui l'a ouvert.
  useEffect(() => {
    if (open) return;
    const active = document.activeElement;
    if (panel.current && active instanceof HTMLElement && panel.current.contains(active)) {
      burger.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const p = panel.current;
    const s = scrim.current;
    if (!p || !s) return;
    const items = Array.from(p.querySelectorAll<HTMLElement>("[data-di]"));
    gsap.killTweensOf([p, s, ...items]);
    // Un seul canal de transformation : xPercent. La CSS ne pose aucun transform,
    // sinon GSAP l'additionne dans x et le tiroir n'arrive jamais à l'écran.
    if (!mounted.current) {
      mounted.current = true;
      gsap.set(p, { xPercent: 104, autoAlpha: 0 });
      gsap.set(s, { autoAlpha: 0 });
    }
    const land = () => {
      gsap.set(p, { x: 0, xPercent: open ? 0 : 104, autoAlpha: open ? 1 : 0 });
      gsap.set(s, { autoAlpha: open ? 1 : 0 });
      if (open) gsap.set(items, { x: 0, autoAlpha: 1 });
    };
    if (open) {
      if (M.lenis) M.lenis.stop();
      gsap
        .timeline({ onComplete: land })
        .to(s, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0)
        .fromTo(p, { xPercent: 104 }, { xPercent: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" }, 0)
        .fromTo(items, { autoAlpha: 0, x: 26 }, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.05, ease: "expo.out" }, 0.16);
    } else {
      if (M.lenis) M.lenis.start();
      gsap.to(s, { autoAlpha: 0, duration: 0.3 });
      gsap.to(p, { xPercent: 104, autoAlpha: 0, duration: 0.5, ease: "power3.inOut", onComplete: land });
    }
    const t = setTimeout(land, 1100); // filet de sécurité si le ticker est gelé
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", esc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  const on = (href: string) => pathname === href || (href === "/services" && pathname.startsWith("/service"));

  return (
    <>
      <header id="nav">
        <Wrap wide>
          <div className="nav-in">
            <NavLink href="/" className="nav-logo" data-magnetic aria-label="OTW — accueil">
              <img src="/assets/logo-otw.png" alt="OTW" />
            </NavLink>
            <nav className="nav-links">
              {NAV_ITEMS.map((n) => (
                <NavLink key={n.href} href={n.href} className="nav-l" data-on={on(n.href) ? "1" : "0"} data-cursor="link">
                  {n.label}
                </NavLink>
              ))}
              <Button size="sm" iconRight="arrow-right" data-magnetic href="/contact">
                Parlons de votre projet
              </Button>
            </nav>
            <button
              ref={burger}
              className="burger"
              data-open={open ? "1" : "0"}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <i />
              <i />
            </button>
          </div>
        </Wrap>
      </header>
      <div id="scrim" ref={scrim} onClick={() => setOpen(false)} />
      <aside id="drawer" ref={panel} data-theme="dark" aria-hidden={!open}>
        <div className="dw-head" data-di>
          <img src="/assets/logo-otw-white.png" alt="OTW" style={{ height: 26 }} />
          <button
            className="mono"
            style={{ background: "none", border: 0, padding: "6px 0", color: "color-mix(in oklab,#fff 55%,transparent)" }}
            onClick={() => setOpen(false)}
          >
            Fermer
          </button>
        </div>
        <nav className="dw-nav">
          {[{ label: "Accueil", href: "/" }, ...NAV_ITEMS].map((n, i) => (
            <NavLink
              className="dw-l"
              key={n.href}
              href={n.href}
              data-di
              data-cursor="link"
              data-on={on(n.href) ? "1" : "0"}
              onNavigate={() => setOpen(false)}
            >
              <em>0{i + 1}</em>
              <b>{n.label}</b>
              <Icon name="arrow-right" size={17} style={{ background: on(n.href) ? "var(--sig)" : "color-mix(in oklab,#fff 45%,transparent)" }} />
            </NavLink>
          ))}
        </nav>
        <div className="dw-foot" data-di>
          <K sig>Une question ?</K>
          <span style={{ font: "var(--fw-regular) var(--text-base)/1.6 var(--font-sans)", color: "var(--text-muted)" }}>
            Un membre de l&apos;équipe technique vous répond sous 24 heures ouvrées.
          </span>
          <Button size="lg" iconRight="arrow-right" href="/contact" onClick={() => setOpen(false)}>
            Parlons de votre projet
          </Button>
          <span className="mono">contact@otw.example</span>
        </div>
      </aside>
    </>
  );
}

"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { M, type SceneHandle } from "@/lib/motion";
import { Foot } from "./Foot";
import { Nav } from "./Nav";
import { Peek } from "./Peek";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const scene = useRef<SceneHandle | null>(null);
  const first = useRef(true);
  const field = useRef<(() => void) | null>(null);

  // Amorçage global (Lenis, curseur, masquage nav) — une seule fois, au montage client.
  useEffect(() => {
    M.boot();
  }, []);

  // À chaque changement de route : ne tuer que le câblage GSAP de l'écran
  // précédent (scene.current.kill() révoque le contexte GSAP scopé à cette
  // scène — voir lib/motion.ts) puis câbler la nouvelle scène. Le trigger de
  // masquage de la nav, créé une seule fois par M.nav() dans boot(), n'est
  // jamais touché par ce cycle et n'a donc pas besoin d'être recréé ici.
  useEffect(() => {
    if (scene.current) scene.current.kill();
    if (field.current) {
      field.current();
      field.current = null;
    }
    const root = document.getElementById("main");
    if (!root) return;
    gsap.set(root.querySelectorAll("[data-rv],[data-rvi],[data-hero-i]"), { clearProps: "all" });
    // setTimeout et non requestAnimationFrame : dans un onglet masqué rAF ne se
    // déclenche pas, et la scène ne serait jamais câblée.
    const t = setTimeout(() => {
      const s = M.scene(root);
      scene.current = s;
      const c = document.getElementById("field") as HTMLCanvasElement | null;
      if (c) field.current = M.field(c);
      if (first.current) {
        first.current = false;
        M.preload((d) => s.heroIn(d));
      } else {
        s.heroIn(0.1);
      }
    }, 80);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <div id="pre">
        <div className="pre-mid">
          <img src="/assets/logo-otw-white.png" alt="OTW" />
        </div>
        <div className="pre-bot">
          <span className="pre-n">000</span>
          <span className="mono" style={{ color: "color-mix(in oklab,#fff 55%,transparent)" }}>
            Chargement
          </span>
        </div>
        <div className="pre-bar" />
      </div>
      <div id="curtain">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div id="prog" />
      <div id="cur" />
      <div id="cur-r">
        <span />
      </div>
      <Peek />
      <Nav />
      <main id="main">{children}</main>
      <Foot />
    </>
  );
}

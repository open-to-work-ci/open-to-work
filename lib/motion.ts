"use client";

/* Moteur de mouvement OTW — GSAP + Lenis. Un seul point d'entrée par écran :
   M.scene(root) câble tout ce qui porte un attribut data-*.

   Port de site-jour1/motion.jsx : la seule différence structurelle est que
   `reduced` (prefers-reduced-motion) est calculé à la demande plutôt qu'au
   chargement du module — un module "use client" est quand même rendu une
   première fois côté serveur, où `window` n'existe pas. Toute la logique
   est sinon portée telle quelle. */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type Kill = () => void;

export interface SceneHandle {
  heroIn: (delay?: number) => void;
  kill: () => void;
}

function isReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let pluginsRegistered = false;
function ensurePlugins() {
  if (pluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
}

export const M = {
  lenis: null as Lenis | null,

  boot() {
    ensurePlugins();
    gsap.defaults({ ease: "expo.out" });
    if (!isReduced()) {
      M.lenis = new Lenis({ duration: 1.05, wheelMultiplier: 0.9, smoothWheel: true, touchMultiplier: 1.6 });
      M.lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => M.lenis?.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    M.cursor();
    M.nav();
  },

  top() {
    if (M.lenis) M.lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  },

  /* ── découpe d'un titre en lignes masquées ───────────────────── */
  split(el: HTMLElement): HTMLElement[] {
    if (el.dataset.done === "1") return Array.from(el.querySelectorAll<HTMLElement>(".ln>span"));
    const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
    el.innerHTML = txt
      .split(" ")
      .map((w) => `<span class="w">${w}</span>`)
      .join(" ");
    const words = Array.from(el.querySelectorAll<HTMLElement>(".w"));
    const lines: string[][] = [];
    let cur: string[] | null = null;
    let top: number | null = null;
    words.forEach((w) => {
      const t = Math.round(w.offsetTop);
      if (top === null || Math.abs(t - top) > 6) {
        top = t;
        cur = [];
        lines.push(cur);
      }
      cur!.push(w.textContent || "");
    });
    el.innerHTML = lines.map((l) => `<span class="ln"><span>${l.join(" ")}</span></span>`).join("");
    el.dataset.done = "1";
    return Array.from(el.querySelectorAll<HTMLElement>(".ln>span"));
  },
  linesIn(el: HTMLElement, delay?: number) {
    const lines = M.split(el);
    if (isReduced()) return gsap.set(lines, { y: 0 });
    return gsap.fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 1.05, stagger: 0.075, delay: delay || 0, ease: "expo.out" });
  },

  /* ── curseur suiveur + aimant ────────────────────────────────── */
  cursor() {
    if (isReduced() || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const dot = document.getElementById("cur");
    const ring = document.getElementById("cur-r");
    if (!dot || !ring) return;
    document.body.classList.add("custom-cursor");
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    /* Éléments "aimant" actuellement tirés vers le curseur — évite de rescanner
       tout le document à chaque pointermove pour les relâcher. */
    const pulled = new Set<HTMLElement>();
    window.addEventListener(
      "pointermove",
      (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
        dx(mx);
        dy(my);
        rx(mx);
        ry(my);
        const target = e.target as HTMLElement;
        const t = target.closest<HTMLElement>("[data-cursor]");
        const label = ring.querySelector<HTMLElement>("span");
        document.body.classList.toggle("cur-view", !!(t && t.dataset.cursor !== "link"));
        document.body.classList.toggle("cur-link", !!(t && t.dataset.cursor === "link"));
        if (t && t.dataset.cursor && t.dataset.cursor !== "link" && label) label.textContent = t.dataset.cursor;
        const mag = target.closest<HTMLElement>("[data-magnetic]");
        if (mag) {
          const r = mag.getBoundingClientRect();
          gsap.to(mag, { x: (mx - (r.left + r.width / 2)) * 0.14, y: (my - (r.top + r.height / 2)) * 0.22, duration: 0.5, ease: "power3.out" });
          mag.dataset.pulled = "1";
          pulled.add(mag);
        }
        pulled.forEach((el) => {
          if (el !== mag) {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
            el.dataset.pulled = "0";
            pulled.delete(el);
          }
        });
      },
      { passive: true },
    );
  },

  /* ── barre de navigation : masquage + inversion sur fond profond ── */
  nav() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    let last = 0;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const y = self.scroll();
        nav.dataset.hide = y > 220 && y > last ? "1" : "0";
        last = y;
      },
    });
  },

  /* ── fond animé discret (WebGL, sinon rien) ──────────────────── */
  field(canvas: HTMLCanvasElement): Kill | null {
    let gl: WebGLRenderingContext | null;
    try {
      gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
    } catch {
      gl = null;
    }
    if (!gl || isReduced()) return null;
    const glc = gl;
    const src = (t: number, s: string) => {
      const sh = glc.createShader(t)!;
      glc.shaderSource(sh, s);
      glc.compileShader(sh);
      return sh;
    };
    const p = glc.createProgram()!;
    glc.attachShader(p, src(glc.VERTEX_SHADER, "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}"));
    glc.attachShader(
      p,
      src(
        glc.FRAGMENT_SHADER,
        [
          "precision mediump float;uniform vec2 r;uniform float t;",
          "float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}",
          "float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}",
          "float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}",
          "void main(){vec2 uv=gl_FragCoord.xy/r;vec2 q=uv*vec2(r.x/r.y,1.);",
          "float f=fbm(q*1.5+vec2(t*.035,-t*.018));float g=smoothstep(.28,.92,f);",
          "vec3 c=mix(vec3(0.,.40,.20),vec3(.37,.80,.06),g*.42);",
          "float m=smoothstep(1.05,.12,length(uv-vec2(.62,.42)));",
          "gl_FragColor=vec4(c,g*.115*m);}",
        ].join("\n"),
      ),
    );
    glc.linkProgram(p);
    if (!glc.getProgramParameter(p, glc.LINK_STATUS)) return null;
    glc.useProgram(p);
    const buf = glc.createBuffer();
    glc.bindBuffer(glc.ARRAY_BUFFER, buf);
    glc.bufferData(glc.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), glc.STATIC_DRAW);
    const a = glc.getAttribLocation(p, "a");
    glc.enableVertexAttribArray(a);
    glc.vertexAttribPointer(a, 2, glc.FLOAT, false, 0, 0);
    const uR = glc.getUniformLocation(p, "r");
    const uT = glc.getUniformLocation(p, "t");
    glc.enable(glc.BLEND);
    glc.blendFunc(glc.SRC_ALPHA, glc.ONE_MINUS_SRC_ALPHA);
    const size = () => {
      const w = Math.round(canvas.clientWidth * 0.5);
      const h = Math.round(canvas.clientHeight * 0.5);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        glc.viewport(0, 0, w, h);
      }
      glc.uniform2f(uR, canvas.width, canvas.height);
    };
    let live = true;
    const t0 = performance.now();
    const tick = () => {
      if (!canvas.isConnected) {
        live = false;
        gsap.ticker.remove(tick);
        return;
      }
      if (!live) return;
      size();
      glc.uniform1f(uT, (performance.now() - t0) / 1000);
      glc.drawArrays(glc.TRIANGLES, 0, 3);
    };
    gsap.ticker.add(tick);
    const io = new IntersectionObserver((entries) => {
      live = entries[0].isIntersecting;
    });
    io.observe(canvas);
    return () => {
      live = false;
      io.disconnect();
      gsap.ticker.remove(tick);
    };
  },

  /* ── scène : tout le câblage d'un écran ──────────────────────── */
  scene(root: HTMLElement): SceneHandle {
    // Tout ce qui est créé de façon synchrone dans ce callback (tweens,
    // ScrollTriggers) est suivi par ce contexte GSAP et révoqué d'un bloc par
    // ctx.revert() — c'est ce qui permet à AppChrome de ne tuer, à chaque
    // changement de route, que le câblage de CETTE scène plutôt que tous les
    // ScrollTriggers de l'app (y compris celui, créé une seule fois par
    // M.nav(), qui gère le masquage de la barre de navigation).
    const kills: Kill[] = [];
    const ctx = gsap.context(() => {
      const q = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));

      /* progression de lecture — élément passé par référence (pas par sélecteur
         texte) : #prog est un frère de root dans le DOM, hors de la portée que
         gsap.context() restreint aux descendants de root pour les sélecteurs. */
      const progEl = document.getElementById("prog");
      if (progEl) gsap.to(progEl, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.25 } });

      /* titres : lignes masquées */
      q("[data-split]").forEach((el) => {
        if (el.dataset.split === "hero") return;
        const lines = M.split(el);
        gsap.fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 1, stagger: 0.07, scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      /* blocs et enfants décalés */
      q("[data-rv]").forEach((el) => {
        const kids = Array.from(el.querySelectorAll<HTMLElement>("[data-rvi]"));
        const st = { trigger: el, start: "top 88%" };
        if (kids.length) gsap.fromTo(kids, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, scrollTrigger: st });
        else gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.85, scrollTrigger: st });
      });

      /* médias : dévoilement par volet */
      q(".rv").forEach((el) => {
        const inner = el.firstElementChild as HTMLElement | null;
        if (inner) gsap.fromTo(inner, { yPercent: 101, scale: 1.04 }, { yPercent: 0, scale: 1, duration: 1.25, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      /* compteurs — un seul ScrollTrigger : l'écriture finale de secours (si
         le ticker n'avance pas) se déclenche depuis le onEnter du tween. */
      q("[data-count]").forEach((el) => {
        const to = parseFloat(el.dataset.count || "0");
        const o = { v: 0 };
        const write = (n: number) => {
          el.textContent = String(Math.round(n));
        };
        let tw: gsap.core.Tween | undefined;
        tw = gsap.to(o, {
          v: to,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter() {
              setTimeout(() => {
                if (!tw || tw.progress() < 1) write(to);
              }, 1900);
            },
          },
          onUpdate() {
            write(o.v);
          },
        });
      });

      /* bandeaux défilants */
      q("[data-mq]").forEach((el) => {
        const track = el.querySelector<HTMLElement>(".mq-t");
        if (!track) return;
        const dir = el.dataset.mq === "rev" ? 1 : -1;
        gsap.fromTo(track, { xPercent: dir === -1 ? 0 : -50 }, { xPercent: dir === -1 ? -50 : 0, duration: 26, ease: "none", repeat: -1 });
      });

      /* manifeste : mots qui s'allument au scroll */
      q("[data-manifest]").forEach((el) => {
        if (el.dataset.done !== "1") {
          const sig = (el.dataset.manifest || "").split("|").filter(Boolean);
          el.innerHTML = (el.textContent || "")
            .trim()
            .split(/\s+/)
            .map((w) => `<w${sig.some((s) => w.indexOf(s) === 0) ? ' class="sig"' : ""}>${w}</w>`)
            .join(" ");
          el.dataset.done = "1";
        }
        const words = Array.from(el.querySelectorAll<HTMLElement>("w"));
        ScrollTrigger.create({
          trigger: el,
          start: "top 78%",
          end: "bottom 42%",
          scrub: true,
          onUpdate(self) {
            const n = Math.round(self.progress * words.length);
            words.forEach((w, i) => w.classList.toggle("on", i < n));
          },
        });
      });

      /* étapes épinglées (sticky CSS + scrub) */
      q("[data-steps]").forEach((el) => {
        const panes = Array.from(el.querySelectorAll<HTMLElement>(".stp-p"));
        const nEl = el.querySelector<HTMLElement>(".stp-n");
        const bar = el.querySelector<HTMLElement>(".stp-bar i");
        el.style.height = panes.length * 78 + 40 + "vh";
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate(self) {
            const i = Math.min(panes.length - 1, Math.floor(self.progress * panes.length * 0.999));
            panes.forEach((p, k) => {
              const on = k === i;
              if ((p.dataset.on === "1") !== on) {
                p.dataset.on = on ? "1" : "0";
                if (on) gsap.fromTo(p, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });
              }
            });
            if (nEl) nEl.textContent = "0" + (i + 1);
            if (bar) bar.style.transform = "scaleX(" + self.progress.toFixed(3) + ")";
          },
        });
      });

      /* séquence horizontale */
      q("[data-hs]").forEach((el) => {
        const track = el.querySelector<HTMLElement>(".hs-track");
        if (!track || window.innerWidth < 960) {
          el.style.height = "auto";
          el.dataset.off = "1";
          return;
        }
        el.dataset.off = "0";
        const set = () => {
          const dist = Math.max(0, track.scrollWidth - window.innerWidth + 40);
          el.style.height = window.innerHeight + dist + "px";
          return dist;
        };
        let dist = set();
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh() {
            dist = set();
          },
          onUpdate(self) {
            gsap.set(track, { x: -dist * self.progress });
          },
        });
      });

      /* aperçu qui suit le curseur sur la liste de services — écouteurs DOM
         bruts (pas des animations GSAP), donc suivis dans `kills` plutôt que
         par le contexte. */
      const peek = document.getElementById("peek");
      const rows = q("[data-peek]");
      if (peek && rows.length && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
        const px = gsap.quickTo(peek, "x", { duration: 0.55, ease: "power3.out" });
        const py = gsap.quickTo(peek, "y", { duration: 0.55, ease: "power3.out" });
        const shots = Array.from(peek.children) as HTMLElement[];
        const onMove = (e: PointerEvent) => {
          px(e.clientX);
          py(e.clientY);
        };
        rows.forEach((r) => {
          r.addEventListener("mouseenter", () => {
            const i = parseInt(r.dataset.peek || "0", 10);
            shots.forEach((s, k) => gsap.set(s, { display: k === i ? "block" : "none" }));
            gsap.to(peek, { opacity: 1, scale: 1, duration: 0.45, ease: "expo.out" });
          });
          r.addEventListener("mouseleave", () => gsap.to(peek, { opacity: 0, scale: 0.94, duration: 0.3 }));
        });
        window.addEventListener("pointermove", onMove, { passive: true });
        kills.push(() => {
          window.removeEventListener("pointermove", onMove);
          gsap.set(peek, { opacity: 0 });
        });
      }

      /* inversion du curseur et de la barre sur les fonds profonds */
      q('[data-theme="dark"]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 40px",
          end: "bottom 40px",
          onToggle(self) {
            document.body.classList.toggle("cur-dark", self.isActive);
          },
        });
      });
    }, root);

    /* hero : au premier chargement, l'entrée est jouée par le préchargeur */
    const hero = root.querySelector<HTMLElement>('[data-split="hero"]');
    const heroIn = (delay?: number) => {
      if (!hero) return;
      M.linesIn(hero, delay);
      const kids = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-i]"));
      if (kids.length) gsap.fromTo(kids, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, delay: (delay || 0) + 0.28 });
    };

    setTimeout(() => ScrollTrigger.refresh(), 40);
    setTimeout(() => {
      root.querySelectorAll<HTMLElement>("[data-rv],[data-rvi],[data-hero-i]").forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) gsap.set(el, { opacity: 1, y: 0, clearProps: "opacity,transform" });
      });
      root.querySelectorAll<HTMLElement>(".rv>*").forEach((el) => {
        if (el.parentElement && el.parentElement.getBoundingClientRect().top < window.innerHeight && Math.abs(Number(gsap.getProperty(el, "yPercent"))) > 40) {
          gsap.set(el, { yPercent: 0, scale: 1 });
        }
      });
      root.querySelectorAll<HTMLElement>(".ln>span").forEach((el) => {
        if (Math.abs(Number(gsap.getProperty(el, "yPercent"))) > 60) gsap.set(el, { yPercent: 0 });
      });
      ScrollTrigger.refresh();
    }, 900);

    return {
      heroIn,
      kill: () => {
        kills.forEach((f) => f());
        ctx.revert();
      },
    };
  },

  /* ── préchargement compté ────────────────────────────────────── */
  preload(done: (delay: number) => void) {
    const pre = document.getElementById("pre");
    if (!pre) return done(0);
    if (isReduced()) {
      pre.style.display = "none";
      return done(0);
    }
    const num = pre.querySelector<HTMLElement>(".pre-n");
    const bar = pre.querySelector<HTMLElement>(".pre-bar");
    const mid = pre.querySelector<HTMLElement>(".pre-mid");
    const bot = pre.querySelector<HTMLElement>(".pre-bot");
    const o = ((window as unknown as { __preCount?: { v: number } }).__preCount ||= { v: 0 });
    gsap.killTweensOf(o);
    setTimeout(() => {
      pre.style.display = "none";
    }, 4200); // filet de sécurité si le ticker est gelé
    gsap
      .timeline()
      .to(
        o,
        {
          v: 100,
          duration: 1.25,
          ease: "power2.inOut",
          onUpdate() {
            if (num) num.textContent = String(Math.round(o.v)).padStart(3, "0");
          },
        },
        0,
      )
      .to(bar, { scaleX: 1, duration: 1.25, ease: "power2.inOut" }, 0)
      .to(mid, { y: -26, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.1)
      .to(bot, { y: 26, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.15)
      .to(
        pre,
        {
          yPercent: -100,
          duration: 1.05,
          ease: "expo.inOut",
          onComplete() {
            pre.style.display = "none";
          },
        },
        1.3,
      );
    done(1.55);
  },

  /* ── rideau de transition entre écrans ───────────────────────── */
  curtain(swap: () => void) {
    const cols = Array.from(document.querySelectorAll<HTMLElement>("#curtain i"));
    if (isReduced() || !cols.length) {
      swap();
      return;
    }
    gsap
      .timeline()
      .to(cols, { scaleY: 1, transformOrigin: "50% 100%", duration: 0.5, stagger: 0.05, ease: "power3.inOut" })
      .add(() => {
        swap();
        M.top();
      })
      .to(cols, { scaleY: 0, transformOrigin: "50% 0%", duration: 0.55, stagger: 0.05, ease: "power3.inOut" }, "+=0.12")
      .set(cols, { transformOrigin: "50% 100%" });
  },
};

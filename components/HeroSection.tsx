"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Kinetic entrance + parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.to(".hero-bg", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Abstract topographic canvas (subtle animated contour lines)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    let raf = 0;
    let t0 = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      const time = ts / 1000;
      const dt = time - t0;
      t0 = time;
      void dt;
      const { width: w, height: h } = canvas;
      ctx2d.clearRect(0, 0, w, h);
      ctx2d.strokeStyle = "rgba(194,168,120,0.18)";
      ctx2d.lineWidth = 1 * devicePixelRatio;
      const lines = 9;
      for (let i = 0; i < lines; i++) {
        ctx2d.beginPath();
        const baseY = (h / (lines + 1)) * (i + 1);
        for (let x = 0; x <= w; x += 8 * devicePixelRatio) {
          const y =
            baseY +
            Math.sin(x * 0.0016 + time * 0.4 + i * 0.9) * 26 * devicePixelRatio +
            Math.cos(x * 0.0007 - time * 0.25 + i) * 18 * devicePixelRatio;
          x === 0 ? ctx2d.moveTo(x, y) : ctx2d.lineTo(x, y);
        }
        ctx2d.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={root}
      className="hero-grain relative min-h-screen flex items-center overflow-hidden"
      aria-label={t("القسم الرئيسي", "Hero")}
    >
      <div className="hero-bg absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/80 to-navy" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
        <div className="absolute -top-32 -end-32 w-[36rem] h-[36rem] rounded-full bg-terracotta/10 blur-3xl animate-floaty" />
        <div className="absolute bottom-0 -start-32 w-[30rem] h-[30rem] rounded-full bg-sand/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <p className="hero-sub text-sand tracking-[0.35em] text-xs md:text-sm uppercase mb-8">
          {t("لوجار للتسويق والاستثمار العقاري", "Lugar Real Estate Marketing & Investment")}
        </p>
        <h1 className="font-bold leading-[1.05] text-[clamp(2.6rem,8vw,6.5rem)]">
          <span className="hero-line block overflow-hidden">
            {t("استثمر بأمان.", "Invest safely.")}
          </span>
          <span className="hero-line block overflow-hidden text-gradient">
            {t("امتلك المستقبل.", "Own the future.")}
          </span>
        </h1>
        <p className="hero-sub mt-8 max-w-xl text-lg md:text-xl opacity-80 leading-relaxed">
          {t(
            "شريكك الموثوق في الاستثمار العقاري — فرص حصرية، عوائد مرتفعة، ودعم مستمر في كل خطوة.",
            "Your trusted partner in real estate investment — exclusive opportunities, high returns, and continuous support at every step."
          )}
        </p>
        <div className="hero-sub mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="glass rounded-full px-8 py-4 font-semibold hover:border-sand transition btn-glow"
          >
            {t("استكشف المشاريع", "Explore Projects")}
          </a>
          <a
            href="https://wa.me/201028232191?text=مرحباً، أود الاستفسار عن فرص الاستثمار العقاري"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 font-semibold bg-sand text-navy hover:bg-terracotta hover:text-offwhite transition"
          >
            {t("تحدث مع مستشار", "Talk to an Advisor")}
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest opacity-60 animate-floaty"
        aria-hidden="true"
      >
        {t("مرر للأسفل", "SCROLL")} ↓
      </div>
    </section>
  );
}

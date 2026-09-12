"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGrid() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          rotateX: 6,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
      gsap.from(".grid-heading", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="projects" className="section-shell relative py-20 md:py-28" aria-label={t("المشاريع", "Projects")}>
      <div className="grid-heading mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sand tracking-[0.35em] text-xs uppercase mb-4">
            {t("الأرشيف", "The Archive")}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            {t("مشاريع ", "Selected ")}
            <span className="text-gradient">{t("مختارة", "Projects")}</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm opacity-60 leading-relaxed">
          {t(
            "فهرس منسّق بعناية لأعلى الفرص قيمة في السوق المصري — محدث باستمرار.",
            "A meticulously curated index of Egypt's highest-value opportunities — continuously updated."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

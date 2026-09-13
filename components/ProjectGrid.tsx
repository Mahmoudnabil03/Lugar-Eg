"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGrid() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("query")?.trim().toLowerCase() ?? "");
      setPropertyType(params.get("type") ?? "");
      setBudget(params.get("budget") ?? "");
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const visibleProjects = useMemo(() => {
    const normalizePrice = (value: string) => {
      if (!value || value.toLowerCase().includes("request")) return null;
      const cleaned = value.replace(/[^0-9.]/g, "").replace(/,/g, "");
      const numeric = Number(cleaned);
      return Number.isFinite(numeric) ? numeric : null;
    };

    return projects.filter((project) => {
      const haystack = [
        project.title[lang],
        project.location[lang],
        project.type[lang],
        project.title.en,
        project.location.en,
        project.type.en,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !query || haystack.includes(query);
      const matchesType = !propertyType || project.type.en.toLowerCase().includes(propertyType.toLowerCase());

      let matchesBudget = true;
      if (budget) {
        const rawPrice = normalizePrice(project.price);
        if (rawPrice !== null) {
          if (budget === "under-2m") matchesBudget = rawPrice < 2_000_000;
          if (budget === "2m-5m") matchesBudget = rawPrice >= 2_000_000 && rawPrice <= 5_000_000;
          if (budget === "5m-10m") matchesBudget = rawPrice > 5_000_000 && rawPrice <= 10_000_000;
          if (budget === "10m-plus") matchesBudget = rawPrice > 10_000_000;
        } else {
          matchesBudget = false;
        }
      }

      return matchesQuery && matchesType && matchesBudget;
    });
  }, [query, propertyType, budget, lang]);

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
      <div className="grid-heading mb-14 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-white/55">
            {t("الأرشيف", "The Archive")}
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            {t("مشاريع ", "Selected ")}
            <span className="text-white/70">{t("مختارة", "Projects")}</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-white/60">
          {t(
            "فهرس منسّق بعناية لأعلى الفرص الاستثمارية في السوق المصري — محدث باستمرار.",
            "A carefully selected portfolio of Egypt’s strongest real-estate opportunities — updated continuously."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:auto-rows-[minmax(16rem,auto)]">
        {visibleProjects.length > 0 ? (
          visibleProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)
        ) : (
          <div className="md:col-span-3 rounded-[28px] border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-white/50">{t("لا توجد نتائج", "No matches")}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{t("حاول تعديل البحث", "Try adjusting your filters")}</h3>
            <button
              type="button"
              onClick={() => {
                const url = new URL(window.location.href);
                url.search = "";
                url.hash = "projects";
                window.history.pushState({}, "", url.toString());
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              className="mt-6 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              {t("مسح الفلاتر", "Clear filters")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

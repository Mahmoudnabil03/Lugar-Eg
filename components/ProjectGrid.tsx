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
          if (budget === "10m-20m") matchesBudget = rawPrice > 10_000_000 && rawPrice <= 20_000_000;
          if (budget === "20m-plus") matchesBudget = rawPrice > 20_000_000;
        } else {
          matchesBudget = false;
        }
      }

      return matchesQuery && matchesType && matchesBudget;
    });
  }, [query, propertyType, budget, lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      
      gsap.from(".grid-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="projects" className="section bg-gradient-radial bg-noise" aria-label={t("المشاريع", "Projects")}>
      <div className="container">
        {/* Section Header */}
        <div className="grid-heading mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="eyebrow accent-text mb-4 inline-flex">
              {t("المشاريع", "Projects")}
            </span>
            <h2 className="heading-2 gradient-text">
              {t("مشاريع ", "Selected ")}
              <span className="text-white/70">{t("مختارة", "Projects")}</span>
            </h2>
          </div>
          <p className="body text-white/60 max-w-md lg:max-w-lg">
            {t(
              "فهرس منسّق بعناية لأعلى الفرص الاستثمارية في السوق المصري — محدث باستمرار.",
              "A carefully curated index of Egypt's strongest real estate investment opportunities — continuously updated."
            )}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="glass-card rounded-2xl p-4 lg:p-6 mb-10 animate-fade-up">
          <div className="grid sm:grid-cols-[1.5fr_1fr_1fr_auto] gap-4">
            <label className="relative flex items-center">
              <span className="absolute left-4 text-xl text-white/40" aria-hidden="true">⌕</span>
              <input
                type="text"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("ابحث عن منطقة، مشروع، أو نوع عقار...", "Search area, project, or property type...")}
                className="input w-full pl-12 pr-4 bg-white/5 border-white/10 placeholder:text-white/40 focus:border-brand-500 focus:ring-brand-500/20"
                aria-label={t("البحث عن عقار", "Search property")}
              />
            </label>

            <select
              aria-label={t("نوع العقار", "Property type")}
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="input select bg-white/5 border-white/10 text-white focus:border-brand-500 focus:ring-brand-500/20"
            >
              <option value="" disabled className="bg-neutral-900 text-white">
                {t("نوع العقار", "Property Type")}
              </option>
              <option value="Apartment" className="bg-neutral-900">{t("شقة", "Apartment")}</option>
              <option value="Villa" className="bg-neutral-900">{t("فيلا", "Villa")}</option>
              <option value="Office" className="bg-neutral-900">{t("مكتب", "Office")}</option>
              <option value="Investment" className="bg-neutral-900">{t("استثمار", "Investment")}</option>
              <option value="Commercial" className="bg-neutral-900">{t("تجاري", "Commercial")}</option>
              <option value="Land" className="bg-neutral-900">{t("أرض", "Land")}</option>
            </select>

            <select
              aria-label={t("الميزانية", "Budget")}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input select bg-white/5 border-white/10 text-white focus:border-brand-500 focus:ring-brand-500/20"
            >
              <option value="" disabled className="bg-neutral-900 text-white">
                {t("الميزانية", "Budget")}
              </option>
              <option value="under-2m" className="bg-neutral-900">{t("أقل من 2م", "Under 2M")}</option>
              <option value="2m-5m" className="bg-neutral-900">{t("2م - 5م", "2M - 5M")}</option>
              <option value="5m-10m" className="bg-neutral-900">{t("5م - 10م", "5M - 10M")}</option>
              <option value="10m-20m" className="bg-neutral-900">{t("10م - 20م", "10M - 20M")}</option>
              <option value="20m-plus" className="bg-neutral-900">{t("أكثر من 20م", "20M+")}</option>
            </select>

            {query || propertyType || budget ? (
              <button
                type="button"
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.search = "";
                  url.hash = "projects";
                  window.history.pushState({}, "", url.toString());
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="btn btn-secondary whitespace-nowrap"
              >
                {t("مسح الفلاتر", "Clear Filters")}
              </button>
            ) : null}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.length > 0 ? (
            visibleProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)
          ) : (
            <div className="col-span-full glass-card rounded-2xl p-12 lg:p-16 text-center animate-fade-up">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-6 accent-text">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-4 text-white mb-2">{t("لا توجد نتائج", "No Matches Found")}</h3>
              <p className="body text-white/60 mb-6">{t("حاول تعديل البحث أو مسح الفلاتر", "Try adjusting your search or clearing filters")}</p>
              {query || propertyType || budget ? (
                <button
                  type="button"
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.search = "";
                    url.hash = "projects";
                    window.history.pushState({}, "", url.toString());
                    window.dispatchEvent(new PopStateEvent("popstate"));
                  }}
                  className="btn btn-secondary"
                >
                  {t("مسح الفلاتر", "Clear Filters")}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
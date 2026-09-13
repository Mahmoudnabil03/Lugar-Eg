"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("query") ?? "");
      setPropertyType(params.get("type") ?? "");
      setBudget(params.get("budget") ?? "");
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        yPercent: 120,
        opacity: 0,
        duration: 1.15,
        stagger: 0.16,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".hero-panel", {
        opacity: 0,
        y: 26,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".hero-copy", {
        opacity: 0,
        y: 16,
        duration: 1,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.to(".hero-bg", {
        yPercent: 18,
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("query", query.trim());
    else url.searchParams.delete("query");

    if (propertyType) url.searchParams.set("type", propertyType);
    else url.searchParams.delete("type");

    if (budget) url.searchParams.set("budget", budget);
    else url.searchParams.delete("budget");

    url.hash = "projects";
    window.history.pushState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={root}
      className="hero-grain relative min-h-screen overflow-hidden pt-24"
      aria-label={t("القسم الرئيسي", "Hero")}
    >
      <div className="hero-bg absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.07),transparent_28%),linear-gradient(180deg,#040505_0%,#0a0b0d_30%,#07090b_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.02)_46%,transparent_100%)]" />
        <div className="absolute -left-12 top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -right-12 bottom-4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="section-shell relative z-10">
        <div className="grid min-h-[78vh] items-stretch gap-4 rounded-[28px] border border-white/10 bg-white/[0.015] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.7)] backdrop-blur-sm lg:grid-cols-[0.86fr_1.14fr_0.8fr]">
          <div className="hero-panel relative flex min-h-[300px] items-end justify-start overflow-hidden rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] p-6 lg:min-h-[640px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.12),transparent_26%)]" />
            <div className="relative z-10 flex items-center gap-3">
              <a
                href="https://wa.me/201028232191?text=Hello%2C%20I%20want%20to%20discuss%20real-estate%20investment%20opportunities"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[0.7rem] font-semibold tracking-[0.22em] text-white uppercase transition hover:border-white/35 hover:bg-white/10"
              >
                {t("تحدث معنا", "Contact us")}
              </a>
            </div>
          </div>

          <div className="hero-panel flex min-h-[300px] flex-col justify-center rounded-[22px] border border-white/10 bg-[#0b0d10]/80 p-6 lg:min-h-[640px] lg:p-8">
            <div className="mb-5 flex items-center">
              <img src="/logo-white.png" alt="Lugar Real Estate" className="h-12 w-auto object-contain md:h-16" />
            </div>
            <p className="hero-copy mb-4 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-white/60">
              {t("مرحباً بكم في لوجار", "Welcome to Lugar")}
            </p>
            <h1 className="leading-[0.86] tracking-[-0.06em] text-white">
              <span className="hero-word block overflow-hidden text-[clamp(2.5rem,4vw,5.2rem)] font-black">
                {t("لوجار", "Lugar")}
              </span>
              <span className="hero-word mt-2 block overflow-hidden text-[clamp(1.2rem,2vw,2.2rem)] font-medium tracking-[0.34em] text-white/70 uppercase">
                {t("Real Estate", "Real Estate")}
              </span>
            </h1>
            <p className="hero-copy mt-6 max-w-lg text-sm leading-7 text-white/70 md:text-base">
              {t(
                "شريكك الموثوق في اكتشاف العقارات ذات القيمة العالية، مع رؤية استثمارية واضحة وتوجيه استراتيجي في كل مرحلة.",
                "Find the right property for your next move with expert guidance, premium opportunities, and a trusted investment process."
              )}
            </p>

            <form onSubmit={handleSubmit} className="hero-copy mt-8 w-full max-w-xl rounded-[22px] border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
              <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
                <label className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                  <span className="text-base text-white/70">⌕</span>
                  <input
                    type="text"
                    name="query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    aria-label="Search properties"
                    placeholder={t("ابحث عن عقار", "Search property")}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </label>

                <label className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                  <select
                    aria-label="Property type"
                    value={propertyType}
                    onChange={(event) => setPropertyType(event.target.value)}
                    className="w-full bg-transparent text-sm text-white focus:outline-none"
                  >
                    <option value="" disabled className="bg-[#111315] text-white/80">
                      {t("نوع العقار", "Property type")}
                    </option>
                    <option value="Apartment" className="bg-[#111315]">{t("شقة", "Apartment")}</option>
                    <option value="Villa" className="bg-[#111315]">{t("فيلا", "Villa")}</option>
                    <option value="Office" className="bg-[#111315]">{t("مكتب", "Office")}</option>
                    <option value="Investment" className="bg-[#111315]">{t("استثمار", "Investment")}</option>
                  </select>
                </label>

                <label className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                  <select
                    aria-label="Budget"
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    className="w-full bg-transparent text-sm text-white focus:outline-none"
                  >
                    <option value="" disabled className="bg-[#111315] text-white/80">
                      {t("الميزانية", "Budget")}
                    </option>
                    <option value="under-2m" className="bg-[#111315]">{t("أقل من 2م", "Under 2M")}</option>
                    <option value="2m-5m" className="bg-[#111315]">{t("2م - 5م", "2M - 5M")}</option>
                    <option value="5m-10m" className="bg-[#111315]">{t("5م - 10م", "5M - 10M")}</option>
                    <option value="10m-plus" className="bg-[#111315]">{t("أكثر من 10م", "+10M")}</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#f2f2f2]"
                >
                  {t("بحث", "Search")}
                </button>
              </div>
            </form>

            <div className="hero-copy mt-8 flex flex-wrap items-center gap-4 text-[0.66rem] uppercase tracking-[0.24em] text-white/55">
              <span>{t("الاستثمار الذكي", "Smart investment")}</span>
              <span className="h-px w-8 bg-white/20" />
              <span>{t("القيمة المستدامة", "Sustainable value")}</span>
            </div>
          </div>

          <div className="hero-panel relative flex min-h-[300px] flex-col justify-between rounded-[22px] border border-white/10 bg-[#111315]/90 p-6 lg:min-h-[640px] lg:p-8">
            <div className="text-left">
              <div className="text-[0.66rem] font-medium tracking-[0.28em] uppercase text-white/60">
                {t("حافظة الاستثمار", "Investment focus")}
              </div>
              <div className="mt-5 text-[clamp(2.2rem,3vw,4rem)] font-black leading-[0.9] tracking-[-0.06em] text-white">
                {t("221 م²", "221 m²")}
              </div>
              <div className="mt-4 text-2xl font-medium leading-tight text-white md:text-[2.1rem]">
                {t("منطقة الأعمال المركزية", "Central Business District")}
              </div>
              <div className="mt-3 text-sm leading-7 text-white/70">
                {t("العاصمة الإدارية الجديدة", "New Administrative Capital")}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85">
                <span className="font-medium text-white">EGP</span> 3,000,000
              </div>
              <a
                href="https://wa.me/201028232191?text=Hello%2C%20I%20want%20to%20inquire%20about%20the%20investment%20opportunity"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-[#f1f1f1]"
              >
                <span>{t("تواصل عبر واتساب", "Contact via WhatsApp")}</span>
                <span aria-hidden="true">✦</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-20 rounded-full border border-white/10 bg-black/50 px-5 py-3 text-[0.62rem] font-medium tracking-[0.22em] text-white/75 uppercase backdrop-blur-sm">
        {t("مرحباً بك في لوجار", "Welcome to Lugar")}
      </div>
    </section>
  );
}

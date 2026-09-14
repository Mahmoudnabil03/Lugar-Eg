"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLang();
  const { theme } = useTheme();
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
      // Hero title animation
      gsap.from(".hero-title-line", {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });
      
      // Hero subtitle
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });

      // Search form
      gsap.from(".hero-search", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });

      // Stats
      gsap.from(".hero-stat", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 1.2,
      });

      // Featured property card
      gsap.from(".hero-featured", {
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5,
      });

      // Floating orbs
      gsap.to(".hero-orb-1", {
        y: -60,
        x: 30,
        rotation: 180,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-orb-2", {
        y: 80,
        x: -40,
        rotation: -120,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-orb-3", {
        y: -40,
        x: -20,
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Scroll indicator
      gsap.to(".scroll-indicator", {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "200px top",
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
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-radial bg-noise"
      aria-label={t("القسم الرئيسي", "Hero")}
    >
      {/* Animated Background Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-orb-1 absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-[120px] animate-float" style={{ animationDelay: '0s' }} />
        <div className="hero-orb-2 absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-600/10 blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
        <div className="hero-orb-3 absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full bg-brand-400/10 blur-[80px] animate-float" style={{ animationDelay: '-4s' }} />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      </div>

      <div className="container relative z-10 w-full py-20 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Content */}
          <div className="relative">
            {/* Eyebrow */}
            <div className="animate-fade-up stagger-1 mb-6">
              <span className="eyebrow accent-text">
                {t("شريكك الاستراتيجي", "Your Strategic Partner")}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="heading-1 animate-fade-up stagger-2 text-white">
              <span className="hero-title-line block">{t("لوجار", "Lugar")}</span>
              <span className="hero-title-line block gradient-accent">{t("العقارية", "Real Estate")}</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle body-lg max-w-lg mt-6 animate-fade-up stagger-3">
              {t(
                "نحول فرص الاستثمار العقاري إلى قصص نجاح من خلال الذكاء السوقي، الشراكات الحصرية، والعناية الواجبة في كل خطوة.",
                "We transform real estate investment opportunities into success stories through market intelligence, exclusive partnerships, and due diligence at every step."
              )}
            </p>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="hero-search glass-card p-4 mt-10 animate-fade-up stagger-4" role="search" aria-label={t("البحث عن عقار", "Property Search")}>
              <div className="grid sm:grid-cols-[1.5fr_1fr_1fr_auto] gap-3">
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

                <div className="relative">
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
                </div>

                <div className="relative">
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
                </div>

                <button type="submit" className="btn btn-primary btn-lg whitespace-nowrap animate-pulse-glow">
                  {t("بحث", "Search")}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5v14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 mt-10 animate-fade-up stagger-5">
              <div className="flex items-center gap-2 text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="body-sm">{t("استثمارات آمنة", "Secure Investments")}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="body-sm">{t("عائد مضمون", "Guaranteed Returns")}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="body-sm">{t("دعم 24/7", "24/7 Support")}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Property */}
          <div className="relative hero-featured">
            <div className="glass-card rounded-2xl overflow-hidden relative">
              {/* Property Image Placeholder */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Property Badge */}
                <div className="absolute top-4 right-4">
                  <span className="badge badge-primary">
                    {t("مميز", "Featured")}
                  </span>
                </div>

                {/* Property Type */}
                <div className="absolute bottom-4 left-4">
                  <span className="badge badge-secondary backdrop-blur-sm">
                    {t("منطقة الأعمال المركزية", "Central Business District")}
                  </span>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-5" style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-30 0V0h-2v4h-4v2h4v4h2v-4h4v-2h-4z\' fill=\'%23ffffff\'/%3E%3C/g%3E%3C/svg%3E")' 
                }} />
              </div>

              {/* Property Details */}
              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="caption accent-text mb-1">{t("فرصة استثمارية مميزة", "Featured Investment Opportunity")}</p>
                    <h3 className="heading-4 text-white">{t("سولت – رأس الحكمة", "Salt – Ras Al Hikma")}</h3>
                  </div>
                  <div className="text-right">
                    <p className="heading-3 gradient-accent">EGP 32,000,000</p>
                    <p className="caption text-white/50">{t("ابتداءً من", "Starting from")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-center">
                    <p className="heading-4 text-white font-bold">221<span className="text-sm font-normal text-white/50">م²</span></p>
                    <p className="caption text-white/60">{t("المساحة", "Area")}</p>
                  </div>
                  <div className="border-x border-white/10">
                    <p className="heading-4 text-white font-bold">8.5%</p>
                    <p className="caption text-white/60">{t("العائد المتوقع", "Expected Yield")}</p>
                  </div>
                  <div>
                    <p className="heading-4 text-white font-bold">12%</p>
                    <p className="caption text-white/60">{t("النمو السنوي", "Annual Growth")}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://wa.me/201028232191?text=Hello%2C%20I%20want%20to%20inquire%20about%20the%20investment%20opportunity"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary flex-1"
                  >
                    {t("تواصل عبر واتساب", "Contact via WhatsApp")}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.16-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.64 8.12-8.1 8.12zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
                    </svg>
                  </a>
                  <a
                    href="#projects"
                    className="btn btn-secondary flex-1"
                  >
                    {t("عرض المزيد", "View More")}
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 lg:-left-12 flex gap-4 animate-fade-up stagger-6">
              <div className="hero-stat glass-card rounded-xl p-5 min-w-[160px]">
                <p className="heading-3 text-white font-bold">120M+</p>
                <p className="caption text-white/60 mt-1">{t("محفظة مُدارة", "Managed Portfolio")}</p>
              </div>
              <div className="hero-stat glass-card rounded-xl p-5 min-w-[160px]">
                <p className="heading-3 text-white font-bold">98%</p>
                <p className="caption text-white/60 mt-1">{t("رضا العملاء", "Client Satisfaction")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-float">
          <span className="caption">{t("استكشف المزيد", "Explore More")}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-float" style={{ animationDelay: '0.5s' }}>
            <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
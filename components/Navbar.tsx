"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/65 py-3 backdrop-blur-xl" : "bg-transparent py-5"
      }`}
    >
      <nav
        className="section-shell flex items-center justify-between gap-4"
        aria-label={t("التنقل الرئيسي", "Main navigation")}
      >
        <a href="#main" className="inline-flex items-center" aria-label="Lugar Real Estate logo">
          <img
            src="/logo-white.png"
            alt="Lugar Real Estate logo"
            className="h-12 w-auto object-contain md:h-14 xl:h-16"
          />
        </a>

        <div className="hidden items-center gap-8 text-[0.72rem] font-medium tracking-[0.28em] uppercase text-white/75 md:flex">
          <a href="#projects" className="transition hover:text-white">
            {t("المشاريع", "Projects")}
          </a>
          <a href="#trust" className="transition hover:text-white">
            {t("لماذا لوجار", "Why Lugar")}
          </a>
          <a
            href="https://wa.me/201028232191"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            {t("تواصل معنا", "Contact")}
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleLang}
            aria-label={t("تغيير اللغة", "Switch language")}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[0.68rem] font-semibold tracking-[0.18em] text-white transition hover:border-white/30 hover:bg-white/10 sm:px-4"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
        </div>
      </nav>
    </header>
  );
}

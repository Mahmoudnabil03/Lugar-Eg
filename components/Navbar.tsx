"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
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
            src="/lugar-logo.svg"
            alt="Lugar Real Estate logo"
            className="h-14 w-auto object-contain md:h-16 xl:h-18"
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
            onClick={toggleTheme}
            aria-label={t("تغيير المظهر", "Toggle theme")}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-base transition hover:border-white/30 hover:bg-white/10"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
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

"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("light", !next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <nav
        className="section-shell flex items-center justify-between"
        aria-label={t("التنقل الرئيسي", "Main navigation")}
      >
        <a href="#main" className="flex items-baseline gap-2 group">
          <span className="text-2xl font-bold tracking-tight text-gradient">LUGAR</span>
          <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
            {t("لوجار العقارية", "Real Estate")}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#projects" className="opacity-80 hover:opacity-100 hover:text-sand transition">
            {t("المشاريع", "Projects")}
          </a>
          <a href="#trust" className="opacity-80 hover:opacity-100 hover:text-sand transition">
            {t("لماذا لوجار", "Why Lugar")}
          </a>
          <a
            href="https://wa.me/201028232191"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 hover:text-sand transition"
          >
            {t("تواصل معنا", "Contact")}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={t("تبديل المظهر", "Toggle theme")}
            className="glass rounded-full w-10 h-10 flex items-center justify-center text-lg hover:border-sand transition"
          >
            {dark ? "☀︎" : "☾"}
          </button>
          <button
            onClick={toggleLang}
            aria-label={t("تغيير اللغة", "Switch language")}
            className="glass rounded-full px-4 h-10 text-sm font-semibold hover:border-sand transition"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#projects", label: t("المشاريع", "Projects") },
    { href: "#trust", label: t("لماذا لوجار", "Why Lugar") },
    { href: "#process", label: t("عملية الاستثمار", "Process") },
    { href: "https://wa.me/201028232191", label: t("تواصل", "Contact"), external: true },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="container flex items-center justify-between gap-4 h-16 lg:h-20"
        aria-label={t("التنقل الرئيسي", "Main navigation")}
      >
        {/* Logo */}
        <a
          href="#main"
          className="inline-flex items-center gap-3 shrink-0"
          aria-label="Lugar Real Estate - Home"
        >
          <img
            src="/lugar-logo.svg"
            alt="Lugar Real Estate"
            className="logo-for-dark h-10 lg:h-12 w-auto object-contain"
          />
          <img
            src="/lugar-logo-dark.svg"
            alt="Lugar Real Estate"
            className="logo-for-light h-10 lg:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-brand-500 after:scale-x-0 after:origin-center hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={t("تغيير المظهر", "Toggle theme")}
            className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10 group"
          >
            <span className="text-lg group-hover:rotate-180 transition-transform duration-300">
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            aria-label={t("تغيير اللغة", "Switch language")}
            className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10 text-sm font-semibold tracking-wider text-white/80"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("إغلاق القائمة", "Close menu") : t("فتح القائمة", "Open menu")}
            aria-expanded={mobileOpen}
            className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* WhatsApp CTA - Desktop */}
          <a
            href="https://wa.me/201028232191?text=Hello%2C%20I%20want%20to%20discuss%20real-estate%20investment%20opportunities"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 btn btn-primary btn-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.16-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.64 8.12-8.1 8.12zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
            </svg>
            <span>{t("استشارة", "Consult")}</span>
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/5 backdrop-blur-xl border-b border-white/10 animate-fade-in">
          <div className="container py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="block px-4 py-3 text-base font-medium text-white/80 hover:text-white rounded-xl transition-colors duration-200 hover:bg-white/5"
                onClick={() => !link.external && setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <a
                href="https://wa.me/201028232191?text=Hello%2C%20I%20want%20to%20discuss%20real-estate%20investment%20opportunities"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.16-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.64 8.12-8.1 8.12zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
                </svg>
                {t("احجز استشارة مجانية", "Book Free Consultation")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
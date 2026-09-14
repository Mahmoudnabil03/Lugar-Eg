"use client";

import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();

  const footerLinks = {
    quick: [
      { label: t("المشاريع", "Projects"), href: "#projects", external: false },
      { label: t("لماذا لوجار", "Why Lugar"), href: "#trust", external: false },
      { label: t("عملية الاستثمار", "Investment Process"), href: "#process", external: false },
      { label: t("تواصل معنا", "Contact Us"), href: "https://wa.me/201028232191", external: true },
    ],
    services: [
      { label: t("شراء عقار", "Buy Property"), href: "#projects", external: false },
      { label: t("بيع عقار", "Sell Property"), href: "#contact", external: false },
      { label: t("إدارة الأصول", "Asset Management"), href: "#contact", external: false },
      { label: t("استشارات استثمارية", "Investment Advisory"), href: "#contact", external: false },
    ],
    company: [
      { label: t("من نحن", "About Us"), href: "#about", external: false },
      { label: t("فريق العمل", "Our Team"), href: "#team", external: false },
      { label: t("الوظائف", "Careers"), href: "#careers", external: false },
      { label: t("أخبار", "News"), href: "#news", external: false },
    ],
    legal: [
      { label: t("الشروط والأحكام", "Terms & Conditions"), href: "#terms", external: false },
      { label: t("سياسة الخصوصية", "Privacy Policy"), href: "#privacy", external: false },
      { label: t("إخلاء المسؤولية", "Disclaimer"), href: "#disclaimer", external: false },
    ],
  };

  const socialLinks = [
    { 
      href: "https://wa.me/201028232191", 
      label: "WhatsApp",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.16-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.64 8.12-8.1 8.12zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
        </svg>
      )
    },
    { 
      href: "https://instagram.com", 
      label: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    { 
      href: "https://linkedin.com", 
      label: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    { 
      href: "https://twitter.com", 
      label: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-gradient-radial bg-noise" role="contentinfo">
      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      
      <div className="container py-16 lg:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#main" className="inline-flex items-center gap-3" aria-label="Lugar Real Estate - Home">
              <img
                src="/lugar-logo.svg"
                alt=""
                className="h-10 w-auto object-contain"
                aria-hidden="true"
              />
              <span className="font-black text-xl lg:text-2xl text-white tracking-tight">Lugar</span>
            </a>
            
            <p className="body text-white/60 max-w-xs">
              {t(
                "لوجار للتسويق والاستثمار العقاري — شريكك الموثوق في الاستثمار العقاري في مصر.",
                "Lugar Real Estate Marketing & Investment — your trusted partner for strategic property investment in Egypt."
              )}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label={t("روابط سريعة", "Quick Links")}>
            <h3 className="heading-4 text-white mb-4">{t("روابط سريعة", "Quick Links")}</h3>
            <ul className="space-y-3">
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="body-sm text-white/60 hover:text-white hover:text-brand-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.label}
                    {link.external && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={t("خدماتنا", "Our Services")}>
            <h3 className="heading-4 text-white mb-4">{t("خدماتنا", "Our Services")}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="body-sm text-white/60 hover:text-white hover:text-brand-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label={t("الشركة", "Company")}>
            <h3 className="heading-4 text-white mb-4">{t("الشركة", "Company")}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="body-sm text-white/60 hover:text-white hover:text-brand-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label={t("القانونية", "Legal")}>
            <h3 className="heading-4 text-white mb-4">{t("القانونية", "Legal")}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="body-sm text-white/60 hover:text-white hover:text-brand-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="divider mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="body-sm text-white/40 text-center lg:text-left">
            © {new Date().getFullYear()} Lugar Real Estate. {t("جميع الحقوق محفوظة.", "All rights reserved.")}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 text-center lg:text-left">
            <a
              href="tel:+201028232191"
              className="flex items-center gap-2 body-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +20 102 823 2191
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://wa.me/201028232191"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 body-sm text-white/50 hover:text-brand-400 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.16-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.64 8.12-8.1 8.12zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
              </svg>
              WhatsApp
            </a>
            <span className="text-white/20">·</span>
            <span className="body-sm text-white/40">{t("القاهرة، مصر", "Cairo, Egypt")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
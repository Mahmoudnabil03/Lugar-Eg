"use client";

import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative mt-10 border-t border-white/10 py-16">
      <div className="section-shell grid gap-12 md:grid-cols-3">
        <div>
          <img src="/logo-white.png" alt="Lugar Real Estate logo" className="mb-4 h-12 w-auto object-contain md:h-14" />
          <p className="max-w-xs text-sm leading-7 text-white/60">
            {t(
              "لوجار للتسويق والاستثمار العقاري — شريكك الموثوق في الاستثمار العقاري في مصر.",
              "Lugar Real Estate Marketing & Investment — a trusted partner for strategic property opportunities in Egypt."
            )}
          </p>
        </div>

        <nav aria-label={t("روابط سريعة", "Quick links")}>
          <h3 className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/55">
            {t("روابط", "Links")}
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#projects" className="transition hover:text-white">{t("المشاريع", "Projects")}</a></li>
            <li><a href="#trust" className="transition hover:text-white">{t("لماذا لوجار", "Why Lugar")}</a></li>
            <li>
              <a href="https://wa.me/201028232191" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                {t("تواصل معنا", "Contact Us")}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/55">
            {t("تواصل", "Contact")}
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li dir="ltr" className="text-start">
              <a href="tel:+201028232191" className="transition hover:text-white">+20 102 823 2191</a>
            </li>
            <li>
              <a href="https://wa.me/201028232191" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>{t("القاهرة، مصر", "Cairo, Egypt")}</li>
          </ul>
        </div>
      </div>

      <div className="section-shell mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 text-[0.68rem] uppercase tracking-[0.18em] text-white/45">
        <p>© {new Date().getFullYear()} Lugar Real Estate.</p>
        <p>{t("جميع الحقوق محفوظة.", "All rights reserved.")}</p>
      </div>
    </footer>
  );
}

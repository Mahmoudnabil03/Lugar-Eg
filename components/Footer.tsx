"use client";

import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative border-t border-white/10 py-16 mt-10">
      <div className="section-shell grid gap-12 md:grid-cols-3">
        <div>
          <p className="text-3xl font-bold text-gradient mb-3">LUGAR</p>
          <p className="text-sm opacity-60 leading-relaxed max-w-xs">
            {t(
              "لوجار للتسويق والاستثمار العقاري — شريكك الموثوق في الاستثمار العقاري في مصر.",
              "Lugar Real Estate Marketing & Investment — your trusted partner in Egyptian real estate."
            )}
          </p>
        </div>
        <nav aria-label={t("روابط سريعة", "Quick links")}>
          <h3 className="text-sm tracking-widest uppercase text-sand mb-4">
            {t("روابط", "Links")}
          </h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#projects" className="hover:text-sand transition">{t("المشاريع", "Projects")}</a></li>
            <li><a href="#trust" className="hover:text-sand transition">{t("لماذا لوجار", "Why Lugar")}</a></li>
            <li>
              <a href="https://wa.me/201028232191" target="_blank" rel="noopener noreferrer" className="hover:text-sand transition">
                {t("تواصل معنا", "Contact Us")}
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <h3 className="text-sm tracking-widest uppercase text-sand mb-4">
            {t("تواصل", "Contact")}
          </h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li dir="ltr" className="text-start">
              <a href="tel:+201028232191" className="hover:text-sand transition">+20 102 823 2191</a>
            </li>
            <li>
              <a
                href="https://wa.me/201028232191"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sand transition"
              >
                WhatsApp
              </a>
            </li>
            <li>{t("القاهرة، مصر", "Cairo, Egypt")}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-14 pt-6 border-t border-white/5 flex flex-wrap justify-between gap-4 text-xs opacity-50">
        <p>© {new Date().getFullYear()} Lugar Real Estate. {t("جميع الحقوق محفوظة.", "All rights reserved.")}</p>
        <p>{t("صُنع بشغف في مصر", "Crafted with passion in Egypt")}</p>
      </div>
    </footer>
  );
}

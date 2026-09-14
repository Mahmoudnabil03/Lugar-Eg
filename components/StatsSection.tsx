"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "120M+", labelKey: "portfolio_exposure", labelEn: "Portfolio Managed", labelAr: "محفظة مُدارة" },
  { value: "18+", labelKey: "opportunities", labelEn: "Active Opportunities", labelAr: "فرص نشطة" },
  { value: "98%", labelKey: "satisfaction", labelEn: "Client Satisfaction", labelAr: "رضا العملاء" },
  { value: "24/7", labelKey: "support", labelEn: "Dedicated Support", labelAr: "دعم مخصص" },
];

export function StatsSection() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".stat-value", {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section bg-gradient-radial bg-noise" aria-label={t("إحصائيات", "Statistics")}>
      <div className="container">
        {/* Decorative Top Divider */}
        <div className="divider mb-8 mx-auto max-w-md" />
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <article
              key={stat.value}
              className="stat-card glass-card rounded-2xl p-6 lg:p-8 text-center relative overflow-hidden group"
            >
              {/* Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent group-hover:w-24 transition-all duration-300" />
              
              <div className="relative z-10">
                <div className="stat-value heading-1 font-bold gradient-accent mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>
                  {stat.value}
                </div>
                <p className="caption text-white/60">{t(stat.labelAr, stat.labelEn)}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Context Text */}
        <div className="text-center mt-10 animate-fade-up">
          <p className="body text-white/50 max-w-2xl mx-auto">
            {t(
              "أرقامنا تعكس التزامنا بالتميز والشراكة طويلة الأمد مع مستثمرينا في السوق المصري.",
              "Our numbers reflect our commitment to excellence and long-term partnership with our investors in the Egyptian market."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "120M+", labelKey: "portfolio_exposure", labelEn: "Portfolio Exposure Tracked", labelAr: "محفظة استثمارية مُتتبعة" },
  { value: "18+", labelKey: "opportunities", labelEn: "High-Potential Opportunities", labelAr: "فرص عالية الإمكانات" },
  { value: "5", labelKey: "step_framework", labelEn: "Step Advisory Framework", labelAr: "خطوات إطار استشاري" },
  { value: "24/7", labelKey: "client_access", labelEn: "Client Access & Support", labelAr: "وصول ودعم للعملاء" },
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
    <section ref={root} className="section-shell pb-20 md:pb-28" aria-label={t("إحصائيات", "Statistics")}>
      <div className="premium-panel overflow-hidden rounded-[32px] p-6 md:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">{t("أرقامنا", "Our Numbers")}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
              {t("سجل حافل من النجاحات", "A Track Record of Success")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              {t(
                "أرقامنا تعكس التزامنا بالتميز والشراكة طويلة الأمد مع مستثمرينا.",
                "Our numbers reflect our commitment to excellence and long-term partnership with our investors."
              )}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.value} className="stat-card rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="stat-value text-3xl font-semibold text-white">{stat.value}</div>
                <p className="mt-2 text-sm text-white/65">{t(stat.labelAr, stat.labelEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
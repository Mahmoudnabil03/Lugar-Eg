"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "01", label: { ar: "اختيار موثوق", en: "Curated access" } },
  { value: "02", label: { ar: "فرص حصرية", en: "Exclusive deals" } },
  { value: "03", label: { ar: "استثمار ذكي", en: "Smart capital" } },
  { value: "04", label: { ar: "دعم مستمر", en: "Ongoing guidance" } },
];

export default function SignatureSection() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".signature-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-shell py-20 md:py-28" aria-label={t("نبذة عن لوجار", "Lugar overview")}>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <p className="text-sand tracking-[0.32em] text-[11px] uppercase">{t("نجرب كسر المعيار", "We build beyond standard")}</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {t("نهج استثماري يوازن", "An investment approach that balances")} 
            <span className="text-gradient">{t("الأمان والفرصة", "security and opportunity")}</span>
          </h2>
          <p className="max-w-xl text-base md:text-lg opacity-75 leading-relaxed">
            {t(
              "نصمم رحلتك الاستثمارية عبر شراكة متكاملة: تحليل سوقي، اختيارات استراتيجية، ومتابعة دقيقة حتى الوصول إلى قرار موثوق يليق برؤية مالك العقار الحديث.",
              "We structure your investment journey through a full-service approach: strategic market analysis, precise property selection, and attentive guidance until you reach the right decision for your long-term goals."
            )}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#projects" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:border-sand transition">
              {t("استعرض المحفظة", "View portfolio")}
            </a>
            <a href="https://wa.me/201028232191" target="_blank" rel="noopener noreferrer" className="rounded-full bg-sand text-navy px-6 py-3 text-sm font-semibold hover:bg-terracotta hover:text-offwhite transition">
              {t("احجز استشارتك", "Book a consultation")}
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.value} className="signature-card glass rounded-3xl p-5 md:p-6">
              <div className="text-3xl font-bold text-sand mb-3">{stat.value}</div>
              <p className="text-sm opacity-75">{t(stat.label.ar, stat.label.en)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

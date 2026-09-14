"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const valueProps = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    titleKey: "market_intelligence",
    titleEn: "Market Intelligence",
    titleAr: "ذكاء السوق",
    descKey: "market_intelligence_desc",
    descEn: "We identify value before the market fully prices it in, ensuring informed decisions and stronger long-term upside.",
    descAr: "نحدد القيمة قبل أن يسعرها السوق بالكامل، مما يضمن قرارات مستنيرة وعوائد أقوى على المدى الطويل."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    titleKey: "structured_guidance",
    titleEn: "Structured Guidance",
    titleAr: "توجيه منظم",
    descKey: "structured_guidance_desc",
    descEn: "Every step is planned with clarity — from evaluation and negotiation to execution, handover, and post-purchase support.",
    descAr: "كل خطوة مخططة بوضوح — من التقييم والتفاوض إلى التنفيذ والتسليم والدعم بعد الشراء."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    titleKey: "risk_aware",
    titleEn: "Risk-Aware Acquisition",
    titleAr: "استثمار واعٍ للمخاطر",
    descKey: "risk_aware_desc",
    descEn: "We focus on durable opportunities with balanced risk, real demand, and a strategic vision for future value creation.",
    descAr: "نركز على فرص دائمة ذات مخاطر متوازنة، طلب حقيقي، ورؤية استراتيجية لخلق القيمة المستقبلية."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1zm18 0a6 6 0 01-12 0v1h12v-1z" />
      </svg>
    ),
    titleKey: "investor_first",
    titleEn: "Investor-First Advisory",
    titleAr: "استشارات تركز على المستثمر",
    descKey: "investor_first_desc",
    descEn: "Your priorities come first: yield, clarity, trust, and a portfolio strategy that supports sustainable growth.",
    descAr: "أولوياتك تأتي أولاً: العائد، الوضوح، الثقة، واستراتيجية محفظة تدعم النمو المستدام."
  },
];

export function ValueProposition() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".value-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-shell py-20 md:py-28" aria-label={t("عرض القيمة", "Value Proposition")}>
      <div className="mb-16 max-w-3xl">
        <p className="eyebrow">{t("لماذا لوجار", "Why Lugar")}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
          {t("شريكك الاستراتيجي في العقارات", "Your Strategic Real Estate Partner")}
        </h2>
        <p className="mt-6 text-base leading-8 text-white/70">
          {t(
            "نجمع بين الخبرة المحلية العميقة، تحليل البيانات، وشبكة علاقات متميزة لنقدم لك فرصاً استثمارية مختارة بعناية.",
            "We combine deep local expertise, data-driven analysis, and an elite network to deliver carefully curated investment opportunities."
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {valueProps.map((item, index) => (
          <div
            key={item.titleKey}
            className="value-card premium-panel card-lift rounded-[28px] p-6 md:p-7"
            style={{ "--card-index": index } as React.CSSProperties}
          >
            <div className="mb-5 h-12 w-12 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">
              {t(item.titleAr, item.titleEn)}
            </h3>
            <p className="text-sm leading-7 text-white/70">
              {t(item.descAr, item.descEn)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
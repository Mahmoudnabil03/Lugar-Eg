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
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      
      gsap.from(".value-icon", {
        scale: 0,
        rotation: -180,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section bg-gradient-radial bg-noise" aria-label={t("عرض القيمة", "Value Proposition")}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <span className="eyebrow accent-text justify-center animate-fade-up">
            {t("لماذا لوجار", "Why Lugar")}
          </span>
          <h2 className="heading-2 mt-4 animate-fade-up stagger-1 gradient-text">
            {t("شريكك الاستراتيجي في العقارات", "Your Strategic Real Estate Partner")}
          </h2>
          <p className="body-lg mt-6 animate-fade-up stagger-2">
            {t(
              "نجمع بين الخبرة المحلية العميقة، تحليل البيانات المتقدم، وشبكة علاقات متميزة لنقدم لك فرصاً استثمارية مختارة بعناية.",
              "We combine deep local expertise, advanced data analysis, and an elite network to deliver carefully curated investment opportunities."
            )}
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((item, index) => (
            <article
              key={item.titleKey}
              className="value-card glass-card rounded-2xl p-6 lg:p-8 group relative overflow-hidden"
              style={{ '--card-index': index } as React.CSSProperties}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent group-hover:opacity-100 transition-opacity" />
              
              {/* Icon Wrapper */}
              <div className="value-icon relative mb-6 animate-scale-in stagger-1">
                <div className="w-14 h-14 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="accent-text">{item.icon}</span>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-brand-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Title */}
              <h3 className="heading-4 text-white mb-3 animate-fade-up stagger-2">
                {t(item.titleAr, item.titleEn)}
              </h3>

              {/* Description */}
              <p className="body-sm text-white/70 animate-fade-up stagger-3">
                {t(item.descAr, item.descEn)}
              </p>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
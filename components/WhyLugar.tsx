"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const whyItems = [
  {
    number: "01",
    titleKey: "exclusive_access",
    titleEn: "Exclusive Access",
    titleAr: "وصول حصري",
    descKey: "exclusive_access_desc",
    descEn: "Off-market properties and pre-launch opportunities through our exclusive developer and owner network.",
    descAr: "عقارات خارج السوق وفرص ما قبل الإطلاق من خلال شبكة المطورين والملاك الحصرية لدينا.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    number: "02",
    titleKey: "data_driven",
    titleEn: "Data-Driven Analysis",
    titleAr: "تحليل مبني على البيانات",
    descKey: "data_driven_desc",
    descEn: "Advanced analytics and market modeling to identify undervalued assets with high appreciation potential.",
    descAr: "تحليلات متقدمة ونمذجة سوقية لتحديد الأصول منخفضة التقييم ذات إمكانات نمو عالية.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    number: "03",
    titleKey: "end_to_end",
    titleEn: "End-to-End Management",
    titleAr: "إدارة شاملة من البداية للنهاية",
    descKey: "end_to_end_desc",
    descEn: "From property identification to post-purchase asset management — we handle every detail.",
    descAr: "من تحديد العقار إلى إدارة الأصول بعد الشراء — نتعامل مع كل التفاصيل.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  },
  {
    number: "04",
    titleKey: "transparent_fees",
    titleEn: "Transparent Fee Structure",
    titleAr: "هيكل رسوم شفاف",
    descKey: "transparent_fees_desc",
    descEn: "No hidden costs. Clear, upfront pricing aligned with your investment success.",
    descAr: "لا توجد تكاليف خفية. تسعير واضح ومباشر يتماشى مع نجاح استثمارك.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    number: "05",
    titleKey: "local_expertise",
    titleEn: "Deep Local Expertise",
    titleAr: "خبرة محلية عميقة",
    descKey: "local_expertise_desc",
    descEn: "On-the-ground knowledge of Egypt's emerging districts, regulatory landscape, and market dynamics.",
    descAr: "معرفة ميدانية بأحياء مصر الناشئة، المشهد التنظيمي، وديناميكيات السوق.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    number: "06",
    titleKey: "long_term_partner",
    titleEn: "Long-Term Partner",
    titleAr: "شريك طويل الأمد",
    descKey: "long_term_partner_desc",
    descEn: "We succeed when you succeed. Our model is built on lasting relationships, not one-off transactions.",
    descAr: "ننجح عندما تنجح. نموذجنا مبني على علاقات دائمة، وليس معاملات لمرة واحدة.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1zm18 0a6 6 0 01-12 0v1h12v-1z" />
      </svg>
    )
  },
];

export function WhyLugar() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="trust" className="section bg-gradient-radial bg-noise" aria-label={t("لماذا لوجار", "Why Lugar")}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <span className="eyebrow accent-text justify-center animate-fade-up">
            {t("لماذا لوجار", "Why Lugar")}
          </span>
          <h2 className="heading-2 mt-4 animate-fade-up stagger-1 gradient-text">
            {t("مصمم للمستثمرين الذين يبحثون عن الوضوح والأمان والتميز", "Built for investors who demand clarity, security, and excellence.")}
          </h2>
        </div>

        {/* Why Cards - Alternating Layout */}
        <div className="space-y-8 lg:space-y-12">
          {whyItems.map((item, index) => (
            <article
              key={item.number}
              className="why-card glass-card rounded-2xl overflow-hidden relative group"
            >
              <div className="grid lg:grid-cols-2 gap-0 items-center">
                {/* Visual Side */}
                <div className="on-media relative min-h-[300px] lg:min-h-[350px] bg-gradient-to-br from-neutral-900/50 via-neutral-800/50 to-neutral-900/50">
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-5" style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-30 0V0h-2v4h-4v2h4v4h2v-4h4v-2h-4z\' fill=\'%23ffffff\'/%3E%3C/g%3E%3C/svg%3E")' 
                  }} />
                  
                  {/* Accent Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-6 left-6 lg:left-8 z-10">
                    <span className="badge badge-primary text-lg px-4 py-1.5">{item.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-6 left-6 lg:left-8 right-6 lg:right-8 z-10">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl glass flex items-center justify-center backdrop-blur-sm">
                      <span className="accent-text">{item.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 lg:p-10 relative">
                  <div className="relative z-10 max-w-lg">
                    <h3 className="heading-3 text-white mb-4">
                      {t(item.titleAr, item.titleEn)}
                    </h3>
                    <p className="body text-white/70 leading-relaxed">
                      {t(item.descAr, item.descEn)}
                    </p>
                    
                    {/* Read More Link */}
                    <div className="mt-6 flex items-center gap-2 text-brand-400 font-medium group-hover:gap-3 transition-gap duration-300">
                      <span>{t("اعرف المزيد", "Learn More")}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Divider between cards */}
              {index < whyItems.length - 1 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const process = [
  {
    step: "01",
    titleKey: "discovery",
    titleEn: "Discovery",
    titleAr: "الاكتشاف",
    descKey: "discovery_desc",
    descEn: "We align on investment goals, product type, and risk profile through a structured consultation.",
    descAr: "نحدد أهداف الاستثمار، نوع العقار، ومدى المخاطر المناسب من خلال استشارة منظمة.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    step: "02",
    titleKey: "shortlist",
    titleEn: "Shortlist & Analysis",
    titleAr: "القائمة المختصرة والتحليل",
    descKey: "shortlist_desc",
    descEn: "We evaluate high-potential assets with operational and financial precision using proprietary models.",
    descAr: "نقيّم الأصول عالية الإمكانات بدقة تشغيلية ومالية باستخدام نماذج خاصة.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    step: "03",
    titleKey: "due_diligence",
    titleEn: "Due Diligence",
    titleAr: "العناية الواجبة",
    descKey: "due_diligence_desc",
    descEn: "Comprehensive legal, technical, and financial verification before any commitment.",
    descAr: "تحقق شامل قانوني، تقني، ومالي قبل أي التزام.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    step: "04",
    titleKey: "execution",
    titleEn: "Execution & Negotiation",
    titleAr: "التنفيذ والتفاوض",
    descKey: "execution_desc",
    descEn: "We guide negotiations, legal coordination, and purchase strategy for optimal terms.",
    descAr: "نرشد المفاوضات، التنسيق القانوني، واستراتيجية الشراء لشروط مثلى.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  },
  {
    step: "05",
    titleKey: "handover",
    titleEn: "Handover & Onboarding",
    titleAr: "التسليم والبدء",
    descKey: "handover_desc",
    descEn: "Seamless property transfer, utility setup, and tenant placement if needed.",
    descAr: "نقل ملكية سلس، إعداد المرافق، وتأجير إذا لزم الأمر.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  },
  {
    step: "06",
    titleKey: "aftercare",
    titleEn: "Aftercare & Growth",
    titleAr: "المتابعة والنمو",
    descKey: "aftercare_desc",
    descEn: "We remain close to the property journey, ensuring continuity and portfolio growth.",
    descAr: "نبقى قريبين من رحلة العقار، لضمان الاستمرارية ونمو المحفظة.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
];

export function InvestmentProcess() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-step", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      // Animate the connecting line
      gsap.from(".process-line", {
        scaleY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        transformOrigin: "top center",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section bg-gradient-radial bg-noise relative" aria-label={t("عملية الاستثمار", "Investment Process")}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="eyebrow accent-text justify-center animate-fade-up">
            {t("عملية الاستثمار", "Investment Process")}
          </span>
          <h2 className="heading-2 mt-4 animate-fade-up stagger-1 gradient-text">
            {t("عملية مصممة للثقة والزخم", "A Process Designed for Trust and Momentum.")}
          </h2>
          <p className="body-lg mt-6 animate-fade-up stagger-2">
            {t(
              "كل خطوة مدروسة بعناية لضمان الشفافية، تقليل المخاطر، وتحقيق أفضل النتائج لمحفظة استثمارك.",
              "Every step is carefully designed to ensure transparency, minimize risk, and achieve optimal results for your investment portfolio."
            )}
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="process-line absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-500/30 to-transparent -translate-x-1/2 hidden lg:block" />
          
          <div className="space-y-8 lg:space-y-12">
            {process.map((item, index) => (
              <article
                key={item.step}
                className="process-step relative"
              >
                <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
                  {/* Left Side - Content for odd, empty for even */}
                  <div className={index % 2 === 0 ? 'lg:order-1 lg:text-right pr-8 lg:pr-12' : 'lg:order-3 lg:text-left pl-8 lg:pl-12'}>
                    <div className="glass-card rounded-2xl p-6 lg:p-8 group relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl glass flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 accent-text">
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="badge badge-primary">{item.step}</span>
                          </div>
                          <h3 className="heading-4 text-white mb-2">
                            {t(item.titleAr, item.titleEn)}
                          </h3>
                          <p className="body-sm text-white/70">
                            {t(item.descAr, item.descEn)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center - Step Indicator */}
                  <div className="hidden lg:block lg:order-2 flex flex-col items-center z-10">
                    <div className="relative">
                      {/* Circle with number */}
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full glass flex items-center justify-center relative z-10 border-2 border-brand-500/30 shadow-xl shadow-brand-500/10">
                        <span className="text-2xl lg:text-3xl font-black text-white">{item.step}</span>
                      </div>
                      
                      {/* Pulse Ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-brand-500/30 animate-ping opacity-75" />
                    </div>
                  </div>

                  {/* Right Side - Empty for odd, Content for even */}
                  <div className={index % 2 === 0 ? 'lg:order-3 lg:text-left pl-8 lg:pl-12' : 'lg:order-1 lg:text-right pr-8 lg:pr-12'}>
                    <div className={index % 2 === 1 ? 'glass-card rounded-2xl p-6 lg:p-8 group relative overflow-hidden' : 'hidden lg:block'}>
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl glass flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 accent-text">
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="badge badge-primary">{item.step}</span>
                          </div>
                          <h3 className="heading-4 text-white mb-2">
                            {t(item.titleAr, item.titleEn)}
                          </h3>
                          <p className="body-sm text-white/70">
                            {t(item.descAr, item.descEn)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile Steps - Simple List */}
        <div className="lg:hidden space-y-4 mt-8">
          {process.map((item, index) => (
            <div key={item.step} className="glass-card rounded-xl p-5 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center flex-shrink-0 accent-text">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-primary">{item.step}</span>
                    <h3 className="heading-4 text-white mb-0">{t(item.titleAr, item.titleEn)}</h3>
                  </div>
                  <p className="body-sm text-white/70">{t(item.descAr, item.descEn)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
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
    descEn: "We align on investment goals, product type, and risk profile.",
    descAr: "نحدد أهداف الاستثمار، نوع العقار، ومدى المخاطر المناسبة."
  },
  {
    step: "02",
    titleKey: "shortlist",
    titleEn: "Shortlist",
    titleAr: "القائمة المختصرة",
    descKey: "shortlist_desc",
    descEn: "We evaluate high-potential assets with operational and financial precision.",
    descAr: "نقيّم الأصول عالية الإمكانات بدقة تشغيلية ومالية."
  },
  {
    step: "03",
    titleKey: "due_diligence",
    titleEn: "Due Diligence",
    titleAr: "العناية الواجبة",
    descKey: "due_diligence_desc",
    descEn: "Comprehensive legal, technical, and financial verification before commitment.",
    descAr: "تحقق شامل قانوني، تقني، ومالي قبل الالتزام."
  },
  {
    step: "04",
    titleKey: "execution",
    titleEn: "Execution",
    titleAr: "التنفيذ",
    descKey: "execution_desc",
    descEn: "We guide negotiations, legal coordination, and purchase strategy.",
    descAr: "نرشد المفاوضات، التنسيق القانوني، واستراتيجية الشراء."
  },
  {
    step: "05",
    titleKey: "handover",
    titleEn: "Handover & Onboarding",
    titleAr: "التسليم والبدء",
    descKey: "handover_desc",
    descEn: "Seamless property transfer, utility setup, and tenant placement if needed.",
    descAr: "نقل ملكية سلس، إعداد المرافق، وتأجير إذا لزم الأمر."
  },
  {
    step: "06",
    titleKey: "aftercare",
    titleEn: "Aftercare & Growth",
    titleAr: "المتابعة والنمو",
    descKey: "aftercare_desc",
    descEn: "We remain close to the property journey, ensuring continuity and confidence.",
    descAr: "نبقى قريبين من رحلة العقار، لضمان الاستمرارية والثقة."
  },
];

export function InvestmentProcess() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      
      gsap.from(".process-line", {
        scaleY: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-shell py-20 md:py-28 relative" aria-label={t("عملية الاستثمار", "Investment Process")}>
      <div className="absolute left-[30px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
      
      <div className="mb-16 max-w-2xl">
        <p className="eyebrow">{t("عملية الاستثمار", "Investment Process")}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
          {t("عملية مصممة للثقة والزخم", "A Process Designed for Trust and Momentum.")}
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 relative">
        {process.map((item, index) => (
          <div key={item.step} className="process-card relative">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 w-16 h-16 rounded-full border-2 border-white/15 bg-white/5 flex items-center justify-center">
                <span className="text-2xl font-black text-white">{item.step}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t(item.titleAr, item.titleEn)}</h3>
              <p className="text-sm leading-7 text-white/70">{t(item.descAr, item.descEn)}</p>
            </div>
            {index < process.length - 1 && (
              <div className="process-line absolute left-[38px] top-[48px] bottom-[-40px] w-px bg-white/10 lg:left-[calc(50%+8px)] lg:w-px" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
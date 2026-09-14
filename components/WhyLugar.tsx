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
    descAr: "عقارات خارج السوق وفرص ما قبل الإطلاق من خلال شبكة المطورين والملاك الحصرية لدينا."
  },
  {
    number: "02",
    titleKey: "data_driven",
    titleEn: "Data-Driven Analysis",
    titleAr: "تحليل مبني على البيانات",
    descKey: "data_driven_desc",
    descEn: "Advanced analytics and market modeling to identify undervalued assets with high appreciation potential.",
    descAr: "تحليلات متقدمة ونمذجة سوقية لتحديد الأصول منخفضة التقييم ذات إمكانات نمو عالية."
  },
  {
    number: "03",
    titleKey: "end_to_end",
    titleEn: "End-to-End Management",
    titleAr: "إدارة شاملة من البداية للنهاية",
    descKey: "end_to_end_desc",
    descEn: "From property identification to post-purchase asset management — we handle every detail.",
    descAr: "من تحديد العقار إلى إدارة الأصول بعد الشراء — نتعامل مع كل التفاصيل."
  },
  {
    number: "04",
    titleKey: "transparent_fees",
    titleEn: "Transparent Fee Structure",
    titleAr: "هيكل رسوم شفاف",
    descKey: "transparent_fees_desc",
    descEn: "No hidden costs. Clear, upfront pricing aligned with your investment success.",
    descAr: "لا توجد تكاليف خفية. تسعير واضح ومباشر يتماشى مع نجاح استثمارك."
  },
  {
    number: "05",
    titleKey: "local_expertise",
    titleEn: "Deep Local Expertise",
    titleAr: "خبرة محلية عميقة",
    descKey: "local_expertise_desc",
    descEn: "On-the-ground knowledge of Egypt's emerging districts, regulatory landscape, and market dynamics.",
    descAr: "معرفة ميدانية بأحياء مصر الناشئة، المشهد التنظيمي، وديناميكيات السوق."
  },
  {
    number: "06",
    titleKey: "long_term_partner",
    titleEn: "Long-Term Partner",
    titleAr: "شريك طويل الأمد",
    descKey: "long_term_partner_desc",
    descEn: "We succeed when you succeed. Our model is built on lasting relationships, not one-off transactions.",
    descAr: "ننجح عندما تنجح. نموذجنا مبني على علاقات دائمة، وليس معاملات لمرة واحدة."
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
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="trust" className="section-shell py-20 md:py-28" aria-label={t("لماذا لوجار", "Why Lugar")}>
      <div className="mb-16 max-w-2xl">
        <p className="eyebrow">{t("لماذا لوجار", "Why Lugar")}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
          {t("مصمم للمستثمرين الذين يبحثون عن الوضوح والأمان والتميز", "Built for investors who demand clarity, security, and excellence.")}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whyItems.map((item) => (
          <div key={item.number} className="why-card premium-panel card-lift rounded-[28px] p-6 md:p-7">
            <div className="mb-5 text-sm font-medium tracking-[0.25em] text-white/65">{item.number}</div>
            <h3 className="mb-3 text-xl font-semibold text-white">{t(item.titleAr, item.titleEn)}</h3>
            <p className="text-sm leading-7 text-white/70">{t(item.descAr, item.descEn)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
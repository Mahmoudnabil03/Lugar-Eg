"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { icon: "🛡", ar: "استثمار آمن", en: "Safe Investment", dAr: "رأس مالك محمي بعقود موثقة", dEn: "Your capital protected by documented contracts" },
  { icon: "◈", ar: "دعم مستمر", en: "Customer Support", dAr: "فريقنا معك قبل وبعد الشراء", dEn: "Our team is with you before and after purchase" },
  { icon: "✦", ar: "أفضل الفرص", en: "Best Opportunities", dAr: "وصول حصري لمشاريع مميزة", dEn: "Exclusive access to premium projects" },
  { icon: "◆", ar: "خبرة احترافية", en: "Professional Experience", dAr: "سنوات من الخبرة في السوق المصري", dEn: "Years of expertise in the Egyptian market" },
];

export default function TrustBadges() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".badge-card", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="trust" className="section-shell relative py-20 md:py-28" aria-label={t("لماذا لوجار", "Why Lugar")}>
      <div className="mb-12 max-w-2xl">
        <p className="text-sand tracking-[0.35em] text-[11px] uppercase mb-4">{t("عقود بثقة", "Trust by design")}</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          {t("لماذا ", "Why ")}
          <span className="text-gradient">{t("لوجار؟", "Lugar?")}</span>
        </h2>
        <p className="opacity-70 text-base md:text-lg leading-relaxed">
          {t(
            "أربعة مبادئ تحكم كل صفقة نبرمها: سلامة الاستثمار، توثيق الدعم، فرص حصرية، وخبرة عملية تجعل القرار أكثر وضوحًا.",
            "Four principles govern every deal we make: safe capital, thoughtful guidance, exclusive opportunities, and practical expertise that makes each decision clearer."
          )}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {badges.map((b, i) => (
          <div
            key={b.en}
            className={`badge-card glass card-lift rounded-3xl p-8 ${
              i % 2 === 1 ? "lg:translate-y-8" : ""
            }`}
          >
            <div className="text-3xl text-sand mb-5" aria-hidden="true">{b.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{t(b.ar, b.en)}</h3>
            <p className="text-sm opacity-70 leading-relaxed">{t(b.dAr, b.dEn)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

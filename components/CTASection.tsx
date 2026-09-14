"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-shell pb-20 md:pb-28" aria-label={t("دعوة للعمل", "Call to Action")}>
      <div className="cta-content premium-panel rounded-[32px] p-6 md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("مستعد للبدء", "Ready to Start")}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
              {t("ابدأ بمحادثة تجلب الوضوح لقرار عقارك القادم", "Start with a conversation that brings clarity to your next property decision.")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/70 hidden md:block">
              {t(
                "فريقنا جاهز لفهم أهدافك وتقديم فرص مخصصة تناسب استراتيجيتك الاستثمارية.",
                "Our team is ready to understand your goals and present tailored opportunities that match your investment strategy."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 lg:flex-nowrap lg:justify-end">
            <a
              href="#projects"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
            >
              {t("استكشف المحفظة", "Explore Portfolio")}
            </a>
            <a
              href="https://wa.me/201028232191?text=Hello%2C%20I%20want%20to%20discuss%20real-estate%20investment%20opportunities"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#f1f1f1]"
            >
              {t("احجز استشارة", "Book a Consultation")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
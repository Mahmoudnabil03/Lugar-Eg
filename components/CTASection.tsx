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
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".cta-badge", {
        scale: 0,
        rotation: 180,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".cta-buttons .btn", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section relative overflow-hidden" aria-label={t("دعوة للعمل", "Call to Action")}>
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden cta-content">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-brand-950/50 to-neutral-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-transparent to-transparent" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-30 0V0h-2v4h-4v2h4v4h2v-4h4v-2h-4z\' fill=\'%23ffffff\'/%3E%3C/g%3E%3C/svg%3E")' 
          }} />
          
          {/* Decorative Orbs */}
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-brand-500/10 blur-[100px] animate-float" />
          <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] rounded-full bg-brand-600/10 blur-[80px] animate-float" style={{ animationDelay: '-2s' }} />
          
          {/* Border Glow */}
          <div className="absolute inset-0 border-2 border-brand-500/20 rounded-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 p-6 lg:p-12 text-center">
            {/* Badge */}
            <div className="cta-badge inline-flex items-center gap-2 mb-6">
              <span className="relative">
                <span className="absolute -inset-2 bg-brand-500/20 rounded-full blur animate-ping" />
                <span className="relative badge badge-primary">{t("مستعد للبدء", "Ready to Start")}</span>
              </span>
            </div>

            {/* Headline */}
            <h2 className="heading-1 text-white mb-6 max-w-3xl mx-auto">
              {t("ابدأ بمحادثة تجلب الوضوح", "Start with a Conversation That Brings Clarity")}
              <br />
              <span className="gradient-accent">{t("لقرار عقارك القادم", "to Your Next Property Decision")}</span>
            </h2>

            {/* Description */}
            <p className="body-lg text-white/70 max-w-2xl mx-auto mb-10">
              {t(
                "فريقنا جاهز لفهم أهدافك وتقديم فرص مخصصة تناسب استراتيجيتك الاستثمارية. لا التزام، فقط وضوح.",
                "Our team is ready to understand your goals and present tailored opportunities matching your investment strategy. No obligation, just clarity."
              )}
            </p>

            {/* Buttons */}
            <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/201028232191?text=Hello%2C%20I%20want%20to%20discuss%20real-estate%20investment%20opportunities"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-lg min-w-[200px] animate-pulse-glow"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.16-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.64 8.12-8.1 8.12zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
                </svg>
                {t("احجز استشارة مجانية", "Book Free Consultation")}
              </a>
              <a
                href="#projects"
                className="btn btn-secondary btn-lg min-w-[200px]"
              >
                {t("استكشف المحفظة", "Explore Portfolio")}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="body-sm">{t("بدون التزام", "No Obligation")}</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="body-sm">{t("استشارة مجانية", "Free Consultation")}</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="body-sm">{t("رد خلال 24 ساعة", "24h Response")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
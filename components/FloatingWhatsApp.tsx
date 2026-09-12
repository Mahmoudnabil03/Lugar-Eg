"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { WhatsAppIcon } from "./ProjectCard";

export default function FloatingWhatsApp() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/201028232191?text=مرحباً، أود الاستفسار عن خدمات لوجار العقارية"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("تواصل معنا عبر واتساب", "Chat with us on WhatsApp")}
      className={`fixed bottom-6 end-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] text-navy px-5 py-4 font-bold shadow-2xl btn-glow transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <WhatsAppIcon />
      <span className="hidden sm:inline text-sm">{t("تحدث معنا", "Chat with us")}</span>
    </a>
  );
}

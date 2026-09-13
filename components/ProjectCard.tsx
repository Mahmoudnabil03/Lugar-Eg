"use client";

import { Project, whatsappLink } from "@/data/projects";
import { useLang } from "@/lib/i18n";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang, t } = useLang();

  const spanClass =
    project.span === "wide"
      ? "md:col-span-2"
      : project.span === "tall"
      ? "md:row-span-2"
      : "";

  return (
    <article
      className={`project-card card-lift flex min-h-[18rem] flex-col justify-between rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 ${spanClass} ${
        index % 3 === 1 ? "md:translate-y-6" : ""
      }`}
      aria-label={project.title[lang]}
    >
      <div>
        <div className="mb-5 flex items-start justify-between gap-3">
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white/55">
            {String(index + 1).padStart(2, "0")} — {project.type[lang]}
          </span>
          {project.featured && (
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white/80">
              {t("مميز", "Featured")}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-semibold tracking-[-0.04em] text-white md:text-2xl">
          {project.title[lang]}
        </h3>
        <p className="mb-1 text-sm text-white/60">{project.location[lang]}</p>
        {project.priceNote && <p className="text-xs text-white/45">{project.priceNote[lang]}</p>}
      </div>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
        <p className="text-lg font-semibold text-white md:text-xl">{project.price}</p>
        <a
          href={whatsappLink(project, lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/35 hover:bg-white/10"
          aria-label={`${t("تواصل عبر واتساب بخصوص", "WhatsApp inquiry about")} ${project.title[lang]}`}
        >
          <WhatsAppIcon />
          {t("واتساب", "WhatsApp")}
        </a>
      </div>
    </article>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.16-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.64 8.12-8.1 8.12zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

"use client";

import { Project, whatsappLink } from "@/data/projects";
import { useLang } from "@/lib/i18n";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang, t } = useLang();

  const spanClass =
    project.span === "wide"
      ? "lg:col-span-2"
      : project.span === "tall"
      ? "lg:row-span-2"
      : "";

  return (
    <article
      className={`project-card glass-card rounded-2xl p-6 lg:p-7 flex flex-col min-h-[380px] ${spanClass}`}
      aria-label={project.title[lang]}
    >
      {/* Image/Visual Area */}
      <div className="on-media relative aspect-video mb-5 rounded-xl overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Property Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="badge badge-secondary backdrop-blur-sm">
            {project.type[lang]}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-primary">{t("مميز", "Featured")}</span>
          </div>
        )}

        {/* Number Badge */}
        <div className="absolute bottom-3 left-3 text-white/50 font-medium text-sm">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h40v40H0z\'/%3E%3C/g%3E%3C/svg%3E")' 
        }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="heading-4 text-white mb-2 leading-snug">
          {project.title[lang]}
        </h3>
        
        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{project.location[lang]}</span>
        </div>

        {project.priceNote && (
          <p className="caption text-white/40 mb-2">{project.priceNote[lang]}</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="text-right sm:text-left">
          <p className="heading-3 text-white font-bold">{project.price}</p>
        </div>

        <a
          href={whatsappLink(project, lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm w-full sm:w-auto whitespace-nowrap"
          aria-label={`${t("تواصل عبر واتساب بخصوص", "WhatsApp inquiry about")} ${project.title[lang]}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.28c0-4.47 3.64-8.1 8.16-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.64 8.12-8.1 8.12zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
          </svg>
          {t("واتساب", "WhatsApp")}
        </a>
      </div>
    </article>
  );
}
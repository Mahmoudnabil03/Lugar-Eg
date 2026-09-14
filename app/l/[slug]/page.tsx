"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { getPage, saveLead, LandingPage } from "@/lib/store";

export default function LandingPageView() {
  const { t, lang } = useLang();
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [page, setPage] = useState<LandingPage | null | undefined>(undefined);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setPage(getPage(slug) ?? null);
  }, [slug]);

  if (page === undefined) {
    return (
      <>
        <Navbar />
        <main className="container pt-32 pb-20 text-center"><p className="body text-white/60">{t("جاري التحميل...", "Loading...")}</p></main>
        <Footer />
      </>
    );
  }

  if (page === null) {
    return (
      <>
        <Navbar />
        <main className="container pt-32 pb-20 text-center">
          <h1 className="heading-3 text-white">404</h1>
          <p className="body text-white/60 mt-3">{t("الصفحة غير موجودة", "Page not found")}</p>
          <Link href="/" className="btn btn-primary mt-6">{t("الرئيسية", "Home")}</Link>
        </main>
        <Footer />
      </>
    );
  }

  const project = projects.find((p) => p.id === page.projectId);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    saveLead({ pageSlug: page.slug, name, phone, email, message });
    setDone(true);
  };

  return (
    <>
      <Navbar />
      <main className="container pt-28 pb-16 grid lg:grid-cols-2 gap-8 items-start">
        <div className="glass-card rounded-2xl overflow-hidden">
          {project && (
            <div className="on-media relative aspect-video overflow-hidden">
              <img src={project.image} alt={project.imageAlt[lang]} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="badge badge-secondary backdrop-blur-sm">{project.location[lang]}</span>
              </div>
            </div>
          )}
          <div className="p-6 lg:p-8">
            <p className="eyebrow accent-text">{page.title}</p>
            <h1 className="heading-3 text-white mt-3">{page.headline}</h1>
            {page.subtext && <p className="body text-white/70 mt-4">{page.subtext}</p>}
            {project && (
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
                <p className="font-semibold text-white">{project.title[lang]}</p>
                <p className="heading-4 gradient-accent">{project.price}</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 lg:p-8">
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="heading-4 text-white">{t("تم استلام طلبك", "Request received")}</h2>
              <p className="body text-white/60 mt-2">{t("سيتواصل معك فريق لوجار قريباً", "The Lugar team will contact you soon")}</p>
              <a className="btn btn-primary mt-6" target="_blank" rel="noreferrer" href={`https://wa.me/${page.whatsapp}?text=${encodeURIComponent(`${t("مهتم", "Interested")}: ${page.title} — ${name} ${phone}`)}`}>
                {t("تأكيد عبر واتساب", "Confirm on WhatsApp")}
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h2 className="heading-4 text-white">{t("اطلب استشارة مجانية", "Request a free consultation")}</h2>
              <div><label className="label">{t("الاسم", "Name")}</label><input required value={name} onChange={(e) => setName(e.target.value)} className="input" /></div>
              {page.showPhone && <div><label className="label">{t("الهاتف", "Phone")}</label><input required value={phone} onChange={(e) => setPhone(e.target.value)} className="input" dir="ltr" placeholder="+20 ..." /></div>}
              {page.showEmail && <div><label className="label">{t("البريد", "Email")}</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" dir="ltr" /></div>}
              <div><label className="label">{t("رسالتك", "Message")}</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} className="input" rows={3} /></div>
              <button className="btn btn-primary w-full">{t("إرسال الطلب", "Send request")}</button>
              <p className="caption text-center text-white/40">lugar-eg.com · {t("قريباً على الدومين الرسمي", "soon on the official domain")}</p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

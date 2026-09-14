"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { projects } from "@/data/projects";

interface Msg {
  from: "bot" | "user";
  text: string;
}

const WA = "https://wa.me/201028232191";

export default function Chatbot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        from: "bot",
        text: t(
          "أهلاً بك في لوجار! اسألني عن مشاريعنا، الأسعار، المناطق، أو احجز استشارة. كيف أساعدك؟",
          "Welcome to Lugar! Ask me about our projects, prices, areas, or book a consultation. How can I help?"
        ),
      }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const answer = (raw: string): string => {
    const q = raw.trim().toLowerCase();
    if (!q) return "";
    const ar = lang === "ar";

    // Project match (ar + en titles, location, type)
    const hit = projects.find((p) =>
      [p.title.ar, p.title.en, p.location.ar, p.location.en, p.type.ar, p.type.en]
        .join(" ").toLowerCase().split(/[\s,–—·.()]+/).some((w) => w.length > 2 && q.includes(w))
    );
    if (hit) {
      return ar
        ? `${hit.title.ar} — ${hit.location.ar} (${hit.type.ar}). السعر: ${hit.price}. ${hit.priceNote ? hit.priceNote.ar + ". " : ""}تحب أحجز لك استشارة؟`
        : `${hit.title.en} — ${hit.location.en} (${hit.type.en}). Price: ${hit.price}. ${hit.priceNote ? hit.priceNote.en + ". " : ""}Want me to book you a consultation?`;
    }

    if (/price|سعر|أسعار|بكام|تكلفة|cost/.test(q)) {
      const list = projects.slice(0, 5).map((p) => `• ${lang === "ar" ? p.title.ar : p.title.en}: ${p.price}`).join("\n");
      return (ar ? "أبرز أسعارنا:\n" : "Our featured prices:\n") + list;
    }
    if (/where|location|area|فين|مكان|منطقة|موقع|عاصمة|تجمع|ساحل/.test(q)) {
      const locs = Array.from(new Set(projects.map((p) => (lang === "ar" ? p.location.ar : p.location.en)))).join("، ");
      return ar ? `نغطي: ${locs}. عن أي منطقة تسأل؟` : `We cover: ${locs}. Which area are you asking about?`;
    }
    if (/contact|human|call|phone|تواصل|اتصال|رقم|هاتف|واتس|موظف|استشاره|استشارة/.test(q)) {
      return ar
        ? `كلمنا واتساب: +20 102 823 2191 — ${WA}`
        : `Chat with us on WhatsApp: +20 102 823 2191 — ${WA}`;
    }
    if (/hour|open|مواعيد|ساعات|شغال|امتى|دوام/.test(q)) {
      return ar ? "فريقنا متاح يومياً — راسلنا واتساب وسنرد سريعاً." : "Our team is available daily — message us on WhatsApp for a fast reply.";
    }
    if (/who|about|ل‍وجار|مين|شركة|about/.test(q)) {
      return ar
        ? "لوجار للتسويق والاستثمار العقاري — شريكك الموثوق في مصر: ذكاء سوقي، فرص حصرية، وإدارة شاملة."
        : "Lugar Real Estate Marketing & Investment — your trusted partner in Egypt: market intelligence, exclusive deals, end-to-end management.";
    }
    if (/hi|hello|hey|سلام|اهلا|أهلا|صباح|مساء/.test(q)) {
      return ar ? "أهلاً بك! اسأل عن أي مشروع أو منطقة." : "Hello! Ask about any project or area.";
    }
    if (/thank|شكرا|شكراً/.test(q)) {
      return ar ? "العفو! بالتوفيق في استثمارك." : "You're welcome! Good luck with your investment.";
    }
    return ar
      ? `سؤال وجيه! للتفاصيل الدقيقة كلم فريقنا واتساب ${WA} — أو اسأل عن مشروع/منطقة بالاسم.`
      : `Good question! For exact details message our team on WhatsApp ${WA} — or ask about a project/area by name.`;
  };

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((m) => [...m, { from: "user", text: msg }, { from: "bot", text: answer(msg) }]);
    setInput("");
  };

  const quicks = lang === "ar"
    ? ["أسعار المشاريع", "أين مناطقكم؟", "أريد استشارة"]
    : ["Project prices", "Which areas?", "Book consultation"];

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="surface-elevated rounded-2xl w-[calc(100vw-3rem)] max-w-sm overflow-hidden animate-scale-in shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center font-black text-white">L</div>
              <div>
                <p className="font-semibold text-white text-sm">{t("مساعد لوجار", "Lugar Assistant")}</p>
                <p className="caption text-white/50 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />{t("متصل", "Online")}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/50 hover:text-white text-xl leading-none px-2">×</button>
          </div>
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                <p className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-6 whitespace-pre-line ${m.from === "user" ? "bg-white/10 border border-white/10 text-white" : "bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/25 text-white"}`}>
                  {m.text}
                </p>
              </div>
            ))}
            <div ref={bottom} />
          </div>
          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {quicks.map((q) => (
              <button key={q} onClick={() => send(q)} className="badge badge-secondary hover:border-brand-500/40 transition">{q}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 p-3 border-t border-white/10">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("اكتب سؤالك...", "Type your question...")} className="input !py-2.5 text-sm" />
            <button type="submit" aria-label="Send" className="btn btn-primary btn-sm !px-4">↑</button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("المساعد الذكي", "AI assistant")}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform animate-pulse-glow"
      >
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
    </div>
  );
}

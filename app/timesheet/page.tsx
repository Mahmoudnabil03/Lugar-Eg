"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import {
  AuxStatus, SHIFT_HOURS, listEvents, pushEvent,
  workedToday, isClockedIn, currentAux, dayKey, fmtDuration,
} from "@/lib/store";

const AUX_OPTIONS: { id: AuxStatus; ar: string; en: string }[] = [
  { id: "available", ar: "متاح", en: "Available" },
  { id: "break15", ar: "بريك 15 دقيقة", en: "15-min break" },
  { id: "lunch60", ar: "بريك الغداء 60 دقيقة", en: "1-hour lunch" },
  { id: "off", ar: "خارج الخدمة", en: "Off aux" },
];

export default function TimesheetPage() {
  const { t } = useLang();
  const { user, logout } = useAuth();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const email = user?.email ?? "";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events = useMemo(() => (email ? listEvents(email) : []), [email, tick]);
  const clockedIn = isClockedIn(events);
  const aux = currentAux(events);
  const worked = workedToday(events);
  const target = SHIFT_HOURS * 3600 * 1000;
  const pct = Math.min(100, (worked / target) * 100);

  const today = events.filter((e) => dayKey(e.ts) === dayKey(Date.now())).sort((a, b) => b.ts - a.ts);
  const smallUsed = today.filter((e) => e.type === "aux" && e.aux === "break15").length;
  const lunchUsed = today.filter((e) => e.type === "aux" && e.aux === "lunch60").length;

  const act = (type: "clock-in" | "clock-out" | "aux", a?: AuxStatus) => {
    if (!email) return;
    pushEvent(email, a ? { type, aux: a } : { type });
    setTick((x) => x + 1);
  };

  const auxLabel = (id: AuxStatus) => {
    const o = AUX_OPTIONS.find((x) => x.id === id);
    return o ? t(o.ar, o.en) : id;
  };

  return (
    <RequireRole roles={["employee", "admin"]}>
      <Navbar />
      <main className="container pt-28 pb-16 min-h-[80vh]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow accent-text">{t("كشف الدوام", "Timesheet")}</p>
            <h1 className="heading-3 text-white mt-2">{t("وردية 8 ساعات", "8-hour shift")}</h1>
            <p className="caption mt-2 text-white/40" dir="ltr">{email}</p>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-sm">{t("خروج", "Log out")}</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Shift status */}
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <p className="body-sm text-white/60">{t("وقت العمل اليوم", "Worked today")}</p>
              <span className={`badge ${clockedIn ? "badge-success" : "badge-secondary"}`}>
                {clockedIn ? t("داخل الوردية", "On shift") : t("خارج الوردية", "Off shift")}
              </span>
            </div>
            <p className="heading-2 gradient-text tabular-nums" dir="ltr">{fmtDuration(worked)} <span className="text-lg text-white/40">/ 08:00:00</span></p>
            <div className="h-2 rounded-full bg-white/5 border border-white/10 mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {!clockedIn ? (
                <button onClick={() => act("clock-in")} className="btn btn-primary">{t("بدء الوردية", "Clock in")}</button>
              ) : (
                <button onClick={() => act("clock-out")} className="btn btn-secondary">{t("إنهاء الوردية", "Clock out")}</button>
              )}
            </div>
            {/* Aux switch */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="label">{t("حالة الـ Aux", "Aux status")}: <span className="accent-text font-semibold">{auxLabel(aux)}</span></p>
              <div className="flex flex-wrap gap-2 mt-3">
                {AUX_OPTIONS.map((o) => {
                  const disabled = !clockedIn || (o.id === "break15" && smallUsed >= 2 && aux !== "break15") || (o.id === "lunch60" && lunchUsed >= 1 && aux !== "lunch60");
                  return (
                    <button
                      key={o.id}
                      disabled={disabled}
                      onClick={() => act("aux", o.id)}
                      className={`btn btn-sm ${aux === o.id ? "btn-primary" : "btn-secondary"}`}
                    >
                      {t(o.ar, o.en)}
                    </button>
                  );
                })}
              </div>
              <p className="caption mt-3 text-white/40">
                {t("بريك صغير مستخدم", "Small breaks used")}: {Math.min(smallUsed, 2)}/2 · {t("الغداء", "Lunch")}: {Math.min(lunchUsed, 1)}/1
              </p>
            </div>
          </div>

          {/* Rules */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="heading-4 text-white mb-4">{t("قواعد البريك", "Break rules")}</h2>
            <ul className="space-y-3 body-sm text-white/70">
              <li>· {t("وردية عمل 8 ساعات", "8-hour work shift")}</li>
              <li>· {t("بريك صغير · 15 دقيقة — مرتان في الوردية", "Small break · 15 min — twice per shift")}</li>
              <li>· {t("بريك الغداء · 60 دقيقة — مرة في الوردية", "Lunch break · 60 min — once per shift")}</li>
              <li>· {t("لا توقيت ثابت للبريك — خذه عند الحاجة", "No fixed break timing — take breaks when needed")}</li>
              <li>· {t("سجّل الدخول والخروج يومياً", "Clock in and out every day")}</li>
            </ul>
          </div>
        </div>

        {/* Log */}
        <div className="glass-card rounded-2xl p-6 mt-6">
          <h2 className="heading-4 text-white mb-4">{t("سجل اليوم", "Today's log")}</h2>
          {today.length === 0 && <p className="body text-white/50">{t("لا أحداث بعد", "No events yet")}</p>}
          <div className="space-y-2">
            {today.map((e) => (
              <div key={e.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                <span className="text-white/80">
                  {e.type === "clock-in" ? t("بدء الوردية", "Clock in") : e.type === "clock-out" ? t("إنهاء الوردية", "Clock out") : `${t("تحويل", "Aux")} → ${auxLabel(e.aux ?? "available")}`}
                </span>
                <span className="text-white/40 tabular-nums" dir="ltr">{new Date(e.ts).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </RequireRole>
  );
}

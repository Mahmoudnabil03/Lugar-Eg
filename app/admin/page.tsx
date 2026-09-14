"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequireRole from "@/components/RequireRole";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { projects } from "@/data/projects";
import {
  LandingPage, LeadSubmission, listPages, savePage, deletePage, slugify,
  listLeads, SHIFT_HOURS,
} from "@/lib/store";

type Tab = "pages" | "employees" | "leads";

export default function AdminPage() {
  const { t, lang } = useLang();
  const { user, logout, createEmployee, listEmployees, deleteUser } = useAuth();
  const [tab, setTab] = useState<Tab>("pages");
  const [refresh, setRefresh] = useState(0);

  const pages = useMemo(() => listPages(), [refresh]);
  const leads = useMemo(() => listLeads(), [refresh, tab]);
  const employees = useMemo(() => listEmployees(), [refresh, tab]);

  return (
    <RequireRole roles={["admin"]}>
      <Navbar />
      <main className="container pt-28 pb-16 min-h-[80vh]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow accent-text">{t("لوحة الإدارة", "Admin panel")}</p>
            <h1 className="heading-3 text-white mt-2">{t("أهلاً", "Hello")}, {user?.name}</h1>
            <p className="caption mt-2 text-white/40">lugar-eg.com · {t("الدومين يُربط بعد المراجعة النهائية", "Domain connects after final review")}</p>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-sm">{t("خروج", "Log out")}</button>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {([["pages", t("صفحات الهبوط", "Landing pages")], ["employees", t("الموظفون", "Employees")], ["leads", t("الطلبات", "Leads")]] as [Tab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className={`btn btn-sm ${tab === id ? "btn-primary" : "btn-secondary"}`}>
              {label}{id === "leads" ? ` (${leads.length})` : ""}
            </button>
          ))}
        </div>

        {tab === "pages" && <PagesTab onChange={() => setRefresh((r) => r + 1)} pages={pages} />}
        {tab === "employees" && (
          <EmployeesTab
            employees={employees}
            onCreate={async (n, e, p) => { await createEmployee(n, e, p); setRefresh((r) => r + 1); }}
            onDelete={(id) => { deleteUser(id); setRefresh((r) => r + 1); }}
          />
        )}
        {tab === "leads" && <LeadsTab leads={leads} />}
      </main>
      <Footer />
    </RequireRole>
  );
}

function PagesTab({ pages, onChange }: { pages: LandingPage[]; onChange: () => void }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ slug: "", title: "", projectId: projects[0]?.id ?? "", headline: "", subtext: "", whatsapp: "201028232191", showPhone: true, showEmail: false });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = slugify(form.slug || form.title);
    if (listPages().some((p) => p.slug === slug)) { setError(t("هذا الرابط مستخدم", "Slug already used")); return; }
    savePage({ ...form, slug, active: true, createdAt: Date.now() });
    setForm({ slug: "", title: "", projectId: projects[0]?.id ?? "", headline: "", subtext: "", whatsapp: "201028232191", showPhone: true, showEmail: false });
    setError("");
    onChange();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="heading-4 text-white mb-4">{t("صفحة هبوط جديدة", "New landing page")}</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">{t("المشروع", "Project")}</label>
            <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} className="input select">
              {projects.map((p) => <option key={p.id} value={p.id} className="bg-neutral-900">{p.title[lang]}</option>)}
            </select>
          </div>
          <div>
            <label className="label">{t("عنوان الصفحة", "Page title")}</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="input" placeholder={t("مثال: شقق التجمع", "e.g. Tagamoa Apartments")} />
          </div>
          <div>
            <label className="label">{t("الرابط (slug)", "URL slug")} — /l/<span dir="ltr">{slugify(form.slug || form.title || "slug")}</span></label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input" placeholder={t("اختياري", "optional")} dir="ltr" />
          </div>
          <div>
            <label className="label">{t("العنوان الرئيسي", "Headline")}</label>
            <input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} required className="input" />
          </div>
          <div>
            <label className="label">{t("وصف قصير", "Short text")}</label>
            <textarea value={form.subtext} onChange={(e) => setForm({ ...form, subtext: e.target.value })} className="input" rows={2} />
          </div>
          <div>
            <label className="label">{t("رقم واتساب لاستقبال الطلبات", "WhatsApp for leads")} (dir ltr)</label>
            <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="input" dir="ltr" />
          </div>
          <div className="flex gap-4 text-sm text-white/70">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.showPhone} onChange={(e) => setForm({ ...form, showPhone: e.target.checked })} /> {t("حقل الهاتف", "Phone field")}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.showEmail} onChange={(e) => setForm({ ...form, showEmail: e.target.checked })} /> {t("حقل البريد", "Email field")}</label>
          </div>
          {error && <p className="body-sm text-red-400">{error}</p>}
          <button className="btn btn-primary w-full">{t("إنشاء الصفحة", "Create page")}</button>
        </form>
      </div>
      <div className="space-y-4">
        {pages.length === 0 && <p className="body text-white/50">{t("لا صفحات بعد", "No pages yet")}</p>}
        {pages.map((p) => (
          <div key={p.slug} className="glass-card rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">{p.title}</p>
              <p className="caption text-white/50" dir="ltr">/l/{p.slug}</p>
            </div>
            <div className="flex gap-2">
              <a href={`/l/${p.slug}`} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">{t("عرض", "View")}</a>
              <button onClick={() => { deletePage(p.slug); onChange(); }} className="btn btn-ghost btn-sm">{t("حذف", "Delete")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployeesTab({ employees, onCreate, onDelete }: {
  employees: { id: string; name: string; email: string; createdAt: number }[];
  onCreate: (n: string, e: string, p: string) => Promise<void>;
  onDelete: (id: string) => void;
}) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await onCreate(name, email, password);
      setName(""); setEmail(""); setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="heading-4 text-white mb-2">{t("حساب موظف جديد", "New employee account")}</h2>
        <p className="caption text-white/50 mb-4">{t("وردية 8 ساعات · البريد يجب أن ينتهي بـ @lugar-eg.com", "8-hour shifts · email must end with @lugar-eg.com")}</p>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="label">{t("الاسم", "Name")}</label><input value={name} onChange={(e) => setName(e.target.value)} required className="input" /></div>
          <div><label className="label">{t("البريد", "Email")}</label><input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="input" placeholder="name@lugar-eg.com" dir="ltr" /></div>
          <div><label className="label">{t("كلمة المرور", "Password")}</label><input value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} type="password" className="input" dir="ltr" /></div>
          {error && <p className="body-sm text-red-400">{error}</p>}
          <button className="btn btn-primary w-full">{t("إنشاء الحساب", "Create account")}</button>
        </form>
      </div>
      <div className="space-y-4">
        {employees.length === 0 && <p className="body text-white/50">{t("لا موظفين بعد", "No employees yet")}</p>}
        {employees.map((m) => (
          <div key={m.id} className="glass-card rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">{m.name}</p>
              <p className="caption text-white/50" dir="ltr">{m.email} · {SHIFT_HOURS}h {t("وردية", "shift")}</p>
            </div>
            <button onClick={() => onDelete(m.id)} className="btn btn-ghost btn-sm">{t("حذف", "Delete")}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadsTab({ leads }: { leads: LeadSubmission[] }) {
  const { t } = useLang();
  if (leads.length === 0) return <p className="body text-white/50">{t("لا طلبات بعد", "No leads yet")}</p>;
  return (
    <div className="space-y-4">
      {leads.map((l) => (
        <div key={l.id} className="glass-card rounded-2xl p-5">
          <div className="flex flex-wrap justify-between gap-2 mb-2">
            <p className="font-semibold text-white">{l.name} <span className="caption text-white/40" dir="ltr">/l/{l.pageSlug}</span></p>
            <p className="caption text-white/40">{new Date(l.createdAt).toLocaleString()}</p>
          </div>
          <p className="body-sm text-white/70" dir="ltr">{l.phone}{l.email ? ` · ${l.email}` : ""}</p>
          {l.message && <p className="body-sm text-white/60 mt-2">{l.message}</p>}
          <a className="btn btn-secondary btn-sm mt-3" target="_blank" rel="noreferrer" href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}>WhatsApp</a>
        </div>
      ))}
    </div>
  );
}

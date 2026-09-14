"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

export default function LoginPage() {
  const { t } = useLang();
  const { login, googleSignIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleNote, setGoogleNote] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const u = await login(email, password);
      router.push(u.role === "admin" ? "/admin" : u.role === "employee" ? "/timesheet" : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    try {
      await googleSignIn();
    } catch {
      setGoogleNote(true);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container pt-28 pb-16 min-h-[80vh] flex items-center justify-center">
        <div className="glass-card rounded-2xl p-6 lg:p-10 w-full max-w-md">
          <p className="eyebrow accent-text">{t("مرحباً بعودتك", "Welcome back")}</p>
          <h1 className="heading-3 text-white mt-3 mb-6">{t("تسجيل الدخول", "Log in")}</h1>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">{t("البريد الإلكتروني", "Email")}</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@example.com" dir="ltr" />
            </div>
            <div>
              <label className="label" htmlFor="password">{t("كلمة المرور", "Password")}</label>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" dir="ltr" />
            </div>
            {error && <p className="body-sm text-red-400">{error}</p>}
            <button type="submit" disabled={busy} className="btn btn-primary w-full">
              {busy ? t("جاري الدخول...", "Signing in...") : t("دخول", "Log in")}
            </button>
          </form>
          <div className="divider my-6" />
          <button onClick={google} className="btn btn-secondary w-full">
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
            {t("الدخول عبر جوجل", "Continue with Google")}
          </button>
          {googleNote && (
            <p className="body-sm text-center mt-3 text-white/60">
              {t("ربط جوجل سيتم تفعيله غداً — استخدم البريد وكلمة المرور الآن.", "Google sign-in wires up tomorrow — use email + password for now.")}
            </p>
          )}
          <p className="body-sm text-center mt-6 text-white/60">
            {t("ليس لديك حساب؟", "No account?")}{" "}
            <Link href="/signup" className="accent-text font-semibold">{t("أنشئ حساباً", "Sign up")}</Link>
          </p>
          <p className="caption text-center mt-4 text-white/40">
            {t("حسابات @lugar-eg.com للموظفين. الإدارة: admin@lugar-eg.com", "Staff use @lugar-eg.com emails. Admin: admin@lugar-eg.com")}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

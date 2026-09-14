"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, Role } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

export default function RequireRole({ roles, children }: { roles: Role[]; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { t } = useLang();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !roles.includes(user.role))) router.replace("/login");
  }, [loading, user, router, roles]);

  if (loading) {
    return (
      <main className="container pt-32 pb-20 text-center">
        <p className="body text-white/60">{t("جاري التحميل...", "Loading...")}</p>
      </main>
    );
  }
  if (!user || !roles.includes(user.role)) return null;
  return <>{children}</>;
}

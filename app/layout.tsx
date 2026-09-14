import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond, Tajawal } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/auth";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lugar-realestate.com"),
  title: {
    default: "Lugar Real Estate | لوجار للتسويق والاستثمار العقاري",
    template: "%s | Lugar Real Estate",
  },
  description:
    "شريكك الموثوق في الاستثمار العقاري — Your trusted partner in real estate investment in Egypt. Safe investment, high returns, exclusive opportunities.",
  keywords: [
    "Lugar", "لوجار", "real estate Egypt", "عقارات مصر",
    "العاصمة الإدارية", "التجمع الخامس", "رأس الحكمة", "استثمار عقاري",
  ],
  openGraph: {
    title: "Lugar Real Estate | لوجار للتسويق والاستثمار العقاري",
    description:
      "شريكك الموثوق في الاستثمار العقاري — Your trusted partner in real estate investment.",
    locale: "ar_EG",
    alternateLocale: "en_US",
    type: "website",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var h=document.documentElement;h.classList.remove('dark','light');h.classList.add(t);h.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${cormorant.variable} ${tajawal.variable} font-arabic antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

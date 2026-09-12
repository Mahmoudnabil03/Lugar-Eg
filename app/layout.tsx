import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
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
  alternates: {
    languages: { ar: "/ar", en: "/en" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmArabic.variable} font-arabic antialiased bg-navy text-offwhite`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

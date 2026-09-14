import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SignatureSection from "@/components/SignatureSection";
import TrustBadges from "@/components/TrustBadges";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothScroll from "@/components/SmoothScroll";
import { ValueProposition } from "@/components/ValueProposition";
import { InvestmentProcess } from "@/components/InvestmentProcess";
import { WhyLugar } from "@/components/WhyLugar";
import { CTASection } from "@/components/CTASection";
import { StatsSection } from "@/components/StatsSection";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main" className="overflow-x-hidden">
        <HeroSection />
        <ValueProposition />
        <StatsSection />
        <WhyLugar />
        <InvestmentProcess />
        <CTASection />
        <ProjectGrid />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
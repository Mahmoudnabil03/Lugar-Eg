import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import { ValueProposition } from "@/components/ValueProposition";
import { InvestmentProcess } from "@/components/InvestmentProcess";
import { WhyLugar } from "@/components/WhyLugar";
import { CTASection } from "@/components/CTASection";
import { StatsSection } from "@/components/StatsSection";

export default function Home() {
  return (
    <>
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
    </>
  );
}
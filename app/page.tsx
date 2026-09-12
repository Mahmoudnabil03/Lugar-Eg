import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SignatureSection from "@/components/SignatureSection";
import TrustBadges from "@/components/TrustBadges";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main" className="overflow-x-hidden">
        <HeroSection />
        <SignatureSection />
        <TrustBadges />
        <ProjectGrid />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}

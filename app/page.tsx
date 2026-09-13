import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SignatureSection from "@/components/SignatureSection";
import TrustBadges from "@/components/TrustBadges";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothScroll from "@/components/SmoothScroll";

const focusAreas = [
  {
    title: "Market intelligence",
    description:
      "We identify value before the market fully prices it in, ensuring informed decisions and stronger long-term upside.",
  },
  {
    title: "Structured guidance",
    description:
      "Every step is planned with clarity — from evaluation and negotiation to execution, handover, and post-purchase support.",
  },
  {
    title: "Risk-aware acquisition",
    description:
      "We focus on durable opportunities with balanced risk, real demand, and a strategic vision for future value creation.",
  },
  {
    title: "Investor-first advisory",
    description:
      "Your priorities come first: yield, clarity, trust, and a portfolio strategy that supports sustainable growth.",
  },
];

const process = [
  { step: "01", title: "Discovery", text: "We align on investment goals, product type, and risk profile." },
  { step: "02", title: "Shortlist", text: "We evaluate high-potential assets with operational and financial precision." },
  { step: "03", title: "Execution", text: "We guide negotiations, legal coordination, and purchase strategy." },
  { step: "04", title: "Aftercare", text: "We remain close to the property journey, ensuring continuity and confidence." },
];

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main" className="overflow-x-hidden">
        <HeroSection />
        <SignatureSection />
        <TrustBadges />

        <section id="trust" className="section-shell py-20 md:py-28">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">WHY LUGAR</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
              Built for investors who want clarity, security, and premium positioning.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {focusAreas.map((item) => (
              <div key={item.title} className="premium-panel card-lift rounded-[28px] p-6 md:p-7">
                <div className="mb-5 h-10 w-10 rounded-full border border-white/15 bg-white/5" />
                <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-7 text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell pb-20 md:pb-28">
          <div className="premium-panel overflow-hidden rounded-[32px] p-6 md:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="eyebrow">OUR EDGE</p>
                <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                  A strategic real-estate partner for a more confident investment future.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                  Lugar combines local market intelligence, premium positioning, and a transparent process that helps investors move faster without compromising long-term value.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: "120M+", label: "Portfolio exposure tracked" },
                  { value: "18+", label: "High-potential opportunities reviewed" },
                  { value: "5-step", label: "Advisory framework" },
                  { value: "24/7", label: "Client access and support" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-3xl font-semibold text-white">{stat.value}</div>
                    <p className="mt-2 text-sm text-white/65">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-20 md:pb-28">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">INVESTMENT JOURNEY</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
              A process designed for trust and momentum.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {process.map((item) => (
              <div key={item.step} className="premium-panel rounded-[26px] p-6">
                <div className="mb-5 text-sm font-medium tracking-[0.25em] text-white/65">{item.step}</div>
                <h3 className="mb-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-7 text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell pb-20 md:pb-28">
          <div className="premium-panel rounded-[32px] p-6 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">READY TO MOVE</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                  Start with a conversation that brings clarity to your next property decision.
                </h2>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                >
                  Explore portfolio
                </a>
                <a
                  href="https://wa.me/201028232191?text=Hello%2C%20I%20want%20to%20discuss%20real-estate%20investment%20opportunities"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#f1f1f1]"
                >
                  Book a consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        <ProjectGrid />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}

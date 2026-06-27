import { Hero } from "@/components/sections/home/Hero";
import { CarrierLogos } from "@/components/sections/home/CarrierLogos";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { ServiceGrid } from "@/components/sections/home/ServiceGrid";
import { CoverageComparison } from "@/components/sections/home/CoverageComparison";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { MeetAdvisor } from "@/components/sections/home/MeetAdvisor";
import { OverpayingCalculator } from "@/components/sections/home/OverpayingCalculator";
import { SavingsSection } from "@/components/sections/home/SavingsSection";
import { WhyDriversSwitch } from "@/components/sections/home/WhyDriversSwitch";
import { Reviews } from "@/components/sections/Reviews";
import { CitiesServed } from "@/components/sections/home/CitiesServed";
import { LearningPreview } from "@/components/sections/home/LearningPreview";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { homeFaqs } from "@/data/faqs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CarrierLogos />
      <TrustBar />
      <ServiceGrid />
      {/* Strongest sales argument, placed immediately after the service cards */}
      <CoverageComparison />
      <HowItWorks />
      <MeetAdvisor />
      <OverpayingCalculator />
      <SavingsSection />
      <WhyDriversSwitch />
      <Reviews tone="muted" />
      <CitiesServed />
      <LearningPreview />
      <FaqSection faqs={homeFaqs} tone="default" />
      <CtaBand />
    </>
  );
}

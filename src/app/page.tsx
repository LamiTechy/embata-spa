import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Services from "@/components/Services";
import SectionDivider from "@/components/SectionDivider";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <SectionDivider />
      <Services featured />
      <SectionDivider />
      <WhyChooseUs />
      <SectionDivider />
      <Reviews preview />
      <CTABanner />
    </>
  );
}

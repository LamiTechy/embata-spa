import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Services & Prices",
  description:
    "Explore Embata Massage Spa's treatments and prices in Ikeja, Lagos — Swedish, deep tissue, hot stone, reflexology, couples and prenatal massage. Open 24 hours.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & Prices"
        title="Six treatments,"
        highlight="one goal: your calm."
        description="Transparent pricing with no hidden fees. Pick a treatment below, or call us and we'll help you choose the right one for your body."
      />
      <Services />
      <CTABanner />
    </>
  );
}

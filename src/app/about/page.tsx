import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AboutContent from "@/components/AboutContent";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Embata Massage Spa in Ikeja, Lagos — our story, how a session unfolds and the standards every guest can count on. Open 24 hours, 7 days a week.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Embata"
        title="A sanctuary built"
        highlight="around your comfort."
        description="Licensed therapists, private rooms and a door that's open at any hour — in the middle of Ikeja."
      />
      <AboutContent />
      <CTABanner />
    </>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reviews from "@/components/Reviews";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Client Reviews",
  description:
    "Read what guests say about Embata Massage Spa in Ikeja, Lagos. Rated 5.0 on Google by clients who book Swedish, deep tissue and hot stone massage.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Reviews"
        title="Trusted by 1,000+"
        highlight="Lagos locals."
        description="Real words from guests who walked in carrying a long week and left feeling like themselves again."
      />
      <Reviews />
      <CTABanner />
    </>
  );
}

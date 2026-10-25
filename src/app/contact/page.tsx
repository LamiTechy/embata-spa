import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import Location from "@/components/Location";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Book a massage at Embata Massage Spa in Ikeja, Lagos. Call, WhatsApp or send a booking request — plus map, address and 24-hour opening hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & Booking"
        title="Let's plan your"
        highlight="next session."
        description="Walk in at any hour, call ahead, or send a request below and we'll confirm your booking."
      />
      <Contact />
      <Location />
    </>
  );
}

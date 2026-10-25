"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ShieldCheck, Clock, DoorOpen, UserCheck, Phone } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Therapists",
    description:
      "Every therapist is professionally trained, licensed, and committed to delivering exceptional care.",
  },
  {
    icon: Clock,
    title: "Open 24 Hours",
    description:
      "Day or night, we're here for you. Because stress doesn't keep a schedule, and neither do we.",
  },
  {
    icon: DoorOpen,
    title: "Private Rooms",
    description:
      "Each session takes place in a clean, private, and tranquil space designed for your comfort.",
  },
  {
    icon: UserCheck,
    title: "Walk-ins Welcome",
    description:
      "No appointment needed. Walk in anytime and let our team take care of the rest.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1a1a1a] to-charcoal" />
      {/* Large decorative circle */}
      <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/[0.04]" />
      <div className="absolute -right-16 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full border border-white/[0.03]" />
      {/* Left glow */}
      <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-terracotta/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: text content */}
          <ScrollReveal>
            <div>
              <span className="mb-5 inline-block rounded-full border border-terracotta/20 bg-terracotta/10 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta-light">
                Why Choose Us
              </span>
              <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Your Comfort Is
                <br />
                <span className="bg-gradient-to-r from-terracotta-light to-terracotta bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/50 lg:text-lg">
                At Embata, we believe massage isn&apos;t a luxury — it&apos;s a
                vital part of a balanced life. Our experienced team creates a
                sanctuary where healing happens naturally.
              </p>

              {/* Highlight strip */}
              <div className="mt-8 flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/15">
                  <Clock size={18} className="text-terracotta-light" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/80">
                    24 Hours · 7 Days a Week
                  </div>
                  <div className="text-xs text-white/35">
                    Including weekends & public holidays
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+2349136076089"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-terracotta/20 transition-all duration-300 hover:bg-terracotta-dark hover:shadow-terracotta/40 hover:scale-[1.03]"
                >
                  <Phone
                    size={15}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:-rotate-12"
                  />
                  Book a Session
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
                >
                  View All Services
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: feature cards — 2x2 grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 100 + 200}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-7 transition-all duration-500 hover:border-terracotta/20 hover:bg-white/[0.07]">
                  {/* Subtle glow on hover */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-terracotta/[0.06] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <feature.icon
                    size={30}
                    strokeWidth={1.3}
                    className="relative mb-5 text-terracotta-light transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="relative font-serif text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-white/45">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

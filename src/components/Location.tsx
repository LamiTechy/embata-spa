"use client";

import ScrollReveal from "./ScrollReveal";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

const hours = [
  { day: "Monday", time: "Open 24 Hours" },
  { day: "Tuesday", time: "Open 24 Hours" },
  { day: "Wednesday", time: "Open 24 Hours" },
  { day: "Thursday", time: "Open 24 Hours" },
  { day: "Friday", time: "Open 24 Hours" },
  { day: "Saturday", time: "Open 24 Hours" },
  { day: "Sunday", time: "Open 24 Hours" },
];

export default function Location() {
  return (
    <section className="relative py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/50 to-warm-white" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full border border-terracotta/20 bg-terracotta/5 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta">
              Find Us
            </span>
            <h2 className="font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              Visit Our
              <br />
              <span className="bg-gradient-to-r from-terracotta to-terracotta-dark bg-clip-text text-transparent">
                Spa
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone lg:text-lg">
              Located in the heart of Ikeja, we&apos;re easy to find and always
              ready to welcome you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Map */}
          <ScrollReveal className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-cream-dark shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <iframe
                title="Embata Massage Spa Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4896!2d3.356!3d6.602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDcuMiJOIDDCsDIxJzIxLjYiRQ!5e0!3m2!1sen!2sng!4v1"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </ScrollReveal>

          {/* Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Address */}
            <ScrollReveal delay={0}>
              <div className="group rounded-2xl border border-cream-dark bg-warm-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta transition-transform duration-300 group-hover:scale-110">
                    <MapPin size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-serif text-base font-bold text-charcoal">
                      Address
                    </h3>
                    <a
                      href="https://www.google.com/maps/search/4+Alh+Bakinson+St+Oregun+Ikeja+Lagos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm leading-relaxed text-stone transition-colors hover:text-terracotta"
                    >
                      4 Alh. Bakinson St, Oregun,
                      <br />
                      Ikeja 100212, Lagos, Nigeria
                      <Navigation size={12} className="shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={80}>
              <div className="group rounded-2xl border border-cream-dark bg-warm-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage/10 text-sage transition-transform duration-300 group-hover:scale-110">
                    <Phone size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-serif text-base font-bold text-charcoal">
                      Phone
                    </h3>
                    <a
                      href="tel:+2349136076089"
                      className="text-sm font-medium text-stone transition-colors hover:text-terracotta"
                    >
                      0913 607 6089
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Hours */}
            <ScrollReveal delay={160}>
              <div className="rounded-2xl border border-cream-dark bg-warm-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <Clock size={20} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 font-serif text-base font-bold text-charcoal">
                      Hours
                    </h3>
                    <div className="space-y-2">
                      {hours.map((h) => (
                        <div
                          key={h.day}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-stone">{h.day}</span>
                          <span className="rounded-full bg-sage/10 px-2.5 py-0.5 text-xs font-semibold text-sage">
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

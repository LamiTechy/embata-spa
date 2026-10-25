"use client";

import ScrollReveal from "./ScrollReveal";
import { Star, Clock, Users, Award } from "lucide-react";

const stats = [
  { icon: Star, value: "5.0", label: "Google Rating", color: "text-amber-500" },
  { icon: Users, value: "1,000+", label: "Happy Clients", color: "text-sage" },
  { icon: Clock, value: "24/7", label: "Always Open", color: "text-terracotta" },
  { icon: Award, value: "100%", label: "Professional", color: "text-sage" },
];

export default function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-16 lg:py-20">
      {/* Decorative gradient blobs */}
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-terracotta/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-sage/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 120}>
              <div className="text-center">
                <stat.icon
                  size={24}
                  strokeWidth={1.5}
                  className={`mx-auto mb-3 ${stat.color}`}
                />
                <div className="font-serif text-3xl font-bold text-white lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/40">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

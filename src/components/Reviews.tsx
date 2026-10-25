"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { Star, ExternalLink, Quote } from "lucide-react";

const reviews = [
  {
    name: "Adebayo O.",
    date: "2 weeks ago",
    text: "Absolutely wonderful experience. The therapist knew exactly where I was holding tension. I left feeling like a completely new person. Best massage I've had in Lagos.",
    rating: 5,
  },
  {
    name: "Chidinma E.",
    date: "1 month ago",
    text: "I've been coming here monthly for three months now. The consistency of quality is what keeps me coming back. The 24-hour availability is a lifesaver for my schedule.",
    rating: 5,
  },
  {
    name: "Tunde M.",
    date: "3 weeks ago",
    text: "Came in after a long flight and they worked out all the knots. Professional, clean, and genuinely caring staff. Highly recommend the deep tissue treatment.",
    rating: 5,
  },
];

export default function Reviews({ preview = false }: { preview?: boolean }) {
  return (
    <section id="reviews" className="relative py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/40 to-warm-white" />
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-cream-dark" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full border border-sage/20 bg-sage/5 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-sage">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              What Our Clients
              <br />
              <span className="bg-gradient-to-r from-sage to-sage-dark bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Big rating */}
        {!preview && (
          <ScrollReveal>
            <div className="mb-16 flex flex-col items-center gap-4">
              {/* Stars row */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={30} fill="currentColor" />
                ))}
              </div>
              <div className="text-center">
                <span className="font-serif text-6xl font-bold text-charcoal">
                  5.0
                </span>
                <div className="mt-1 text-sm font-medium text-stone">
                  Based on{" "}
                  <span className="text-charcoal font-semibold">26</span> Google
                  Reviews
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Review cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={i * 120}>
              <div className="group relative overflow-hidden rounded-2xl border border-cream-dark bg-warm-white p-8 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(94,122,107,0.1)] hover:-translate-y-1.5">
                {/* Decorative quote icon */}
                <div className="absolute -right-2 -top-2 text-cream-dark/60 transition-colors group-hover:text-terracotta/10">
                  <Quote size={60} strokeWidth={1} />
                </div>

                {/* Stars */}
                <div className="relative mb-5 flex items-center gap-0.5 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                {/* Review text */}
                <p className="relative mb-6 text-sm leading-relaxed text-stone-dark italic">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="relative flex items-center gap-3 border-t border-cream-dark pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sage/15 to-sage/5 text-xs font-bold text-sage">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">
                      {review.name}
                    </div>
                    <div className="text-xs text-stone-light">{review.date}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            {preview ? (
              <Link
                href="/reviews"
                className="group inline-flex items-center gap-2.5 rounded-full border-2 border-sage/25 px-7 py-3.5 text-sm font-semibold text-sage transition-all duration-300 hover:border-sage hover:bg-sage/5 hover:shadow-lg hover:shadow-sage/10"
              >
                Read all client reviews
                <ExternalLink
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border-2 border-sage/25 px-7 py-3.5 text-sm font-semibold text-sage transition-all duration-300 hover:border-sage hover:bg-sage/5 hover:shadow-lg hover:shadow-sage/10"
              >
                Read all reviews on Google
                <ExternalLink
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

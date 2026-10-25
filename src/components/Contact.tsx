"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { SERVICES } from "@/lib/services";
import {
  Phone,
  Send,
  MessageCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error ?? "Something went wrong. Please try again."
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/30 to-warm-white" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
              Ask us anything
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">
              Send an enquiry and we&apos;ll get back to you. Want to lock a
              time in right now?{" "}
              <Link
                href="/services"
                className="font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
              >
                Book and pay online
              </Link>
              .
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <div className="rounded-2xl border border-cream-dark bg-warm-white p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] sm:p-10">
              {submitted ? (
                <div className="flex flex-col items-center gap-5 py-16 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage/10">
                    <CheckCircle size={36} strokeWidth={1.5} className="text-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal">
                      Request Sent!
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-stone">
                      We&apos;ll get back to you shortly. For immediate
                      assistance, please call us directly.
                    </p>
                  </div>
                  <a
                    href="tel:+2349136076089"
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-terracotta/20 transition-all hover:bg-terracotta-dark"
                  >
                    <Phone size={15} />
                    Call 0913 607 6089
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-charcoal"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="name"
                        className="w-full rounded-xl border border-cream-dark bg-cream/40 px-4 py-3.5 text-sm text-charcoal placeholder:text-stone-light transition-all focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-terracotta/10"
                        placeholder="e.g. Adebayo"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold text-charcoal"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className="w-full rounded-xl border border-cream-dark bg-cream/40 px-4 py-3.5 text-sm text-charcoal placeholder:text-stone-light transition-all focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-terracotta/10"
                        placeholder="0801 234 5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-semibold text-charcoal"
                    >
                      Preferred Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      className="w-full rounded-xl border border-cream-dark bg-cream/40 px-4 py-3.5 text-sm text-charcoal transition-all focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-terracotta/10"
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.name}
                        </option>
                      ))}
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="preferredTime"
                      className="mb-2 block text-sm font-semibold text-charcoal"
                    >
                      Preferred Time
                    </label>
                    <input
                      id="preferredTime"
                      name="preferredTime"
                      type="text"
                      className="w-full rounded-xl border border-cream-dark bg-cream/40 px-4 py-3.5 text-sm text-charcoal placeholder:text-stone-light transition-all focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-terracotta/10"
                      placeholder="e.g. Tomorrow afternoon, 3pm..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-charcoal"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      maxLength={2000}
                      className="w-full resize-none rounded-xl border border-cream-dark bg-cream/40 px-4 py-3.5 text-sm text-charcoal placeholder:text-stone-light transition-all focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-terracotta/10"
                      placeholder="Any special requests or areas of concern..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-terracotta px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-terracotta/20 transition-all duration-300 hover:bg-terracotta-dark hover:shadow-terracotta/30 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send
                          size={15}
                          strokeWidth={2.5}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Right side */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Direct call */}
            <ScrollReveal delay={0}>
              <div className="group rounded-2xl border border-cream-dark bg-warm-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)]">
                <h3 className="mb-1 font-serif text-lg font-bold text-charcoal">
                  Prefer to call?
                </h3>
                <p className="mb-4 text-sm text-stone">
                  Tap the number below for immediate booking.
                </p>
                <a
                  href="tel:+2349136076089"
                  className="flex items-center gap-4 rounded-xl bg-sage/8 px-5 py-4 transition-all duration-300 hover:bg-sage/12"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15 text-sage">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-serif text-lg font-bold text-charcoal">
                      0913 607 6089
                    </div>
                    <div className="text-xs text-stone">Tap to call on mobile</div>
                  </div>
                </a>
              </div>
            </ScrollReveal>

            {/* WhatsApp */}
            <ScrollReveal delay={80}>
              <div className="group rounded-2xl border border-cream-dark bg-warm-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)]">
                <h3 className="mb-1 font-serif text-lg font-bold text-charcoal">
                  WhatsApp Us
                </h3>
                <p className="mb-4 text-sm text-stone">
                  Quick questions? Send us a message on WhatsApp.
                </p>
                <a
                  href="https://wa.me/2349136076089"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl bg-emerald-50/80 px-5 py-4 transition-all duration-300 hover:bg-emerald-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div className="font-serif text-base font-bold text-charcoal">
                      Chat on WhatsApp
                    </div>
                    <div className="text-xs text-stone">
                      Usually replies within minutes
                    </div>
                  </div>
                </a>
              </div>
            </ScrollReveal>

            {/* Open now badge */}
            <ScrollReveal delay={160}>
              <div className="rounded-2xl border border-sage/20 bg-gradient-to-br from-sage/5 to-sage/[0.02] p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="relative flex h-3 w-3">
                    <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                    <div className="relative inline-flex h-3 w-3 rounded-full bg-sage" />
                  </div>
                  <span className="text-sm font-bold text-sage uppercase tracking-wide">
                    Currently Open
                  </span>
                </div>
                <p className="font-serif text-xl font-bold text-charcoal">
                  24 Hours · 7 Days a Week
                </p>
                <p className="mt-1 text-xs text-stone">
                  Including weekends & public holidays
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

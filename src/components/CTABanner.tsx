import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-terracotta via-terracotta to-terracotta-dark py-20 lg:py-24">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
        <span className="mb-6 inline-block rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
          Open 24 Hours · 7 Days a Week
        </span>

        <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Ready to restore your calm?
        </h2>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Walk in anytime, or send us a booking request and we&apos;ll confirm
          your session.
        </p>

        <div className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <a
            href="tel:+2349136076089"
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-charcoal shadow-xl shadow-black/10 transition-all duration-300 hover:bg-cream hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
          >
            <Phone size={15} strokeWidth={2.5} />
            0913 607 6089
          </a>
          <Link
            href="/contact"
            className="group flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-white/40 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-[1.03] sm:w-auto"
          >
            <CalendarCheck size={15} strokeWidth={2.5} />
            Send a Booking Request
          </Link>
        </div>
      </div>
    </section>
  );
}

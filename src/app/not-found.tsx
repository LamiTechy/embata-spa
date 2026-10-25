import Link from "next/link";
import { Phone, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal px-5 py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1a1a1a] to-charcoal" />
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-terracotta/[0.08] blur-[100px]" />
      <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-sage/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-xl text-center">
        <span className="mb-6 inline-block rounded-full border border-terracotta/20 bg-terracotta/10 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta-light">
          Error 404
        </span>

        <h1 className="font-serif text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
          Lost your
          <br />
          <span className="bg-gradient-to-r from-terracotta-light via-terracotta to-terracotta-light bg-clip-text text-transparent">
            relaxation?
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
          you back to somewhere calmer.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-terracotta px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-terracotta/20 transition-all duration-300 hover:bg-terracotta-dark hover:scale-[1.03] sm:w-auto"
          >
            <Home size={15} strokeWidth={2.5} />
            Back to Home
          </Link>
          <Link
            href="/services"
            className="group flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-white/25 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/45 hover:bg-white/[0.08] sm:w-auto"
          >
            Browse Services
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <a
          href="tel:+2349136076089"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
        >
          <Phone size={14} />
          Or call 0913 607 6089
        </a>
      </div>
    </section>
  );
}

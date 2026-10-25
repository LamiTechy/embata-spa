"use client";

import { Phone, MapPin, Star, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat hero-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80')",
          }}
        />
        {/* Dark overlay with warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
        {/* Bottom fade for content */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute left-[10%] top-[20%] h-px w-32 rotate-45 border-t border-white/10" />
      <div className="absolute right-[15%] top-[30%] h-px w-24 -rotate-12 border-t border-white/10" />
      <div className="absolute bottom-[25%] left-[8%] h-px w-20 rotate-12 border-t border-white/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center pt-28 pb-20">
        {/* Trust badge — animated entrance */}
        <div
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 backdrop-blur-md hero-badge"
        >
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <div className="h-3 w-px bg-white/20" />
          <span className="text-sm font-medium text-white/85">
            Rated 5.0 on Google
          </span>
        </div>

        {/* Headline — staggered entrance */}
        <h1 className="font-serif text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl hero-title">
          <span className="block">Restore Your Body.</span>
          <span className="mt-2 block bg-gradient-to-r from-terracotta-light via-terracotta to-terracotta-light bg-clip-text text-transparent sm:mt-3">
            Reclaim Your Calm.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl hero-subtitle">
          Professional massage therapy in the heart of Ikeja, Lagos.
          <br className="hidden sm:block" />
          Open 24 hours, every day — because your wellness never sleeps.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center hero-ctas">
          <a
            href="tel:+2349136076089"
            className="group flex items-center gap-3 rounded-full bg-terracotta px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-terracotta/30 transition-all duration-300 hover:bg-terracotta-dark hover:shadow-terracotta/50 hover:scale-[1.04] active:scale-[0.98]"
          >
            <Phone
              size={18}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:-rotate-12"
            />
            Call to Book
          </a>
          <a
            href="https://www.google.com/maps/search/4+Alh+Bakinson+St+Oregun+Ikeja+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border-2 border-white/25 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/45 hover:bg-white/[0.08]"
          >
            <MapPin
              size={18}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Get Directions
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-3 hero-scroll">
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            Discover More
          </span>
          <ChevronDown size={18} className="text-white/30 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        .hero-zoom {
          animation: heroZoom 20s ease-in-out infinite alternate;
        }
        .hero-badge {
          animation: fadeSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .hero-title {
          animation: fadeSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }
        .hero-subtitle {
          animation: fadeSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
        }
        .hero-ctas {
          animation: fadeSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
        }
        .hero-scroll {
          animation: fadeSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both;
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroZoom {
          from { transform: scale(1.1); }
          to { transform: scale(1.18); }
        }
      `}</style>
    </section>
  );
}

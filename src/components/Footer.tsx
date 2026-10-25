"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-charcoal">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="mb-5">
              <span className="font-serif text-3xl font-bold text-white">
                Embata
              </span>
              <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Massage Spa
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/35">
              A sanctuary for your body and mind. Professional massage therapy
              in the heart of Ikeja, Lagos — open around the clock to serve
              you.
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/35 transition-colors hover:text-terracotta-light"
                  >
                    <span className="h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-4">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+2349136076089"
                  className="flex items-center gap-3 text-sm text-white/35 transition-colors hover:text-terracotta-light"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                    <Phone size={14} />
                  </div>
                  0913 607 6089
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/4+Alh+Bakinson+St+Oregun+Ikeja+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-white/35 transition-colors hover:text-terracotta-light"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                    <MapPin size={14} />
                  </div>
                  <span>
                    4 Alh. Bakinson St, Oregun,
                    <br />
                    Ikeja 100212, Lagos
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/35">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                  <Clock size={14} />
                </div>
                Open 24 Hours, Sun–Sat
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Embata Massage Spa. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/25">
            Made with{" "}
            <Heart
              size={11}
              className="text-terracotta"
              fill="currentColor"
            />{" "}
            in Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}

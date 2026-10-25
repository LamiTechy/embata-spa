"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-warm-white/95 shadow-[0_1px_0_rgba(0,0,0,0.05)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8 lg:py-5">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-baseline gap-2 transition-opacity hover:opacity-80"
          >
            <span
              className={`font-serif text-xl font-bold tracking-wide transition-colors duration-500 lg:text-2xl ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
            >
              Embata
            </span>
            <span
              className={`hidden text-[9px] font-semibold uppercase tracking-[0.3em] sm:inline transition-colors duration-500 ${
                scrolled ? "text-stone-light" : "text-white/50"
              }`}
            >
              Spa
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 after:absolute after:bottom-0.5 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:bg-terracotta after:transition-all after:duration-300 after:content-[''] hover:bg-charcoal/[0.04] ${
                    active
                      ? "after:w-5"
                      : "after:w-0 hover:after:w-5"
                  } ${
                    active
                      ? scrolled
                        ? "text-terracotta"
                        : "text-white"
                      : scrolled
                      ? "text-stone-dark hover:text-terracotta"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="ml-3 h-5 w-px bg-charcoal/10" />
            <a
              href="tel:+2349136076089"
              className="ml-3 flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-terracotta/20 transition-all duration-300 hover:bg-terracotta-dark hover:shadow-terracotta/30 hover:scale-[1.03]"
            >
              <Phone size={13} strokeWidth={2.5} />
              Call Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-xl transition-all lg:hidden ${
              mobileOpen
                ? "bg-charcoal text-white"
                : scrolled
                ? "text-charcoal hover:bg-charcoal/5"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "translate-y-[4.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[4.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-500 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-warm-white shadow-2xl transition-all duration-500 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-6 pt-24 pb-8">
          <nav className="flex-1 space-y-1">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-300 hover:bg-cream hover:text-terracotta ${
                    active ? "bg-cream text-terracotta" : "text-charcoal"
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen
                      ? "translateX(0)"
                      : "translateX(20px)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <a
            href="tel:+2349136076089"
            className="flex items-center justify-center gap-2.5 rounded-full bg-terracotta px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-terracotta/20 transition-all hover:bg-terracotta-dark"
          >
            <Phone size={15} strokeWidth={2.5} />
            Call Now
          </a>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import {
  Flower2,
  Layers,
  Flame,
  Footprints,
  Heart,
  Baby,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, formatNaira } from "@/lib/services";

interface ServiceStyle {
  icon: LucideIcon;
  color: string;
  iconBg: string;
  borderHover: string;
}

const serviceStyles: Record<string, ServiceStyle> = {
  "swedish-massage": {
    icon: Flower2,
    color: "from-terracotta/10 to-terracotta/5",
    iconBg: "bg-terracotta/10 text-terracotta",
    borderHover: "hover:border-terracotta/30",
  },
  "deep-tissue": {
    icon: Layers,
    color: "from-sage/10 to-sage/5",
    iconBg: "bg-sage/10 text-sage",
    borderHover: "hover:border-sage/30",
  },
  "hot-stone": {
    icon: Flame,
    color: "from-amber-50 to-amber-100/50",
    iconBg: "bg-amber-100 text-amber-700",
    borderHover: "hover:border-amber-300/50",
  },
  reflexology: {
    icon: Footprints,
    color: "from-sky-50 to-sky-100/50",
    iconBg: "bg-sky-50 text-sky-600",
    borderHover: "hover:border-sky-300/50",
  },
  "couples-massage": {
    icon: Heart,
    color: "from-rose-50 to-rose-100/50",
    iconBg: "bg-rose-50 text-rose-500",
    borderHover: "hover:border-rose-300/50",
  },
  "prenatal-massage": {
    icon: Baby,
    color: "from-violet-50 to-violet-100/50",
    iconBg: "bg-violet-50 text-violet-500",
    borderHover: "hover:border-violet-300/50",
  },
};

export default function Services({ featured = false }: { featured?: boolean }) {
  const visibleServices = featured ? SERVICES.slice(0, 3) : SERVICES;

  return (
    <section id="services" className="relative py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/30 to-warm-white" />
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #2C2C2C 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full border border-terracotta/20 bg-terracotta/5 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta">
              Our Services
            </span>
            <h2 className="font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              Tailored to Your
              <br />
              <span className="bg-gradient-to-r from-terracotta to-terracotta-dark bg-clip-text text-transparent">
                Every Need
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone lg:text-lg">
              Each session is customized by our certified therapists to address
              your unique concerns and leave you feeling renewed.
            </p>
          </div>
        </ScrollReveal>

        {/* Services grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service, i) => {
            const { icon: Icon, ...style } = serviceStyles[service.slug];
            return (
              <ScrollReveal key={service.slug} delay={i * 80}>
                <Link
                  href={`/book/${service.slug}`}
                  aria-label={`Book ${service.name} — ${formatNaira(
                    service.priceKobo
                  )}`}
                  className={`group relative block h-full overflow-hidden rounded-2xl border border-cream-dark bg-warm-white p-8 transition-all duration-500 ${style.borderHover} hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1.5`}
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative">
                    {/* Top row: icon + tag */}
                    <div className="mb-6 flex items-start justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                      >
                        <Icon size={24} strokeWidth={1.6} />
                      </div>
                      {service.tag && (
                        <span className="rounded-full bg-charcoal/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal/50">
                          {service.tag}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 font-serif text-xl font-bold text-charcoal transition-colors group-hover:text-charcoal">
                      {service.name}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-stone">
                      {service.description}
                    </p>

                    {/* Bottom row: price + arrow */}
                    <div className="flex items-center justify-between border-t border-cream-dark pt-4 transition-colors group-hover:border-charcoal/10">
                      <span className="text-sm font-semibold text-charcoal/60">
                        {formatNaira(service.priceKobo)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-terracotta opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Book now
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5 text-charcoal/40 transition-all duration-300 group-hover:bg-charcoal group-hover:text-white">
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="mt-16 text-center">
            <p className="mb-5 text-sm text-stone">
              Not sure which service is right for you?
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="tel:+2349136076089"
                className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
              >
                Call us for a free consultation
                <ArrowRight size={14} />
              </a>
              {featured && (
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-cream-dark bg-warm-white px-6 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:border-terracotta/40 hover:text-terracotta"
                >
                  View all services
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

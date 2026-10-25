import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone, CheckCircle2, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import BookingForm from "./BookingForm";
import { SERVICES, getService, formatNaira } from "@/lib/services";

interface PageProps {
  params: { service: string };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ service: service.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getService(params.service);
  if (!service) return { title: "Service not found" };

  return {
    title: `Book ${service.name}`,
    description: `Book and pay online for ${service.name} at Embata Massage Spa, Ikeja, Lagos — ${formatNaira(
      service.priceKobo
    )}. Open 24 hours.`,
  };
}

const included = [
  "A short consultation before your session",
  "Pressure and focus areas tailored to you",
  "Private, tranquil treatment room",
  "Aftercare stretches and guidance",
];

export default function BookPage({ params }: PageProps) {
  const service = getService(params.service);
  if (!service) notFound();

  const priceLabel = formatNaira(service.priceKobo);

  return (
    <>
      <PageHero
        eyebrow="Book a Session"
        title={service.name}
        highlight={priceLabel}
        description={service.description}
      />

      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/30 to-warm-white" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <BookingForm
                slug={service.slug}
                serviceName={service.name}
                priceLabel={priceLabel}
              />
            </div>

            <aside className="flex flex-col gap-4 lg:col-span-2">
              <div className="rounded-2xl border border-cream-dark bg-warm-white p-6">
                <h2 className="mb-4 font-serif text-lg font-bold text-charcoal">
                  What&apos;s included
                </h2>
                <ul className="space-y-3">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-stone"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-sage"
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-cream-dark bg-warm-white p-6">
                <h2 className="mb-4 font-serif text-lg font-bold text-charcoal">
                  Good to know
                </h2>
                <ul className="space-y-4 text-sm text-stone">
                  <li className="flex items-start gap-3">
                    <Clock
                      size={16}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />
                    Open 24 hours, every day of the year
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-terracotta"
                    />
                    4 Alh. Bakinson St, Oregun, Ikeja, Lagos
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="mt-0.5 shrink-0 text-sage" />
                    <a
                      href="tel:+2349136076089"
                      className="transition-colors hover:text-terracotta"
                    >
                      0913 607 6089 — call to change or cancel
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-sage/20 bg-gradient-to-br from-sage/5 to-sage/[0.02] p-6">
                <h2 className="mb-2 font-serif text-lg font-bold text-charcoal">
                  Prefer to talk first?
                </h2>
                <p className="mb-4 text-sm text-stone">
                  Not sure which treatment suits you? Call us — we&apos;ll help
                  you choose, free of charge.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+2349136076089"
                    className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-terracotta-dark"
                  >
                    <Phone size={13} strokeWidth={2.5} />
                    Call now
                  </a>
                  <a
                    href="https://wa.me/2349136076089"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cream-dark bg-warm-white px-5 py-2.5 text-xs font-semibold text-charcoal transition-all hover:border-sage/40"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-terracotta"
              >
                <ArrowLeft size={15} />
                Back to all services
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

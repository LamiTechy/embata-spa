import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import {
  MessageCircle,
  Sparkles,
  HeartHandshake,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "We listen first",
    description:
      "Every session opens with a short conversation about where you're holding tension, how your week has been, and what you want out of the hour.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We tailor the work",
    description:
      "Pressure, focus areas and pace are adjusted around you — not a fixed routine. You are in control of the intensity from start to finish.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "We follow through",
    description:
      "We finish with simple stretches and practical guidance so the relief you feel in the room lasts well beyond your visit.",
  },
];

const standards = [
  "Certified, professionally trained therapists",
  "Open 24 hours, every day of the year",
  "Private, tranquil treatment rooms",
  "Walk-ins welcome — no appointment needed",
  "Sessions customised to your concerns",
  "Booking by phone or WhatsApp in minutes",
];

export default function AboutContent() {
  return (
    <>
      {/* Our Story */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/30 to-warm-white" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <div>
                <span className="mb-5 inline-block rounded-full border border-terracotta/20 bg-terracotta/5 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta">
                  Our Story
                </span>
                <h2 className="font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                  Built for the way
                  <br />
                  <span className="bg-gradient-to-r from-terracotta to-terracotta-dark bg-clip-text text-transparent">
                    Lagos actually lives
                  </span>
                </h2>
                <div className="mt-7 space-y-5 text-base leading-relaxed text-stone lg:text-lg">
                  <p>
                    Lagos rarely slows down. Long commutes, demanding schedules
                    and late nights leave the body carrying tension that sleep
                    alone never seems to undo.
                  </p>
                  <p>
                    Embata exists as the opposite of that pace — a quiet, private
                    space you can walk into at any hour of the day or night.
                    There is no rush here. Your therapist works entirely around
                    what your body needs in that moment, not around a clock.
                  </p>
                </div>

                <div className="mt-9">
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
                  >
                    See what we offer
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="relative rounded-3xl border border-cream-dark bg-warm-white p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.12)] sm:p-10">
                <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-terracotta/10 blur-2xl" />

                <p className="relative font-serif text-xl italic leading-relaxed text-charcoal sm:text-2xl">
                  &ldquo;We don&apos;t believe in rushed sessions. Every visit
                  starts with a conversation about what your body actually needs
                  today.&rdquo;
                </p>
                <div className="relative mt-6 flex items-center gap-3 border-t border-cream-dark pt-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-terracotta/20 to-terracotta/5 text-sm font-bold text-terracotta">
                    EM
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">
                      The Embata Team
                    </div>
                    <div className="text-xs text-stone-light">
                      Ikeja, Lagos
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-cream-dark pt-6 text-center">
                  <div>
                    <div className="font-serif text-2xl font-bold text-charcoal">
                      1,000+
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-stone-light">
                      Clients
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-charcoal">
                      24/7
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-stone-light">
                      Open
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-charcoal">
                      5.0
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-stone-light">
                      Rating
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="relative overflow-hidden bg-charcoal py-28 lg:py-36">
        <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-terracotta/[0.07] blur-[100px]" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-sage/[0.07] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-5 inline-block rounded-full border border-terracotta/20 bg-terracotta/10 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta-light">
                Our Approach
              </span>
              <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                How a session
                <br />
                <span className="bg-gradient-to-r from-terracotta-light to-terracotta bg-clip-text text-transparent">
                  actually unfolds
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 120}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 transition-all duration-500 hover:border-terracotta/25">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/15 text-terracotta-light transition-transform duration-300 group-hover:scale-110">
                      <step.icon size={22} strokeWidth={1.6} />
                    </div>
                    <span className="font-serif text-3xl font-bold text-white/10 transition-colors duration-300 group-hover:text-terracotta/30">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/45">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Standards */}
      <section className="relative py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/40 to-warm-white" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <ScrollReveal>
              <div>
                <span className="mb-5 inline-block rounded-full border border-sage/20 bg-sage/5 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-sage">
                  Our Standards
                </span>
                <h2 className="font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                  What you can
                  <br />
                  <span className="bg-gradient-to-r from-sage to-sage-dark bg-clip-text text-transparent">
                    always count on
                  </span>
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-stone lg:text-lg">
                  The same experience whether you arrive at 2pm or 2am. These
                  are the promises we hold ourselves to on every single visit.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-terracotta/20 transition-all duration-300 hover:bg-terracotta-dark hover:shadow-terracotta/40 hover:scale-[1.03]"
                  >
                    Plan your visit
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                  <a
                    href="tel:+2349136076089"
                    className="inline-flex items-center gap-2 rounded-full border border-cream-dark bg-warm-white px-7 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:border-terracotta/40 hover:text-terracotta"
                  >
                    Call us
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {standards.map((item, i) => (
                <ScrollReveal key={item} delay={i * 80}>
                  <div className="flex h-full items-start gap-3.5 rounded-2xl border border-cream-dark bg-warm-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/30 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.12)]">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                      <CheckCircle size={16} strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium leading-relaxed text-charcoal">
                      {item}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

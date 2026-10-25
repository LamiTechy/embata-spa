import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Phone,
  Home,
  RefreshCcw,
  MessageCircle,
} from "lucide-react";
import { fulfilBooking } from "@/lib/bookings";
import { formatNaira } from "@/lib/services";

export const dynamic = "force-dynamic";

function Shell({
  tone,
  eyebrow,
  title,
  highlight,
  children,
  actions,
}: {
  tone: "success" | "error";
  eyebrow: string;
  title: string;
  highlight: string;
  children: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-charcoal px-5 py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1a1a1a] to-charcoal" />
      <div
        className={`absolute -left-32 top-1/4 h-72 w-72 rounded-full blur-[100px] ${
          tone === "success"
            ? "bg-sage/[0.12]"
            : "bg-terracotta/[0.09]"
        }`}
      />

      <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm sm:p-12">
        <div
          className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
            tone === "success" ? "bg-sage/15" : "bg-terracotta/15"
          }`}
        >
          {tone === "success" ? (
            <CheckCircle2 size={32} className="text-sage" strokeWidth={1.6} />
          ) : (
            <XCircle size={32} className="text-terracotta-light" strokeWidth={1.6} />
          )}
        </div>

        <span
          className={`mb-5 inline-block rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] ${
            tone === "success"
              ? "border-sage/25 bg-sage/10 text-sage"
              : "border-terracotta/25 bg-terracotta/10 text-terracotta-light"
          }`}
        >
          {eyebrow}
        </span>

        <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
          {title}
          <br />
          <span className="bg-gradient-to-r from-terracotta-light via-terracotta to-terracotta-light bg-clip-text text-transparent">
            {highlight}
          </span>
        </h1>

        <div className="mt-6">{children}</div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
      </div>
    </section>
  );
}

function firstParam(value?: string | string[]): string | undefined {
  const single = Array.isArray(value) ? value[0] : value;
  if (typeof single !== "string") return undefined;
  const trimmed = single.trim();
  return trimmed || undefined;
}

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { reference?: string | string[]; trxref?: string | string[] };
}) {
  const reference =
    firstParam(searchParams.reference) ?? firstParam(searchParams.trxref);

  if (!reference) {
    return (
      <Shell
        tone="error"
        eyebrow="Missing reference"
        title="We couldn't find"
        highlight="your payment."
        actions={
          <>
            <Link
              href="/services"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-terracotta-dark"
            >
              <Home size={15} />
              Back to services
            </Link>
            <a
              href="tel:+2349136076089"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/45"
            >
              <Phone size={15} />
              Call us
            </a>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-white/55">
          The payment reference is missing from the URL. If you completed a
          payment, call us and we&apos;ll sort it out in minutes.
        </p>
      </Shell>
    );
  }

  let result: Awaited<ReturnType<typeof fulfilBooking>>;
  try {
    result = await fulfilBooking(reference);
  } catch (error) {
    console.error("Verification failed:", error);
    result = { outcome: "failed", reason: "Verification is unavailable right now.", booking: null };
  }

  if (result.outcome === "paid" || result.outcome === "already-paid") {
    const booking = result.booking;
    const schedule =
      booking.preferredDate || booking.preferredTime
        ? `${booking.preferredDate ?? "Any day"} at ${
            booking.preferredTime ?? "any time"
          }`
        : "As soon as possible — walk in any time";

    return (
      <Shell
        tone="success"
        eyebrow="Payment confirmed"
        title="You're booked."
        highlight="See you soon."
        actions={
          <>
            <Link
              href="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-terracotta-dark"
            >
              <Home size={15} />
              Back to home
            </Link>
            <a
              href="https://wa.me/2349136076089"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/45"
            >
              <MessageCircle size={15} />
              Message us
            </a>
          </>
        }
      >
        <dl className="space-y-3 text-sm">
          {[
            ["Service", booking.serviceName],
            ["Amount paid", formatNaira(booking.amountKobo)],
            ["Preferred time", schedule],
            ["Reference", booking.reference],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3"
            >
              <dt className="text-white/40">{label}</dt>
              <dd className="text-right font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-relaxed text-white/50">
          A confirmation is on its way to{" "}
          <span className="text-white/80">{booking.customerEmail}</span>. Keep
          the reference handy, or call 0913 607 6089 if anything needs to
          change.
        </p>
      </Shell>
    );
  }

  const reason =
    result.outcome === "not-found"
      ? "No booking matches that reference. If you were charged, call us with your card details ready and we'll reverse it."
      : result.reason;

  const retryHref =
    "booking" in result && result.booking?.service
      ? `/book/${result.booking.service}`
      : "/services";

  return (
    <Shell
      tone="error"
      eyebrow={result.outcome === "not-found" ? "Reference not found" : "Payment not completed"}
      title="Let's sort"
      highlight="this out."
      actions={
        <>
          <Link
            href={retryHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-terracotta-dark"
          >
            <RefreshCcw size={15} />
            Try again
          </Link>
          <a
            href="tel:+2349136076089"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/45"
          >
            <Phone size={15} />
            Call 0913 607 6089
          </a>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-white/55">{reason}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/40">
        You haven&apos;t been charged twice — Paystack only completes a payment
        once.
      </p>
    </Shell>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft, Loader2 } from "lucide-react";

interface BookingFormProps {
  slug: string;
  serviceName: string;
  priceLabel: string;
}

const fieldClass =
  "w-full rounded-xl border border-cream-dark bg-cream/40 px-4 py-3.5 text-sm text-charcoal placeholder:text-stone-light transition-all focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-terracotta/10";

const labelClass = "mb-2 block text-sm font-semibold text-charcoal";

export default function BookingForm({
  slug,
  serviceName,
  priceLabel,
}: BookingFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, service: slug }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.authorizationUrl) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      window.location.assign(data.authorizationUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-cream-dark bg-warm-white p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] sm:p-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-cream-dark pb-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta">
            You&apos;re booking
          </div>
          <div className="mt-1.5 font-serif text-2xl font-bold text-charcoal">
            {serviceName}
          </div>
        </div>
        <div className="text-right">
          <div className="font-serif text-3xl font-bold text-charcoal">
            {priceLabel}
          </div>
          <div className="text-xs text-stone-light">Paid in full today</div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="customerName" className={labelClass}>
              Your Name
            </label>
            <input
              id="customerName"
              name="customerName"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              className={fieldClass}
              placeholder="e.g. Adebayo"
            />
          </div>
          <div>
            <label htmlFor="customerPhone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="customerPhone"
              name="customerPhone"
              type="tel"
              required
              autoComplete="tel"
              className={fieldClass}
              placeholder="0801 234 5678"
            />
          </div>
        </div>

        <div>
          <label htmlFor="customerEmail" className={labelClass}>
            Email Address
          </label>
          <input
            id="customerEmail"
            name="customerEmail"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
          <p className="mt-1.5 text-xs text-stone-light">
            Your receipt and booking confirmation arrive here.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="preferredDate" className={labelClass}>
              Preferred Date
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              min={today}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="preferredTime" className={labelClass}>
              Preferred Time
            </label>
            <input
              id="preferredTime"
              name="preferredTime"
              type="time"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>
            Anything we should know?
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            maxLength={1000}
            className={`${fieldClass} resize-none`}
            placeholder="Injuries, pressure preference, areas of tension..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-terracotta px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-terracotta/20 transition-all duration-300 hover:bg-terracotta-dark hover:shadow-terracotta/30 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Redirecting to Paystack...
            </>
          ) : (
            <>
              <CreditCard size={16} strokeWidth={2.5} />
              Pay {priceLabel} securely
            </>
          )}
        </button>

        <p className="text-center text-xs leading-relaxed text-stone-light">
          Secured by Paystack. You&apos;ll be taken to Paystack&apos;s checkout
          to complete payment.
        </p>
      </form>

      <div className="mt-6 border-t border-cream-dark pt-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-terracotta"
        >
          <ArrowLeft size={15} />
          Change service
        </Link>
      </div>
    </div>
  );
}

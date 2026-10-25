"use client";

import { useMemo, useState } from "react";
import { updateStatusAction } from "../actions";
import { formatNaira } from "@/lib/services";

export interface BookingDTO {
  id: string;
  reference: string;
  service: string;
  serviceName: string;
  amountKobo: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: string | null;
  preferredTime: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
  paidAt: string | null;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "Awaiting payment",
  PAID: "Paid",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  FAILED: "Failed",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING_PAYMENT: "bg-amber-100 text-amber-700",
  PAID: "bg-terracotta/15 text-terracotta-dark",
  CONFIRMED: "bg-sky-100 text-sky-700",
  COMPLETED: "bg-sage/15 text-sage-dark",
  CANCELLED: "bg-charcoal/10 text-charcoal/60",
  FAILED: "bg-red-100 text-red-700",
};

const FILTERS = ["ALL", "PAID", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

const selectClass =
  "w-full rounded-lg border border-cream-dark bg-white px-3 py-2 text-xs font-medium text-charcoal focus:border-terracotta focus:outline-none";

export default function BookingsTable({
  bookings,
}: {
  bookings: BookingDTO[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return bookings;
    return bookings.filter((booking) => booking.status === filter);
  }, [bookings, filter]);

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-cream-dark bg-warm-white p-12 text-center">
        <p className="font-serif text-xl font-bold text-charcoal">
          No bookings yet
        </p>
        <p className="mt-2 text-sm text-stone">
          Paid bookings appear here the moment Paystack confirms them.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cream-dark bg-warm-white shadow-[0_8px_40px_-16px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap gap-2 border-b border-cream-dark px-5 py-4">
        {FILTERS.map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              filter === value
                ? "bg-charcoal text-white"
                : "bg-charcoal/5 text-stone-dark hover:bg-charcoal/10"
            }`}
          >
            {value === "ALL" ? "All" : STATUS_LABELS[value]}
            <span className="ml-1.5 opacity-60">
              {value === "ALL"
                ? bookings.length
                : bookings.filter((b) => b.status === value).length}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-cream-dark text-[11px] uppercase tracking-[0.12em] text-stone-light">
              <th className="px-5 py-3 font-semibold">Booking</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Amount</th>
              <th className="px-5 py-3 font-semibold">Preferred</th>
              <th className="px-5 py-3 font-semibold">Placed</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-cream-dark last:border-0 align-top hover:bg-cream/50"
              >
                <td className="px-5 py-4">
                  <div className="font-semibold text-charcoal">
                    {booking.serviceName}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-stone-light">
                    {booking.reference}
                  </div>
                  {booking.notes && (
                    <div className="mt-1 max-w-[220px] text-xs italic text-stone-light">
                      “{booking.notes}”
                    </div>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="font-medium text-charcoal">
                    {booking.customerName}
                  </div>
                  <a
                    href={`tel:${booking.customerPhone}`}
                    className="block text-xs text-stone hover:text-terracotta"
                  >
                    {booking.customerPhone}
                  </a>
                  <a
                    href={`mailto:${booking.customerEmail}`}
                    className="block break-all text-xs text-stone hover:text-terracotta"
                  >
                    {booking.customerEmail}
                  </a>
                </td>
                <td className="px-5 py-4 font-semibold text-charcoal">
                  {formatNaira(booking.amountKobo)}
                </td>
                <td className="px-5 py-4 text-xs text-stone">
                  {booking.preferredDate ?? "Any day"}
                  <br />
                  <span className="text-stone-light">
                    {booking.preferredTime ?? "Any time"}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-stone">
                  {new Date(booking.createdAt).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  <br />
                  <span className="text-stone-light">
                    {new Date(booking.createdAt).toLocaleTimeString("en-NG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`mb-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      STATUS_STYLES[booking.status] ?? "bg-charcoal/10"
                    }`}
                  >
                    {STATUS_LABELS[booking.status] ?? booking.status}
                  </span>

                  <form action={updateStatusAction} className="flex gap-1.5">
                    <input type="hidden" name="id" value={booking.id} />
                    <select
                      name="status"
                      defaultValue={booking.status}
                      className={selectClass}
                      aria-label={`Status for ${booking.reference}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-lg bg-charcoal px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-terracotta"
                    >
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { formatNaira } from "@/lib/services";
import BookingsTable from "./BookingsTable";
import type { BookingDTO } from "./BookingsTable";
import type { LucideIcon } from "lucide-react";
import { Wallet, CalendarCheck, BadgeCheck, CalendarClock } from "lucide-react";

export const dynamic = "force-dynamic";

const REVENUE_STATUSES = ["PAID", "CONFIRMED", "COMPLETED"];

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-cream-dark bg-warm-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-light">
            {label}
          </div>
          <div className="mt-2 font-serif text-3xl font-bold text-charcoal">
            {value}
          </div>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
          <Icon size={20} strokeWidth={1.7} />
        </span>
      </div>
      <div className="mt-3 text-xs text-stone">{hint}</div>
    </div>
  );
}

export default async function AdminDashboard() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const revenue = bookings
    .filter((booking) => REVENUE_STATUSES.includes(booking.status))
    .reduce((sum, booking) => sum + booking.amountKobo, 0);

  const todayCount = bookings.filter(
    (booking) => booking.createdAt >= startOfToday
  ).length;

  const newCount = bookings.filter((b) => b.status === "PAID").length;
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;

  const serialized: BookingDTO[] = bookings.map((booking) => ({
    id: booking.id,
    reference: booking.reference,
    service: booking.service,
    serviceName: booking.serviceName,
    amountKobo: booking.amountKobo,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    customerPhone: booking.customerPhone,
    preferredDate: booking.preferredDate,
    preferredTime: booking.preferredTime,
    notes: booking.notes,
    status: booking.status,
    createdAt: booking.createdAt.toISOString(),
    paidAt: booking.paidAt ? booking.paidAt.toISOString() : null,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          Bookings
        </h1>
        <p className="mt-1 text-sm text-stone">
          Every paid reservation, newest first.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="Revenue"
          value={formatNaira(revenue)}
          hint="Paid, confirmed and completed bookings"
        />
        <StatCard
          icon={CalendarCheck}
          label="Today"
          value={String(todayCount)}
          hint="Bookings placed since midnight"
        />
        <StatCard
          icon={BadgeCheck}
          label="Awaiting action"
          value={String(newCount)}
          hint="Paid but not yet confirmed"
        />
        <StatCard
          icon={CalendarClock}
          label="Confirmed"
          value={String(confirmedCount)}
          hint="Sessions on the schedule"
        />
      </div>

      <BookingsTable bookings={serialized} />
    </div>
  );
}

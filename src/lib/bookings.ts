import { randomBytes } from "node:crypto";
import type { Booking } from "@prisma/client";
import { prisma } from "./prisma";
import { getService } from "./services";
import { initializeTransaction, verifyTransaction } from "./paystack";
import { sendAdminNewBooking, sendCustomerConfirmation } from "./emails";
import type { BookingInput } from "./validation";
import { siteUrl } from "./site";

export function generateReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const noise = randomBytes(3).toString("hex").toUpperCase();
  return `EMB${stamp}${noise}`;
}

export class BookingError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    this.name = "BookingError";
  }
}

export async function createPendingBooking(input: BookingInput) {
  const service = getService(input.service);
  if (!service) throw new BookingError("That service does not exist.", 404);

  const reference = generateReference();
  const callbackUrl = `${siteUrl()}/book/verify?reference=${encodeURIComponent(
    reference
  )}`;

  const booking = await prisma.booking.create({
    data: {
      reference,
      service: service.slug,
      serviceName: service.name,
      amountKobo: service.priceKobo,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      preferredDate: input.preferredDate || null,
      preferredTime: input.preferredTime || null,
      notes: input.notes || null,
    },
  });

  try {
    const transaction = await initializeTransaction({
      email: input.customerEmail,
      amountKobo: service.priceKobo,
      reference,
      callbackUrl,
      metadata: {
        bookingId: booking.id,
        service: service.slug,
        customerPhone: input.customerPhone,
      },
    });

    return { booking, authorizationUrl: transaction.authorizationUrl };
  } catch (error) {
    await prisma.booking
      .update({ where: { id: booking.id }, data: { status: "FAILED" } })
      .catch(() => undefined);
    throw new BookingError(
      error instanceof Error
        ? error.message
        : "We could not start the payment. Please try again.",
      502
    );
  }
}

export type FulfilOutcome =
  | { outcome: "paid"; booking: Booking }
  | { outcome: "already-paid"; booking: Booking }
  | { outcome: "not-found"; reason: string }
  | { outcome: "failed"; reason: string; booking: Booking | null };

async function dispatchEmails(booking: Booking) {
  const results = await Promise.allSettled([
    sendAdminNewBooking(booking),
    sendCustomerConfirmation(booking),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Booking email failed:", result.reason);
    }
  }
}

export async function fulfilBooking(
  reference: string
): Promise<FulfilOutcome> {
  const booking = await prisma.booking.findUnique({ where: { reference } });

  if (!booking) return { outcome: "not-found", reason: "Unknown reference" };

  if (booking.status !== "PENDING_PAYMENT" && booking.status !== "FAILED") {
    return { outcome: "already-paid", booking };
  }

  const transaction = await verifyTransaction(reference);

  if (!transaction) {
    return { outcome: "failed", reason: "Payment could not be verified.", booking };
  }

  if (transaction.status !== "success") {
    return {
      outcome: "failed",
      reason: "The payment has not completed yet.",
      booking,
    };
  }

  if (transaction.currency !== "NGN") {
    return { outcome: "failed", reason: "Unexpected currency.", booking };
  }

  if (Number(transaction.amount) !== booking.amountKobo) {
    console.error(
      `Amount mismatch for ${reference}: expected ${booking.amountKobo}, got ${transaction.amount}`
    );
    return {
      outcome: "failed",
      reason: "Payment amount did not match the booking.",
      booking,
    };
  }

  const updated = await prisma.booking.update({
    where: { id: booking.id },
    data: { status: "PAID", paidAt: new Date() },
  });

  await dispatchEmails(updated);

  return { outcome: "paid", booking: updated };
}

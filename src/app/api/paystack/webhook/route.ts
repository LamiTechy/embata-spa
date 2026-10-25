import { NextResponse } from "next/server";
import { isValidWebhookSignature } from "@/lib/paystack";
import { fulfilBooking } from "@/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PaystackEvent {
  event?: string;
  data?: { reference?: string };
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  if (!isValidWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: PaystackEvent;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Malformed body" }, { status: 400 });
  }

  const reference = payload.data?.reference;

  if (payload.event === "charge.success" && reference) {
    try {
      await fulfilBooking(reference);
    } catch (error) {
      console.error("Webhook fulfilment failed:", error);
      return NextResponse.json({ error: "Fulfilment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

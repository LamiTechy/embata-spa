import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { createPendingBooking, BookingError } from "@/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error:
            parsed.error.issues[0]?.message ?? "Please check the form fields.",
        },
        { status: 400 }
      );
    }

    const { authorizationUrl } = await createPendingBooking(parsed.data);

    return NextResponse.json({ ok: true, authorizationUrl });
  } catch (error) {
    if (error instanceof BookingError) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: error.status }
      );
    }

    console.error("Booking creation failed:", error);

    return NextResponse.json(
      { ok: false, error: "We could not start your booking. Please try again." },
      { status: 500 }
    );
  }
}

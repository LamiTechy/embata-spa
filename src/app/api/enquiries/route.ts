import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { sendEnquiryEmail } from "@/lib/emails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const parsed = enquirySchema.safeParse(body);

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

    await sendEnquiryEmail(parsed.data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry failed:", error);

    return NextResponse.json(
      { ok: false, error: "We couldn't send that. Please call us instead." },
      { status: 500 }
    );
  }
}

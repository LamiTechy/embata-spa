import { createHmac, timingSafeEqual } from "node:crypto";

const BASE_URL = "https://api.paystack.co";

function secretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not configured");
  return key;
}

export interface InitializeResult {
  authorizationUrl: string;
  reference: string;
}

export async function initializeTransaction(input: {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, string>;
}): Promise<InitializeResult> {
  const res = await fetch(`${BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      amount: input.amountKobo,
      currency: "NGN",
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.status || !payload?.data?.authorization_url) {
    throw new Error(
      payload?.message ?? `Paystack initialize failed (${res.status})`
    );
  }

  return {
    authorizationUrl: payload.data.authorization_url,
    reference: payload.data.reference ?? input.reference,
  };
}

export interface VerifiedTransaction {
  status: "success" | "failed" | "abandoned" | "ongoing" | "reversed";
  amount: number;
  currency: string;
  reference: string;
  paidAt: string | null;
  channel: string | null;
}

export async function verifyTransaction(
  reference: string
): Promise<VerifiedTransaction | null> {
  const res = await fetch(
    `${BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secretKey()}` },
      cache: "no-store",
    }
  );

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.status || !payload?.data) return null;

  const data = payload.data;

  return {
    status: data.status,
    amount: data.amount,
    currency: data.currency,
    reference: data.reference,
    paidAt: data.paid_at ?? null,
    channel: data.channel ?? null,
  };
}

export function isValidWebhookSignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) return false;

  const expected = createHmac("sha512", secretKey())
    .update(rawBody)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");

  return a.length === b.length && timingSafeEqual(a, b);
}

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkCredentials } from "@/lib/credentials";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_OPTIONS,
} from "@/lib/session";
import { prisma } from "@/lib/prisma";

const statusSchema = z.enum([
  "PENDING_PAYMENT",
  "PAID",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "FAILED",
]);

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(email, password)) {
    redirect(
      `/admin/login?error=${encodeURIComponent("Invalid email or password.")}`
    );
  }

  const token = await createSessionToken(email);
  cookies().set(SESSION_COOKIE, token, SESSION_OPTIONS);

  const from = String(formData.get("from") ?? "");
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logoutAction() {
  cookies().delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function updateStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const parsed = statusSchema.safeParse(formData.get("status"));

  if (!id || !parsed.success) return;

  await prisma.booking.update({
    where: { id },
    data: { status: parsed.data },
  });

  revalidatePath("/admin");
}

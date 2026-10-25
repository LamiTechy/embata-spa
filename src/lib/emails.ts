import type { Booking } from "@prisma/client";
import { sendEmail } from "./brevo";
import { formatNaira } from "./services";
import type { EnquiryInput } from "./validation";

const BRAND = "#C4816B";
const CHARCOAL = "#2C2C2C";

function shell(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#F7F3EE;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3EE;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFDF9;border-radius:16px;overflow:hidden;border:1px solid #F0EBE3;">
        <tr><td style="background:${CHARCOAL};padding:24px 32px;">
          <span style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#ffffff;">Embata</span>
          <span style="font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.5);text-transform:uppercase;margin-left:8px;">Massage Spa</span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;font-size:20px;color:${CHARCOAL};">${title}</h1>
          ${body}
        </td></tr>
        <tr><td style="background:#FAF7F2;padding:20px 32px;font-size:12px;color:#8B7D6B;">
          4 Alh. Bakinson St, Oregun, Ikeja, Lagos &middot; 0913 607 6089 &middot; Open 24 hours
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function rows(pairs: [string, string][]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:${CHARCOAL};">
    ${pairs
      .map(
        ([label, value]) => `<tr>
          <td style="padding:8px 0;color:#8B7D6B;width:40%;">${label}</td>
          <td style="padding:8px 0;font-weight:600;">${value}</td>
        </tr>`
      )
      .join("")}
  </table>`;
}

function schedule(booking: Booking): string {
  if (!booking.preferredDate && !booking.preferredTime) return "As soon as possible";
  const date = booking.preferredDate ?? "Any day";
  const time = booking.preferredTime ?? "Any time";
  return `${date} at ${time}`;
}

function details(booking: Booking): [string, string][] {
  return [
    ["Reference", booking.reference],
    ["Service", booking.serviceName],
    ["Amount paid", formatNaira(booking.amountKobo)],
    ["Preferred time", schedule(booking)],
    ["Name", booking.customerName],
    ["Phone", booking.customerPhone],
    ["Email", booking.customerEmail],
    ["Notes", booking.notes || "—"],
  ];
}

const PAID_BADGE = `<span style="display:inline-block;background:${BRAND};color:#fff;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;padding:4px 12px;border-radius:999px;">Paid</span>`;

export async function sendAdminNewBooking(booking: Booking): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) throw new Error("ADMIN_EMAIL is not configured");

  await sendEmail({
    to: adminEmail,
    subject: `New paid booking ${booking.reference} — ${booking.serviceName}`,
    text: `A booking has been paid for.\n\n${details(booking)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}\n\nManage it in the admin panel.`,
    html: shell(
      `New paid booking`,
      `<p style="margin:0 0 16px;"><strong>${booking.customerName}</strong> just paid <strong>${formatNaira(
        booking.amountKobo
      )}</strong> for a ${booking.serviceName}.</p>
       ${PAID_BADGE}
       <div style="height:16px;"></div>
       ${rows(details(booking))}
       <p style="margin:24px 0 0;"><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="display:inline-block;background:${BRAND};color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:bold;">Open admin panel</a></p>`
    ),
  });
}

export async function sendCustomerConfirmation(
  booking: Booking
): Promise<void> {
  await sendEmail({
    to: booking.customerEmail,
    toName: booking.customerName,
    subject: `Booking confirmed — ${booking.serviceName} | Embata Massage Spa`,
    text: `Hi ${booking.customerName},\n\nYour payment of ${formatNaira(
      booking.amountKobo
    )} was received. Your ${booking.serviceName} is booked for ${schedule(
      booking
    )}.\n\nReference: ${booking.reference}\n\nWe're open 24 hours at 4 Alh. Bakinson St, Oregun, Ikeja, Lagos. Call 0913 607 6089 if you need to change anything.`,
    html: shell(
      `Payment received — you're booked`,
      `<p style="margin:0 0 16px;">Hi ${booking.customerName},</p>
       <p style="margin:0 0 20px;">Thanks — your payment went through and your session is reserved. Present the reference below when you arrive.</p>
       ${rows(details(booking))}
       <p style="margin:24px 0 0;font-size:14px;color:#6B5E4F;">Need to reschedule? Call <strong>0913 607 6089</strong> or reply to this email — we're open 24 hours.</p>`
    ),
  });
}

export async function sendEnquiryEmail(input: EnquiryInput): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) throw new Error("ADMIN_EMAIL is not configured");

  const pairs: [string, string][] = [
    ["Name", input.name],
    ["Phone", input.phone],
    ["Service", input.service || "—"],
    ["Preferred time", input.preferredTime || "—"],
    ["Message", input.message || "—"],
  ];

  await sendEmail({
    to: adminEmail,
    subject: `New enquiry from ${input.name}`,
    text: `New enquiry.\n\n${pairs
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}`,
    html: shell(`New enquiry`, rows(pairs)),
  });
}

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

interface SendEmailOptions {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text: string;
}

function config() {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? "Embata Massage Spa";

  if (!apiKey || !senderEmail) {
    throw new Error(
      "BREVO_API_KEY and BREVO_SENDER_EMAIL must be configured"
    );
  }

  return { apiKey, senderEmail, senderName };
}

export async function sendEmail({
  to,
  toName,
  subject,
  html,
  text,
}: SendEmailOptions): Promise<void> {
  const { apiKey, senderEmail, senderName } = config();

  const res = await fetch(BREVO_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to, name: toName ?? to }],
      subject,
      htmlContent: html,
      textContent: text,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo send failed (${res.status}): ${detail}`);
  }
}

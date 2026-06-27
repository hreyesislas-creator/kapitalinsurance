import type { Lead } from "./leads";
import { buildAgentEmail, buildCustomerEmail } from "./emailTemplates";

/**
 * V1 lead notifications — email only, via Resend.
 *
 *   1. Professional new-lead alert  → QUOTE_NOTIFICATION_EMAIL (the agency)
 *   2. Branded confirmation         → the customer's own email
 *
 * Everything degrades gracefully: a missing key or a failed send is logged and
 * swallowed so the lead is NEVER lost and the customer always sees success.
 *
 * Required env:
 *   RESEND_API_KEY            Resend API key
 *   FROM_EMAIL                verified sender, e.g. "Kapital Insurance <quotes@domain.com>"
 *   QUOTE_NOTIFICATION_EMAIL  inbox that receives new-lead alerts
 */

export type NotifyMeta = { quoteId: string; createdAt: Date };
export type NotifyResult = { agentEmailSent: boolean; customerEmailSent: boolean };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function notifyNewLead(lead: Lead, meta: NotifyMeta): Promise<NotifyResult> {
  const [agent, customer] = await Promise.allSettled([
    sendAgentEmail(lead, meta),
    sendCustomerEmail(lead, meta),
  ]);

  return {
    agentEmailSent: agent.status === "fulfilled" && agent.value,
    customerEmailSent: customer.status === "fulfilled" && customer.value,
  };
}

async function sendAgentEmail(lead: Lead, meta: NotifyMeta): Promise<boolean> {
  const to = process.env.QUOTE_NOTIFICATION_EMAIL;
  if (!to) {
    console.warn("[lead:agent-email] QUOTE_NOTIFICATION_EMAIL not set — skipping agent alert.");
    return false;
  }
  const { subject, html, text } = buildAgentEmail(lead, meta);
  return sendEmail({ to, subject, html, text, replyTo: lead.email, tag: "agent" });
}

async function sendCustomerEmail(lead: Lead, meta: NotifyMeta): Promise<boolean> {
  const { subject, html, text } = buildCustomerEmail(lead, meta);
  return sendEmail({
    to: lead.email,
    subject,
    html,
    text,
    // Replies from the customer go to the agency inbox when configured.
    replyTo: process.env.QUOTE_NOTIFICATION_EMAIL,
    tag: "customer",
  });
}

async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  tag: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      `[lead:${opts.tag}-email] Email not configured (RESEND_API_KEY / FROM_EMAIL missing) — skipped send to ${opts.to}.`,
    );
    return false;
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[lead:${opts.tag}-email] Resend responded ${res.status}: ${detail}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[lead:${opts.tag}-email] send failed:`, err);
    return false;
  }
}

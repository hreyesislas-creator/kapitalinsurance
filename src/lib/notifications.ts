import type { Lead } from "./leads";
import { site } from "./site";

/**
 * Notification layer for new leads — email + SMS.
 *
 * This is intentionally provider-agnostic and degrades gracefully: if no
 * provider keys are configured, it logs the intent and returns. Wire up the
 * provider of choice by filling in the marked sections.
 *
 *   Email  → Resend (RESEND_API_KEY) — recommended on Vercel
 *   SMS    → Twilio (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM)
 *
 * Designed to run from the /api/quote route after a lead is stored.
 */

const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || site.email;
const NOTIFY_SMS = process.env.LEAD_NOTIFY_SMS || site.phone.e164;

export async function notifyNewLead(lead: Lead, id?: string) {
  // Fire both; never let a notification failure break the lead response.
  await Promise.allSettled([sendLeadEmail(lead, id), sendLeadSms(lead, id)]);
}

function leadSummary(lead: Lead) {
  return [
    `New ${lead.insuranceType} lead`,
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `ZIP: ${lead.zip}`,
    lead.currentlyInsured ? `Insured: ${lead.currentlyInsured}` : "",
    lead.currentPremium ? `Current premium: ${lead.currentPremium}` : "",
    `Preferred contact: ${lead.preferredContact}`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendLeadEmail(lead: Lead, id?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const summary = leadSummary(lead);

  if (!apiKey) {
    console.info(`[lead:email] (not configured) would notify ${NOTIFY_EMAIL}\n${summary}`);
    return;
  }

  // Resend REST API — no SDK dependency required.
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || `Kapital Leads <leads@kapitalinsurancegroup.com>`,
      to: [NOTIFY_EMAIL],
      reply_to: lead.email,
      subject: `🔔 New ${lead.insuranceType} quote — ${lead.firstName} ${lead.lastName}`,
      text: `${summary}\n\nLead ID: ${id ?? "n/a"}`,
    }),
  }).catch((e) => console.error("[lead:email] failed", e));
}

async function sendLeadSms(lead: Lead, id?: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;

  if (!sid || !token || !from) {
    console.info(`[lead:sms] (not configured) would text ${NOTIFY_SMS} about lead ${id ?? ""}`);
    return;
  }

  const body = `New ${lead.insuranceType} quote: ${lead.firstName} ${lead.lastName}, ${lead.phone}, ZIP ${lead.zip}`;
  const params = new URLSearchParams({ To: NOTIFY_SMS, From: from, Body: body });

  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  }).catch((e) => console.error("[lead:sms] failed", e));
}

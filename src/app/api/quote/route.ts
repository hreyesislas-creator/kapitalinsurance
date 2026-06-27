import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { leadSchema } from "@/lib/leads";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyNewLead } from "@/lib/notifications";

export const runtime = "nodejs";

/** Window for treating an identical resubmission as a duplicate (double-click / retry). */
const DEDUPE_WINDOW_MS = 2 * 60 * 1000;

/**
 * Quote Wizard submission endpoint (V1 lead workflow).
 * Flow: validate + sanitize → de-dupe → store in Supabase → email agent +
 * customer → respond. Every stage degrades gracefully so a single failure
 * never loses the lead, and the customer always reaches the success screen.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot — silently accept bot submissions without storing/notifying.
  if (lead.company) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabaseAdmin();
  const createdAt = new Date();
  let leadId: string | undefined;

  if (supabase) {
    // Prevent duplicate submissions: same email + coverage within the window.
    const since = new Date(Date.now() - DEDUPE_WINDOW_MS).toISOString();
    const { data: recent } = await supabase
      .from("leads")
      .select("id")
      .eq("email", lead.email)
      .eq("insurance_type", lead.insuranceType)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (recent?.id) {
      // Already captured moments ago — acknowledge without re-storing or re-emailing.
      return NextResponse.json({ ok: true, id: recent.id as string, duplicate: true });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        insurance_type: lead.insuranceType,
        zip: lead.zip,
        asset_info: lead.assetInfo,
        currently_insured: lead.currentlyInsured ?? null,
        current_carrier: lead.currentCarrier || null,
        current_premium: lead.currentPremium || null,
        driver_info: lead.driverInfo,
        first_name: lead.firstName,
        last_name: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        preferred_contact: lead.preferredContact,
        notes: lead.notes || null,
        consent: lead.consent,
        source: lead.source,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      // Don't lose the lead — log full payload so it can be recovered from logs.
      console.error("[quote] supabase insert failed:", error.message, lead);
    } else {
      leadId = data?.id as string | undefined;
    }
  } else {
    console.info("[quote] Supabase not configured — lead captured in logs only:", {
      type: lead.insuranceType,
      name: `${lead.firstName} ${lead.lastName}`,
      phone: lead.phone,
      email: lead.email,
      zip: lead.zip,
    });
  }

  // A stable Quote ID for the emails even if storage was unavailable.
  const quoteId = leadId ?? randomUUID();

  // Emails run after storage but never block (or fail) the success response.
  const notify = await notifyNewLead(lead, { quoteId, createdAt });
  if (!notify.agentEmailSent || !notify.customerEmailSent) {
    console.warn(
      `[quote] email partial/failed for ${quoteId} — agent:${notify.agentEmailSent} customer:${notify.customerEmailSent} (lead is saved)`,
    );
  }

  return NextResponse.json({ ok: true, id: quoteId });
}

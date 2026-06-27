import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyNewLead } from "@/lib/notifications";

export const runtime = "nodejs";

/**
 * Quote Wizard submission endpoint.
 * Flow: validate → store in Supabase → notify (email + SMS) → respond.
 * Each stage degrades gracefully so a single failure never loses the lead.
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

  let leadId: string | undefined;
  const supabase = getSupabaseAdmin();

  if (supabase) {
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
        consent: lead.consent,
        source: lead.source,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      // Don't lose the lead — log it so it can be recovered from server logs.
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

  // Notifications run after storage but never block the success response.
  await notifyNewLead(lead, leadId);

  return NextResponse.json({ ok: true, id: leadId });
}

import { z } from "zod";

/**
 * Lead schema — shared validation + sanitization for the Quote Wizard and the
 * API route. Matches the `leads` table in supabase/schema.sql.
 *
 * Every string is trimmed and length-capped so stored/emailed data stays clean
 * and safe; free-form records (asset/driver info) are normalized and bounded.
 */

/** Normalize a free-form record: trim, drop empties, cap key/value length + count. */
const safeRecord = z
  .record(z.string(), z.string())
  .optional()
  .default({})
  .transform((rec) => {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(rec ?? {}).slice(0, 40)) {
      const key = String(k).slice(0, 60).trim();
      const val = String(v ?? "").replace(/\s+/g, " ").trim().slice(0, 500);
      if (key && val) out[key] = val;
    }
    return out;
  });

export const leadSchema = z.object({
  // Step 1 — what they want
  insuranceType: z.string().trim().min(1, "Please choose a coverage type").max(120),
  // Step 2 — location
  zip: z.string().trim().regex(/^\d{5}$/, "Enter a valid 5-digit ZIP code"),
  // Step 3 — asset details (vehicle / home / business), free-form per type
  assetInfo: safeRecord,
  // Step 4 — current insurance
  currentlyInsured: z.enum(["yes", "no"]).optional(),
  currentCarrier: z.string().trim().max(120).optional().default(""),
  // Step 5 — current premium (digits/decimal only)
  currentPremium: z
    .string()
    .trim()
    .max(12)
    .regex(/^[\d.]*$/, "Enter a valid amount")
    .optional()
    .default(""),
  // Step 6 — driver / applicant info
  driverInfo: safeRecord,
  // Contact
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(160),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(25)
    .regex(/^[\d\s()+-]+$/, "Enter a valid phone number"),
  preferredContact: z.enum(["phone", "email", "text"]).optional().default("phone"),
  // Any additional notes from the customer
  notes: z.string().trim().max(2000).optional().default(""),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consent is required to contact you",
  }),
  // Meta
  source: z.string().trim().max(80).optional().default("website-quote-wizard"),
  // Honeypot — must stay empty (bots fill it).
  company: z.string().max(0).optional().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "won"
  | "lost"
  | "nurture";

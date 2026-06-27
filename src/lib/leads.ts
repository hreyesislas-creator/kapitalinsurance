import { z } from "zod";

/**
 * Lead schema — shared validation for the Quote Wizard and the API route.
 * Matches the `leads` table in supabase/schema.sql.
 */
export const leadSchema = z.object({
  // Step 1 — what they want
  insuranceType: z.string().min(1, "Please choose a coverage type"),
  // Step 2 — location
  zip: z.string().regex(/^\d{5}$/, "Enter a valid 5-digit ZIP code"),
  // Step 3 — asset details (vehicle / home / business), free-form per type
  assetInfo: z.record(z.string(), z.string()).optional().default({}),
  // Step 4 — current insurance
  currentlyInsured: z.enum(["yes", "no"]).optional(),
  currentCarrier: z.string().optional().default(""),
  // Step 5 — current premium
  currentPremium: z.string().optional().default(""),
  // Step 6 — driver / applicant info
  driverInfo: z.record(z.string(), z.string()).optional().default({}),
  // Step 7 — contact
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[\d\s()+-]+$/, "Enter a valid phone number"),
  preferredContact: z.enum(["phone", "email", "text"]).optional().default("phone"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consent is required to contact you",
  }),
  // Meta
  source: z.string().optional().default("website-quote-wizard"),
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

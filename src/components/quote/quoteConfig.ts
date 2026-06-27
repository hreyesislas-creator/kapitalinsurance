import type { IconKey } from "@/data/services";

/** Quote Wizard configuration — coverage options and per-track field sets. */

export type Track = "auto" | "home" | "business" | "life" | "health" | "other";

export type QuoteOption = {
  value: string; // stored insurance_type
  label: string;
  icon: IconKey;
  track: Track;
  blurb: string;
};

export const QUOTE_OPTIONS: QuoteOption[] = [
  { value: "Auto Insurance", label: "Auto", icon: "car", track: "auto", blurb: "Cars, trucks & SUVs" },
  { value: "Commercial Auto Insurance", label: "Commercial Auto", icon: "truck", track: "auto", blurb: "Work vehicles & fleets" },
  { value: "Home Insurance", label: "Home", icon: "home", track: "home", blurb: "Homeowners coverage" },
  { value: "Business Insurance", label: "Business", icon: "briefcase", track: "business", blurb: "Protect your company" },
  { value: "Renters Insurance", label: "Renters", icon: "key", track: "home", blurb: "Apartments & rentals" },
  { value: "Flood Insurance", label: "Flood", icon: "wave", track: "home", blurb: "NFIP & private flood" },
  { value: "Motorcycle Insurance", label: "Motorcycle", icon: "motorcycle", track: "auto", blurb: "Bikes & scooters" },
  { value: "Boat Insurance", label: "Boat", icon: "boat", track: "auto", blurb: "Watercraft & yachts" },
  { value: "Life Insurance", label: "Life", icon: "heart", track: "life", blurb: "Protect your family" },
  { value: "Health Insurance", label: "Health", icon: "leaf", track: "health", blurb: "ACA & marketplace" },
  { value: "General Liability Insurance", label: "General Liability", icon: "shield", track: "business", blurb: "Business liability" },
  { value: "Workers Compensation Insurance", label: "Workers' Comp", icon: "hardhat", track: "business", blurb: "Employee coverage" },
  { value: "SR-22 Insurance", label: "SR-22", icon: "badge", track: "auto", blurb: "State filing & auto" },
  { value: "Other / Not sure", label: "Something else", icon: "umbrella", track: "other", blurb: "We'll help you find it" },
];

export type Field = {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

/** Step 3 — asset details, by track. */
export const ASSET_FIELDS: Record<Track, Field[]> = {
  auto: [
    { name: "vehicleYear", label: "Vehicle year", type: "text", placeholder: "e.g. 2021", required: true },
    { name: "vehicleMake", label: "Make", type: "text", placeholder: "e.g. Toyota", required: true },
    { name: "vehicleModel", label: "Model", type: "text", placeholder: "e.g. Camry" },
    { name: "vehicleUse", label: "Primary use", type: "select", options: ["Personal", "Commute", "Business", "Rideshare / Delivery"] },
  ],
  home: [
    { name: "propertyType", label: "Property type", type: "select", options: ["Single-family home", "Condo", "Townhouse", "Apartment / Rental", "Mobile home"], required: true },
    { name: "ownership", label: "Do you own or rent?", type: "select", options: ["Own", "Rent"] },
    { name: "yearBuilt", label: "Year built (approx.)", type: "text", placeholder: "e.g. 2005" },
  ],
  business: [
    { name: "industry", label: "Industry / business type", type: "text", placeholder: "e.g. Construction, Retail", required: true },
    { name: "employees", label: "Number of employees", type: "select", options: ["Just me", "2–5", "6–10", "11–25", "26+"] },
    { name: "revenue", label: "Annual revenue (approx.)", type: "select", options: ["Under $100k", "$100k–$500k", "$500k–$1M", "Over $1M"] },
  ],
  life: [
    { name: "coverageAmount", label: "Coverage amount", type: "select", options: ["$100k", "$250k", "$500k", "$1M+", "Not sure"] },
    { name: "tobacco", label: "Tobacco use?", type: "select", options: ["No", "Yes"] },
  ],
  health: [
    { name: "householdSize", label: "Household size", type: "select", options: ["1", "2", "3", "4", "5+"] },
    { name: "coverageFor", label: "Coverage for", type: "select", options: ["Myself", "Family", "Self-employed / Business"] },
  ],
  other: [
    { name: "details", label: "Tell us what you need", type: "text", placeholder: "Briefly describe the coverage you're looking for" },
  ],
};

/** Step 6 — applicant / driver info, by track. */
export const APPLICANT_FIELDS: Record<Track, Field[]> = {
  auto: [
    { name: "age", label: "Your age", type: "text", placeholder: "e.g. 34", required: true },
    { name: "licenseStatus", label: "License status", type: "select", options: ["Valid FL license", "Out-of-state license", "Permit", "Suspended / Needs SR-22", "International"] },
    { name: "incidents", label: "Tickets or accidents (last 3 yrs)?", type: "select", options: ["None", "1", "2", "3+"] },
  ],
  home: [
    { name: "age", label: "Your age", type: "text", placeholder: "e.g. 40" },
    { name: "claims", label: "Claims in the last 5 years?", type: "select", options: ["None", "1", "2+"] },
  ],
  business: [
    { name: "yearsInBusiness", label: "Years in business", type: "select", options: ["Just starting", "1–2", "3–5", "5+"] },
    { name: "priorCoverage", label: "Prior business coverage?", type: "select", options: ["Yes", "No"] },
  ],
  life: [
    { name: "age", label: "Your age", type: "text", placeholder: "e.g. 38", required: true },
    { name: "health", label: "General health", type: "select", options: ["Excellent", "Good", "Fair", "Prefer not to say"] },
  ],
  health: [
    { name: "age", label: "Your age", type: "text", placeholder: "e.g. 45" },
    { name: "currentCoverage", label: "Current coverage?", type: "select", options: ["None", "Employer", "Marketplace", "Medicaid / Medicare"] },
  ],
  other: [{ name: "age", label: "Your age (optional)", type: "text", placeholder: "e.g. 30" }],
};

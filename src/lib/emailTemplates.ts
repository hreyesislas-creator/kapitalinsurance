import type { Lead } from "./leads";
import { site } from "./site";

/**
 * Email templates for the V1 lead workflow.
 *
 *   - buildAgentEmail    → professional new-lead alert sent to the agency.
 *   - buildCustomerEmail → branded confirmation sent to the customer.
 *
 * Every dynamic value is HTML-escaped (escapeHtml) before interpolation, so a
 * malicious submission can never inject markup into either email. Layouts are
 * table-based with inline styles for maximum email-client compatibility.
 */

const BRAND = {
  navy: "#0a3d91",
  navyDark: "#061d45",
  red: "#e01933",
  ink: "#1f2937",
  inkSoft: "#5d6a7a",
  line: "#e5e9f0",
  bg: "#f4f6fb",
};

/** Escape user-supplied text for safe inclusion in HTML. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** "vehicleYear" → "Vehicle Year" */
function prettify(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

function customerName(lead: Lead): string {
  return `${lead.firstName} ${lead.lastName}`.trim();
}

/** Render a record (assetInfo / driverInfo) as label/value table rows. */
function recordRows(rec: Record<string, string> | undefined): string {
  if (!rec) return "";
  return Object.entries(rec)
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => row(prettify(k), v))
    .join("");
}

/** A single label/value row used inside the detail cards. */
function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.inkSoft};font-size:13px;width:42%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.ink};font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

function card(title: string, innerRows: string): string {
  if (!innerRows.trim()) return "";
  return `
    <div style="margin:0 0 18px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.navy};">${escapeHtml(title)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${innerRows}
      </table>
    </div>`;
}

function button(label: string, href: string, bg: string): string {
  return `
    <a href="${href}" style="display:block;background:${bg};color:#ffffff;text-decoration:none;text-align:center;font-size:16px;font-weight:700;padding:16px 24px;border-radius:9999px;">${escapeHtml(label)}</a>`;
}

function shell(bodyHtml: string, preheader: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;box-shadow:0 6px 24px rgba(6,29,69,0.08);">
        ${bodyHtml}
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:${BRAND.inkSoft};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        ${escapeHtml(site.legalName)} · ${escapeHtml(site.address.street)}, ${escapeHtml(site.address.city)}, ${escapeHtml(site.address.region)} ${escapeHtml(site.address.postalCode)}
      </p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Branded header bar (navy) with the Kapital wordmark + shield emblem. */
function brandHeader(subtitle?: string): string {
  return `
  <tr>
    <td style="background:linear-gradient(135deg,${BRAND.navy} 0%,${BRAND.navyDark} 100%);padding:28px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;padding-right:12px;">
            <div style="width:40px;height:40px;border-radius:10px;background:#ffffff;color:${BRAND.navy};font-size:22px;font-weight:800;text-align:center;line-height:40px;">K</div>
          </td>
          <td style="vertical-align:middle;">
            <div style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.02em;">KAPITAL INSURANCE GROUP</div>
            <div style="color:rgba(255,255,255,0.72);font-size:11px;font-weight:600;letter-spacing:0.18em;">A UNIVISTA INSURANCE AGENCY</div>
          </td>
        </tr>
      </table>
      ${subtitle ? `<p style="margin:18px 0 0;color:#ffffff;font-size:22px;font-weight:800;">${escapeHtml(subtitle)}</p>` : ""}
    </td>
  </tr>`;
}

type Meta = { quoteId: string; createdAt: Date };

function formatDateTime(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(d);
}

/* ----------------------------- Agent email ------------------------------ */

export function buildAgentEmail(lead: Lead, meta: Meta) {
  const name = customerName(lead);
  const requestedCoverage = lead.insuranceType;

  const summary = card(
    "Lead Summary",
    row("Insurance Type", lead.insuranceType) +
      row("Name", name) +
      row("Phone", lead.phone) +
      row("Email", lead.email) +
      row("ZIP Code", lead.zip),
  );

  const coverage = card(
    "Coverage Details",
    row("Current Premium", lead.currentPremium ? `$${lead.currentPremium}/mo` : "Not provided") +
      row("Current Carrier", lead.currentCarrier || "Not provided") +
      row("Currently Insured", lead.currentlyInsured ? lead.currentlyInsured : "Not provided") +
      row("Requested Coverage", requestedCoverage),
  );

  const additionalRows =
    recordRows(lead.assetInfo) +
    recordRows(lead.driverInfo) +
    (lead.notes ? row("Additional Notes", lead.notes) : "");
  const additional = card("Additional Information", additionalRows);

  const submitted = card(
    "Submitted",
    row("Date & Time", formatDateTime(meta.createdAt)) +
      row("Quote ID", meta.quoteId) +
      row("Preferred Contact", lead.preferredContact) +
      row("Source", lead.source),
  );

  const body = `
  ${brandHeader("New Quote Request")}
  <tr>
    <td style="padding:28px 32px;">
      <p style="margin:0 0 20px;color:${BRAND.inkSoft};font-size:14px;">A new quote request just came in from the website. Reach out while it's hot.</p>
      ${summary}
      ${coverage}
      ${additional}
      ${submitted}

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
        <tr>
          <td style="padding:0 0 12px;">${button("📞 Call Customer", telHref(lead.phone), BRAND.red)}</td>
        </tr>
        <tr>
          <td>${button("✉️ Reply by Email", `mailto:${escapeHtml(lead.email)}?subject=${encodeURIComponent("Your insurance quote from Kapital Insurance Group")}`, BRAND.navy)}</td>
        </tr>
      </table>
    </td>
  </tr>`;

  const text = [
    `New Quote Request`,
    ``,
    `Insurance Type: ${lead.insuranceType}`,
    `Name: ${name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `ZIP: ${lead.zip}`,
    ``,
    `Current Premium: ${lead.currentPremium ? `$${lead.currentPremium}/mo` : "Not provided"}`,
    `Current Carrier: ${lead.currentCarrier || "Not provided"}`,
    `Requested Coverage: ${requestedCoverage}`,
    ``,
    `Submitted: ${formatDateTime(meta.createdAt)}`,
    `Quote ID: ${meta.quoteId}`,
  ].join("\n");

  return {
    subject: `🚗 New Insurance Quote Request - ${lead.insuranceType}`,
    html: shell(body, `New ${lead.insuranceType} lead: ${name} · ${lead.phone}`),
    text,
  };
}

/* ---------------------------- Customer email ---------------------------- */

export function buildCustomerEmail(lead: Lead, meta: Meta) {
  const first = lead.firstName || "there";

  const body = `
  ${brandHeader()}
  <tr>
    <td style="padding:32px;">
      <h1 style="margin:0 0 12px;color:${BRAND.ink};font-size:24px;font-weight:800;">Thank you, ${escapeHtml(first)}!</h1>
      <p style="margin:0 0 16px;color:${BRAND.ink};font-size:15px;line-height:1.6;">
        Thank you for requesting a quote from <strong>Kapital Insurance Group</strong>.
      </p>
      <p style="margin:0 0 16px;color:${BRAND.ink};font-size:15px;line-height:1.6;">
        We are already comparing rates from multiple insurance carriers. One of our licensed advisors will contact you shortly with your personalized options.
      </p>

      <div style="margin:24px 0;padding:16px 20px;background:${BRAND.bg};border-radius:12px;">
        <p style="margin:0 0 4px;color:${BRAND.inkSoft};font-size:13px;">Need immediate assistance?</p>
        <a href="${telHref(site.phone.e164)}" style="color:${BRAND.navy};font-size:20px;font-weight:800;text-decoration:none;">📞 ${escapeHtml(site.phone.display)}</a>
      </div>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
        <tr><td>${button(`Call Now`, telHref(site.phone.e164), BRAND.red)}</td></tr>
      </table>

      <p style="margin:24px 0 0;color:${BRAND.inkSoft};font-size:12px;line-height:1.6;">
        Reference: ${escapeHtml(meta.quoteId)}<br />
        Hablamos español. We're here Mon–Fri 9am–6pm and Sat 10am–2pm (ET).
      </p>
    </td>
  </tr>`;

  const text = [
    `Thank you, ${first}!`,
    ``,
    `Thank you for requesting a quote from Kapital Insurance Group.`,
    `We are already comparing rates from multiple insurance carriers.`,
    `One of our licensed advisors will contact you shortly.`,
    ``,
    `Need immediate assistance? Call ${site.phone.display}`,
    ``,
    `Reference: ${meta.quoteId}`,
  ].join("\n");

  return {
    subject: `We Received Your Quote Request`,
    html: shell(body, `We're comparing carriers for your ${lead.insuranceType} quote.`),
    text,
  };
}

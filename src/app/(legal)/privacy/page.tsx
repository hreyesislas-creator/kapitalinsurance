import type { Metadata } from "next";
import { LegalLayout } from "../legal";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 2026" crumbLabel="Privacy Policy" path="/privacy">
      <p>
        {site.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
        This policy explains what information we collect when you use our website or request a quote,
        how we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <p>
        When you request a quote or contact us, we collect the information you provide — such as your
        name, contact details, ZIP code, and details about the coverage you&apos;re seeking. We may
        also collect basic, non-identifying usage data to improve our website.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use your information solely to prepare your insurance quote, contact you about coverage,
        and provide the services you request. We compare carriers on your behalf and may share the
        details necessary to obtain your quotes with those carriers.
      </p>

      <h2>How we contact you</h2>
      <p>
        By submitting a quote request, you consent to be contacted by phone, text, or email regarding
        your inquiry. Consent is not a condition of purchase, and you may opt out at any time.
      </p>

      <h2>Data protection</h2>
      <p>
        We take reasonable measures to protect your information and do not sell your personal data.
        Lead information is stored securely and accessible only to authorized staff.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Call us at{" "}
        <a href={site.phone.href} className="font-semibold text-brand-700">{site.phone.display}</a> or
        email <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">{site.email}</a>.
      </p>
    </LegalLayout>
  );
}

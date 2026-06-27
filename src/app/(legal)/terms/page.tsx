import type { Metadata } from "next";
import { LegalLayout } from "../legal";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms governing your use of the ${site.name} website.`,
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="June 2026" crumbLabel="Terms" path="/terms">
      <p>
        Welcome to {site.name}. By using this website, you agree to these terms. Please read them
        carefully.
      </p>

      <h2>Informational purpose</h2>
      <p>
        The content on this site is for general informational purposes only and does not constitute
        insurance advice or an offer of coverage. Coverage is subject to the terms, conditions, and
        eligibility requirements of the issuing carrier and applicable Florida law.
      </p>

      <h2>Quotes &amp; estimates</h2>
      <p>
        Any savings figures, calculators, or estimates shown are illustrative only and are not a
        guarantee of coverage or price. Your actual quote depends on your individual profile and the
        carriers&apos; underwriting.
      </p>

      <h2>Independent agency</h2>
      <p>
        {site.name} is an independent {site.franchiseOf} franchise. We represent multiple insurance
        carriers and are not the insurer. Policies are issued by third-party carriers.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Call{" "}
        <a href={site.phone.href} className="font-semibold text-brand-700">{site.phone.display}</a>.
      </p>
    </LegalLayout>
  );
}

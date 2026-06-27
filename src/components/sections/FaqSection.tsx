import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema, speakableSchema } from "@/lib/seo";
import type { FAQ } from "@/data/services";

export function FaqSection({
  faqs,
  eyebrow = "Questions, answered",
  title = "Frequently asked questions",
  description,
  tone = "default",
  withSchema = true,
}: {
  faqs: FAQ[];
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "default" | "muted";
  withSchema?: boolean;
}) {
  return (
    <Section tone={tone}>
      {withSchema && (
        <JsonLd
          data={[faqSchema(faqs), speakableSchema([".faq-question", ".faq-answer"])]}
        />
      )}
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mx-auto mt-10 max-w-3xl faq-answer">
        <FAQAccordion faqs={faqs} />
      </div>
    </Section>
  );
}

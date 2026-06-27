import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service } from "@/data/services";

export function RelatedServices({
  services,
  title = "Related coverage",
  tone = "muted",
}: {
  services: Service[];
  title?: string;
  tone?: "default" | "muted";
}) {
  if (!services.length) return null;
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Bundle &amp; save"
        title={title}
        description="Combining policies with one agency is one of the easiest ways to lower your total cost."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </Section>
  );
}

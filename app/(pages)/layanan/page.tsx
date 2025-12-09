import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "Layanan",
  description: siteConfig.pages.services.subtitle,
});

export default function LayananPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Layanan"
        title={siteConfig.pages.services.title}
        subtitle={siteConfig.pages.services.subtitle}
        ctaLabel="Hubungi Kami"
        ctaHref={mailto}
      />

      {/* Pilar Layanan - with images */}
      <Section
        title="Pilar layanan"
        description={siteConfig.pages.services.pillarsIntro}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.focusAreas.map((area, index) => {
            const images = [
              siteConfig.images.planning,
              siteConfig.images.handshake,
              siteConfig.images.construction,
              siteConfig.images.documents,
            ];
            return (
              <div
                key={area.title}
                className="group overflow-hidden rounded-2xl border border-brand-black/8 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <FadeIn delay={0.05 * index}>
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={images[index]}
                      alt={area.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-brand-primary shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-3 p-6">
                    <h3 className="text-xl font-semibold text-brand-black">
                      {area.title}
                    </h3>
                    <p className="text-base text-brand-neutral">
                      {area.description}
                    </p>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Pendekatan Operasional - with meeting image */}
      <SectionWithImage
        title="Pendekatan operasional"
        description={siteConfig.about.currentFocus}
        imageSrc={siteConfig.images.meeting}
        imageAlt="Business meeting and planning session"
        imagePosition="left"
      >
        <div className="grid gap-4">
          {siteConfig.about.principles.map((item, index) => (
            <FadeIn key={item.title} delay={0.05 * index}>
              <div className="flex gap-4 rounded-xl border border-brand-black/8 bg-brand-paper/50 p-4 transition-colors hover:bg-brand-paper">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-semibold text-brand-primary">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-semibold text-brand-black">
                    {item.title}
                  </h4>
                  <p className="text-sm text-brand-neutral">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionWithImage>

      {/* Kontak - with office image */}
      <SectionWithImage
        title="Kontak"
        description="Diskusi awal membantu memetakan kebutuhan dan prioritas kolaborasi."
        imageSrc={siteConfig.images.professional}
        imageAlt="Professional business environment"
        imagePosition="right"
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description={siteConfig.pages.contact.availability}
        />
      </SectionWithImage>
    </div>
  );
}

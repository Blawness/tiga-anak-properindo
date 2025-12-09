import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import SectionWithImage from "@/components/section-with-image";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "Kontak",
  description: siteConfig.pages.contact.subtitle,
});

export default function KontakPage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Kontak"
        title={siteConfig.pages.contact.title}
        subtitle={siteConfig.pages.contact.subtitle}
        ctaLabel="Email Kami"
        ctaHref={mailto}
      />

      {/* Saluran Resmi - with office image */}
      <SectionWithImage
        title="Saluran resmi"
        description={siteConfig.pages.contact.availability}
        imageSrc={siteConfig.images.office}
        imageAlt="Modern office workspace"
        imagePosition="right"
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description="Kami merespons secara terjadwal untuk menjaga kualitas diskusi."
        />
      </SectionWithImage>

      {/* Additional visual element - Location/Office vibe */}
      <section className="w-full px-6 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Full-width image with overlay */}
            <div className="relative h-64 md:h-80">
              <Image
                src={siteConfig.images.property}
                alt="Property development"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/30 to-transparent" />
            </div>
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                Membangun Kepercayaan Bersama
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/80 md:text-base">
                Kami berkomitmen memberikan respons yang berkualitas untuk setiap pertanyaan dan diskusi Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

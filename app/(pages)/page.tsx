import { buildMetadata } from "@/lib/meta";
import ContactCard from "@/components/contact-card";
import PageHero from "@/components/page-hero";
import Section from "@/components/section";
import SectionWithImage from "@/components/section-with-image";
import StatCard from "@/components/stat-card";
import CTAButton from "@/components/cta-button";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "@/components/motion";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "Home",
});

export default function HomePage() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        title={siteConfig.hero.title}
        subtitle={siteConfig.hero.subtitle}
        ctaLabel={siteConfig.hero.ctaLabel}
        ctaHref={mailto}
        eyebrow="PT Tiga Anak Propertindo"
      />

      {/* Komitmen Inti - with image */}
      <SectionWithImage
        title="Komitmen inti kami"
        description="Pendekatan prudent, transparan, dan patuh regulasi untuk memastikan setiap langkah pengembangan properti memiliki dasar yang kuat."
        imageSrc={siteConfig.images.building}
        imageAlt="Modern property building representing our commitment"
        imagePosition="right"
      >
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {siteConfig.credibility.map((item, index) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              primary={index === 0}
            />
          ))}
        </div>
      </SectionWithImage>

      {/* Layanan Utama - with images per card */}
      <Section
        title="Layanan utama"
        description="Layanan prioritas untuk menyiapkan proyek yang tertata, patuh regulasi, dan siap dieksekusi."
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
                className={`group overflow-hidden rounded-2xl border border-brand-black/8 bg-white shadow-sm transition-all hover:shadow-md ${index === 0 ? "md:col-span-2" : ""
                  }`}
              >
                <FadeIn delay={0.05 * index}>
                  <div className={`flex flex-col ${index === 0 ? "md:flex-row" : ""}`}>
                    {/* Image */}
                    <div className={`relative ${index === 0 ? "h-48 md:h-auto md:w-2/5" : "h-40"}`}>
                      <Image
                        src={images[index]}
                        alt={area.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes={index === 0 ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 50vw"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent" />
                    </div>
                    {/* Content */}
                    <div className={`flex flex-col gap-3 p-6 ${index === 0 ? "md:w-3/5" : ""}`}>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-paper text-sm font-semibold text-brand-primary">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-xl font-semibold text-brand-black">
                        {area.title}
                      </h3>
                      <p className="text-base text-brand-neutral">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </Section>

      {/* CTA Section - with background image */}
      <Section align="center" padded={false}>
        <FadeIn className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={siteConfig.images.collaboration}
              alt="Collaboration"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/70 to-brand-black/60" />
          </div>
          {/* Content */}
          <div className="relative flex flex-col items-center px-8 py-16 text-center md:px-16 md:py-20">
            <div className="mb-4 h-px w-16 bg-white/40" aria-hidden />
            <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              Siap berkolaborasi secara terukur
            </h3>
            <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
              Kami terbuka untuk dialog awal guna memetakan kebutuhan, menyusun
              rencana, dan menentukan langkah prioritas secara realistis.
            </p>
            <div className="mt-8">
              <CTAButton href={mailto} variant="primary">
                Hubungi Kami
              </CTAButton>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Kontak Section - with image */}
      <SectionWithImage
        title="Kontak"
        description="Silakan hubungi kami untuk percakapan awal."
        imageSrc={siteConfig.images.office}
        imageAlt="Modern office space"
        imagePosition="left"
      >
        <ContactCard
          email={siteConfig.contact.email}
          whatsapp={siteConfig.contact.whatsapp}
          description="Respons akan diberikan secara terjadwal untuk menjaga kualitas diskusi."
        />
      </SectionWithImage>
    </div>
  );
}

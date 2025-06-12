
import Image from 'next/image';
import TestimonialCard from '@/components/testimonial-card';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Quote } from 'lucide-react';
import type { Locale } from '@/lib/dictionaries';
import { getDictionary } from '@/lib/dictionaries';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.clientsPage.metaTitle,
    description: dictionary.clientsPage.metaDescription,
  };
}

const CACHE_BUST_QUERY = '?v=imgrefresh1'; // Cache-busting query parameter

const partnerLogos: Record<string, string> = {
  alwatania: '/images/clients/logos/alwatania-logo.png',
  mahamalWater: '/images/clients/logos/almadinah-water-logo.png', // Key remains, value is the path to almadinah logo
  miradWater: '/images/clients/logos/mirad-water-logo.png',
};

const testimonialAvatars: Record<string, string> = {
  alwatania: '/images/clients/avatars/alwatania-logo.png',
  mahamalWater: '/images/clients/avatars/almadinah-water-logo.png', // Key remains for Al Madinah Water Factory
  miradWater: '/images/clients/avatars/mirad-water-logo.png', // Changed from anonymousFMCG to miradWater
};


export default async function ClientsPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const d = dictionary.clientsPage;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">{d.headerTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {d.headerSubtitle}
        </p>
      </header>

      <section id="key-partners" className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-headline flex items-center justify-center gap-3">
           <Handshake className="h-10 w-10 text-primary"/> {d.keyPartnersSection.heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center">
          {d.keyPartnersSection.partners.map((partner) => {
            let logoSrc = partnerLogos[partner.nameKey as keyof typeof partnerLogos];
            if (logoSrc) {
              logoSrc += CACHE_BUST_QUERY; // Append cache-busting query
            }
            return (
              <Card key={partner.name} className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
                <CardContent className="flex justify-center items-center h-24">
                  {logoSrc ? (
                    <Image
                        key={`${logoSrc}-${lang}-${CACHE_BUST_QUERY}`}
                        src={logoSrc}
                        alt={`${partner.name} ${lang === 'ar' ? 'شعار' : 'Logo'}`}
                        width={120}
                        height={60}
                        style={{objectFit:"contain"}}
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{partner.name} Logo</div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
         <p className="text-center text-muted-foreground mt-8 text-lg">
          {d.keyPartnersSection.trustedByNote}
        </p>
      </section>

      <section id="testimonials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline flex items-center justify-center gap-3">
          <Quote className={`h-10 w-10 text-primary ${lang === 'ar' ? 'transform scale-x-[-1]' : ''}`}/> {d.testimonialsSection.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {d.testimonialsSection.testimonials.map((testimonial) => {
            let avatarSrc = testimonialAvatars[testimonial.companyKey as keyof typeof testimonialAvatars];
            if (avatarSrc) {
              avatarSrc += CACHE_BUST_QUERY; // Append cache-busting query
            }
            return (
                <TestimonialCard
                    key={testimonial.name}
                    name={testimonial.name}
                    company={testimonial.company}
                    testimonial={testimonial.testimonial}
                    avatarUrl={avatarSrc}
                    rating={testimonial.rating}
                />
            );
          })}
        </div>
      </section>
    </div>
  );
}


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

const partnerPlaceholders = {
  alwatania: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=AlWatania',
  mahamalWater: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=Mahamal',
  miradWater: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=MiradWater',
  ksaRetailers: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=RetailKSA',
  fbDistributors: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=F%26BDist',
  constructionLeaders: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=Construction',
};

const testimonialAvatars = {
  alwatania: 'https://placehold.co/100x100/D4E7F0/29ABE2?text=LM',
  mahamalWater: 'https://placehold.co/100x100/29ABE2/FFFFFF?text=PH',
  anonymousFMCG: 'https://placehold.co/100x100/D4E7F0/29ABE2?text=OD',
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {d.keyPartnersSection.partners.map((partner) => (
            <Card key={partner.name} className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
              <CardContent className="flex justify-center items-center h-24">
                <Image 
                    src={partnerPlaceholders[partner.nameKey as keyof typeof partnerPlaceholders]} 
                    alt={`${dictionary.navigation.clients} - ${partner.name}`}
                    width={120} 
                    height={60} 
                    style={{objectFit:"contain"}}
                    data-ai-hint={partner.imageHint}
                />
              </CardContent>
            </Card>
          ))}
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
          {d.testimonialsSection.testimonials.map((testimonial) => (
            <TestimonialCard 
                key={testimonial.name} 
                name={testimonial.name}
                company={testimonial.company}
                testimonial={testimonial.testimonial}
                avatarUrl={testimonialAvatars[testimonial.companyKey as keyof typeof testimonialAvatars]}
                rating={testimonial.rating}
                imageHint={testimonial.avatarHint}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

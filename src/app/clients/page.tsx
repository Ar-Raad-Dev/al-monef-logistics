
import Image from 'next/image';
import TestimonialCard from '@/components/testimonial-card';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Quote } from 'lucide-react';

const partners = [
  { name: 'Al Watania Poultry', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=AlWatania', imageHint: "company logo" },
  { name: 'Mahamal Madinah Water', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=Mahamal', imageHint: "company logo" },
  { name: 'Mirad Water Factory', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=MiradWater', imageHint: "company logo" },
  { name: 'Major Retailers KSA', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=RetailKSA', imageHint: "company logo" },
  { name: 'Food & Beverage Dist.', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=F%26BDist', imageHint: "company logo" },
  { name: 'Construction Sector Leads', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=Construction', imageHint: "company logo" },
];

const testimonials = [
  {
    name: 'Logistics Manager',
    company: 'Al Watania Poultry',
    testimonial: 'AlMonef and Sons consistently provide reliable and timely transport for our goods to Hobar. Their professionalism is key to our supply chain.',
    avatarUrl: 'https://placehold.co/100x100/D4E7F0/29ABE2?text=LM',
    imageHint: 'manager portrait',
    rating: 5,
  },
  {
    name: 'Procurement Head',
    company: 'Mahamal Madinah Water',
    testimonial: 'Their trailer leasing options are flexible and their vehicles are top-notch. AlMonef has been a valuable partner for our distribution needs.',
    avatarUrl: 'https://placehold.co/100x100/29ABE2/FFFFFF?text=PH',
    imageHint: 'person face',
    rating: 5,
  },
  {
    name: 'Operations Director',
    company: 'Anonymous FMCG Client',
    testimonial: 'We trust AlMonef and Sons for their extensive network across Saudi Arabia. They handle our diverse logistics requirements with great care.',
    avatarUrl: 'https://placehold.co/100x100/D4E7F0/29ABE2?text=OD',
    imageHint: 'director photo',
    rating: 4,
  },
];

export default function ClientsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">Our Esteemed Clients</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Building strong, lasting partnerships is at the heart of what we do. We are proud to serve leaders across various industries.
        </p>
      </header>

      <section id="key-partners" className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-headline flex items-center justify-center gap-3">
           <Handshake className="h-10 w-10 text-primary"/> Our Key Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <Card key={partner.name} className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
              <CardContent className="flex justify-center items-center h-24">
                <Image 
                    src={partner.logoUrl} 
                    alt={`${partner.name} logo`} 
                    width={120} 
                    height={60} 
                    objectFit="contain"
                    data-ai-hint={partner.imageHint}
                />
              </CardContent>
            </Card>
          ))}
        </div>
         <p className="text-center text-muted-foreground mt-8 text-lg">
          Trusted by leaders in food and beverage, retail, and industrial logistics across Saudi Arabia.
        </p>
      </section>

      <section id="testimonials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline flex items-center justify-center gap-3">
          <Quote className="h-10 w-10 text-primary transform scale-x-[-1]"/> Client Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
}

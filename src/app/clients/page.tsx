
import Image from 'next/image';
import TestimonialCard from '@/components/testimonial-card';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake } from 'lucide-react';

const partners = [
  { name: 'Global Corp', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=GlobalCorp', imageHint: "company logo" },
  { name: 'Innovate Ltd', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=InnovateLtd', imageHint: "company logo" },
  { name: 'Trade Solutions Inc.', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=TradeInc', imageHint: "company logo" },
  { name: 'Logistics World', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=LogiWorld', imageHint: "company logo" },
  { name: 'Connect Co.', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=ConnectCo', imageHint: "company logo" },
  { name: 'Supply Chain Masters', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=SupplyMasters', imageHint: "company logo" },
];

const testimonials = [
  {
    name: 'Aisha Al-Fahad',
    company: 'CEO, Global Exports Co.',
    testimonial: 'AlMonef Logistics has been instrumental in streamlining our international shipping. Their professionalism and efficiency are unmatched.',
    avatarUrl: 'https://placehold.co/100x100/D4E7F0/29ABE2?text=AA',
    imageHint: 'woman portrait',
    rating: 5,
  },
  {
    name: 'John B. Anderson',
    company: 'Supply Chain Manager, Innovatech Ltd.',
    testimonial: 'Their team consistently goes above and beyond to meet our complex logistics needs. Highly recommended for reliability and expertise.',
    avatarUrl: 'https://placehold.co/100x100/29ABE2/FFFFFF?text=JB',
    imageHint: 'man portrait',
    rating: 5,
  },
  {
    name: 'Fatima Chen',
    company: 'Owner, Auto Imports Deluxe',
    testimonial: 'Vehicle trading can be tricky, but AlMonef Logistics makes it seamless. Their attention to detail and customer service are top-notch.',
    avatarUrl: 'https://placehold.co/100x100/D4E7F0/29ABE2?text=FC',
    imageHint: 'woman face',
    rating: 5,
  },
];

export default function ClientsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">Our Valued Clients & Partners</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We are proud to collaborate with a diverse range of businesses, building strong relationships based on trust and mutual success.
        </p>
      </header>

      <section id="key-partners" className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-headline flex items-center justify-center gap-3">
           <Handshake className="h-10 w-10 text-primary"/> Key Partners
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
          And many more industry leaders who trust us with their logistics and vehicle trade needs.
        </p>
      </section>

      <section id="testimonials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          What Our Clients Say
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

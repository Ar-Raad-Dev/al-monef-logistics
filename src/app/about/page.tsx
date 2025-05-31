
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, Eye, CheckCircle } from 'lucide-react';

const credentials = [
  { icon: CheckCircle, name: 'ISO 9001:2015 Certified', description: 'Ensuring quality management systems.' },
  { icon: CheckCircle, name: 'Licensed Freight Forwarder', description: 'Authorized for global logistics operations.' },
  { icon: CheckCircle, name: 'Customs Brokerage License', description: 'Expertise in customs clearance procedures.' },
  { icon: CheckCircle, name: 'Secure Trade Partnership Member', description: 'Committed to supply chain security.' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">About Abdul Aziz AlMonef Logistics Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Pioneering logistics and vehicle trade with integrity, innovation, and a client-first approach.
        </p>
      </header>

      <section id="company-overview" className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450/D4E7F0/29ABE2"
              alt="AlMonef Logistics team meeting"
              layout="fill"
              objectFit="cover"
              data-ai-hint="office meeting"
              className="transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 font-headline">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Founded with a vision to redefine logistics, Abdul Aziz AlMonef Logistics Hub has grown into a trusted name for comprehensive supply chain solutions and international vehicle trade. Our journey is marked by a relentless pursuit of excellence and adaptation to the evolving global market.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in building strong relationships with our clients, understanding their unique needs, and delivering services that not only meet but exceed their expectations. Our expertise spans across various industries, offering specialized solutions for complex logistical challenges.
            </p>
          </div>
        </div>
      </section>

      <section id="mission-vision" className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Target className="h-12 w-12 text-primary" />
              <CardTitle className="text-3xl font-headline">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide innovative, reliable, and cost-effective logistics and vehicle trade solutions that empower businesses to thrive in the global marketplace. We are committed to operational excellence, customer satisfaction, and sustainable practices.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Eye className="h-12 w-12 text-primary" />
              <CardTitle className="text-3xl font-headline">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading logistics and vehicle trade partner recognized for our unwavering commitment to quality, integrity, and customer success. We aspire to set new standards in the industry through continuous innovation and strategic global presence.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="credentials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          Our Credentials & Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {credentials.map((cred) => (
            <Card key={cred.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
                  <cred.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">{cred.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cred.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

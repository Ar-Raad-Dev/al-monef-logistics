
import HeroSection from '@/components/hero-section';
import StatCard from '@/components/stat-card';
import ServiceCard from '@/components/service-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Globe, Users, Truck, Ship, Plane, PackageCheck, HardHat, UserCheck } from 'lucide-react';

const stats = [
  { icon: PackageCheck, title: 'Projects Completed', value: '1,200+', description: 'Successfully delivered projects worldwide.' },
  { icon: HardHat, title: 'Expert Team', value: '150+', description: 'Skilled professionals dedicated to your success.' },
  { icon: UserCheck, title: 'Satisfied Clients', value: '500+', description: 'Building lasting partnerships globally.' },
  { icon: Globe, title: 'Global Reach', value: '75+', description: 'Countries served with our logistics network.' },
];

const services = [
  { icon: Truck, title: 'Vehicle Trade Services', description: 'Seamless import and export of diverse vehicles, ensuring quality and compliance.', link: '/services#vehicle-trade' },
  { icon: Ship, title: 'Logistics Solutions', description: 'Comprehensive freight forwarding, warehousing, and supply chain management.', link: '/services#logistics' },
  { icon: Plane, title: 'Fleet Showcase', description: 'Explore our modern and versatile fleet ready to meet your transportation needs.', link: '/services#fleet' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <section id="company-intro" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">
                Welcome to AlMonef Logistics Hub
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Abdul Aziz AlMonef Logistics Hub stands as a beacon of reliability and efficiency in the logistics and vehicle trading industry. With years of experience and a commitment to excellence, we provide tailored solutions that drive success for our clients.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our mission is to connect businesses globally through innovative logistics, ensuring timely and secure delivery of goods and vehicles. We leverage cutting-edge technology and a dedicated team to exceed expectations.
              </p>
              <Link href="/about">
                <Button size="lg" variant="default" className="transition-transform hover:scale-105">
                  Learn More About Us <Briefcase className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://placehold.co/600x400/29ABE2/FFFFFF" // Primary color BG
                alt="Logistics operations" 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="logistics team"
                className="transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="quick-stats" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
            Our Achievements at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section id="service-previews" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
            Core Services We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

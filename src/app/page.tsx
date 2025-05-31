
import HeroSection from '@/components/hero-section';
import StatCard from '@/components/stat-card';
import ServiceCard from '@/components/service-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Globe, Users, Truck, Ship, Plane, PackageCheck, HardHat, UserCheck, CalendarDays, ShoppingBag, Building } from 'lucide-react';

const stats = [
  { icon: CalendarDays, title: 'Years in Business', value: '15+', description: 'Extensive experience in logistics and trade.' },
  { icon: Truck, title: 'Number of Trailers', value: '200+', description: 'Large and diverse fleet for various needs.' },
  { icon: Building, title: 'Companies Served', value: '300+', description: 'Trusted by businesses across the Kingdom.' },
  { icon: ShoppingBag, title: 'Trailers Sold', value: '1000+', description: 'Connecting buyers and sellers effectively.' },
];

const services = [
  { icon: Truck, title: 'Vehicle Trade Services', description: 'Buying, selling, and leasing of high-quality trailers and commercial vehicles.', link: '/services#vehicle-trade' },
  { icon: Ship, title: 'Logistics & Transport', description: 'Reliable transportation of goods across Saudi Arabia with key partnerships.', link: '/services#logistics' },
  { icon: Plane, title: 'Fleet Showcase', description: 'Explore our modern fleet, available for sale, lease, or operational use.', link: '/services#fleet' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <section id="company-intro" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">
              Your Partner in Saudi Arabian Trade and Transport
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Abdul Aziz AlMonef and Sons Trade and Transport is a leading name in the logistics and trade industry, operating from Al Badai, Al Qassim. We specialize in commercial vehicles and offer dependable logistics services across the Kingdom.
            </p>
            <Link href="/about">
              <Button size="lg" variant="default" className="transition-transform hover:scale-105">
                Discover Our Story <Briefcase className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="quick-stats" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
            Our Impact by the Numbers
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
            Key Services We Provide
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

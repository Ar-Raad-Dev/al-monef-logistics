
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Ship, Plane, Warehouse, Package, Car, Container, Bike } from 'lucide-react';
import FleetCard from '@/components/fleet-card';

const fleetItems = [
  { name: 'Heavy Duty Trucks', description: 'Reliable trucks for long-haul and heavy cargo transportation.', imageUrl: 'https://placehold.co/600x400/29ABE2/FFFFFF', icon: Truck, imageHint: "truck cargo" },
  { name: 'Container Ships', description: 'Large capacity vessels for international sea freight.', imageUrl: 'https://placehold.co/600x400/D4E7F0/29ABE2', icon: Ship, imageHint: "container ship" },
  { name: 'Cargo Planes', description: 'Fast and secure air freight solutions for time-sensitive deliveries.', imageUrl: 'https://placehold.co/600x400/29ABE2/FFFFFF', icon: Plane, imageHint: "cargo plane" },
  { name: 'Delivery Vans', description: 'Versatile vans for last-mile delivery and urban logistics.', imageUrl: 'https://placehold.co/600x400/D4E7F0/29ABE2', icon: Car, imageHint: "delivery van" },
];

const logisticsSolutions = [
    { icon: Package, title: "Freight Forwarding", description: "Efficient and reliable air, sea, and land freight forwarding services globally." },
    { icon: Warehouse, title: "Warehousing & Distribution", description: "Secure warehousing facilities and streamlined distribution networks." },
    { icon: Truck, title: "Supply Chain Management", description: "End-to-end supply chain optimization for enhanced efficiency and cost savings." },
    { icon: Ship, title: "Customs Clearance", description: "Expert handling of customs documentation and procedures for smooth international trade." }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">Our Comprehensive Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Delivering tailored solutions for vehicle trade, logistics, and fleet management to meet your diverse needs.
        </p>
      </header>

      <section id="vehicle-trade" className="mb-16 md:mb-24 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 font-headline flex items-center gap-3">
              <Car className="h-10 w-10 text-primary" /> Vehicle Trade Services
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              We specialize in the international trade of a wide range of vehicles, including commercial trucks, passenger cars, and specialized equipment. Our services cover everything from sourcing and inspection to shipping and documentation, ensuring a hassle-free experience.
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2 mb-4">
              <li>Global vehicle sourcing and procurement</li>
              <li>Pre-shipment inspection and quality assurance</li>
              <li>Secure international shipping and handling</li>
              <li>Full customs documentation and compliance</li>
            </ul>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450/29ABE2/FFFFFF"
              alt="Vehicle trade operations"
              layout="fill"
              objectFit="cover"
              data-ai-hint="car shipping"
              className="transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      <section id="logistics" className="mb-16 md:mb-24 scroll-mt-20">
         <h2 className="text-3xl font-bold text-foreground mb-12 font-headline text-center flex items-center justify-center gap-3">
            <Package className="h-10 w-10 text-primary" /> Advanced Logistics Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {logisticsSolutions.map(service => (
                <Card key={service.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="items-center text-center">
                         <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                            <service.icon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section id="fleet" className="scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          Our Modern & Versatile Fleet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fleetItems.map((item) => (
            <FleetCard key={item.name} {...item} />
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-12 text-lg">
          Our diverse fleet is meticulously maintained and equipped with the latest technology to ensure safe and efficient transport of your goods. We can handle various cargo types and sizes.
        </p>
      </section>
    </div>
  );
}

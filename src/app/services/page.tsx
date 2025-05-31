
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Ship, Plane, Warehouse, Package, Car, Handshake, Award } from 'lucide-react';
import FleetCard from '@/components/fleet-card';

const fleetItems = [
  { name: 'Flatbed Trailers', description: 'Versatile for various cargo types, available for sale and lease.', imageUrl: 'https://placehold.co/600x400/29ABE2/FFFFFF', icon: Truck, imageHint: "flatbed trailer" },
  { name: 'Curtain-Side Trailers', description: 'Easy loading/unloading, ideal for palletized goods.', imageUrl: 'https://placehold.co/600x400/D4E7F0/29ABE2', icon: Truck, imageHint: "curtain side trailer" },
  { name: 'Refrigerated Trailers', description: 'Temperature-controlled transport for sensitive goods.', imageUrl: 'https://placehold.co/600x400/29ABE2/FFFFFF', icon: Truck, imageHint: "refrigerated trailer" },
  { name: 'Commercial Cars & Vans', description: 'Reliable vehicles for business operations and smaller cargo.', imageUrl: 'https://placehold.co/600x400/D4E7F0/29ABE2', icon: Car, imageHint: "commercial van" },
];

const logisticsSolutions = [
    { icon: Package, title: "Freight Forwarding", description: "Efficient and reliable air, sea, and land freight forwarding services globally." },
    { icon: Warehouse, title: "Warehousing & Distribution", description: "Secure warehousing facilities and streamlined distribution networks." },
    { icon: Truck, title: "Supply Chain Management", description: "End-to-end supply chain optimization for enhanced efficiency and cost savings." },
    { icon: Award, title: "Customs Clearance", description: "Expert handling of customs documentation for smooth international and domestic trade." }
];

const currentPartnerships = [
    { name: "Al Watania Poultry (Hobar)", description: "Key logistics partner for poultry distribution." },
    { name: "Mahamal Madinah Water Factory", description: "Transporting bottled water across regions." },
    { name: "Mirad Water Factory", description: "Reliable delivery services for water products." }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">Our Specialized Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive solutions for vehicle trade, leasing, and Kingdom-wide logistics and transport.
        </p>
      </header>

      <section id="vehicle-trade" className="mb-16 md:mb-24 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 font-headline flex items-center gap-3">
              <Car className="h-10 w-10 text-primary" /> Vehicle Trade Services
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              We specialize in the buying and selling of high-quality new and used trailers, trucks, and other commercial vehicles. Our inventory is carefully selected to meet diverse operational needs.
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2 mb-4">
              <li>Wide selection of trailers (flatbeds, refrigerated, curtain-siders, etc.)</li>
              <li>Sourcing of specific commercial vehicles and cars</li>
              <li>Transparent inspection and valuation processes</li>
              <li>Flexible leasing options available for trailers and vehicles</li>
            </ul>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450/29ABE2/FFFFFF"
              alt="Trailers and commercial vehicles for sale"
              layout="fill"
              objectFit="cover"
              data-ai-hint="trailers commercial vehicles"
              className="transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      <section id="logistics" className="mb-16 md:mb-24 scroll-mt-20">
         <h2 className="text-3xl font-bold text-foreground mb-12 font-headline text-center flex items-center justify-center gap-3">
            <Package className="h-10 w-10 text-primary" /> Logistics & Transport Solutions
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            We offer reliable transportation of goods across Saudi Arabia, ensuring timely and secure delivery. Our extensive network and experienced team handle diverse logistical challenges.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
        
        <h3 className="text-2xl font-bold text-foreground mb-6 font-headline text-center flex items-center justify-center gap-3">
            <Handshake className="h-8 w-8 text-primary" /> Current Key Partnerships
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {currentPartnerships.map(partner => (
                <Card key={partner.name} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">{partner.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{partner.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section id="fleet" className="scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          Our Modern & Versatile Fleet
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          Explore our range of trailers and vehicles. We offer options for sale, lease, and utilize them in our extensive transport operations. Filters for "For Sale", "In Use", "Leased" can help narrow your search (feature coming soon).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fleetItems.map((item) => (
            <FleetCard key={item.name} {...item} />
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-12 text-lg">
          Our diverse fleet is meticulously maintained and equipped to ensure safe and efficient transport.
        </p>
      </section>
    </div>
  );
}

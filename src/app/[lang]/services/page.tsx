
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, Car, Handshake, Award, Warehouse } from 'lucide-react';
import FleetCard from '@/components/fleet-card';
import type { Locale } from '@/lib/dictionaries';
import { getDictionary } from '@/lib/dictionaries';
import type { Metadata } from 'next';

// Define an explicit interface for the page props
interface ServicesPageProps {
  params: { lang: Locale };
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.servicesPage.metaTitle,
    description: dictionary.servicesPage.metaDescription,
  };
}

const logisticsIconMap = {
  freightForwarding: Package,
  warehousing: Warehouse,
  supplyChain: Truck,
  customsClearance: Award,
};

const fleetIconMap = {
  flatbedTrailers: Truck,
  curtainSideTrailers: Truck,
  refrigeratedTrailers: Truck,
  commercialVehicles: Car,
};

// Define local image paths for fleet items
const fleetImagePaths: Record<string, string> = {
  flatbedTrailers: '/images/fleet/flatbed-trailer.png',
  curtainSideTrailers: '/images/fleet/curtain-side-trailer.jpg',
  refrigeratedTrailers: '/images/fleet/refrigerated-trailer.jpg',
  commercialVehicles: '/images/fleet/commercial-van.jpg',
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const d = dictionary.servicesPage;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">{d.headerTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {d.headerSubtitle}
        </p>
      </header>

      <section id="vehicle-trade" className="mb-16 md:mb-24 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 font-headline flex items-center gap-3">
              <Car className="h-10 w-10 text-primary" /> {d.vehicleTradeSection.heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              {d.vehicleTradeSection.paragraph}
            </p>
            <ul className={`list-disc list-inside text-lg text-muted-foreground space-y-2 mb-4 ${lang === 'ar' ? 'mr-5' : 'ml-5'}`}>
              {d.vehicleTradeSection.listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/services/vehicle-trade.png" 
              alt={d.vehicleTradeSection.imageAlt}
              fill
              style={{objectFit:"cover"}}
              className="transform hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </section>

      <section id="logistics" className="mb-16 md:mb-24 scroll-mt-20">
         <h2 className="text-3xl font-bold text-foreground mb-12 font-headline text-center flex items-center justify-center gap-3">
            <Package className="h-10 w-10 text-primary" /> {d.logisticsSection.heading}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            {d.logisticsSection.paragraph}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {d.logisticsSection.solutions.map(service => {
                const IconComponent = logisticsIconMap[service.titleKey as keyof typeof logisticsIconMap];
                return (
                    <Card key={service.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="items-center text-center">
                             <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                                <IconComponent className="h-10 w-10 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-6 font-headline text-center flex items-center justify-center gap-3">
            <Handshake className="h-8 w-8 text-primary" /> {d.logisticsSection.partnershipsHeading}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {d.logisticsSection.partnerships.map(partner => (
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
          {d.fleetSection.heading}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          {d.fleetSection.paragraph}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {d.fleetSection.items.map((item) => {
            const Icon = fleetIconMap[item.nameKey as keyof typeof fleetIconMap];
            const imageUrl = fleetImagePaths[item.nameKey as keyof typeof fleetImagePaths];
            return (
                <FleetCard 
                    key={item.name} 
                    name={item.name}
                    description={item.description}
                    imageUrl={imageUrl}
                    icon={Icon}
                />
            );
        })}
        </div>
        <p className="text-center text-muted-foreground mt-12 text-lg">
          {d.fleetSection.maintenanceNote}
        </p>
      </section>
    </div>
  );
}

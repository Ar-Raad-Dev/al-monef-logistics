
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Target, Eye, Info, Phone, Printer, MapPin } from 'lucide-react';

const companyCredentials = [
  { icon: Info, name: 'CR Number', value: '112990003463' },
  { icon: Users, name: 'Chamber of Commerce', value: '121800' }, // Assuming Users icon for Chamber
  { icon: Phone, name: 'Telephone', value: '3212000' },
  { icon: Printer, name: 'Fax', value: '3213000' },
  { icon: MapPin, name: 'Address', value: 'Al Badai, Al Qassim, Saudi Arabia' },
];


export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">About Abdul Aziz AlMonef and Sons</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Pioneers in Saudi Arabian logistics and vehicle trade, committed to integrity and excellence.
        </p>
      </header>

      <section id="company-overview" className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450/D4E7F0/29ABE2"
              alt="AlMonef and Sons team or operations"
              layout="fill"
              objectFit="cover"
              data-ai-hint="logistics company team"
              className="transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 font-headline flex items-center gap-3">
              <Building2 className="h-10 w-10 text-primary" /> Our Company
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Abdul Aziz AlMonef and Sons Trade and Transport is a leading name in the logistics and trade industry, operating from Al Badai, Al Qassim, Saudi Arabia. With years of expertise, we specialize in the buying, selling, and leasing of trailers and commercial vehicles, and offer dependable logistics services across the Kingdom.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our foundation is built on trust, efficiency, and a deep understanding of the Saudi market. We strive to empower businesses by providing seamless and reliable solutions tailored to their unique needs.
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
                To be the foremost provider of comprehensive trade and transport solutions in Saudi Arabia, delivering exceptional value through innovation, reliability, and a client-centric approach. We aim to facilitate economic growth by connecting businesses and enabling efficient movement of goods.
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
                To be the undisputed leader in the Saudi Arabian logistics and vehicle trade sector, recognized for our unwavering commitment to quality, integrity, and sustainable practices, while fostering long-term partnerships and contributing to the Kingdom's prosperity.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="credentials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          Company Credentials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {companyCredentials.map((cred) => (
            <Card key={cred.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <cred.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold">{cred.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-md text-muted-foreground">{cred.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
// Placeholder for Users icon if not available in lucide-react directly.
// You might need to choose a more appropriate icon or handle it differently.
const Users = Building2; 

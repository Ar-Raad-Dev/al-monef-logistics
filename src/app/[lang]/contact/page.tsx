
import ContactForm from '@/components/contact-form';
import GoogleMapComponent from '@/components/google-map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Printer } from 'lucide-react'; 
import type { Locale } from '@/lib/dictionaries';
import { getDictionary } from '@/lib/dictionaries';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.contactPage.metaTitle,
    description: dictionary.contactPage.metaDescription,
  };
}

const contactIconMap = {
  officeAddress: MapPin,
  phone: Phone,
  faxNumber: Printer,
  email: Mail,
  workingHours: Clock,
};

// Coordinates for Al Badai, Al Qassim, Saudi Arabia
const companyLocation = { lat: 25.9638, lng: 43.7118 };

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const d = dictionary.contactPage;
  
  // The API key is sourced from environment variables (e.g., .env.local file)
  // See .env.local.example for the required variable name: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  // Ensure your .env.local file has NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">{d.headerTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {d.headerSubtitle}
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 mb-16 md:mb-24">
        <Card className="shadow-xl p-2 md:p-4">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-foreground mb-4">{d.sendMessageCardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm dictionary={d.form} lang={lang} />
          </CardContent>
        </Card>

        <div className="space-y-8">
            {d.contactDetails.map(detail => {
                 const IconComponent = contactIconMap[detail.titleKey as keyof typeof contactIconMap];
                 return (
                     <Card key={detail.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-start gap-4 pb-2">
                            <div className="p-3 bg-primary/10 rounded-md mt-1">
                                <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-semibold text-foreground">{detail.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className={lang === 'ar' ? 'pr-16' : 'pl-16'}>
                            {detail.lines.map(line => (
                                <p key={line} className="text-muted-foreground">{line}</p>
                            ))}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      </div>

      <section id="location-map">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          {d.locationMapSection.heading}
        </h2>
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-border">
          <GoogleMapComponent 
            key={lang} // Add key here to force re-mount on language change
            apiKey={apiKey}
            center={companyLocation}
            markerPosition={companyLocation}
            markerTitle={d.locationMapSection.mapMarkerTitle}
            lang={lang}
            noApiKeyMessage={d.locationMapSection.noApiKeyMessage}
            loadingMessage={d.locationMapSection.loadingMessage}
            // You can add a mapId prop here if you have cloud-based map styling configured
            // mapId="YOUR_CUSTOM_MAP_ID" 
          />
        </div>
      </section>
    </div>
  );
}


import ContactForm from '@/components/contact-form';
import MapEmbed from '@/components/map-embed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactDetails = [
  { icon: MapPin, title: 'Office Address', lines: ['123 Logistics Avenue', 'Industrial Zone B, Suite 404', 'Riyadh, Saudi Arabia'] },
  { icon: Phone, title: 'Phone Number', lines: ['+966 11 555 1234 (Main)', '+966 50 555 5678 (Support)'] },
  { icon: Mail, title: 'Email Address', lines: ['info@almoneflogistics.sa', 'sales@almoneflogistics.sa'] },
  { icon: Clock, title: 'Office Hours', lines: ['Sunday - Thursday: 8:00 AM - 6:00 PM', 'Friday: Closed', 'Saturday: 10:00 AM - 2:00 PM'] },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">Get In Touch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We&apos;re here to help with all your logistics and vehicle trade inquiries. Reach out to us through any of the channels below.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 mb-16 md:mb-24">
        <Card className="shadow-xl p-2 md:p-4">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-foreground mb-4">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-8">
            {contactDetails.map(detail => (
                 <Card key={detail.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                        <div className="p-3 bg-primary/10 rounded-md mt-1">
                            <detail.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-semibold text-foreground">{detail.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pl-16">
                        {detail.lines.map(line => (
                            <p key={line} className="text-muted-foreground">{line}</p>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>

      <section id="location-map">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          Find Our Office
        </h2>
        <MapEmbed />
      </section>
    </div>
  );
}

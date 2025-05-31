
import ContactForm from '@/components/contact-form';
import MapEmbed from '@/components/map-embed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Printer } from 'lucide-react'; 

const contactDetails = [
  { icon: MapPin, title: 'عنوان المكتب', lines: ['البدائع، القصيم', 'المملكة العربية السعودية'] },
  { icon: Phone, title: 'الهاتف', lines: ['3212000'] },
  { icon: Printer, title: 'رقم الفاكس', lines: ['3213000'] },
  { icon: Mail, title: 'البريد الإلكتروني', lines: ['info@almonef-transport.com'] },
  { icon: Clock, title: 'ساعات العمل', lines: ['الأحد - الخميس: 8:00 صباحًا - 6:00 مساءً', 'الجمعة: مغلق', 'السبت: 10:00 صباحًا - 2:00 ظهرًا (بموعد مسبق)'] },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">تواصل معنا</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          نحن على استعداد لمساعدتك في احتياجات التجارة والنقل الخاصة بك. تواصل معنا عبر الهاتف أو البريد الإلكتروني أو قم بزيارة مكتبنا في البدائع.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 mb-16 md:mb-24">
        <Card className="shadow-xl p-2 md:p-4">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-foreground mb-4">أرسل لنا رسالة</CardTitle>
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
                    <CardContent className="pr-16"> {/* Changed pl-16 to pr-16 for RTL */}
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
          اعثر على مكتبنا في البدائع، القصيم
        </h2>
        <MapEmbed />
      </section>
    </div>
  );
}

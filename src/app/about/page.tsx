
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Target, Eye, Info, Phone, Printer, MapPin } from 'lucide-react';

// Moved definition before usage.
const Users = Building2; 

const companyCredentials = [
  { icon: Info, name: 'رقم السجل التجاري', value: '112990003463' },
  { icon: Users, name: 'عضوية الغرفة التجارية', value: '121800' },
  { icon: Phone, name: 'الهاتف', value: '3212000' },
  { icon: Printer, name: 'الفاكس', value: '3213000' },
  { icon: MapPin, name: 'العنوان', value: 'البدائع، القصيم، المملكة العربية السعودية' },
];


export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">عن شركة عبدالعزيز المنيف وأولاده</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          رواد في مجال الخدمات اللوجستية وتجارة المركبات في المملكة العربية السعودية، ملتزمون بالنزاهة والتميز.
        </p>
      </header>

      <section id="company-overview" className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450/D4E7F0/29ABE2"
              alt="فريق أو عمليات شركة المنيف وأولاده"
              layout="fill"
              objectFit="cover"
              data-ai-hint="logistics company team"
              className="transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 font-headline flex items-center gap-3">
              <Building2 className="h-10 w-10 text-primary" /> شركتنا
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              تعتبر شركة عبدالعزيز المنيف وأولاده للتجارة والنقل اسمًا رائدًا في صناعة الخدمات اللوجستية والتجارة، وتعمل من البدائع، القصيم، المملكة العربية السعودية. مع سنوات من الخبرة، نحن متخصصون في شراء وبيع وتأجير المقطورات والمركبات التجارية، ونقدم خدمات لوجستية يمكن الاعتماد عليها في جميع أنحاء المملكة.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              أساسنا مبني على الثقة والكفاءة والفهم العميق للسوق السعودي. نسعى جاهدين لتمكين الشركات من خلال توفير حلول سلسة وموثوقة مصممة خصيصًا لتلبية احتياجاتهم الفريدة.
            </p>
          </div>
        </div>
      </section>

      <section id="mission-vision" className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Target className="h-12 w-12 text-primary" />
              <CardTitle className="text-3xl font-headline">مهمتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                أن نكون المزود الأول لحلول التجارة والنقل الشاملة في المملكة العربية السعودية، وتقديم قيمة استثنائية من خلال الابتكار والموثوقية والنهج الذي يركز على العميل. نهدف إلى تسهيل النمو الاقتصادي من خلال ربط الشركات وتمكين الحركة الفعالة للبضائع.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Eye className="h-12 w-12 text-primary" />
              <CardTitle className="text-3xl font-headline">رؤيتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                أن نكون الرائد بلا منازع في قطاع الخدمات اللوجستية وتجارة المركبات في المملكة العربية السعودية، معترف بنا لالتزامنا الثابت بالجودة والنزاهة والممارسات المستدامة، مع تعزيز الشراكات طويلة الأجل والمساهمة في ازدهار المملكة.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="credentials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          وثائق الشركة
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

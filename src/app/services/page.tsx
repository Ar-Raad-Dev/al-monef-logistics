
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Ship, Plane, Warehouse, Package, Car, Handshake, Award } from 'lucide-react';
import FleetCard from '@/components/fleet-card';

const fleetItems = [
  { name: 'مقطورات مسطحة', description: 'متعددة الاستخدامات لمختلف أنواع البضائع، متاحة للبيع والتأجير.', imageUrl: 'https://placehold.co/600x400/29ABE2/FFFFFF', icon: Truck, imageHint: "flatbed trailer" },
  { name: 'مقطورات ذات جوانب ستائرية', description: 'سهلة التحميل والتفريغ، مثالية للبضائع المعبأة على منصات نقالة.', imageUrl: 'https://placehold.co/600x400/D4E7F0/29ABE2', icon: Truck, imageHint: "curtain side trailer" },
  { name: 'مقطورات مبردة', description: 'نقل يمكن التحكم في درجة حرارته للبضائع الحساسة.', imageUrl: 'https://placehold.co/600x400/29ABE2/FFFFFF', icon: Truck, imageHint: "refrigerated trailer" },
  { name: 'سيارات وشاحنات تجارية', description: 'مركبات موثوقة لعمليات الأعمال والبضائع الصغيرة.', imageUrl: 'https://placehold.co/600x400/D4E7F0/29ABE2', icon: Car, imageHint: "commercial van" },
];

const logisticsSolutions = [
    { icon: Package, title: "شحن البضائع", description: "خدمات شحن جوي وبحري وبري فعالة وموثوقة عالميًا." },
    { icon: Warehouse, title: "التخزين والتوزيع", description: "مرافق تخزين آمنة وشبكات توزيع مبسطة." },
    { icon: Truck, title: "إدارة سلسلة التوريد", description: "تحسين سلسلة التوريد من البداية إلى النهاية لتعزيز الكفاءة وتوفير التكاليف." },
    { icon: Award, title: "التخليص الجمركي", description: "معالجة خبيرة للوثائق الجمركية لتجارة دولية ومحلية سلسة." }
];

const currentPartnerships = [
    { name: "الوطنية للدواجن (الهفوف)", description: "شريك لوجستي رئيسي لتوزيع الدواجن." },
    { name: "مصنع مياه محامل المدينة", description: "نقل المياه المعبأة عبر المناطق." },
    { name: "مصنع مياه ميراد", description: "خدمات توصيل موثوقة لمنتجات المياه." }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">خدماتنا المتخصصة</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          حلول شاملة لتجارة المركبات، والتأجير، والخدمات اللوجستية والنقل على مستوى المملكة.
        </p>
      </header>

      <section id="vehicle-trade" className="mb-16 md:mb-24 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 font-headline flex items-center gap-3">
              <Car className="h-10 w-10 text-primary" /> خدمات تجارة المركبات
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              نحن متخصصون في بيع وشراء المقطورات والشاحنات والمركبات التجارية الأخرى الجديدة والمستعملة عالية الجودة. يتم اختيار مخزوننا بعناية لتلبية الاحتياجات التشغيلية المتنوعة.
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2 mb-4 mr-5"> {/* Added mr-5 for RTL list marker */}
              <li>مجموعة واسعة من المقطورات (مسطحة، مبردة، ذات جوانب ستائرية، إلخ.)</li>
              <li>توريد مركبات وسيارات تجارية محددة</li>
              <li>عمليات فحص وتقييم شفافة</li>
              <li>خيارات تأجير مرنة متاحة للمقطورات والمركبات</li>
            </ul>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450/29ABE2/FFFFFF"
              alt="مقطورات ومركبات تجارية للبيع"
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
            <Package className="h-10 w-10 text-primary" /> حلول الخدمات اللوجستية والنقل
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            نقدم نقلًا موثوقًا للبضائع عبر المملكة العربية السعودية، مما يضمن التسليم الآمن وفي الوقت المناسب. تتعامل شبكتنا الواسعة وفريقنا المتمرس مع التحديات اللوجستية المتنوعة.
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
            <Handshake className="h-8 w-8 text-primary" /> الشراكات الرئيسية الحالية
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
          أسطولنا الحديث والمتنوع
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          اكتشف مجموعتنا من المقطورات والمركبات. نقدم خيارات للبيع والتأجير، ونستخدمها في عمليات النقل الواسعة لدينا. يمكن أن تساعدك فلاتر "للبيع"، "قيد الاستخدام"، "مؤجرة" في تضييق نطاق البحث (الميزة قادمة قريبًا).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fleetItems.map((item) => (
            <FleetCard key={item.name} {...item} />
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-12 text-lg">
          يتم صيانة أسطولنا المتنوع بدقة وتجهيزه لضمان النقل الآمن والفعال.
        </p>
      </section>
    </div>
  );
}

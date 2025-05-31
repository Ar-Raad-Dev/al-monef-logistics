
import HeroSection from '@/components/hero-section';
import StatCard from '@/components/stat-card';
import ServiceCard from '@/components/service-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Globe, Users, Truck, Ship, Plane, PackageCheck, HardHat, UserCheck, CalendarDays, ShoppingBag, Building, ArrowLeft } from 'lucide-react'; // Added ArrowLeft for RTL "Learn More"

const stats = [
  { icon: CalendarDays, title: 'سنوات في العمل', value: '+15', description: 'خبرة واسعة في الخدمات اللوجستية والتجارة.' },
  { icon: Truck, title: 'عدد المقطورات', value: '+200', description: 'أسطول كبير ومتنوع لتلبية مختلف الاحتياجات.' },
  { icon: Building, title: 'الشركات التي خدمناها', value: '+300', description: 'موثوق به من قبل الشركات في جميع أنحاء المملكة.' },
  { icon: ShoppingBag, title: 'المقطورات المباعة', value: '+1000', description: 'ربط المشترين والبائعين بفعالية.' },
];

const services = [
  { icon: Truck, title: 'خدمات تجارة المركبات', description: 'بيع وشراء وتأجير المقطورات والمركبات التجارية عالية الجودة.', link: '/services#vehicle-trade' },
  { icon: Ship, title: 'الخدمات اللوجستية والنقل', description: 'نقل موثوق للبضائع عبر المملكة العربية السعودية مع شراكات رئيسية.', link: '/services#logistics' },
  { icon: Plane, title: 'معرض الأسطول', description: 'اكتشف أسطولنا الحديث، المتاح للبيع أو التأجير أو الاستخدام التشغيلي.', link: '/services#fleet' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <section id="company-intro" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">
              شريكك في التجارة والنقل بالمملكة العربية السعودية
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              تعتبر شركة عبدالعزيز المنيف وأولاده للتجارة والنقل اسمًا رائدًا في صناعة الخدمات اللوجستية والتجارة، وتعمل من البدائع، القصيم. نحن متخصصون في المركبات التجارية ونقدم خدمات لوجستية يمكن الاعتماد عليها في جميع أنحاء المملكة.
            </p>
            <Link href="/about">
              <Button size="lg" variant="default" className="transition-transform hover:scale-105 group">
                اكتشف قصتنا <Briefcase className="mr-2 h-5 w-5" /> {/* Changed ml-2 to mr-2 for RTL */}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="quick-stats" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
            تأثيرنا بالأرقام
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
            الخدمات الرئيسية التي نقدمها
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

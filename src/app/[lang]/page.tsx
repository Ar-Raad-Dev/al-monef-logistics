
import HeroSection from '@/components/hero-section';
import StatCard from '@/components/stat-card';
import ServiceCard from '@/components/service-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, CalendarDays, ShoppingBag, Building, Truck, Ship, Plane, ArrowLeft, ArrowRight } from 'lucide-react';
import { getDictionary, Locale } from '@/lib/dictionaries';

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  const stats = [
    { icon: CalendarDays, valueKey: '+15', titleKey: 'yearsInBusiness', descriptionKey: 'yearsInBusiness' },
    { icon: Truck, valueKey: '+200', titleKey: 'trailersCount', descriptionKey: 'trailersCount' },
    { icon: Building, valueKey: '+300', titleKey: 'companiesServed', descriptionKey: 'companiesServed' },
    { icon: ShoppingBag, valueKey: '+1000', titleKey: 'trailersSold', descriptionKey: 'trailersSold' },
  ];

  const services = [
    { icon: Truck, titleKey: 'vehicleTrade', descriptionKey: 'vehicleTrade', link: '/services#vehicle-trade' },
    { icon: Ship, titleKey: 'logistics', descriptionKey: 'logistics', link: '/services#logistics' },
    { icon: Plane, titleKey: 'fleetShowcase', descriptionKey: 'fleetShowcase', link: '/services#fleet' },
  ];

  const LearnMoreIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col">
      <HeroSection dictionary={dictionary.hero} lang={lang} />

      <section id="company-intro" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">
              {dictionary.companyIntro.heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {dictionary.companyIntro.paragraph}
            </p>
            <Link href={`/${lang}/about`}>
              <Button size="lg" variant="default" className="transition-transform hover:scale-105 group">
                {dictionary.companyIntro.discoverStory} 
                <Briefcase className={lang === 'ar' ? "mr-2 h-5 w-5" : "ml-2 h-5 w-5"} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="quick-stats" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
            {dictionary.quickStats.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard 
                key={stat.titleKey} 
                icon={stat.icon} 
                value={stat.valueKey}
                title={dictionary.quickStats.stats[stat.titleKey as keyof typeof dictionary.quickStats.stats].title}
                description={dictionary.quickStats.stats[stat.descriptionKey as keyof typeof dictionary.quickStats.stats].description}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="service-previews" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
            {dictionary.keyServices.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard 
                key={service.titleKey} 
                icon={service.icon} 
                title={dictionary.keyServices.services[service.titleKey as keyof typeof dictionary.keyServices.services].title}
                description={dictionary.keyServices.services[service.descriptionKey as keyof typeof dictionary.keyServices.services].description}
                link={`/${lang}${service.link}`}
                learnMoreText={dictionary.keyServices.learnMore}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

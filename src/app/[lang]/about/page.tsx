
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Target, Eye, Info, Phone, Printer, MapPin } from 'lucide-react';
import type { Locale } from '@/lib/dictionaries';
import { getDictionary } from '@/lib/dictionaries';
import type { Metadata } from 'next';

const iconMap = {
  crNumber: Info,
  chamberMembership: Building2,
  phone: Phone,
  fax: Printer,
  address: MapPin,
};

export async function generateMetadata(
  props: any
): Promise<Metadata> {
  const lang = props.params?.lang as Locale || 'ar';
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.aboutPage.metaTitle,
    description: dictionary.aboutPage.metaDescription,
  };
}

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'ar'];
  return locales.map((lang) => ({
    lang,
  }));
}

export default async function AboutPage(props: any) {
  const lang = props.params?.lang as Locale || 'ar';
  const dictionary = await getDictionary(lang);
  const d = dictionary.aboutPage;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">{d.headerTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {d.headerSubtitle}
        </p>
      </header>

      <section id="company-overview" className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/about/company-overview.png"
              alt={d.companyOverview.imageAlt}
              data-ai-hint="office building"
              fill
              style={{ objectFit: "cover" }}
              className="transform hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 font-headline flex items-center gap-3">
              <Building2 className="h-10 w-10 text-primary" /> {d.companyOverview.heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              {d.companyOverview.paragraph1}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {d.companyOverview.paragraph2}
            </p>
          </div>
        </div>
      </section>

      <section id="mission-vision" className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Target className="h-12 w-12 text-primary" />
              <CardTitle className="text-3xl font-headline">{d.missionVision.missionHeading}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {d.missionVision.missionText}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Eye className="h-12 w-12 text-primary" />
              <CardTitle className="text-3xl font-headline">{d.missionVision.visionHeading}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {d.missionVision.visionText}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="credentials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline">
          {d.credentials.heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {d.credentials.items.map((cred) => {
            const IconComponent = iconMap[cred.nameKey as keyof typeof iconMap] || Info;
            return (
              <Card key={cred.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{cred.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-md text-muted-foreground">{cred.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

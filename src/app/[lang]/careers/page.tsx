
import CareerApplicationForm from '@/components/career-application-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, UserPlus, ListChecks } from 'lucide-react';
import type { Locale } from '@/lib/dictionaries';
import { getDictionary } from '@/lib/dictionaries';
import type { Metadata } from 'next';

// Define an explicit interface for the page props
interface CareersPageProps {
  params: { lang: Locale };
}

export async function generateMetadata({ params }: CareersPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.careersPage.metaTitle,
    description: dictionary.careersPage.metaDescription,
  };
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const d = dictionary.careersPage;

  const availablePositions = d.currentOpeningsSection.openings.map(job => job.title);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline flex items-center justify-center gap-3">
          <Briefcase className="h-12 w-12" /> {d.headerTitle}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {d.headerSubtitle}
        </p>
      </header>

      <section id="current-openings" className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-headline flex items-center justify-center gap-3">
          <ListChecks className="h-10 w-10 text-primary" /> {d.currentOpeningsSection.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {d.currentOpeningsSection.openings.map((job) => (
            <Card key={job.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{job.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8 text-lg">
          {d.currentOpeningsSection.checkBackNote}
        </p>
      </section>

      <section id="application-form">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline flex items-center justify-center gap-3">
          <UserPlus className="h-10 w-10" /> {d.applicationFormSection.heading}
        </h2>
        <Card className="max-w-2xl mx-auto shadow-xl p-2 md:p-4">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-foreground mb-2">{d.applicationFormSection.cardTitle}</CardTitle>
            <CardDescription>
              {d.applicationFormSection.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CareerApplicationForm 
              availablePositions={availablePositions} 
              dictionary={d.form}
              lang={lang}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

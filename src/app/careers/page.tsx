
import CareerApplicationForm from '@/components/career-application-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, UserPlus, ListChecks } from 'lucide-react';

const currentOpenings = [
  { title: 'Driver – Heavy Vehicles', description: 'Experienced heavy vehicle drivers needed for routes across KSA. Valid license and good record essential.' },
  { title: 'Office Accountant', description: 'Detail-oriented accountant to manage financial records, payroll, and reporting. Relevant degree and experience required.' },
  { title: 'Logistics Coordinator', description: 'Organized professional to plan routes, coordinate drivers, and ensure timely deliveries. Strong communication skills needed.' },
];

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline flex items-center justify-center gap-3">
          <Briefcase className="h-12 w-12" /> Careers at AlMonef & Sons
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join our growing team! We are always looking for dedicated drivers, office staff, and logistics professionals to contribute to our success.
        </p>
      </header>

      <section id="current-openings" className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-headline flex items-center justify-center gap-3">
          <ListChecks className="h-10 w-10 text-primary" /> Current Openings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentOpenings.map((job) => (
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
          New positions are added regularly. Check back often or submit a general application below.
        </p>
      </section>

      <section id="application-form">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline flex items-center justify-center gap-3">
          <UserPlus className="h-10 w-10" /> Apply Now
        </h2>
        <Card className="max-w-2xl mx-auto shadow-xl p-2 md:p-4">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-foreground mb-2">Submit Your Application</CardTitle>
            <CardDescription>
              Interested in a role? Fill out the form below. We will contact you if your profile matches our requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CareerApplicationForm availablePositions={currentOpenings.map(job => job.title)} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}


import CareerApplicationForm from '@/components/career-application-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, UserPlus, ListChecks } from 'lucide-react';

const currentOpenings = [
  { title: 'سائق - مركبات ثقيلة', description: 'مطلوب سائقون ذوو خبرة للمركبات الثقيلة لطرق عبر المملكة العربية السعودية. رخصة سارية وسجل جيد ضروريان.' },
  { title: 'محاسب مكتبي', description: 'محاسب يهتم بالتفاصيل لإدارة السجلات المالية وكشوف المرتبات والتقارير. درجة علمية وخبرة ذات صلة مطلوبة.' },
  { title: 'منسق لوجستيات', description: 'محترف منظم لتخطيط الطرق وتنسيق السائقين وضمان التسليم في الوقت المناسب. مهارات اتصال قوية مطلوبة.' },
];

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline flex items-center justify-center gap-3">
          <Briefcase className="h-12 w-12" /> وظائف في المنيف وأولاده
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          انضم إلى فريقنا المتنامي! نحن نبحث دائمًا عن سائقين متفانين وموظفي مكاتب ومتخصصين في الخدمات اللوجستية للمساهمة في نجاحنا.
        </p>
      </header>

      <section id="current-openings" className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-headline flex items-center justify-center gap-3">
          <ListChecks className="h-10 w-10 text-primary" /> الوظائف الشاغرة الحالية
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
          تضاف وظائف جديدة بانتظام. تحقق مرة أخرى كثيرًا أو قدم طلبًا عامًا أدناه.
        </p>
      </section>

      <section id="application-form">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline flex items-center justify-center gap-3">
          <UserPlus className="h-10 w-10" /> قدم الآن
        </h2>
        <Card className="max-w-2xl mx-auto shadow-xl p-2 md:p-4">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-foreground mb-2">أرسل طلبك</CardTitle>
            <CardDescription>
              هل أنت مهتم بوظيفة؟ املأ النموذج أدناه. سنتصل بك إذا كان ملفك الشخصي يتوافق مع متطلباتنا.
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

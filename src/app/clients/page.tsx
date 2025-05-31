
import Image from 'next/image';
import TestimonialCard from '@/components/testimonial-card';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Quote } from 'lucide-react';

const partners = [
  { name: 'الوطنية للدواجن', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=AlWatania', imageHint: "company logo" },
  { name: 'مياه محامل المدينة', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=Mahamal', imageHint: "company logo" },
  { name: 'مصنع مياه ميراد', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=MiradWater', imageHint: "company logo" },
  { name: 'كبار تجار التجزئة في السعودية', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=RetailKSA', imageHint: "company logo" },
  { name: 'موزعو الأغذية والمشروبات', logoUrl: 'https://placehold.co/150x80/D4E7F0/29ABE2?text=F%26BDist', imageHint: "company logo" },
  { name: 'رواد قطاع البناء', logoUrl: 'https://placehold.co/150x80/29ABE2/FFFFFF?text=Construction', imageHint: "company logo" },
];

const testimonials = [
  {
    name: 'مدير الخدمات اللوجستية',
    company: 'الوطنية للدواجن',
    testimonial: 'تقدم شركة المنيف وأولاده باستمرار نقلًا موثوقًا وفي الوقت المناسب لبضائعنا إلى الهفوف. احترافهم هو مفتاح سلسلة التوريد لدينا.',
    avatarUrl: 'https://placehold.co/100x100/D4E7F0/29ABE2?text=LM',
    imageHint: 'manager portrait',
    rating: 5,
  },
  {
    name: 'رئيس قسم المشتريات',
    company: 'مياه محامل المدينة',
    testimonial: 'خيارات تأجير المقطورات لديهم مرنة ومركباتهم من الدرجة الأولى. لقد كانت شركة المنيف شريكًا قيمًا لاحتياجات التوزيع لدينا.',
    avatarUrl: 'https://placehold.co/100x100/29ABE2/FFFFFF?text=PH',
    imageHint: 'person face',
    rating: 5,
  },
  {
    name: 'مدير العمليات',
    company: 'عميل مجهول في قطاع السلع الاستهلاكية',
    testimonial: 'نحن نثق في شركة المنيف وأولاده لشبكتهم الواسعة في جميع أنحاء المملكة العربية السعودية. إنهم يتعاملون مع متطلباتنا اللوجستية المتنوعة بعناية فائقة.',
    avatarUrl: 'https://placehold.co/100x100/D4E7F0/29ABE2?text=OD',
    imageHint: 'director photo',
    rating: 4,
  },
];

export default function ClientsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">عملاؤنا الكرام</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          بناء شراكات قوية ودائمة هو جوهر ما نقوم به. نفخر بخدمة الرواد في مختلف الصناعات.
        </p>
      </header>

      <section id="key-partners" className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-headline flex items-center justify-center gap-3">
           <Handshake className="h-10 w-10 text-primary"/> شركاؤنا الرئيسيون
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <Card key={partner.name} className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
              <CardContent className="flex justify-center items-center h-24">
                <Image 
                    src={partner.logoUrl} 
                    alt={`شعار ${partner.name}`} 
                    width={120} 
                    height={60} 
                    objectFit="contain"
                    data-ai-hint={partner.imageHint}
                />
              </CardContent>
            </Card>
          ))}
        </div>
         <p className="text-center text-muted-foreground mt-8 text-lg">
          موثوق به من قبل الرواد في مجال الأغذية والمشروبات، وتجارة التجزئة، والخدمات اللوجستية الصناعية في جميع أنحاء المملكة العربية السعودية.
        </p>
      </section>

      <section id="testimonials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-headline flex items-center justify-center gap-3">
          {/* For RTL, the quote icon might need to be mirrored if it's directional. Assuming lucide-react handles it or it's a neutral icon. */}
          <Quote className="h-10 w-10 text-primary transform scale-x-[-1]"/> شهادات العملاء 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
}

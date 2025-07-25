
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Locale, Translations } from '@/lib/dictionaries';

interface HeroSectionProps {
  dictionary: Translations['hero'];
  lang: Locale;
}

export default function HeroSection({ dictionary, lang }: HeroSectionProps) {
  return (
    <section className="relative h-[calc(80vh)] md:h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
        // Poster image for while video loads or if it fails
        // poster="/images/hero/hero-poster.jpg" 
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        {lang === 'ar' ? 'متصفحك لا يدعم عرض الفيديو.' : 'Your browser does not support the video tag.'}
      </video>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4 md:p-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-headline leading-tight">
          {dictionary.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl">
          {dictionary.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={`/${lang}/services`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg transition-transform hover:scale-105">
              {dictionary.exploreServices}
            </Button>
          </Link>
          <Link href={`/${lang}/contact`}>
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-primary/10 border-primary-foreground text-primary-foreground hover:text-primary-foreground px-8 py-3 text-lg transition-transform hover:scale-105">
              {dictionary.getInTouch}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

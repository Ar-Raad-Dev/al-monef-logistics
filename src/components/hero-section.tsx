
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative h-[calc(80vh)] md:h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      <Image 
        src="https://placehold.co/1920x1080/D4E7F0/29ABE2" // Placeholder BG/FG colors match theme
        alt="Global logistics network" 
        layout="fill" 
        objectFit="cover" 
        className="z-0"
        data-ai-hint="logistics shipping"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4 md:p-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-headline leading-tight">
          Abdul Aziz AlMonef Logistics Hub
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl">
          Your trusted partner in global logistics and vehicle trade solutions, delivering excellence and reliability.
        </p>
        <Link href="/services">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg transition-transform hover:scale-105">
            Explore Our Services
          </Button>
        </Link>
      </div>
    </section>
  );
}

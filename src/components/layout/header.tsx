
"use client";

import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Languages } from 'lucide-react'; 
import { cn } from '@/lib/utils';
import type { Locale, Translations } from '@/lib/dictionaries';

interface HeaderProps {
  lang: Locale;
  dictionary: Translations['navigation'];
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const pathname = usePathname(); 

  const navItemsConfig = [
    { href: '/', labelKey: 'home' as keyof Translations['navigation'] },
    { href: '/about', labelKey: 'about' as keyof Translations['navigation'] },
    { href: '/services', labelKey: 'services' as keyof Translations['navigation'] },
    { href: '/clients', labelKey: 'clients' as keyof Translations['navigation'] },
    { href: '/careers', labelKey: 'careers' as keyof Translations['navigation'] },
    { href: '/contact', labelKey: 'contact' as keyof Translations['navigation'] },
  ];

  const navItems = navItemsConfig.map(item => ({
    href: item.href === '/' ? `/${lang}` : `/${lang}${item.href}`,
    label: dictionary[item.labelKey]
  }));

  const otherLang = lang === 'en' ? 'ar' : 'en';
  let switchLangPath = '';

  const basePathSegment = `/${lang}`;
  if (pathname === basePathSegment || pathname === `${basePathSegment}/`) { 
    switchLangPath = `/${otherLang}`;
  } else {
    const routeSegment = pathname.substring(basePathSegment.length); 
    switchLangPath = `/${otherLang}${routeSegment || ''}`; 
  }
  
  if (switchLangPath !== `/${otherLang}` && switchLangPath.endsWith('/')) {
    switchLangPath = switchLangPath.slice(0, -1);
  }
  
  if (switchLangPath === `/${otherLang}/`) {
      switchLangPath = `/${otherLang}`;
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image 
            src="/images/company-logo.png" 
            alt="Company Logo" 
            width={32} 
            height={32} 
            className="rounded-full" // Ensures circular display if needed and for consistency
          />
          <span className="font-bold text-lg font-headline">
            {lang === 'ar' ? 'شركة عبدالعزيز محمد المنيف وأولاده' : 'Abdul Aziz Mohammad Al Monef & Sons Company'}
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                 (pathname === item.href || pathname === `${item.href}/`) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={switchLangPath} passHref>
            <Button variant="ghost" size="sm" className="text-sm">
              <Languages className={lang === 'ar' ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
              {dictionary.switchLanguage}
            </Button>
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{lang === 'ar' ? 'فتح قائمة التنقل' : 'Open navigation menu'}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={lang === 'ar' ? 'right' : 'left'}>
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href={`/${lang}`} className="flex items-center gap-2 text-lg font-semibold mb-4">
                     <Image 
                        src="/images/company-logo.png" 
                        alt="Company Logo" 
                        width={32} 
                        height={32} 
                        className="rounded-full"
                      />
                    <span className="font-headline">
                      {lang === 'ar' ? 'شركة عبدالعزيز محمد المنيف وأولاده' : 'Abdul Aziz Mohammad Al Monef & Sons Company'}
                    </span>
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "transition-colors hover:text-primary",
                        (pathname === item.href || pathname === `${item.href}/`) ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

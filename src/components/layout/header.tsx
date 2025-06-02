"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Package2, Languages } from 'lucide-react'; 
import { cn } from '@/lib/utils';
import type { Locale, Translations } from '@/lib/dictionaries';

interface HeaderProps {
  lang: Locale;
  dictionary: Translations['navigation'];
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const pathname = usePathname(); // e.g., /en/about or /ar

  const navItemsConfig = [
    { href: '/', labelKey: 'home' as keyof Translations['navigation'] },
    { href: '/about', labelKey: 'about' as keyof Translations['navigation'] },
    { href: '/services', labelKey: 'services' as keyof Translations['navigation'] },
    { href: '/clients', labelKey: 'clients' as keyof Translations['navigation'] },
    { href: '/careers', labelKey: 'careers' as keyof Translations['navigation'] },
    { href: '/contact', labelKey: 'contact' as keyof Translations['navigation'] },
  ];

  const navItems = navItemsConfig.map(item => ({
    // Ensure href for home is just /en or /ar, not /en/ or /ar/
    href: item.href === '/' ? `/${lang}` : `/${lang}${item.href}`,
    label: dictionary[item.labelKey]
  }));

  const otherLang = lang === 'en' ? 'ar' : 'en';
  let switchLangPath = '';

  // Current path is like /en or /en/about
  // We want to switch to /ar or /ar/about
  const basePathSegment = `/${lang}`;
  if (pathname === basePathSegment || pathname === `${basePathSegment}/`) { // Homepage
    switchLangPath = `/${otherLang}`;
  } else {
    const routeSegment = pathname.substring(basePathSegment.length); // e.g., /about or "" if pathname was /en/
    switchLangPath = `/${otherLang}${routeSegment || ''}`; // Append routeSegment, ensure it's not double slashed
  }
  // Normalize: ensure no trailing slash unless it's just the language root.
  if (switchLangPath !== `/${otherLang}` && switchLangPath.endsWith('/')) {
    switchLangPath = switchLangPath.slice(0, -1);
  }
  // Ensure homepage is just /en or /ar
  if (switchLangPath === `/${otherLang}/`) {
      switchLangPath = `/${otherLang}`;
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Package2 className="h-6 w-6 text-primary" />
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
                // Check current pathname against item.href. Also handle if item.href is /en and pathname is /en/") ? "text-primary" : "text-muted-foreground"
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
                    <Package2 className="h-6 w-6 text-primary" />
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

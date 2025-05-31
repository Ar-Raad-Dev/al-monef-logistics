
import Link from 'next/link';
import { Linkedin, Facebook, MessageCircle } from 'lucide-react'; 
import type { Locale, Translations } from '@/lib/dictionaries';

interface FooterProps {
  lang: Locale;
  dictionary: Translations['footer'];
}

export default function Footer({ lang, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const crNumberValue = "112990003463";
  const chamberNumberValue = "121800";

  const footerLinks = [
    { href: '/about', labelKey: 'about' as keyof Translations['navigation'] },
    { href: '/services', labelKey: 'services' as keyof Translations['navigation'] },
    { href: '/careers', labelKey: 'careers' as keyof Translations['navigation'] },
    { href: '/contact', labelKey: 'contact' as keyof Translations['navigation'] },
  ];

  // Assuming dictionary.navigation is available or passed down for these specific keys if needed
  // For simplicity, directly using keys from footer dictionary or hardcoding for now.
  // Better approach would be to pass full navigation dictionary if labels are shared.

  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto px-4 text-muted-foreground text-sm">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ${lang === 'ar' ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
          <div>
            <h3 className="font-semibold text-foreground mb-2">{dictionary.quickLinks}</h3>
            <ul className="space-y-1">
              <li><Link href={`/${lang}/about`} className="hover:text-primary">{lang === 'ar' ? 'من نحن' : 'About Us'}</Link></li>
              <li><Link href={`/${lang}/services`} className="hover:text-primary">{lang === 'ar' ? 'خدماتنا' : 'Services'}</Link></li>
              <li><Link href={`/${lang}/careers`} className="hover:text-primary">{lang === 'ar' ? 'الوظائف' : 'Careers'}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-primary">{lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">{dictionary.legalInfo}</h3>
            <p>{dictionary.crNumber}: {crNumberValue}</p>
            <p>{dictionary.chamberNumber}: {chamberNumberValue}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">{dictionary.connectWithUs}</h3>
            <div className={`flex ${lang === 'ar' ? 'justify-center md:justify-end space-x-reverse space-x-4' : 'justify-center md:justify-start space-x-4'}`}>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Business" className="hover:text-primary">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 pt-6 text-center">
          <p>&copy; {currentYear} {dictionary.copyright}</p>
          <p className="mt-1">{dictionary.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

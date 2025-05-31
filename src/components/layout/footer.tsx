
import Link from 'next/link';
import { Linkedin, Facebook, MessageCircle } from 'lucide-react'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const crNumber = "112990003463";
  const chamberNumber = "121800";

  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto px-4 text-muted-foreground text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center md:text-right"> {/* Adjusted text alignment for RTL */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">روابط سريعة</h3>
            <ul className="space-y-1">
              <li><Link href="/about" className="hover:text-primary">من نحن</Link></li>
              <li><Link href="/services" className="hover:text-primary">خدماتنا</Link></li>
              <li><Link href="/careers" className="hover:text-primary">الوظائف</Link></li>
              <li><Link href="/contact" className="hover:text-primary">اتصل بنا</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">المعلومات القانونية</h3>
            <p>رقم السجل التجاري: {crNumber}</p>
            <p>رقم عضوية الغرفة التجارية: {chamberNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">تواصل معنا</h3>
            <div className="flex justify-center md:justify-end space-x-4"> {/* Adjusted justification for RTL */}
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
          <p>&copy; {currentYear} عبدالعزيز المنيف وأولاده للتجارة والنقل. جميع الحقوق محفوظة.</p>
          <p className="mt-1">نقود التجارة إلى الأمام عبر المملكة العربية السعودية.</p>
        </div>
      </div>
    </footer>
  );
}

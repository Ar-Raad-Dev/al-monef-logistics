
import Link from 'next/link';
import { Linkedin, Facebook, MessageCircle } from 'lucide-react'; // Using MessageCircle for WhatsApp

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const crNumber = "112990003463";
  const chamberNumber = "121800";

  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto px-4 text-muted-foreground text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Legal Information</h3>
            <p>CR Number: {crNumber}</p>
            <p>Chamber of Commerce: {chamberNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
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
          <p>&copy; {currentYear} Abdul Aziz AlMonef and Sons Trade and Transport. All rights reserved.</p>
          <p className="mt-1">Driving Trade Forward Across Saudi Arabia.</p>
        </div>
      </div>
    </footer>
  );
}

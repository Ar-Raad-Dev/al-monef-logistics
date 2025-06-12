
import Link from 'next/link';
import type { Locale } from '@/lib/dictionaries';
// Note: The original non-lang /contact/page.tsx was importing MapEmbed
// from a broken src/components/map-embed.tsx.
// The [lang]/contact/page.tsx uses GoogleMapComponent correctly.
// This restored page is minimal.

export default function ContactPage() {
  const defaultLang: Locale = 'ar'; // Or your preferred default
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">This page is a placeholder. Please use the language-specific version of this page for the full contact form and map.</p>
      <Link href={`/${defaultLang}/contact`} className="text-primary hover:underline">
        Go to Arabic Contact Page
      </Link>
      <br />
      <Link href={`/en/contact`} className="text-primary hover:underline">
        Go to English Contact Page
      </Link>
    </div>
  );
}


import Link from 'next/link';
import type { Locale } from '@/lib/dictionaries';

// This page likely shouldn't be accessed directly if using [lang] routes.
// It's modified to be a simple placeholder to fix build errors.
// The main content is in /src/app/[lang]/careers/page.tsx

export default function CareersPage() {
  const defaultLang: Locale = 'ar'; // Or your preferred default
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Careers</h1>
      <p className="mb-4">This page is a placeholder. Please use the language-specific version of this page for job listings and applications.</p>
      <Link href={`/${defaultLang}/careers`} className="text-primary hover:underline">
        Go to Arabic Careers Page
      </Link>
      <br />
      <Link href={`/en/careers`} className="text-primary hover:underline">
        Go to English Careers Page
      </Link>
    </div>
  );
}

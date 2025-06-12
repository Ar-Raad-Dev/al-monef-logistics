
import Link from 'next/link';
import type { Locale } from '@/lib/dictionaries';

// This page likely shouldn't be accessed directly if using [lang] routes.
// It's restored to a basic component to fix build errors.
// The main content is in /src/app/[lang]/about/page.tsx

export default function AboutPage() {
  const defaultLang: Locale = 'ar'; // Or your preferred default
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="mb-4">This page is a placeholder. Please use the language-specific version of this page.</p>
      <Link href={`/${defaultLang}/about`} className="text-primary hover:underline">
        Go to Arabic About Page
      </Link>
      <br />
      <Link href={`/en/about`} className="text-primary hover:underline">
        Go to English About Page
      </Link>
    </div>
  );
}

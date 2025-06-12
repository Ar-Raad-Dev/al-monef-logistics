
import Link from 'next/link';
import type { Locale } from '@/lib/dictionaries';

// This page likely shouldn't be accessed directly if using [lang] routes.
// It's restored to a basic component to fix build errors.
// The main content is in /src/app/[lang]/clients/page.tsx

export default function ClientsPage() {
  const defaultLang: Locale = 'ar'; // Or your preferred default
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Our Clients</h1>
      <p className="mb-4">This page is a placeholder. Please use the language-specific version of this page.</p>
      <Link href={`/${defaultLang}/clients`} className="text-primary hover:underline">
        Go to Arabic Clients Page
      </Link>
      <br />
      <Link href={`/en/clients`} className="text-primary hover:underline">
        Go to English Clients Page
      </Link>
    </div>
  );
}

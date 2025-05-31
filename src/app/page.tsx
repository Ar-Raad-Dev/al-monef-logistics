
import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/dictionaries';

export default function RootPage() {
  const defaultLang: Locale = 'ar'; // Set Arabic as default
  redirect(`/${defaultLang}`);
}

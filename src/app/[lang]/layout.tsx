
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getDictionary, Locale } from '@/lib/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    icons: {
      icon: "/favicon.ico", 
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);
  // The direction is now primarily controlled by the root layout's <html> tag.
  // Individual components might still use params.lang for specific styling if needed.

  return (
    <>
      <Header lang={params.lang} dictionary={dictionary.navigation} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={params.lang} dictionary={dictionary.footer} />
    </>
  );
}

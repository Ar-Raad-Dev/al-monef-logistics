
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getDictionary, Locale } from '@/lib/dictionaries';
import DynamicHtmlAttrs from '@/components/dynamic-html-attrs';

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

  return (
    <>
      <DynamicHtmlAttrs lang={params.lang} />
      <Header lang={params.lang} dictionary={dictionary.navigation} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={params.lang} dictionary={dictionary.footer} />
    </>
  );
}

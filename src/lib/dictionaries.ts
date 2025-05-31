
import 'server-only';

export type Locale = 'en' | 'ar';

export interface Translations {
  metadata: {
    title: string;
    description: string;
  };
  navigation: {
    home: string;
    about: string;
    services: string;
    clients: string;
    careers: string;
    contact: string;
    switchLanguage: string;
  };
  hero: {
    title: string;
    tagline: string;
    exploreServices: string;
    getInTouch: string;
  };
  companyIntro: {
    heading: string;
    paragraph: string;
    discoverStory: string;
  };
  quickStats: {
    heading: string;
    stats: {
      yearsInBusiness: { title: string; description: string };
      trailersCount: { title: string; description: string };
      companiesServed: { title: string; description: string };
      trailersSold: { title: string; description: string };
    };
  };
  keyServices: {
    heading: string;
    services: {
      vehicleTrade: { title: string; description: string };
      logistics: { title: string; description: string };
      fleetShowcase: { title: string; description: string };
    };
    learnMore: string;
  };
  footer: {
    quickLinks: string;
    legalInfo: string;
    crNumber: string;
    chamberNumber: string;
    connectWithUs: string;
    copyright: string;
    tagline: string;
  };
  // Add more sections as needed for other pages
}

const dictionaries: Record<Locale, () => Promise<Translations>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Translations> => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
};

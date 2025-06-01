
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
      yearsInBusiness: { title: string; description:string };
      trailersCount: { title: string; description:string };
      companiesServed: { title: string; description:string };
      trailersSold: { title: string; description:string };
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
  aboutPage: {
    metaTitle: string;
    metaDescription: string;
    headerTitle: string;
    headerSubtitle: string;
    companyOverview: {
      imageAlt: string;
      heading: string;
      paragraph1: string;
      paragraph2: string;
    };
    missionVision: {
      missionHeading: string;
      missionText: string;
      visionHeading: string;
      visionText: string;
    };
    credentials: {
      heading: string;
      items: Array<{
        nameKey: 'crNumber' | 'chamberMembership' | 'phone' | 'fax' | 'address';
        name: string;
        value: string;
      }>;
    };
  };
  servicesPage: {
    metaTitle: string;
    metaDescription: string;
    headerTitle: string;
    headerSubtitle: string;
    vehicleTradeSection: {
      heading: string;
      paragraph: string;
      listItems: string[];
      imageAlt: string;
    };
    logisticsSection: {
      heading: string;
      paragraph: string;
      solutions: Array<{
        titleKey: 'freightForwarding' | 'warehousing' | 'supplyChain' | 'customsClearance';
        title: string;
        description: string;
      }>;
      partnershipsHeading: string;
      partnerships: Array<{
        name: string;
        description: string;
      }>;
    };
    fleetSection: {
      heading: string;
      paragraph: string;
      items: Array<{
        nameKey: 'flatbedTrailers' | 'curtainSideTrailers' | 'refrigeratedTrailers' | 'commercialVehicles';
        name: string;
        description: string;
      }>;
      maintenanceNote: string;
    };
  };
  clientsPage: {
    metaTitle: string;
    metaDescription: string;
    headerTitle: string;
    headerSubtitle: string;
    keyPartnersSection: {
      heading: string;
      partners: Array<{
        nameKey: 'alwatania' | 'mahamalWater' | 'miradWater' | 'ksaRetailers' | 'fbDistributors' | 'constructionLeaders';
        name: string;
        imageHint: string;
      }>;
      trustedByNote: string;
    };
    testimonialsSection: {
      heading: string;
      testimonials: Array<{
        name: string;
        companyKey: 'alwatania' | 'mahamalWater' | 'anonymousFMCG';
        company: string;
        testimonial: string;
        avatarHint: string;
        rating: number;
      }>;
    };
  };
  careersPage: {
    metaTitle: string;
    metaDescription: string;
    headerTitle: string;
    headerSubtitle: string;
    currentOpeningsSection: {
      heading: string;
      openings: Array<{
        titleKey: 'heavyVehicleDriver' | 'officeAccountant' | 'logisticsCoordinator';
        title: string;
        description: string;
      }>;
      checkBackNote: string;
    };
    applicationFormSection: {
      heading: string;
      cardTitle: string;
      cardDescription: string;
    };
    form: {
      fullNameLabel: string;
      fullNamePlaceholder: string;
      fullNameMinLengthError: string;
      phoneLabel: string;
      phonePlaceholder: string;
      phoneMinLengthError: string;
      emailLabel: string;
      emailPlaceholder: string;
      emailInvalidError: string;
      positionLabel: string;
      positionSelectPlaceholder: string;
      positionRequiredError: string;
      generalApplicationOption: string;
      cvLabel: string;
      cvFileTypes: string;
      coverLetterLabel: string;
      coverLetterPlaceholder: string;
      coverLetterMinLengthError: string;
      coverLetterMaxLengthError: string;
      submitButtonText: string;
      submittingButtonText: string;
      submitSuccessTitle: string;
      submitSuccessDescription: string;
    };
  };
  contactPage: {
    metaTitle: string;
    metaDescription: string;
    headerTitle: string;
    headerSubtitle: string;
    sendMessageCardTitle: string;
    contactDetails: Array<{
      titleKey: 'officeAddress' | 'phone' | 'faxNumber' | 'email' | 'workingHours';
      title: string;
      lines: string[];
    }>;
    locationMapSection: {
      heading: string;
      mapImageAlt: string; // This was for the old placeholder, can be repurposed or removed
      mapMarkerTitle: string;
      noApiKeyMessage: string;
      loadingMessage: string;
    };
    form: {
      fullNameLabel: string;
      fullNamePlaceholder: string;
      fullNameMinLengthError: string;
      emailLabel: string;
      emailPlaceholder: string;
      emailInvalidError: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      subjectMinLengthError: string;
      messageLabel: string;
      messagePlaceholder: string;
      messageMinLengthError: string;
      messageMaxLengthError: string;
      submitButtonText: string;
      submittingButtonText: string;
      submitSuccessTitle: string;
      submitSuccessDescription: string;
    };
  };
}

const dictionaries: Record<Locale, () => Promise<Translations>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Translations> => {
  const loadDictionary = dictionaries[locale] || dictionaries.en; // Default to 'en' if locale is not found
  return loadDictionary();
};

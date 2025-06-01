
"use client";

import type { Locale } from '@/lib/dictionaries';
import { useEffect } from 'react';

interface DynamicHtmlAttrsProps {
  lang: Locale;
}

export default function DynamicHtmlAttrs({ lang }: DynamicHtmlAttrsProps) {
  useEffect(() => {
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
  }, [lang]);

  return null; // This component does not render any visible UI
}

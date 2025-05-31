
// This file is the true root layout.
// The comment about it being obsolete should be reviewed based on project structure.

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  // Generic fallback title and description. Specific pages will override this via their own metadata.
  title: 'Abdul Aziz AlMonef Logistics Hub',
  description: 'Leading Trade and Transport Services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NOTE: For true i18n, lang and dir here should be dynamic.
  // This currently hardcodes to "en" and "ltr", which will affect Arabic page rendering for dir-sensitive CSS.
  // Fixing this requires a more complex i18n setup for the root layout.
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

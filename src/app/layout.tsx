
// This file is obsolete and will be replaced by /src/app/[lang]/layout.tsx
// Please delete this file manually after confirming the new structure works.
// Keeping it temporarily to avoid build errors if not deleted immediately by the tooling.

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Obsolete Layout - Please Delete',
  description: 'This layout is no longer in use.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

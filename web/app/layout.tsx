import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import '@styles/base.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { ColorSchemeScript } from '@mantine/core';
import AppLayout from '@layout/index';
// import NProgress from '@module/NProgress/NProgress';
// import { NavigationProgress } from '@mantine/nprogress';
// import { Suspense } from 'react';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--next-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />

        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        {/* <NavigationProgress />

          <Suspense fallback={null}>
            <NProgress />
          </Suspense> */}

        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

// Meta tags
export const metadata: Metadata = {
  title: 'Khofly Auth',
  description: 'Khofly authentication front-end',
  keywords: 'Khofly, Auth',
  metadataBase: new URL('https://auth.khofly.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: new URL('https://auth.khofly.com'),
    siteName: 'Khofly Auth',
    title: 'Khofly Auth',
    description: 'Khofly authentication front-end',
    images: [
      {
        url: 'https://auth.khofly.com/images/og.png',
        width: 1200,
        height: 600,
        alt: 'Khofly Auth og image',
        type: 'image/png',
      },
    ],
  },
  manifest: '/manifest.json',
};

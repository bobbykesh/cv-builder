import type { Metadata } from 'next';
import { Nunito, Domine } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-nunito',
});

const domine = Domine({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-domine',
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'PerfectCV',
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    'Build your perfect CV for free',
  keywords: [
    'CV Builder',
    'free CV builder',
    'CV templates',
    'CV examples',
    'CV designs',
    'online CV',
    'CV writing',
    'create CV',
    'curriculum vitae',
    'resume builder',
  ],
  authors: [{ name: 'PerfectCV' }],
  openGraph: {
    title: 'PerfectCV - Free CV Builder',
    description: 'Build your perfect CV for free in minutes',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PerfectCV - Free CV Builder',
    description: 'Build your perfect CV for free in minutes',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${nunito.variable} ${domine.variable}`}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

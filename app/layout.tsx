import './globals.css';

import type { Metadata } from 'next';
import { M_PLUS_1p } from 'next/font/google';
import { ReactNode } from 'react';
import Providers from '@/components/Providers';
import LoginModal from '@/components/LoginModal';
import AuthHandler from '@/components/AuthHandler';
import { auth } from '@/auth';

const mPlus1p = M_PLUS_1p({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-mplus1p',
});

export const metadata: Metadata = {
  title: 'チャレンジAIクイズ',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ja-JP">
      <body className={`${mPlus1p.variable} font-sans`}>
        <Providers>
          {children}

          <AuthHandler />
          {!session && <LoginModal />}
        </Providers>
      </body>
    </html>
  );
}

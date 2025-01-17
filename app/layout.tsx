import './globals.css';

import Providers from '@/components/Providers';
import type { Metadata } from 'next';
import { M_PLUS_1p } from 'next/font/google';
import { ReactNode } from 'react';

const mPlus1p = M_PLUS_1p({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-mplus1p',
});

export const metadata: Metadata = {
  title: 'チャレンジAIクイズ',
  description: 'AIによって作られた無限のクイズを解こう！',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja-JP">
      <body className={`${mPlus1p.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

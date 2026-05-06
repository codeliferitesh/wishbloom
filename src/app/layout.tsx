import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

// Display font for headings — elegant serif
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Body font — clean, modern sans-serif
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WishBloom — Birthday Greetings',
  description: 'Create beautiful, shareable birthday greeting pages for the people you love.',
  keywords: ['birthday', 'greeting', 'celebration', 'wishes'],
  openGraph: {
    title: 'WishBloom — Birthday Greetings',
    description: 'Create beautiful, shareable birthday greeting pages.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

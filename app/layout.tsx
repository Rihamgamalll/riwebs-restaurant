import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import { LanguageProvider } from '@/components/LanguageProvider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RiWebs Restaurant — Built for the Craving',
    template: '%s | RiWebs Restaurant',
  },
  description: 'Premium burgers, crispy fries and complete meals from RiWebs Restaurant.',
  openGraph: {
    title: 'RiWebs Restaurant — Built for the Craving',
    description: 'Premium burgers, crispy fries and complete meals from RiWebs Restaurant.',
    type: 'website',
    images: [{
      url: '/assets/background.png',
      width: 1672,
      height: 941,
      alt: 'RiWebs Restaurant home experience',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RiWebs Restaurant — Built for the Craving',
    description: 'Premium burgers, crispy fries and complete meals from RiWebs Restaurant.',
    images: ['/assets/background.png'],
  },
  icons: { icon: '/branding/riwebs-logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

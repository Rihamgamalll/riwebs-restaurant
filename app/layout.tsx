import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import { LanguageProvider } from '@/components/LanguageProvider';
import GlobalMotion from '@/components/GlobalMotion';

const siteUrl = 'https://riwebs-restaurant.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RiWebs Restaurant — Built for the Craving',
    template: '%s | RiWebs Restaurant',
  },
  description: 'Premium burgers, crispy fries and complete meals from RiWebs Restaurant.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RiWebs Restaurant — Built for the Craving',
    description: 'Premium burgers, crispy fries and complete meals from RiWebs Restaurant.',
    url: siteUrl,
    siteName: 'RiWebs Restaurant',
    type: 'website',
    images: [{
      url: '/social-preview-v2.jpg',
      width: 1200,
      height: 630,
      alt: 'RiWebs Restaurant signature burger home experience',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RiWebs Restaurant — Built for the Craving',
    description: 'Premium burgers, crispy fries and complete meals from RiWebs Restaurant.',
    images: ['/social-preview-v2.jpg'],
  },
  icons: { icon: '/branding/riwebs-logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalMotion />
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

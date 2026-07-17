import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' });

export const metadata = {
  title: 'Mango Bite Hotel & Restaurant | Best Hotel in Kutch, Mandvi',
  description: 'Experience a premium stay and pure-vegetarian multi-cuisine dining at Mango Bite Hotel & Restaurant, Maska, Gujarat. Known as the best hotel and restaurant in Mandvi, Kutch.',
  keywords: 'the mangobite hotel and Resturant mandvi, best hotel in kutch, best restaurant in mandvi, mandvi kutch hotel, pure veg restaurant mandvi, luxury stay in kutch, mango bite hotel, top resorts in mandvi, kutch tourism stay, best dining in kutch, hotels near mandvi beach',
  openGraph: {
    title: 'Mango Bite Hotel & Restaurant | Mandvi, Kutch',
    description: 'Best hotel and pure-veg restaurant in Mandvi, Kutch.',
    url: 'https://themangobitehotel.com',
    siteName: 'Mango Bite Hotel',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

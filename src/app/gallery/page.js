import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import GalleryViewer from '@/components/GalleryViewer';
import styles from './page.module.css';

export const metadata = {
  title: 'Gallery | Best Hotel & Restaurant in Mandvi Kutch',
  description: 'Explore the visual journey of Mango Bite Hotel & Restaurant. View photos of our premium rooms, multi-cuisine restaurant, banquet hall, and beautiful exterior in Mandvi.',
  keywords: 'mango bite hotel gallery, mandvi hotel photos, best hotel in kutch, party plot in mandvi, banquet hall in kutch, wedding venue mandvi, pure veg restaurant photos',
};

export default async function Gallery() {
  let galleries = [];
  try {
    const res = await fetch('https://themangobitehotel.com/api/galleries');
    if (res.ok) {
      const data = await res.json();
      if (data && data.status && data.data) {
        galleries = data.data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/images/kutchi_hotel_hero.jpg" 
          alt="Mango Bite Gallery" 
          fill 
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent} animate-fade-in-up`}>
          <h1 className={styles.heroTitle}>A Glimpse of Luxury</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: '300', opacity: '0.9' }}>
            Take a visual tour of our beautifully crafted spaces and vibrant culinary offerings.
          </p>
        </div>
      </section>

      {/* Dynamic Gallery Viewer */}
      <section className="section bg-light">
        <div className="container">
          
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading Gallery...</div>}>
            <GalleryViewer galleries={galleries} />
          </Suspense>

          <div style={{ textAlign: 'center', marginTop: '3rem', padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>Like what you see?</h2>
            <Link href="/rooms" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Explore Rooms
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

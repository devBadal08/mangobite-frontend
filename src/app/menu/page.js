import MenuGallery from '@/components/MenuGallery';
import Image from 'next/image';
import { Suspense } from 'react';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Menu | Best Pure Veg Restaurant in Mandvi Kutch',
  description: 'Explore the pure-vegetarian multi-cuisine menu at Mango Bite Restaurant, the best restaurant in Mandvi, Kutch. North Indian, South Indian, Punjabi, and Chinese.',
  keywords: 'best pure veg restaurant in mandvi, punjabi food kutch, multi cuisine family restaurant mandvi, south indian food mandvi, best dining in kutch, the mango bite restaurant menu',
};

export default async function MenuPage() {
  let menuData = [];
  try {
    const res = await fetch('https://admin.themangobitehotel.com/api/menus');
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json();
      if (data && data.status && data.data) {
        menuData = data.data.map(category => {
          const imageUrl = category.image.startsWith('/storage')
            ? `https://admin.themangobitehotel.com${category.image}`
            : `https://admin.themangobitehotel.com/storage/${category.image}`;

          return {
            id: category.id,
            name: category.name,
            image: imageUrl,
            items: (category.menus || []).map(menu => ({
              name: menu.menu_name,
              price: menu.price
            }))
          };
        });
      }
    }
  } catch (error) {
    console.error('Failed to fetch menus:', error);
  }

  return (
    <>
      <div className="container animate-fade-in-up" style={{ textAlign: 'center', paddingTop: '0.5rem', paddingBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--dark)', marginBottom: '1rem' }}>
          A Culinary Journey
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
          Discover our rich, pure-vegetarian multi-cuisine menu crafted with authentic flavors.
        </p>
        <div style={{ width: '150px', height: '5px', backgroundColor: '#FFD700', margin: '0 auto 1.5rem auto', borderRadius: '3px' }}></div>
      </div>

      <section className={styles.doodleSection}>
        <div className={`container ${styles.menuContainer}`}>
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading Menu...</div>}>
            <MenuGallery menuData={menuData} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

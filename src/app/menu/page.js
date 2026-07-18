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
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/images/kutchi_restaurant.jpg" 
          alt="Mango Bite Restaurant" 
          fill 
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent} animate-fade-in-up`}>
          <h1 className={styles.heroTitle}>A Culinary Journey</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: '300', opacity: '0.9' }}>
            Discover our rich, pure-vegetarian multi-cuisine menu crafted with authentic flavors.
          </p>
        </div>
      </section>

      <div className={`container ${styles.menuContainer}`}>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading Menu...</div>}>
          <MenuGallery menuData={menuData} />
        </Suspense>
      </div>
    </>
  );
}

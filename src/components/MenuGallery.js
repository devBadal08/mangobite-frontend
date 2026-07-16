"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import styles from './MenuGallery.module.css';

export default function MenuGallery({ menuData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryIdParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(null);

  // Sync state with URL
  useEffect(() => {
    if (categoryIdParam) {
      const category = menuData.find(c => c.id.toString() === categoryIdParam);
      if (category) {
        setActiveCategory(category);
      } else {
        setActiveCategory(null);
      }
    } else {
      setActiveCategory(null);
    }
  }, [categoryIdParam, menuData]);

  const handleCategoryClick = (category) => {
    // Add query parameter to URL so back button works
    router.push(`?category=${category.id}`, { scroll: false });
  };

  const handleBackClick = () => {
    // Remove query parameter
    router.back();
  };

  if (activeCategory) {
    const currentIndex = menuData.findIndex(c => c.id === activeCategory.id);
    const prevCategory = menuData[(currentIndex - 1 + menuData.length) % menuData.length];
    const nextCategory = menuData[(currentIndex + 1) % menuData.length];

    // Detail View
    return (
      <div className={`${styles.detailView} animate-fade-in-up`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <button 
            className="btn btn-outline"
            onClick={() => handleCategoryClick(prevCategory)}
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '5px', margin: 0 }}
            title={`Previous: ${prevCategory.name}`}
          >
            &larr; Prev
          </button>


          <button 
            className="btn btn-outline"
            onClick={() => handleCategoryClick(nextCategory)}
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '5px', margin: 0 }}
            title={`Next: ${nextCategory.name}`}
          >
            Next &rarr;
          </button>
        </div>

        <div className={styles.categoryHeroDetail}>
          <Image 
            src={activeCategory.image || '/images/custom_restaurant.jpg'} 
            alt={activeCategory.name} 
            fill 
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}>
            <h2 className={styles.detailTitle}>{activeCategory.name}</h2>
          </div>
        </div>

        <div className={styles.itemsWrapper}>
          <ul className={styles.itemList}>
            {activeCategory.items.map((item, i) => (
              <li key={i} className={styles.itemRow}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemDots}></span>
                <span className={styles.itemPrice}>₹{item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            className={`btn btn-outline ${styles.backBtn}`}
            onClick={handleBackClick}
            style={{ margin: '0 auto' }}
          >
            <ArrowLeft size={18} style={{ marginRight: '8px' }} />
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  // Gallery View
  return (
    <div className={styles.galleryGrid}>
      {menuData.map((category) => (
        <div 
          key={category.id} 
          className={`card ${styles.galleryCard}`}
          onClick={() => handleCategoryClick(category)}
        >
          <div className={styles.cardImageWrapper}>
            <Image 
              src={category.image || '/images/custom_restaurant.jpg'} 
              alt={category.name} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay}>
              <h3 className={styles.cardTitle}>{category.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './MenuGallery.module.css';

export default function MenuGallery({ menuData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryIdParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(null);
  const [bookStatus, setBookStatus] = useState('closed'); // 'closed' | 'opening' | 'open'

  // Sync state with URL
  useEffect(() => {
    if (categoryIdParam) {
      const category = menuData.find(c => c.id.toString() === categoryIdParam);
      if (category) {
        setActiveCategory(category);
        setBookStatus('open');
      } else {
        setActiveCategory(null);
        setBookStatus('closed');
      }
    } else {
      setActiveCategory(null);
      setBookStatus('closed');
    }
  }, [categoryIdParam, menuData]);

  const handleOpenBook = () => {
    if (bookStatus === 'opening') return;
    setBookStatus('opening');
    setTimeout(() => {
      // Open to the first category after a faster animation
      if (menuData.length > 0) {
        router.push(`?category=${menuData[0].id}`, { scroll: false });
      }
    }, 600); // Fast cover animation (600ms)
  };

  const handleCategoryClick = (category) => {
    router.push(`?category=${category.id}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTurnPage = (category) => {
    // Instant change
    router.push(`?category=${category.id}`, { scroll: false });
  };

  if (bookStatus === 'closed' || bookStatus === 'opening') {
    return (
      <div className={styles.coverContainer}>
        {/* Fake pages that sit behind the cover to show when it opens */}
        <div className={styles.fakePages}>
          <div className={styles.fakePagesContent}>
            <div className={styles.fakeLogoText}>
              Mango Bite
              <span className={styles.fakeLogoSubtitle}>Hotel & Restaurant</span>
            </div>
            <p className={styles.fakeWelcomeText}>A Culinary Journey Awaits...</p>
          </div>
        </div>
        
        <div 
          className={`${styles.bookCover} ${bookStatus === 'opening' ? styles.coverOpening : ''}`}
          onClick={handleOpenBook}
        >
          <div className={styles.coverContent}>
            <div className={styles.coverLogoText}>
              Mango Bite
              <span className={styles.coverLogoSubtitle}>Hotel & Restaurant</span>
            </div>
            <h1 className={styles.coverTitle}>Menu</h1>
            <p className={styles.coverSubtitle}>Show the menu</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeCategory && bookStatus === 'open') {
    const currentIndex = menuData.findIndex(c => c.id === activeCategory.id);
    const prevCategory = menuData[(currentIndex - 1 + menuData.length) % menuData.length];
    const nextCategory = menuData[(currentIndex + 1) % menuData.length];

    // Detail View (Open Book)
    return (
      <div className={`${styles.detailView} animate-fade-in-up`}>
        <div key={activeCategory.id} className={styles.detailLayout}>
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
            
            {/* Prev Page Button integrated in the left edge */}
            <button 
              className={`${styles.pageTurnBtn} ${styles.pageTurnPrev}`}
              onClick={() => handleTurnPage(prevCategory)}
              title={`Previous: ${prevCategory.name}`}
            >
              <ChevronLeft size={32} />
            </button>
          </div>

          <div className={styles.itemsWrapper}>
            {/* Next Page Button integrated in the right edge */}
            <button 
              className={`${styles.pageTurnBtn} ${styles.pageTurnNext}`}
              onClick={() => handleTurnPage(nextCategory)}
              title={`Next: ${nextCategory.name}`}
            >
              <ChevronRight size={32} />
            </button>

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
        </div>
      </div>
    );
  }

  return null;
}

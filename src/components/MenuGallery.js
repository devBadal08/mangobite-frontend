"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './MenuGallery.module.css';

// Component for a single page in the flipbook
const Page = React.forwardRef((props, ref) => {
  return (
    <div className={styles.page} ref={ref} data-density={props.density || "soft"}>
      <div className={styles.pageContent}>
        {props.children}
      </div>
    </div>
  );
});
Page.displayName = 'Page';

export default function MenuGallery({ menuData }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const book = useRef();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Wait for client-side hydration to determine book size
  if (windowWidth === 0) return null;

  if (!menuData || menuData.length === 0) {
    return <div className={styles.emptyMenu}>Menu is currently unavailable.</div>;
  }

  // Responsive book sizing (Smaller as requested)
  let bookWidth = 300;
  let bookHeight = 300;
  let usePortrait = false;

  if (windowWidth < 992) {
    // Mobile/Tablet devices: 2-page spread means one page is half the screen
    let totalAvailableWidth = windowWidth - 20; // minimal margins
    bookWidth = totalAvailableWidth / 2;
    if (bookWidth > 340) bookWidth = 340; // Cap width
    bookHeight = bookWidth * 1.8; // INCREASED aspect ratio for much taller mobile book
    // usePortrait remains false to force 2-page spread on mobile
  }

  // When on the cover (page 0) and not in portrait mode, the cover is on the right half of the 2-page spread.
  // We shift the container left by half the book width to center the cover on the screen.
  const isClosedCover = !usePortrait && currentPage === 0;
  const transformStyle = isClosedCover ? `translateX(-${bookWidth / 2}px)` : 'translateX(0)';

  return (
    <div
      className={`${styles.bookContainer} animate-fade-in-up`}
      style={{
        transform: transformStyle,
        transition: 'transform 0.8s ease-in-out'
      }}
    >
      <button
        className={`${styles.navBtn} ${styles.navPrev}`}
        style={{
          opacity: currentPage === 0 ? 0 : 1,
          pointerEvents: currentPage === 0 ? 'none' : 'auto'
        }}
        onClick={() => {
          if (book.current) book.current.pageFlip().flipPrev();
        }}
      >
        <ChevronLeft size={36} />
      </button>

      <HTMLFlipBook
        ref={book}
        width={bookWidth}
        height={bookHeight}
        size="stretch"
        minWidth={100}
        maxWidth={500}
        minHeight={140}
        maxHeight={750}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className={styles.flipBook}
        usePortrait={usePortrait}
        drawShadow={true}
        flippingTime={1000}
        onFlip={(e) => setCurrentPage(e.data)}
      >
        {/* Front Cover */}
        <Page density="hard">
          <div className={styles.coverFront}>
            <div className={styles.coverLogoText}>
              Mango Bite
              <span className={styles.coverLogoSubtitle}>Hotel & Restaurant</span>
            </div>
            <h1 className={styles.coverTitle}>Menu</h1>
            <p className={styles.coverSubtitle}>Swipe or click to open</p>
          </div>
        </Page>

        {/* Inner Front Cover (Left Side) */}
        <Page density="hard">
          <div className={styles.coverInner}>
            <div className={styles.coverLogoText} style={{ opacity: 0.3, transform: 'scale(0.7)', textShadow: 'none', marginBottom: '1rem' }}>
              Mango Bite
              <span className={styles.coverLogoSubtitle}>Hotel & Restaurant</span>
            </div>
            <h1 className={styles.coverTitle} style={{ opacity: 0.15, borderBottom: 'none', letterSpacing: '2px', fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}>MENU</h1>
          </div>
        </Page>

        {/* Intro Page (Right Side) */}
        <Page>
          <div className={`${styles.itemsPage} ${styles.centerPage}`}>
            <h2 className={styles.welcomeTitle}>Welcome</h2>
            <p className={styles.welcomeText}>
              Explore our carefully curated pure vegetarian delights. Fresh ingredients, authentic recipes, and a passion for perfection.
            </p>
            <div className={styles.swipeHint}>
              ( Swipe or click arrow to explore next &rarr; )
            </div>
          </div>
        </Page>

        {/* Generate Pages for Each Category */}
        {menuData.flatMap((category) => [
          /* Left Page: Category Image & Title */
          <Page key={`${category.id}-left`}>
            <div className={styles.categoryHeroPage}>
              <Image
                src={category.image || '/images/custom_restaurant.jpg'}
                alt={category.name}
                fill
                className={styles.pageImage}
              />
              <div className={styles.pageImageOverlay}>
                <h2 className={styles.pageCategoryTitle}>{category.name}</h2>
              </div>
            </div>
          </Page>,

          /* Right Page: Category Items */
          <Page key={`${category.id}-right`}>
            <div className={styles.itemsPage}>
              <h3 className={styles.itemsPageHeader}>{category.name}</h3>
              <ul className={styles.itemList}>
                {category.items.map((item, i) => (
                  <li key={i} className={styles.itemRow}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemDots}></span>
                    <span className={styles.itemPrice}>₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Page>
        ])}

        {/* Inner Back Cover */}
        <Page density="hard">
          <div className={styles.coverInner}>
            <h2 className={styles.welcomeTitle} style={{ color: '#FFD700' }}>Thank You!</h2>
            <p className={styles.welcomeText} style={{ color: '#d7ccc8' }}>
              We hope you enjoyed our menu. Please ask our staff if you have any special dietary requirements.
            </p>
          </div>
        </Page>

        {/* Back Cover */}
        <Page density="hard">
          <div className={styles.coverBack}>
            <div className={styles.coverLogoText}>
              Mango Bite
              <span className={styles.coverLogoSubtitle}>Hotel & Restaurant</span>
            </div>
          </div>
        </Page>
      </HTMLFlipBook>

      <button
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={() => {
          if (book.current) book.current.pageFlip().flipNext();
        }}
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
}

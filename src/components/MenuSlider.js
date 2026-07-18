"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MenuSlider.module.css';

export default function MenuSlider({ menus }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  
  // Duplicate menus to create an infinite loop effect
  // We need enough items to fill the screen twice
  const duplicatedMenus = [...menus, ...menus, ...menus, ...menus, ...menus];
  const itemsPerSet = menus.length;

  const handleScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(track.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(trackCenter - childCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
    
    // Infinite loop logic
    // If we scroll too far right (into the 4th set), jump back to the 2nd set
    const totalWidth = track.scrollWidth;
    const scrollLeft = track.scrollLeft;
    
    // Approximate width of one full set of original items
    const setWidth = totalWidth / 5; 
    
    if (scrollLeft > setWidth * 3) {
      // Instantly jump back by one set width
      track.scrollLeft = scrollLeft - setWidth;
    } else if (scrollLeft < setWidth) {
      // Instantly jump forward by one set width
      track.scrollLeft = scrollLeft + setWidth;
    }
  };

  // Auto-scroll logic
  const startAutoScroll = () => {
    const scrollStep = () => {
      if (trackRef.current) {
        trackRef.current.scrollLeft += 1; // Speed of scroll
      }
      animationRef.current = requestAnimationFrame(scrollStep);
    };
    animationRef.current = requestAnimationFrame(scrollStep);
  };

  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    if (trackRef.current && menus.length > 0) {
      // Start at the middle set to allow scrolling left or right infinitely
      const setWidth = trackRef.current.scrollWidth / 5;
      trackRef.current.scrollLeft = setWidth * 2;
      
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [menus]);

  if (!menus || menus.length === 0) return null;

  return (
    <div 
      className={styles.sliderContainer}
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
      onTouchStart={stopAutoScroll}
      onTouchEnd={startAutoScroll}
    >
      <div 
        className={styles.sliderTrack} 
        ref={trackRef} 
        onScroll={handleScroll}
      >
        {duplicatedMenus.map((menu, index) => {
          let imageUrl = menu.image;
          if (imageUrl && !imageUrl.startsWith('/images/')) {
            imageUrl = imageUrl.startsWith('/storage') 
              ? `https://admin.themangobitehotel.com${imageUrl}` 
              : `https://admin.themangobitehotel.com/storage/${imageUrl}`;
          }

          // We use modulo to ensure the same original item gets the active class 
          // consistently even if we jump sets, but actually closestIndex is absolute.
          return (
            <Link 
              href={`/menu?category=${menu.id}`} 
              key={`${menu.id}-${index}`} 
              className={`${styles.slideItem} ${index === activeIndex ? styles.active : ''}`}
            >
              <Image 
                src={imageUrl || '/images/custom_restaurant.jpg'} 
                alt={menu.name} 
                fill 
                className={styles.slideImage} 
              />
              <div className={styles.slideOverlay}>
                <h3 className={styles.slideTitle}>{menu.name}</h3>
                {menu.description && <p className={styles.slideDesc}>{menu.description}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import styles from './GalleryViewer.module.css';

export default function GalleryViewer({ galleries }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get('event');
  const [activeEvent, setActiveEvent] = useState(null);

  // Sync state with URL
  useEffect(() => {
    if (eventSlug) {
      const event = galleries.find(g => g.slug === eventSlug || g.id.toString() === eventSlug);
      if (event) {
        setActiveEvent(event);
      } else {
        setActiveEvent(null);
      }
    } else {
      setActiveEvent(null);
    }
  }, [eventSlug, galleries]);

  const handleEventClick = (event) => {
    // Add query parameter to URL so back button works
    router.push(`?event=${event.slug || event.id}`, { scroll: false });
  };

  const handleBackClick = () => {
    // Remove query parameter
    router.back();
  };

  // Helper function to format image URLs
  const getImageUrl = (img) => {
    if (!img) return '/images/custom_restaurant.jpg';
    if (img.startsWith('/images/')) return img;
    return img.startsWith('/storage') 
      ? `https://admin.themangobitehotel.com${img}` 
      : `https://admin.themangobitehotel.com/storage/${img}`;
  };

  if (activeEvent) {
    // Detail View for a specific event/category
    return (
      <div className={`${styles.detailView} animate-fade-in-up`}>
        <button 
          className={`btn btn-outline ${styles.backBtn}`}
          onClick={handleBackClick}
        >
          <ArrowLeft size={18} style={{ marginRight: '8px' }} />
          Back to Albums
        </button>

        <div className={styles.detailHeader}>
          <h2 className={styles.detailTitle}>{activeEvent.title}</h2>
          {activeEvent.description && (
            <p className={styles.detailDesc}>{activeEvent.description}</p>
          )}
        </div>

        <div className={styles.masonryGrid}>
          {activeEvent.gallery_images && activeEvent.gallery_images.length > 0 ? (
            activeEvent.gallery_images.map((img, index) => (
              <div key={index} className={styles.masonryItem}>
                <Image 
                  src={getImageUrl(img)}
                  alt={`${activeEvent.title} - Image ${index + 1}`}
                  fill
                  className={styles.masonryImage}
                />
                <div className={styles.itemOverlay}>
                  <h3 className={styles.itemTitle}>{activeEvent.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
              No images found in this album.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Gallery List View (Albums/Categories)
  return (
    <div className={styles.categoryGrid}>
      {galleries && galleries.length > 0 ? (
        galleries.map((gallery) => (
          <div 
            key={gallery.id} 
            className={`card ${styles.categoryCard}`}
            onClick={() => handleEventClick(gallery)}
          >
            <div className={styles.cardImageWrapper}>
              <Image 
                src={getImageUrl(gallery.main_image)} 
                alt={gallery.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{gallery.title}</h3>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
          No albums available.
        </p>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import styles from './GalleryViewer.module.css';
import ScrollReveal from '@/components/ScrollReveal';

export default function GalleryViewer({ galleries }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get('event');
  const [activeEvent, setActiveEvent] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

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

  // Helper function to format media URLs and handle objects
  const getMediaUrl = (mediaItem) => {
    if (!mediaItem) return '';
    let mediaPath = mediaItem;
    // If it's an object, extract the URL (commonly image, video, file, url)
    if (typeof mediaItem === 'object') {
      mediaPath = mediaItem.image || mediaItem.video || mediaItem.url || mediaItem.file || mediaItem.path || '';
    }

    if (!mediaPath || typeof mediaPath !== 'string') return '';
    if (mediaPath.startsWith('http')) return mediaPath;
    if (mediaPath.startsWith('/images/')) return mediaPath;

    return mediaPath.startsWith('/storage')
      ? `https://admin.themangobitehotel.com${mediaPath}`
      : `https://admin.themangobitehotel.com/storage/${mediaPath}`;
  };

  const isVideo = (url) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg|mov)$/i) != null;
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
          {(() => {
            // Robust extraction of the images array
            let images = [];
            if (Array.isArray(activeEvent.gallery_images)) images = [...activeEvent.gallery_images];
            else if (Array.isArray(activeEvent.images)) images = [...activeEvent.images];
            else if (Array.isArray(activeEvent.photos)) images = [...activeEvent.photos];
            else if (Array.isArray(activeEvent.media)) images = [...activeEvent.media];
            else {
              try {
                if (typeof activeEvent.gallery_images === 'string') images = JSON.parse(activeEvent.gallery_images);
                else if (typeof activeEvent.images === 'string') images = JSON.parse(activeEvent.images);
              } catch (e) { }
            }

            // If the API provided a direct video at the root level, add it to the front of our media list
            if (activeEvent.video && typeof activeEvent.video === 'string') {
              images.unshift(activeEvent.video);
            }

            // If there's still absolutely nothing but we have a main_image, show that so the gallery isn't empty
            if (images.length === 0 && activeEvent.main_image) {
              images.push(activeEvent.main_image);
            }

            if (images && images.length > 0) {
              return images.map((img, index) => {
                const mediaUrl = getMediaUrl(img);
                return (
                  <ScrollReveal animation="fade-up" delay={(index % 4) * 100} key={index}>
                    <div
                      className={styles.masonryItem}
                      onClick={() => setSelectedMedia(mediaUrl)}
                    >
                      {isVideo(mediaUrl) ? (
                        <video
                          src={mediaUrl}
                          className={styles.masonryImage}
                          autoPlay muted loop playsInline
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      ) : (
                        <img
                          src={mediaUrl || '/images/custom_restaurant.jpg'}
                          alt={`${activeEvent.title} - Item ${index + 1}`}
                          className={styles.masonryImage}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      )}
                      <div className={styles.itemOverlay}>
                        <h3 className={styles.itemTitle}>{activeEvent.title}</h3>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              });
            } else {
              return (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', overflowX: 'auto' }}>
                  <p>No images found in this album.</p>
                  <p style={{ fontSize: '12px', marginTop: '1rem', color: 'red' }}>Debug Info (Please send this back if it still fails):</p>
                  <pre style={{ fontSize: '11px', textAlign: 'left', background: '#f5f5f5', padding: '1rem', borderRadius: '5px' }}>
                    {JSON.stringify(activeEvent, null, 2)}
                  </pre>
                </div>
              );
            }
          })()}
        </div>

        {/* Lightbox Popup */}
        {selectedMedia && (
          <div className={styles.lightbox} onClick={() => setSelectedMedia(null)}>
            <button className={styles.closeBtn} onClick={() => setSelectedMedia(null)}>Close ✕</button>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              {isVideo(selectedMedia) ? (
                <video src={selectedMedia} controls autoPlay className={styles.lightboxMedia} />
              ) : (
                <img src={selectedMedia} alt="Fullscreen View" className={styles.lightboxMedia} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Gallery List View (Albums/Categories)
  return (
    <div className={styles.categoryGrid}>
      {galleries && galleries.length > 0 ? (
        galleries.map((gallery, idx) => (
          <ScrollReveal animation="fade-up" delay={(idx % 3) * 100} key={gallery.id}>
            <div
              className={`card ${styles.categoryCard}`}
              onClick={() => handleEventClick(gallery)}
            >
              <div className={styles.cardImageWrapper}>
                <img
                  src={getMediaUrl(gallery.main_image) || '/images/custom_restaurant.jpg'}
                  alt={gallery.title}
                  className={styles.cardImage}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                />
                <div className={styles.cardOverlay}>
                  <h3 className={styles.cardTitle}>{gallery.title}</h3>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))
      ) : (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
          No albums available.
        </p>
      )}
    </div>
  );
}

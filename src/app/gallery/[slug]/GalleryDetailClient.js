"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';
import styles from '@/components/GalleryViewer.module.css';
import ScrollReveal from '@/components/ScrollReveal';

export default function GalleryDetailClient({ activeEvent, prevSlug, nextSlug }) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [columnsCount, setColumnsCount] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth <= 600) setColumnsCount(1);
      else if (window.innerWidth <= 1024) setColumnsCount(2);
      else setColumnsCount(3);
    };
    // Set initially and listen
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const handleBackClick = () => {
    router.push('/gallery');
  };

  // Helper function to format media URLs and handle objects
  const getMediaUrl = (mediaItem) => {
    if (!mediaItem) return '';
    let mediaPath = mediaItem;
    // If it's an object, extract the URL
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

  if (!activeEvent) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h3 style={{ color: 'var(--primary)' }}>Album not found</h3>
        <button className="btn btn-outline" onClick={handleBackClick} style={{ marginTop: '1rem' }}>
          Back to Gallery
        </button>
      </div>
    );
  }

  // Extract images
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

  if (activeEvent.video && typeof activeEvent.video === 'string') {
    images.unshift(activeEvent.video);
  }
  if (images.length === 0 && activeEvent.main_image) {
    images.push(activeEvent.main_image);
  }

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className={`${styles.detailView} animate-fade-in-up`}>
          
          <div className={styles.detailHeader}>
            <h1 className="section-title">{activeEvent.title}</h1>
            {activeEvent.description && (
              <p className={styles.detailDesc} style={{ textAlign: 'center', margin: '0 auto 2rem auto', maxWidth: '800px', lineHeight: '1.8' }}>{activeEvent.description}</p>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {images.length > 0 ? (
              images.map((img, index) => {
                const mediaUrl = getMediaUrl(img);
                return (
                  <ScrollReveal animation="fade-up" delay={(index % 4) * 100} key={index}>
                    <div
                      className={styles.masonryItem}
                      onClick={() => setSelectedIndex(index)}
                      style={{ height: '300px', backgroundColor: '#000', margin: 0 }}
                    >
                      {isVideo(mediaUrl) ? (
                        <video
                          src={mediaUrl}
                          className={styles.masonryImage}
                          autoPlay muted loop playsInline
                          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        />
                      ) : (
                        <img
                          src={mediaUrl || '/images/custom_restaurant.jpg'}
                          alt={`${activeEvent.title} - Item ${index + 1}`}
                          className={styles.masonryImage}
                          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        />
                      )}
                      <div className={styles.itemOverlay} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Eye size={48} color="#fff" style={{ opacity: 0.8 }} />
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', overflowX: 'auto' }}>
                <p>No images found in this album.</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            
            <div style={{ flex: 1, textAlign: 'left' }}>
              {prevSlug && (
                <Link href={`/gallery/${prevSlug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '50px', backgroundColor: '#fff', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize: '1.2rem' }}>&larr;</span> Previous Album
                </Link>
              )}
            </div>

            <div style={{ flex: 1, textAlign: 'center' }}>
              <Link href="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                Back to Albums
              </Link>
            </div>

            <div style={{ flex: 1, textAlign: 'right' }}>
              {nextSlug && (
                <Link href={`/gallery/${nextSlug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '50px', backgroundColor: '#fff', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  Next Album <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                </Link>
              )}
            </div>

          </div>

          {/* Lightbox Popup */}
          {selectedIndex !== null && images[selectedIndex] && (
            <div className={styles.lightbox} onClick={() => setSelectedIndex(null)} style={{ zIndex: 2147483640 }}>
              <button className={styles.closeBtn} onClick={() => setSelectedIndex(null)} style={{ top: '120px', right: 'clamp(10px, 5vw, 30px)', zIndex: 2147483647 }}>Close ✕</button>
              
              {selectedIndex > 0 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex - 1); }}
                  style={{ position: 'absolute', left: 'clamp(10px, 5vw, 30px)', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 140, 0, 0.8)', color: '#fff', border: 'none', borderRadius: '50%', width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer', zIndex: 2147483647, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
                >
                  ❮
                </button>
              )}

              <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                {isVideo(getMediaUrl(images[selectedIndex])) ? (
                  <video src={getMediaUrl(images[selectedIndex])} controls autoPlay className={styles.lightboxMedia} />
                ) : (
                  <img src={getMediaUrl(images[selectedIndex])} alt="Fullscreen View" className={styles.lightboxMedia} />
                )}
              </div>

              {selectedIndex < images.length - 1 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex + 1); }}
                  style={{ position: 'absolute', right: 'clamp(10px, 5vw, 30px)', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 140, 0, 0.8)', color: '#fff', border: 'none', borderRadius: '50%', width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer', zIndex: 2147483647, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
                >
                  ❯
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './GalleryViewer.module.css';
import ScrollReveal from '@/components/ScrollReveal';

export default function GalleryViewer({ galleries }) {
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

  // Gallery List View (Albums/Categories)
  return (
    <div className={styles.categoryGrid}>
      {galleries && galleries.length > 0 ? (
        galleries.map((gallery, idx) => (
          <ScrollReveal animation="fade-up" delay={(idx % 3) * 100} key={gallery.id}>
            <Link href={`/gallery/${gallery.slug || gallery.id}`} style={{ textDecoration: 'none' }}>
              <div className={`card ${styles.categoryCard}`}>
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
            </Link>
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

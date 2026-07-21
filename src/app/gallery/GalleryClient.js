"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GalleryViewer from '@/components/GalleryViewer';
import styles from './page.module.css';

export default function GalleryClient() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('https://admin.themangobitehotel.com/api/galleries');
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          const data = await res.json();
          if (data && data.status && data.data) {
            setGalleries(data.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch galleries:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <>
      {/* Dynamic Gallery Viewer */}
      <section className={`section animate-fade-in-up ${styles.gallerySection}`} style={{ paddingTop: '0.5rem' }}>
        {/* Mandala decorations */}
        <div className={styles.mandalaWrapperLeft}>
          <img src="/images/mandala-2.png" alt="Mandala Left" className={styles.mandalaImage} />
        </div>
        <div className={styles.mandalaWrapperRight}>
          <img src="/images/mandala-2.png" alt="Mandala Right" className={styles.mandalaImage} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--dark)', marginBottom: '1rem' }}>
            A Glimpse of Luxury
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Take a visual tour of our beautifully crafted spaces and vibrant culinary offerings.
          </p>
          <div style={{ width: '150px', height: '5px', backgroundColor: '#FFD700', margin: '0 auto 3rem auto', borderRadius: '3px' }}></div>
          <h2 style={{ fontSize: '2rem', color: '#FF8C00', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem' }}>
            Our Galleries
          </h2>

          {loading ? (
             <div style={{ textAlign: 'center', padding: '4rem 0' }}>
               <h3 style={{ color: 'var(--primary)' }}>Loading Gallery...</h3>
             </div>
          ) : (
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading Gallery...</div>}>
              <GalleryViewer galleries={galleries} />
            </Suspense>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem', padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>Like what you see?</h2>
            <Link href="/rooms" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Explore Rooms
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

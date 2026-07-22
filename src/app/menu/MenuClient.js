"use client";
import React, { useState, useEffect, Suspense } from 'react';
import MenuGallery from '@/components/MenuGallery';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '@/components/ScrollReveal';

export default function MenuClient() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('https://admin.themangobitehotel.com/api/menus');
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          const data = await res.json();
          if (data && data.status && data.data) {
            const formatted = data.data.map(category => {
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
            setMenuData(formatted);
          }
        }
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  return (
    <>
      <ScrollReveal animation="fade-down" duration={1000}>
        <div className="container" style={{ textAlign: 'center', paddingTop: '0.5rem', paddingBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--dark)', marginBottom: '1rem' }}>
            A Culinary Journey
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            Discover our rich, pure-vegetarian multi-cuisine menu crafted with authentic flavors.
          </p>
          <div style={{ width: '150px', height: '5px', backgroundColor: '#FFD700', margin: '0 auto 1.5rem auto', borderRadius: '3px' }}></div>
        </div>
      </ScrollReveal>

      <section className={styles.doodleSection}>
        <ScrollReveal animation="fade-up" delay={200}>
          <div className={`container ${styles.menuContainer}`}>
            {loading ? (
               <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                 <h3 style={{ color: 'var(--primary)' }}>Loading Menu...</h3>
               </div>
            ) : (
              <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading Menu...</div>}>
                <MenuGallery menuData={menuData} />
              </Suspense>
            )}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

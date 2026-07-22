"use client";
import React, { useState, useEffect } from 'react';
import RoomCard from '@/components/RoomCard';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import ScrollReveal from '@/components/ScrollReveal';

export default function RoomsClient() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch('https://admin.themangobitehotel.com/api/rooms');
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          const data = await res.json();
          if (data && data.status && data.data) {
            const sortedRooms = data.data.sort((a, b) => {
              const priceA = parseInt(a.price) || 0;
              const priceB = parseInt(b.price) || 0;
              if (priceA !== priceB) {
                return priceA - priceB;
              }
              return a.id - b.id;
            });
            setRooms(sortedRooms);
          }
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  return (
    <>
      <ScrollReveal animation="fade-up" duration={1000}>
        <div className="container" style={{ textAlign: 'center', paddingTop: '0.5rem', paddingBottom: '0.2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--dark)', marginBottom: '1rem' }}>
            Heritage Luxury Rooms
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            Experience authentic Kutchi artistry seamlessly blended with world-class modern comfort. Your unforgettable stay in Mandvi begins here.
          </p>
          <div style={{ width: '150px', height: '5px', backgroundColor: '#FFD700', margin: '0 auto 1.5rem auto', borderRadius: '3px' }}></div>
        </div>
      </ScrollReveal>

      {/* Main Rooms Content */}
      <section className="bg-light" style={{ paddingBottom: '5rem', paddingTop: '1rem' }}>
        <div className="container">


          <div className={styles.roomsGrid}>
            {loading ? (
              <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>Loading rooms...</p>
            ) : rooms.length > 0 ? (
              rooms.map((room, idx) => {
                let imageUrl = room.image;
                if (!imageUrl.startsWith('/images/')) {
                  imageUrl = imageUrl.startsWith('/storage')
                    ? `https://admin.themangobitehotel.com${imageUrl}`
                    : `https://admin.themangobitehotel.com/storage/${imageUrl}`;
                }
                return (
                  <ScrollReveal animation="fade-up" delay={(idx % 3) * 150} key={room.id}>
                    <RoomCard
                      id={room.id}
                      title={room.title}
                      description={room.description}
                      imageSrc={imageUrl}
                      price={`From ₹${parseInt(room.price).toLocaleString('en-IN')}/night`}
                    />
                  </ScrollReveal>
                );
              })
            ) : (
              <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>No rooms available at the moment.</p>
            )}
          </div>

        </div>
      </section>

      {/* High-Impact Booking CTA */}
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <ScrollReveal animation="zoom-in">
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Ready for a Memorable Stay?</h2>
            <p className={styles.ctaSubtitle}>
              Our premium heritage rooms are in high demand.<br></br>
              Reserve your space today to experience the finest hospitality in Mandvi, Kutch.
            </p>
            <Link href="/contact" className={styles.ctaBtn}>
              Book Your Stay Now
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}

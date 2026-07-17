import RoomCard from '@/components/RoomCard';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Premium Rooms | Best Hotel in Mandvi Kutch',
  description: 'Discover the luxurious room types available at Mango Bite Hotel & Restaurant in Mandvi Kutch. The best luxury rooms and cheap stays featuring traditional artistry.',
  keywords: 'best luxury rooms in mandvi, a.c. rooms in kutch, deluxe hotel rooms mandvi, cheap and best stay in kutch, mango bite hotel rooms, mandvi beach hotel rooms',
};

export default async function Rooms() {
  let rooms = [];
  try {
    const res = await fetch('https://themangobitehotel.com/api/rooms');
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json();
      if (data && data.status && data.data) {
        rooms = data.data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/images/kutchi_suite.jpg" 
          alt="Premium Suite at Mango Bite" 
          fill 
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent} animate-fade-in-up`}>
          <h1 className={styles.heroTitle}>Heritage Luxury Rooms</h1>
          <p className={styles.heroSubtitle}>
            Experience authentic Kutchi artistry seamlessly blended with world-class modern comfort. Your unforgettable stay in Mandvi begins here.
          </p>
        </div>
      </section>

      {/* Main Rooms Content */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p>
              At Mango Bite Hotel & Restaurant, we offer meticulously designed rooms tailored to meet the needs of every traveler. Check detailed room features, view images, and find the perfect space for your relaxing getaway.
            </p>
            <p style={{ marginTop: '1rem', fontWeight: '500', color: 'var(--dark)' }}>
              Check-In: 12 PM | Check-Out: 12 PM
            </p>
          </div>

          <div className={styles.roomsGrid}>
            {rooms.length > 0 ? (
              rooms.map((room) => {
                let imageUrl = room.image;
                if (!imageUrl.startsWith('/images/')) {
                  imageUrl = imageUrl.startsWith('/storage') 
                    ? `https://themangobitehotel.com${imageUrl}` 
                    : `https://themangobitehotel.com/storage/${imageUrl}`;
                }
                return (
                  <RoomCard 
                    key={room.id}
                    id={room.id}
                    title={room.title}
                    description={room.description}
                    imageSrc={imageUrl}
                    price={`From ₹${parseInt(room.price).toLocaleString('en-IN')}/night`}
                  />
                );
              })
            ) : (
              <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>No rooms available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* High-Impact Booking CTA */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaContent}`}>
          <h2 className={styles.ctaTitle}>Ready for a Memorable Stay?</h2>
          <p className={styles.ctaSubtitle}>
            Our premium heritage rooms are in high demand. Reserve your space today to experience the finest hospitality in Mandvi, Kutch.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>
            Book Your Stay Now
          </Link>
        </div>
      </section>
    </>
  );
}

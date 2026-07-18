import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Coffee, BedDouble, Calendar, Users, PhoneCall, Utensils } from 'lucide-react';
import styles from './page.module.css';
import RoomCard from '@/components/RoomCard';
import MenuSlider from '@/components/MenuSlider';

export default async function Home() {
  let rooms = [];
  let menusData = [];
  try {
    const resRooms = await fetch('https://admin.themangobitehotel.com/api/rooms');
    if (resRooms.ok && resRooms.headers.get('content-type')?.includes('application/json')) {
      const data = await resRooms.json();
      if (data && data.status && data.data) {
        rooms = data.data.slice(0, 3);
      }
    }
    
    const resMenus = await fetch('https://admin.themangobitehotel.com/api/menus');
    if (resMenus.ok && resMenus.headers.get('content-type')?.includes('application/json')) {
      const data = await resMenus.json();
      if (data && data.status && data.data) {
        menusData = data.data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch data for home:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <video
          autoPlay
          muted
          playsInline
          className={styles.heroBgImage}
        >
          <source src="/videos/a.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.homeContainer} ${styles.heroContent} animate-fade-in-up`}>
          <h1 className={styles.heroTitle}>
            Experience Authentic Kutch Heritage at <span className={styles.highlight}>Mango Bite</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A premium pure-vegetarian hotel & multi-cuisine restaurant in Mandvi, blending modern luxury with traditional artistry.
          </p>
          <div className={styles.heroActions}>
            <Link href="/rooms" className="btn btn-primary">
              Book a Room <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link href="/menu" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Overview with Kutchi Pattern */}
      <section className="section bg-light bg-kutchi-pattern">
        <div className={`container ${styles.homeContainer}`}>
          <div className={styles.featuresGrid}>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><MapPin size={40} /></div>
              <h3>Prime Location</h3>
              <p>Located on Mandvi Highway in Maska, just 3.4 km from the beautiful Mandvi Beach.</p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Coffee size={40} /></div>
              <h3>Multi-Cuisine Restaurant</h3>
              <p>A vibrant dining experience offering authentic North Indian, South Indian, and Continental flavors.</p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><BedDouble size={40} /></div>
              <h3>Heritage Rooms</h3>
              <p>Rooms featuring traditional Lippan art and modern amenities for an unforgettable stay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Section (Kake Di Hatti Inspired) */}
      <section className={`section ${styles.restaurantWrapper}`}>
        {/* Animated Mango Decorations */}
        <img src="/images/keri.png?v=5" alt="Mango Decoration" className={styles.keriDecoration} />
        <img src="/images/keri.png?v=5" alt="Mango Decoration 2" className={styles.keriDecoration2} />

        <div className={`container ${styles.homeContainer} ${styles.restaurantSection}`}>
          <div className={styles.restaurantContent}>
            <h4 className={styles.sectionEyebrow}>Culinary Excellence</h4>
            <h2 className="section-title left-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              The Mango Bite Experience
            </h2>
            <p className={styles.descriptionText}>
              Indulge in a culinary journey at our highly rated, pure-vegetarian multi-cuisine restaurant. Inspired by legendary Indian eateries, we offer a vibrant, rich, and modern dining atmosphere. Enjoy our signature dishes surrounded by traditional Kutchi colors and warm hospitality.
            </p>
            <Link href="/menu" className="btn btn-primary highlight-btn" style={{ marginTop: '2rem' }}>
              <Utensils size={18} style={{ marginRight: '8px' }} /> Explore Our Menu <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
          <div className={styles.restaurantImageWrapper}>
            <Image 
              src="/images/kutchi_restaurant.jpg" 
              alt="Mango Bite Restaurant Interior" 
              fill 
              className={styles.roundedImage}
            />
            <div className={styles.experienceBadge}>
              <span className={styles.badgeNumber}>10+</span>
              <span className={styles.badgeText}>Years of Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Menu Slider (Replaces Marquee) */}
      <section className={styles.marqueeSection} style={{ padding: '0' }}>
        <div className={`container ${styles.homeContainer}`} style={{ marginBottom: '1rem', marginTop: '4rem' }}>
          <h2 className="section-title">Our Menu Specialties</h2>
        </div>
        <MenuSlider menus={menusData} />
      </section>

      {/* Featured Rooms (Fern Residency Inspired) */}
      <section className={`section ${styles.roomsSectionWithBg}`}>
        <div className={styles.roomsSectionOverlay}></div>
        <div className={`container ${styles.homeContainer} ${styles.roomsContentContainer}`}>
          <h2 className="section-title">Premium Heritage Rooms</h2>
          <div className={styles.roomsGrid}>
            {rooms.length > 0 ? (
              rooms.map((room) => {
                let imageUrl = room.image;
                if (!imageUrl.startsWith('/images/')) {
                  imageUrl = imageUrl.startsWith('/storage') 
                    ? `https://admin.themangobitehotel.com${imageUrl}` 
                    : `https://admin.themangobitehotel.com/storage/${imageUrl}`;
                }
                return (
                  <RoomCard 
                    key={room.id}
                    id={room.id}
                    title={room.title}
                    description={room.description}
                    imageSrc={imageUrl}
                    price={`From ₹${parseInt(room.price).toLocaleString('en-IN')}/night`}
                    showBookNow={false}
                  />
                );
              })
            ) : (
              <p style={{ textAlign: 'center', width: '100%', color: 'white' }}>No rooms available at the moment.</p>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

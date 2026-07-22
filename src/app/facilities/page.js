import { Wifi, Car, Wind, ShieldAlert, Briefcase, HeartPulse, Droplet, Coffee, Check, ArrowRight, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Facilities | Best Hotel & Banquet in Mandvi Kutch',
  description: 'Explore the premium facilities, banquet halls, party plot, and health services at Mango Bite Hotel, the best luxury stay in Mandvi Kutch.',
  keywords: 'party plot in mandvi, banquet hall in kutch, wedding venue mandvi, kitty party place kutch, hotel facilities mandvi, luxury stay in kutch, mango bite amenities',
};

export default function Facilities() {
  const facilityCategories = [
    {
      category: 'Events & Celebrations',
      icon: <Users size={32} />,
      items: ['Spacious Party Plot', 'A.C. Banquet Hall', 'Birthday & Kitty Parties', 'Anniversaries & Get-Togethers']
    },
    {
      category: 'Dining & Leisure',
      icon: <Coffee size={32} />,
      items: ['Multi-Cuisine Restaurant', 'Premium Cigar Lounge', 'In-Room Dining']
    },
    {
      category: 'Comfort & Convenience',
      icon: <Wifi size={32} />,
      items: ['High-Speed Free Wi-Fi', 'Complimentary Parking', 'Climate Control (AC)', 'Professional Laundry Service']
    },
    {
      category: 'Guest Services',
      icon: <Briefcase size={32} />,
      items: ['24/7 Reception', 'Dedicated Concierge', 'Luggage Assistance', 'Travel Desk']
    },
    {
      category: 'In-Room Luxuries',
      icon: <Droplet size={32} />,
      items: ['Plush Bathtubs', 'Private Balconies', 'Premium Toiletries', 'Daily Housekeeping']
    },
    {
      category: 'Safety & Security',
      icon: <ShieldAlert size={32} />,
      items: ['24/7 CCTV Surveillance', 'Fire Safety Systems', 'Secure Keycard Access', 'Security Guards']
    }
  ];

  return (
    <>
      <ScrollReveal animation="fade-down" duration={1000}>
        <div className="container" style={{ textAlign: 'center', paddingTop: '0.5rem', paddingBottom: '1rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--dark)', marginBottom: '1rem' }}>
            World-Class Facilities
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            Experience the perfect blend of modern luxury and traditional Kutch hospitality, designed for your utmost comfort and convenience.
          </p>
          <div style={{ width: '150px', height: '5px', backgroundColor: '#FFD700', margin: '0 auto 1.5rem auto', borderRadius: '3px' }}></div>
        </div>
      </ScrollReveal>

      {/* Main Facilities Grid */}
      <section className="bg-light" style={{ paddingBottom: '5rem', paddingTop: '1.8rem' }}>
        <div className="container">
          <div className={styles.grid}>
            {facilityCategories.map((cat, index) => (
              <ScrollReveal animation="fade-up" delay={(index % 3) * 150} key={index}>
                <div className={styles.facilityCard}>
                  <div className={styles.iconWrapper}>
                    {cat.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{cat.category}</h3>
                  <ul className={styles.itemList}>
                    {cat.items.map((item, i) => (
                      <li key={i} className={styles.item}>
                        <Check size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* High Impact CTA */}
          <ScrollReveal animation="zoom-in" delay={200}>
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>Ready to Experience Mango Bite?</h2>
              <p className={styles.ctaSubtitle}>
                Whether you are planning a relaxing getaway, a business trip, or a special dining experience, our world-class facilities and warm hospitality await you. Get in touch with us today!
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className="btn btn-primary">
                  Contact Us <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link href="/rooms" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                  Explore Rooms
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

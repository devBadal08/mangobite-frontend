import FAQ from '@/components/FAQ';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us | Best Hotel & Restaurant in Mandvi Kutch',
  description: 'Learn about Mango Bite Hotel & Restaurant, the best place for a luxury stay and pure-veg dining in Mandvi, Kutch. Discover our Kutchi heritage and world-class hospitality.',
  keywords: 'about mango bite hotel, best hotel in kutch, mandvi tourism stay, kutchi hospitality, top pure veg restaurant mandvi',
};

export default function About() {
  const faqData = [
    {
      question: "How many types of rooms are available at Mango Bite Hotel & Restaurant?",
      answer: "We offer 3 premium room types: Deluxe Room, Super Deluxe Room, and Suite Room. Each room is meticulously designed with a blend of modern comfort and traditional Kutchi artistry."
    },
    {
      question: "How far is Mango Bite Hotel & Restaurant from the city center?",
      answer: "We are located in Maska, just 3.4 km from the serene Mandvi Beach, and about 21.2 kms from the Bhuj City Center. It offers a perfect balance of connectivity and peacefulness."
    },
    {
      question: "What are the customer ratings for Mango Bite Hotel & Restaurant?",
      answer: "Our overall rating stands at a proud 4.25 out of 5 on MakeMyTrip. We consistently strive to provide 5-star hospitality to all our guests."
    },
    {
      question: "What are the Check-In and Check-Out times?",
      answer: "Check-In Time: 12:00 PM (Noon). Check-Out Time: 12:00 PM (Noon). Early check-ins and late check-outs are subject to availability and prior request."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/images/hotel_hero.jpg" 
          alt="Mango Bite Hotel Exterior" 
          fill 
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent} animate-fade-in-up`}>
          <h1 className={styles.heroTitle}>Our Heritage Story</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: '300', opacity: '0.9' }}>
            Where traditional Kutchi warmth meets world-class modern hospitality.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyContent}>
            <h2>Welcome to Mango Bite</h2>
            <p>
              Located prominently on the Mandvi Highway in Maska, Gujarat, Mango Bite Hotel & Restaurant is a premium pure-vegetarian property designed for travelers who seek comfort, luxury, and authentic flavors.
            </p>
            <p>
              Just 3.4 km from the serene shores of Mandvi Beach, our property stands as a beacon of hospitality. Whether you are visiting for a peaceful getaway, a family vacation, or a culinary adventure, our dedicated team ensures your experience is nothing short of extraordinary.
            </p>
            <Link href="/rooms" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Explore Our Rooms
            </Link>
          </div>
          <div className={styles.storyImageWrapper}>
            <Image 
              src="/images/about.png" 
              alt="About Mango Bite" 
              fill 
              className={styles.storyImage}
            />
          </div>
        </div>
      </section>

      <div className="container">
        {/* Reviews Section */}
        <div className={styles.ratingSection}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>Trusted by Travelers</h2>
          <div className={styles.stars}>
            <Star fill="currentColor" size={32} />
            <Star fill="currentColor" size={32} />
            <Star fill="currentColor" size={32} />
            <Star fill="currentColor" size={32} />
            <Star fill="currentColor" size={32} style={{ clipPath: 'inset(0 75% 0 0)' }} />
          </div>
          <p className={styles.ratingText}>4.25 / 5 on MakeMyTrip</p>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Based on verified guest reviews.</p>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
          <FAQ faqData={faqData} />
        </div>
      </div>
    </>
  );
}

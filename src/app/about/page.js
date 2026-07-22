import FAQ from '@/components/FAQ';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import ScrollReveal from '@/components/ScrollReveal';

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
      <ScrollReveal animation="fade-down" duration={1000}>
        <div className="container" style={{ textAlign: 'center', paddingTop: '0.5rem', paddingBottom: '1rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--dark)', marginBottom: '1rem' }}>
            Our Heritage Story
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            Where traditional Kutchi warmth meets world-class modern hospitality.
          </p>
          <div style={{ width: '150px', height: '5px', backgroundColor: '#FFD700', margin: '0 auto 1.5rem auto', borderRadius: '3px' }}></div>
        </div>
      </ScrollReveal>

      {/* Story Section */}
      <section className={styles.storySection} style={{ position: 'relative' }}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyContent}>
            <ScrollReveal animation="fade-right">
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
            </ScrollReveal>
          </div>
          <div className={styles.storyImageWrapper}>
            <ScrollReveal animation="fade-left" delay={200}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src="/images/about.png"
                  alt="About Mango Bite"
                  fill
                  className={styles.storyImage}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="container">
        {/* FAQ Section */}
        <ScrollReveal animation="fade-up">
          <div className={styles.faqSection}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
            <FAQ faqData={faqData} />
          </div>
        </ScrollReveal>

        {/* Reviews Section as CTA */}
        <ScrollReveal animation="zoom-in">
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Trusted by Travelers</h2>
            <div className={styles.stars}>
              <Star fill="currentColor" size={32} />
              <Star fill="currentColor" size={32} />
              <Star fill="currentColor" size={32} />
              <Star fill="currentColor" size={32} />
              <Star fill="currentColor" size={32} style={{ clipPath: 'inset(0 75% 0 0)' }} />
            </div>
            <p className={styles.ctaTitle} style={{ marginBottom: '0.5rem', marginTop: '1rem', fontSize: '2rem' }}>4.25 / 5 on MakeMyTrip</p>
            <p className={styles.ctaSubtitle} style={{ marginBottom: '0' }}>Based on verified guest reviews.</p>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}

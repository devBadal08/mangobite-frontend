import { Check } from 'lucide-react';
import styles from './RoomCard.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function RoomCard({ id, title, description, imageSrc, price, showBookNow = true }) {
  const whatsappNumber = '918490991577'; // Karan Singh
  const whatsappMessage = encodeURIComponent(`Hello, I want to book the ${title}.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {imageSrc ? (
          <Image src={imageSrc} alt={title} fill className={styles.image} />
        ) : (
          <div className={styles.placeholderImage}>Room Image</div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        
        <div 
          className={styles.backendContent} 
          dangerouslySetInnerHTML={{ 
            __html: description
              ?.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, '') // Remove heading (duplicate title)
              ?.replace(/<p>[^<]*?(?:<strong>)?(?:Room Information|Why Choose This Room\?|Room Amenities|Room Features)(?:<\/strong>)?[^<]*?<\/p>/gi, '') // Remove orphaned list titles
              ?.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, '') // Remove bullet lists
          }} 
        />
        
        <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)', marginTop: 'auto', marginBottom: '15px' }}>
          {price}
        </div>

        <div className={styles.footer} style={{ display: 'flex', gap: '10px' }}>
          <Link href={`/rooms/${id}`} className={styles.bookButton} style={{ background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', fontSize: '0.9rem', padding: '10px 15px' }}>
            Details
          </Link>
          {showBookNow && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.bookButton} style={{ fontSize: '0.9rem', padding: '10px 15px' }}>
              Book Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

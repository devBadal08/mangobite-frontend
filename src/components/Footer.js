import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Brand & About */}
        <div className={styles.footerSection}>
          <Link href="/" className={styles.logo}>
            Mango Bite
            <span className={styles.logoSubtitle}>Hotel & Restaurant</span>
          </Link>
          <p className={styles.aboutText}>
            A premium pure-vegetarian hotel and multi-cuisine restaurant located in Maska, Gujarat. Just 3.4 km from Mandvi Beach, offering an unforgettable stay and dining experience.
          </p>
          <div className={styles.socials}>
            <a 
              href="https://instagram.com/mango_bite_mandvi" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/rooms">Our Rooms</Link></li>
            <li><Link href="/facilities">Facilities</Link></li>
            <li><Link href="/menu">Restaurant Menu</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading} style={{ color: 'white' }}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={20} className={styles.contactIcon} style={{ flexShrink: 0 }} />
              <span>Usha Park, Nr. Reliance Petrol Pump, Mandvi-Bhuj Highway, Mandvi-Kutch. 370465</span>
            </li>
            <li>
              <Phone size={20} className={styles.contactIcon} style={{ flexShrink: 0 }} />
              <span>+91 84909 91577<br/>+91 73599 73699</span>
            </li>
            <li>
              <Mail size={20} className={styles.contactIcon} style={{ flexShrink: 0 }} />
              <span>themangobitehotelandrestaurant@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Mango Bite Hotel & Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Menu', path: '/menu' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} glass`}>
      <div className="container">
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            Mango Bite
            <span className={styles.logoSubtitle}>Hotel & Restaurant</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.desktopNav}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.path} 
                  className={styles.navLink}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://wa.me/918490991577?text=Hello%20Mango%20Bite%20Hotel,%20I%20would%20like%20to%20book%20a%20room." target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book Now</a>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.path} 
                className={styles.mobileNavLink}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <a 
              href="https://wa.me/918490991577?text=Hello%20Mango%20Bite%20Hotel,%20I%20would%20like%20to%20book%20a%20room." 
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', display: 'block', textAlign: 'center' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

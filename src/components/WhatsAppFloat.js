import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppFloat.module.css';

export default function WhatsAppFloat() {
  // Use official number or placeholder
  const phoneNumber = "918490991577"; 
  const message = "Hello Mango Bite Hotel, I would like to book a room or request room service.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.floatButton}
      aria-label="Book Now via WhatsApp"
    >
      <div className={styles.iconContainer}>
        <MessageCircle size={28} />
      </div>
      <span className={styles.tooltip}>Book Now via WhatsApp</span>
    </a>
  );
}

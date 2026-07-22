import { MapPin, Phone, Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Contact Us | Mango Bite Hotel & Restaurant Mandvi',
  description: 'Get in touch with Mango Bite Hotel & Restaurant in Mandvi, Gujarat for room bookings, restaurant reservations, and banquet hall inquiries.',
  keywords: 'contact mango bite hotel, hotel booking mandvi kutch, restaurant reservation mandvi, best hotel in kutch contact, mandvi gujarat hotel number',
};

export default function Contact() {
  return (
    <div className="container section">
      <ScrollReveal animation="fade-down" duration={1000}>
        <h1 className="section-title" style={{ color: '#000' }}>Contact Us</h1>
      </ScrollReveal>
      
      <div className="contact-wrapper">
        {/* Camel sitting on the card */}
        <img src="/images/contact-camel-clean.png" alt="Decorative Camel" className="contact-graphic" />
        
        <div className="responsive-grid">
          
          {/* Contact Info */}
        <ScrollReveal animation="fade-right" delay={100} style={{ width: '100%' }}>
          <div className="card contact-card">
            <h2 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.4rem' }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.85rem' }}>
              We'd love to hear from you. Whether you have a question about room availability, pricing, or our multi-cuisine menu, our team is ready to answer all your questions.
            </p>
            
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                <MapPin style={{ color: 'var(--primary)', width: '20px' }} />
                <div>
                  <span style={{ fontWeight: 600 }}>Address</span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Usha Park, Nr. Reliance Petrol Pump, Mandvi-Bhuj Highway, Mandvi-Kutch. 370465</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                <Phone style={{ color: 'var(--primary)', width: '20px' }} />
                <div>
                  <span style={{ fontWeight: 600 }}>Phone No.</span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <a href="tel:+918490991577" style={{ color: 'inherit', textDecoration: 'none' }}>+91 84909 91577</a><br/>
                    <a href="tel:+917359973699" style={{ color: 'inherit', textDecoration: 'none' }}>+91 73599 73699</a>
                  </p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                <Mail style={{ color: 'var(--primary)', width: '20px', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontWeight: 600 }}>Email</span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                    <a href="mailto:themangobitehotelandrestaurant@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>themangobitehotelandrestaurant@gmail.com</a>
                  </p>
                </div>
              </li>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>Follow Us</span>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: '#1877F2' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.19-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://instagram.com/mango_bite_mandvi" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: '#E1306C' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  {/* WhatsApp */}
                  <a href="https://wa.me/918490991577" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: '#25D366' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: '#FF0000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fff"></polygon></svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal animation="fade-left" delay={250} style={{ width: '100%' }}>
          <div className="card contact-card">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.4rem' }}>Send us a Message</h2>
            <ContactForm />
          </div>
        </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

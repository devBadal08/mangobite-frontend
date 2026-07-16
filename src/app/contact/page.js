import { MapPin, Phone, Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Mango Bite Hotel & Restaurant Mandvi',
  description: 'Get in touch with Mango Bite Hotel & Restaurant in Mandvi, Gujarat for room bookings, restaurant reservations, and banquet hall inquiries.',
  keywords: 'contact mango bite hotel, hotel booking mandvi kutch, restaurant reservation mandvi, best hotel in kutch contact, mandvi gujarat hotel number',
};

export default function Contact() {
  return (
    <div className="container section animate-fade-in-up">
      <h1 className="section-title">Contact Us</h1>
      
      <div style={{ position: 'relative', marginTop: '3rem' }}>
        {/* Camel sitting on the card */}
        <img src="/images/contact-camel-clean.png" alt="Decorative Camel" className="contact-graphic" />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {/* Contact Info */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Get in Touch</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            We'd love to hear from you. Whether you have a question about room availability, pricing, or our multi-cuisine menu, our team is ready to answer all your questions.
          </p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <MapPin style={{ color: 'var(--primary)' }} />
              <div>
                <strong>Address</strong>
                <p style={{ color: 'var(--text-muted)' }}>Usha Park, Nr. Reliance Petrol Pump, Mandvi-Bhuj Highway, Mandvi-Kutch. 370465</p>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <Phone style={{ color: 'var(--primary)' }} />
              <div>
                <strong>Phone (Karan Singh)</strong>
                <p style={{ color: 'var(--text-muted)' }}>+91 84909 91577<br/>+91 73599 73699</p>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <Mail style={{ color: 'var(--primary)' }} />
              <div>
                <strong>Email</strong>
                <p style={{ color: 'var(--text-muted)' }}>themangobitehotelandrestaurant<br/>@gmail.com</p>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <div>
                <strong>Instagram</strong>
                <p style={{ color: 'var(--text-muted)' }}>
                  <a href="https://instagram.com/mango_bite_mandvi" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    @mango_bite_mandvi
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Send us a Message</h2>
          <ContactForm />
        </div>
        </div>
      </div>
    </div>
  );
}

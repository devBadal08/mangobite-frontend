"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Send data to Backend
      const res = await fetch('https://admin.themangobitehotel.com/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        // 2. Open WhatsApp Redirect
        // Format message for WhatsApp
        const waNumber = "918490991577"; // Karan Singh
        const text = `*New Contact Form Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone_no}%0A*Message:* ${formData.message}`;
        window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
        
        // 3. Show Success State
        setIsSuccess(true);
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setErrorMsg('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }} className="animate-fade-in-up">
        <div style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>✓</div>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--dark)', marginBottom: '1rem' }}>Thank You!</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Thanks for visited our web site and contact to us shortly
        </p>
        <button 
          className="btn btn-outline" 
          style={{ marginTop: '2rem' }}
          onClick={() => {
            setIsSuccess(false);
            setFormData({ name: '', email: '', phone_no: '', message: '' });
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {errorMsg && (
        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '4px', fontSize: '0.9rem' }}>
          {errorMsg}
        </div>
      )}
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name</label>
        <input 
          type="text" 
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} 
          placeholder="Your Name" 
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
        <input 
          type="email" 
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} 
          placeholder="Your Email" 
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number</label>
        <input 
          type="tel" 
          name="phone_no"
          required
          value={formData.phone_no}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} 
          placeholder="Your Phone Number" 
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message</label>
        <textarea 
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows="4" 
          style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', resize: 'vertical' }} 
          placeholder="How can we help you?"
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

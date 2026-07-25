"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function RoomGalleryClient({ title, images }) {
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (!images || images.length === 0) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ marginBottom: '40px', paddingTop: '10px' }}>
      <h3 style={{ color: 'var(--primary)', marginBottom: '25px', fontSize: '1.5rem', borderBottom: '2px solid rgba(197, 85, 59, 0.2)', paddingBottom: '10px', display: 'inline-block' }}>Room Gallery</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
        {images.map((img, idx) => (
          <div key={idx} onClick={() => setSelectedIdx(idx)} style={{ position: 'relative', height: '180px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(230, 126, 34, 0.15)', cursor: 'pointer' }}>
             <Image src={img} alt={`${title} - Image ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
             {/* Hover overlay */}
             <div 
               style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
               onMouseEnter={(e) => e.currentTarget.style.opacity = 1} 
               onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
             >
               <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', padding: '10px 20px', border: '2px solid white', borderRadius: '30px' }}>
                 View Full
               </span>
             </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIdx !== null && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.95)', zIndex: 2147483640, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} onClick={() => setSelectedIdx(null)}>
          <button 
            style={{ position: 'absolute', top: '120px', right: 'clamp(10px, 5vw, 30px)', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', padding: 'clamp(4px, 1vw, 8px) clamp(8px, 2vw, 16px)', borderRadius: '30px', cursor: 'pointer', zIndex: 2147483647, transition: 'background 0.3s', fontWeight: 'bold' }} 
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'} 
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} 
            onClick={() => setSelectedIdx(null)}
          >
            Close ✕
          </button>
          
          <button style={{ position: 'absolute', left: 'clamp(5px, 2vw, 20px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2rem)', width: 'clamp(40px, 8vw, 60px)', height: 'clamp(40px, 8vw, 60px)', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2147483647, transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onClick={handlePrev}>←</button>

          <div style={{ position: 'relative', width: '90vw', height: '65vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }} onClick={(e) => e.stopPropagation()}>
            <img src={images[selectedIdx]} alt={`Fullscreen View`} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', borderRadius: '8px' }} />
          </div>
          
          <button style={{ position: 'absolute', right: 'clamp(5px, 2vw, 20px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2rem)', width: 'clamp(40px, 8vw, 60px)', height: 'clamp(40px, 8vw, 60px)', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2147483647, transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onClick={handleNext}>→</button>

          <div style={{ color: 'white', marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
            {selectedIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

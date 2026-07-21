import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { Check, Maximize, Users, BedDouble, Snowflake, Wifi, Tv, Bath, Droplet, Sparkles, Shirt, Ban, Heart, Coffee, Star, Smile, Bell } from 'lucide-react';

const getAmenityIcon = (text) => {
  const t = text.toLowerCase();
  if (t.includes('room size')) return <Maximize size={18} color="var(--primary)" />;
  if (t.includes('occupancy') || t.includes('adult') || t.includes('family') || t.includes('families') || t.includes('group') || t.includes('friend')) return <Users size={18} color="var(--primary)" />;
  if (t.includes('couple')) return <Heart size={18} color="var(--primary)" />;
  if (t.includes('bed')) return <BedDouble size={18} color="var(--primary)" />;
  if (t.includes('air conditioning') || t.includes(' ac ') || t.includes('ac room')) return <Snowflake size={18} color="var(--primary)" />;
  if (t.includes('wi-fi') || t.includes('wifi')) return <Wifi size={18} color="var(--primary)" />;
  if (t.includes('tv') || t.includes('television')) return <Tv size={18} color="var(--primary)" />;
  if (t.includes('bathroom') || t.includes('hot & cold') || t.includes('shower')) return <Bath size={18} color="var(--primary)" />;
  if (t.includes('drinking water') || t.includes('room service') || t.includes('tea')) return <Coffee size={18} color="var(--primary)" />;
  if (t.includes('toiletries') || t.includes('towel')) return <Droplet size={18} color="var(--primary)" />;
  if (t.includes('housekeeping')) return <Sparkles size={18} color="var(--primary)" />;
  if (t.includes('wardrobe')) return <Shirt size={18} color="var(--primary)" />;
  if (t.includes('smoking')) return <Ban size={18} color="var(--primary)" />;
  if (t.includes('recommend')) return <Star size={18} color="var(--primary)" />;
  if (t.includes('comfort') || t.includes('peaceful') || t.includes('relaxing')) return <Smile size={18} color="var(--primary)" />;
  return <Check size={18} color="var(--primary)" />;
};

export async function generateStaticParams() {
  try {
    const res = await fetch('https://admin.themangobitehotel.com/api/rooms');
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json();
      if (data && data.status && data.data) {
        return data.data.map((room) => ({
          id: room.id.toString(),
        }));
      }
    }
  } catch (error) {
    console.error('Failed to fetch rooms for static params:', error);
  }
  return [{ id: '1' }, { id: '2' }, { id: '3' }]; // Fallback dummy IDs so build doesn't fail
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let title = 'Room Details | Best Hotel in Mandvi Kutch';
  try {
    const res = await fetch(`https://admin.themangobitehotel.com/api/rooms/${id}`);
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json();
      if (data && data.status && data.data) {
        title = `${data.data.title} | Mango Bite Hotel Mandvi`;
      }
    }
  } catch (error) { }

  return {
    title,
    description: `Book the ${title} at Mango Bite Hotel & Restaurant in Mandvi, Kutch. The best luxury rooms and cheap stays featuring traditional artistry.`,
    keywords: 'best luxury rooms in mandvi, a.c. rooms in kutch, deluxe hotel rooms mandvi, cheap and best stay in kutch, mango bite hotel rooms, mandvi beach hotel rooms',
  };
}

export default async function RoomDetails({ params }) {
  const { id } = await params;

  let room = null;
  try {
    const res = await fetch(`https://admin.themangobitehotel.com/api/rooms/${id}`);
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json();
      if (data && data.status && data.data) {
        room = data.data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch room details:', error);
  }

  if (!room) {
    notFound();
  }

  // Handle Main Image URL
  let mainImageUrl = room.image;
  if (mainImageUrl && !mainImageUrl.startsWith('/images/')) {
    mainImageUrl = mainImageUrl.startsWith('/storage')
      ? `https://admin.themangobitehotel.com${mainImageUrl}`
      : `https://admin.themangobitehotel.com/storage/${mainImageUrl}`;
  }

  // WhatsApp setup
  const whatsappNumber = '918490991577'; // Karan Singh
  const whatsappMessage = encodeURIComponent(`Hello, I would like to book the ${room.title}.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #fcfaf8 0%, #f4eee6 100%)',
      minHeight: '100vh', 
      padding: '120px 0 60px',
      position: 'relative'
    }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Back Button */}
        <BackButton style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '20px', textDecoration: 'none', fontWeight: '600', backgroundColor: '#fff', padding: '8px 16px', borderRadius: '50px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          &larr; Back
        </BackButton>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', backgroundColor: '#ffffff', border: '1px solid rgba(197, 85, 59, 0.2)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 50px rgba(0,0,0,0.08)' }}>
          {/* Main Image Hero */}
          <div style={{ position: 'relative', width: '100%', height: '55vh', minHeight: '450px' }}>
            {mainImageUrl ? (
              <Image src={mainImageUrl} alt={room.title} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image Available</div>
            )}
            
            {/* Elegant Gradient Overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}></div>
            
            {/* Floating Title & Price Badge */}
            <div style={{ position: 'absolute', bottom: '30px', left: '40px', right: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', color: '#fff', padding: '6px 15px', borderRadius: '20px', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Premium Stay</div>
                <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: 0, textShadow: '2px 2px 10px rgba(0,0,0,0.5)', fontFamily: 'var(--font-heading)' }}>{room.title}</h1>
              </div>
              <div style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '12px 25px', borderRadius: '30px', fontSize: '1.5rem', fontWeight: '700', boxShadow: '0 8px 25px rgba(197, 85, 59, 0.4)', display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                ₹{parseInt(room.price).toLocaleString('en-IN')} <span style={{ fontSize: '1rem', fontWeight: '500', opacity: 0.9 }}>/night</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ padding: '0 40px 40px 40px', marginTop: '30px' }}>

            {/* Extracted Description logic */}
            {(() => {
              let cleanDesc = room.description || '';
              // Remove the very first heading (which is a duplicate title)
              cleanDesc = cleanDesc.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/i, '');
              // Remove orphaned paragraphs that were titles for the lists
              cleanDesc = cleanDesc.replace(/<p>[^<]*?(?:<strong>)?(?:Room Information|Why Choose This Room\?|Room Amenities|Room Features)(?:<\/strong>)?[^<]*?<\/p>/gi, '');
              
              // Extract lists
              const listItems = [];
              const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
              let match;
              while ((match = liRegex.exec(room.description || '')) !== null) {
                listItems.push(match[1].replace(/<[^>]*>?/gm, '').trim());
              }

              // Remove the lists from the clean description
              cleanDesc = cleanDesc.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, '');

              return (
                <>
                  <div
                    style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px' }}
                    dangerouslySetInnerHTML={{ __html: cleanDesc }}
                  />

                  {listItems.length > 0 && (
                    <div style={{ marginBottom: '40px' }}>
                      <h3 style={{ color: 'var(--primary)', marginBottom: '25px', fontSize: '1.5rem', borderBottom: '2px solid rgba(197, 85, 59, 0.2)', paddingBottom: '10px', display: 'inline-block' }}>Key Features & Amenities</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                        {listItems.map((item, idx) => (
                          <div key={idx} style={{
                            backgroundColor: '#fff',
                            backgroundImage: 'linear-gradient(to right, rgba(197, 85, 59, 0.05), rgba(255, 255, 255, 0))',
                            borderTop: '1px solid rgba(197, 85, 59, 0.15)',
                            borderRight: '1px solid rgba(197, 85, 59, 0.15)',
                            borderBottom: '1px solid rgba(197, 85, 59, 0.15)',
                            borderLeft: '4px solid var(--primary)',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            color: '#333',
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease'
                          }}>
                            <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(197, 85, 59, 0.15)' }}>
                              {getAmenityIcon(item)}
                            </div>
                            <span style={{ flex: 1, fontSize: '0.95rem', lineHeight: '1.4' }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#25D366', color: '#fff', padding: '12px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease' }}>
                <svg xmlns="http://www.w3.org/-2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                Book Now via WhatsApp
              </a>
            </div>

            {/* Gallery (if sub_images exist) */}
            {room.sub_images && room.sub_images.length > 0 && (
              <div style={{ marginTop: '50px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '20px', fontSize: '1.5rem' }}>Room Gallery</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                  {room.sub_images.map((img, idx) => {
                    let subImgUrl = img;
                    if (!subImgUrl.startsWith('/images/')) {
                      subImgUrl = subImgUrl.startsWith('/storage')
                        ? `https://admin.themangobitehotel.com${subImgUrl}`
                        : `https://admin.themangobitehotel.com/storage/${subImgUrl}`;
                    }
                    return (
                      <div key={idx} style={{ position: 'relative', height: '200px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        <Image src={subImgUrl} alt={`${room.title} - Image ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

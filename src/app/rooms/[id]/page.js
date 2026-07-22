import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { Check, Maximize, Users, BedDouble, Snowflake, Wifi, Tv, Bath, Droplet, Sparkles, Shirt, Ban, Heart, Coffee, Star, Smile, Bell } from 'lucide-react';

const getAmenityEmoji = (text) => {
  const t = text.toLowerCase();
  if (t.includes('room size')) return '📏';
  if (t.includes('occupancy') || t.includes('adult') || t.includes('family') || t.includes('families') || t.includes('group') || t.includes('friend')) return '👥';
  if (t.includes('couple')) return '💑';
  if (t.includes('bed')) return '🛏️';
  if (t.includes('air conditioning') || t.includes(' ac ') || t.includes('ac room')) return '❄️';
  if (t.includes('wi-fi') || t.includes('wifi')) return '📶';
  if (t.includes('tv') || t.includes('television')) return '📺';
  if (t.includes('bathroom') || t.includes('hot & cold') || t.includes('shower')) return '🛀';
  if (t.includes('drinking water') || t.includes('room service') || t.includes('tea')) return '☕';
  if (t.includes('toiletries') || t.includes('towel')) return '🧴';
  if (t.includes('housekeeping')) return '🧹';
  if (t.includes('wardrobe')) return '🚪';
  if (t.includes('smoking')) return '🚭';
  if (t.includes('recommend')) return '⭐';
  if (t.includes('comfort') || t.includes('peaceful') || t.includes('relaxing')) return '😌';
  return '✨';
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
    const res = await fetch(`https://admin.themangobitehotel.com/api/rooms/${id}`, { cache: 'no-store' });
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', backgroundColor: '#ffffff', border: '1px solid rgba(197, 85, 59, 0.2)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 50px rgba(0,0,0,0.08)', padding: '30px' }}>
          
          {/* Top Section: Split Layout */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'stretch' }}>
            
            {/* Left: Full Main Image */}
            <div style={{ flex: '1 1 55%', position: 'relative', minHeight: '400px', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fcfaf8', border: '1px solid rgba(0,0,0,0.05)' }}>
              {mainImageUrl ? (
                <Image src={mainImageUrl} alt={room.title} fill style={{ objectFit: 'contain' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image Available</div>
              )}
            </div>
            
            {/* Right: Name, Price and Actions Card */}
            <div style={{ flex: '1 1 35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fdfdfd', borderRadius: '15px', padding: '40px', border: '1px solid rgba(197, 85, 59, 0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
               <div style={{ display: 'inline-block', backgroundColor: 'rgba(197, 85, 59, 0.1)', color: 'var(--primary)', padding: '6px 15px', borderRadius: '20px', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', alignSelf: 'flex-start', fontWeight: '700' }}>Premium Stay</div>
               <h1 style={{ color: 'var(--dark)', fontSize: '2.8rem', margin: '0 0 20px 0', fontFamily: 'var(--font-heading)', lineHeight: '1.2' }}>{room.title}</h1>
               <div style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '15px 30px', borderRadius: '15px', fontSize: '1.8rem', fontWeight: '700', boxShadow: '0 8px 25px rgba(197, 85, 59, 0.3)', display: 'inline-flex', alignItems: 'baseline', gap: '5px', alignSelf: 'flex-start', marginBottom: '40px' }}>
                 ₹{parseInt(room.price).toLocaleString('en-IN')} <span style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.9 }}>/night</span>
               </div>
               
               <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#25D366', color: '#fff', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.3s ease', fontSize: '1.1rem', boxShadow: '0 5px 15px rgba(37, 211, 102, 0.3)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                  Book Now via WhatsApp
               </a>
            </div>

          </div>

          {/* Content Area */}
          <div style={{ padding: '0 10px', marginTop: '10px' }}>

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
                      <style>{`
                        .amenity-card {
                          background: linear-gradient(145deg, #ffffff 0%, #fff8f2 100%);
                          border: 1.5px solid rgba(230, 126, 34, 0.3);
                          border-radius: 16px;
                          padding: 25px 15px;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          justify-content: center;
                          text-align: center;
                          gap: 15px;
                          color: #333;
                          box-shadow: 0 4px 15px rgba(230, 126, 34, 0.08);
                          transition: all 0.3s ease;
                        }
                        .amenity-card:hover {
                          transform: translateY(-6px);
                          box-shadow: 0 12px 25px rgba(230, 126, 34, 0.3);
                          border-color: #e67e22;
                        }
                      `}</style>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                        {listItems.map((item, idx) => (
                          <div key={idx} className="amenity-card">
                            <div style={{ fontSize: '3rem', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                              {getAmenityEmoji(item)}
                            </div>
                            <span style={{ fontSize: '0.9rem', lineHeight: '1.4', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}


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

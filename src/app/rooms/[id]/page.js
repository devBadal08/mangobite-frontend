import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';

export async function generateStaticParams() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/rooms');
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
    const res = await fetch(`https://themangobitehotel.com/api/rooms/${id}`);
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json();
      if (data && data.status && data.data) {
        title = `${data.data.title} | Mango Bite Hotel Mandvi`;
      }
    }
  } catch (error) {}

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
    const res = await fetch(`https://themangobitehotel.com/api/rooms/${id}`);
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
      ? `https://themangobitehotel.com${mainImageUrl}` 
      : `https://themangobitehotel.com/storage/${mainImageUrl}`;
  }

  // WhatsApp setup
  const whatsappNumber = '918490991577'; // Karan Singh
  const whatsappMessage = encodeURIComponent(`Hello, I would like to book the ${room.title}.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', padding: '120px 0 60px' }}>
      <div className="container">
        {/* Back Button */}
        <BackButton style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '20px', textDecoration: 'none', fontWeight: '500' }}>
          &larr; Back
        </BackButton>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          {/* Main Image */}
          <div style={{ position: 'relative', width: '100%', height: '50vh', minHeight: '400px' }}>
            {mainImageUrl ? (
              <Image src={mainImageUrl} alt={room.title} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image Available</div>
            )}
          </div>

          {/* Content Area */}
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
              <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', margin: 0 }}>{room.title}</h1>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--dark)' }}>
                ₹{parseInt(room.price).toLocaleString('en-IN')}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/night</span>
              </div>
            </div>

            {/* Extracted Description logic */}
            {(() => {
              const descriptionWithoutUl = room.description?.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, '') || '';
              const listItems = [];
              const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
              let match;
              while ((match = liRegex.exec(room.description || '')) !== null) {
                listItems.push(match[1].replace(/<[^>]*>?/gm, '').trim());
              }

              return (
                <>
                  <div 
                    style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px' }}
                    dangerouslySetInnerHTML={{ __html: descriptionWithoutUl }} 
                  />

                  {listItems.length > 0 && (
                    <div style={{ marginBottom: '40px' }}>
                      <h3 style={{ color: 'var(--dark)', marginBottom: '20px', fontSize: '1.3rem' }}>Key Features & Amenities</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                        {listItems.map((item, idx) => (
                          <div key={idx} style={{ 
                            backgroundColor: '#fdfdfd', 
                            border: '1px solid #eaeaea', 
                            borderRadius: '10px', 
                            padding: '15px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px',
                            color: 'var(--dark)',
                            fontWeight: '500',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                          }}>
                            <div style={{ backgroundColor: 'rgba(197, 85, 59, 0.1)', padding: '6px', borderRadius: '50%', display: 'flex' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            {item}
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
                <svg xmlns="http://www.w3.org/-2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
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
                        ? `https://themangobitehotel.com${subImgUrl}` 
                        : `https://themangobitehotel.com/storage/${subImgUrl}`;
                    }
                    return (
                      <div key={idx} style={{ position: 'relative', height: '200px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        <Image src={subImgUrl} alt={`${room.title} - Image ${idx+1}`} fill style={{ objectFit: 'cover' }} />
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
